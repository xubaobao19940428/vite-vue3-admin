<!--  -->
<template>
    <div class="product_area_edit">
        <el-button class="btn"
                   @click="savePolyEditor('ruleFormRef')"
                   type="primary"
                   size="small">
            保存
        </el-button>
        <div class="product_area_edit_page">
            <div class="product_title">
                <el-form ref="ruleFormRef"
                         :model="ruleForm"
                         :rules="rules"
                         label-width="100px"
                         class="demo-ruleForm"
                         :size="formSize"
                         style="">
                    <el-form-item label="模版名称:"
                                  prop="title">
                        <el-input v-model="ruleForm.title"></el-input>
                    </el-form-item>
                    <el-form-item label="城市:"
                                  prop="cityId">
                        <el-select v-model="ruleForm.cityId"
                                   :filterable="true"
                                   style="width: 700px"
                                   @change="changeCity">
                            <el-option v-for="(value, key) in cityList"
                                       :key="key"
                                       :label="value"
                                       :value="key"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div id="addressMap"></div>
            <div class="input-card">
                <el-button class="btn"
                           @click="createPolygon"
                           type="primary"
                           size="small">
                    新建
                </el-button>
                <el-button class="btn"
                           @click="polyEditorOpen()"
                           type="primary"
                           size="small">
                    开始编辑
                </el-button>
                <el-button class="btn"
                           @click="polyEditorClose()"
                           type="primary"
                           size="small">
                    结束编辑
                </el-button>
                <!--<el-button class="btn"
                           @click="clearpPolyEditor"
                           type="danger"
                           size="small">
                    清空
                </el-button>-->
            </div>
        </div>
    </div>
</template>

<script>
import areaData from '@/data/area.js'
import { getDivisionGps } from '@/api/newJson/order'
import { addFencing, fencingDetail } from '@/api/newJson/shop'
export default {
	inject: ['reload'],
	data() {
		return {
			addressMap: null,
			polyEditor: null,
			rules: {
				title: {
					required: true,
					message: '请输入模版名称',
					trigger: 'blur',
				},
				cityId: {
					required: true,
					message: '请输入模版名称',
					trigger: 'change',
				},
			},
			ruleForm: {
				title: '',
				cityId: '',
			},
			cityList: areaData.city_list,
			latitude: '',
			longitude: '',
			type: 'add',
			polygonList: [],
			id: null,
		}
	},

	components: {},

	computed: {},

	mounted() {
		this.type = this.$route.query.type
		if (this.$route.query.id) {
			this.id = this.$route.query.id
			this.getFencingDetail(this.id)
		} else {
			setTimeout(() => {
				this.initAddressMap('addressMap')
			})
		}
	},

	methods: {
		getFencingDetail(id) {
			fencingDetail({
				id,
			})
				.then((res) => {
					if (res) {
						let _this = this
						_this.ruleForm.title = res.data.title
						_this.ruleForm.cityId = res.data.cityId
						getDivisionGps({
							cityId: this.ruleForm.cityId,
						})
							.then((response) => {
								_this.latitude = response.data.latitude
								_this.longitude = response.data.longitude

								_this.addressMap = new AMap.Map('addressMap', {
									resizeEnable: true, // 是否监控地图容器尺寸变化
									zoom: 11, // 初始化地图层级
									dragEnable: true,
									keyboardEnable: true,
									doubleClickZoom: true,
									zoomEnable: true,
									rotateEnable: true,
									center: [_this.longitude, _this.latitude],
								})

								res.data.fencing.map((item, index) => {
									_this.polygonList[index] = new AMap.Polygon(
										{
											path: item,
										}
									)
								})
								_this.addressMap.add(_this.polygonList)
								_this.addressMap.setFitView()
								_this.polyEditor = new AMap.PolygonEditor(
									_this.addressMap
								)
								_this.polyEditor.adsorbPolygons = []
								_this.polyEditor.addAdsorbPolygons(
									_this.polygonList
								)
								_this.polyEditor.on('add', function (data) {
									_this.polygonList[
										_this.polygonList.length
									] = data.target
									_this.polyEditor.addAdsorbPolygons([
										_this.polygonList[
											_this.polygonList.length - 1
										],
									])

									_this.polygonList[
										_this.polygonList.length - 1
									].on('dblclick', () => {
										_this.polyEditor.setTarget(
											_this.polygonList[
												_this.polygonList.length - 1
											]
										)
										_this.polyEditor.open()
									})
								})
								_this.polygonList.map((item, index) => {
									_this.polygonList[index].on(
										'dblclick',
										() => {
											_this.polyEditor.setTarget(
												_this.polygonList[index]
											)
											_this.polyEditor.open()
										}
									)
								})
							})
							.catch((error) => {})
					}
				})
				.catch((error) => {})
		},
		changeCity(val) {
			getDivisionGps({
				cityId: val,
			})
				.then((response) => {
					if (response) {
						let _this = this
						_this.latitude = response.data.latitude
						_this.longitude = response.data.longitude
						_this.addressMap = new AMap.Map('addressMap', {
							resizeEnable: true, // 是否监控地图容器尺寸变化
							zoom: 11, // 初始化地图层级
							dragEnable: true,
							keyboardEnable: true,
							doubleClickZoom: true,
							zoomEnable: true,
							rotateEnable: true,
							center: [this.longitude, this.latitude],
						})

						_this.polyEditor = new AMap.PolygonEditor(
							_this.addressMap
						)
						_this.polyEditor.adsorbPolygons = []
						_this.polyEditor.on('add', function (data) {
							_this.polygonList[_this.polygonList.length] =
								data.target
							_this.polyEditor.addAdsorbPolygons(
								_this.polygonList[_this.polygonList.length - 1]
							)
							_this.polygonList[_this.polygonList.length - 1].on(
								'dblclick',
								() => {
									_this.polyEditor.setTarget(
										_this.polygonList[
											_this.polygonList.length - 1
										]
									)
									_this.polyEditor.open()
								}
							)
						})
					}
				})
				.catch((error) => {})
		},
		initAddressMap() {
			let _this = this
			_this.addressMap = new AMap.Map('addressMap', {
				resizeEnable: true, // 是否监控地图容器尺寸变化
				zoom: 11, // 初始化地图层级
				dragEnable: true,
				keyboardEnable: true,
				doubleClickZoom: true,
				zoomEnable: true,
				rotateEnable: true,
			})
			_this.polyEditor = new AMap.PolygonEditor(_this.addressMap)
			_this.polyEditor.adsorbPolygons = []
			_this.polyEditor.on('add', function (data) {
				console.log(_this.polygonList)
				_this.polygonList[_this.polygonList.length] = data.target
				_this.polyEditor.addAdsorbPolygons(
					_this.polygonList[_this.polygonList.length - 1]
				)
				_this.polygonList[_this.polygonList.length - 1].on(
					'dblclick',
					() => {
						_this.polyEditor.setTarget(
							_this.polygonList[_this.polygonList.length - 1]
						)
						_this.polyEditor.open()
					}
				)
			})
			console.log(_this.polyEditor)
		},
		createPolygon() {
			this.polyEditor.close()
			this.polyEditor.setTarget()
			this.polyEditor.open()
		},
		polyEditorOpen() {
			this.polyEditor.open()
		},
		polyEditorClose() {
			this.polyEditor.close()
		},
		savePolyEditor(formName) {
			this.polyEditor.close()
			this.polyEditor.setTarget()
			console.log(this.polyEditor)
			this.$refs[formName].validate((valid) => {
				if (valid) {
					let params = {
						title: this.ruleForm.title,
						cityId: this.ruleForm.cityId,
						fencing: this.polyEditor.getPath(),
					}
					if (this.type == 'edit') {
						params.id = this.id
					}
					addFencing(params)
						.then((response) => {
							if (response) {
								if (this.type == 'edit') {
									this.$message.success(
										'配送区域配置修改成功'
									)
								} else {
									this.$message.success(
										'配送区域配置新增成功'
									)
								}

								this.polyEditor.removeAdsorbPolygons(
									this.polygonList
								)
								// this.addressMap.clearMap()
								this.$router.go(-1)
							}
						})
						.catch((error) => {
							console.log(error)
						})
				} else {
					console.log('error submit!!')
					return false
				}
			})
		},
		clearpPolyEditor() {
			console.log(this.polygonList)
			this.polyEditor.removeAdsorbPolygons(this.polygonList)
			console.log(111)
			// this.polygonList.map((item, index) => {
			// 	this.polyEditor.destroy(this.polygonList[index])
			// })
		},
	},
	// beforeUnmount() {
	// 	if (this.addressMap) {
	// 		this.addressMap.destroy(this.polygonList)
	// 	}
	// },
}
</script>
<style lang="scss" scoped>
.product_area_edit {
  overflow: scroll;
  width: 100%;
  background: #fff !important;
  .product_area_edit_page {
    display: flex;
    flex-direction: column;
    align-items: center;
    #addressMap {
      width: 1000px;
      height: 600px;
    }
  }
}
</style>
