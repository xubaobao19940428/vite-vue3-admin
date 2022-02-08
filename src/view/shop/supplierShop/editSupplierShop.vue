<!--  -->
<template>
    <div class="edit_supplier_shop">
        <el-form :model="shopInfo"
                 size="medium"
                 ref="shopInfo"
                 :rules="shopInfoRule"
                 label-width="100px">
            <div class="shop_info_header">
                <el-form-item label="店铺开关">
                    <el-switch v-model="shopInfo.status"
                               :active-value="1"
                               :inactive-value="0"></el-switch>
                </el-form-item>
                <el-button type="primary"
                           size="medium"
                           @click="saveShopInfo">确定</el-button>
            </div>
            <el-card class="box-card">
                <template class="clearfix"
                          style="font-size:20px;font-weight:900"
                          #header>
                    <span>地址信息</span>
                </template>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="经营地址"
                                      prop="address">
                            <div id="businessAddress"
                                 class="mar-b-20"></div>
                            <el-cascader class="mar-b-20"
                                         v-model="businessAddress"
                                         :props="{ value: 'value', label: 'label' }"
                                         :options="areaData"
                                         @change="
                                    data => {
                                        return addressChange(data, 'address');
                                    }
                                "></el-cascader>
                            <el-input v-model="shopInfo.address"
                                      clearable
                                      style="width:300px;"
                                      id="businessAddressInput"
                                      placeholder="请输入详细地址"
                                      @change="changeGeoCode"></el-input>
                        </el-form-item>

                        <el-form-item label="店名："
                                      prop="name">
                            <el-input placeholder="请输入店名"
                                      v-model="shopInfo.name"
                                      style="width:500px;"></el-input>
                        </el-form-item>
                        <el-form-item label="店名简称："
                                      prop="shortName">
                            <el-input placeholder="请输入店铺简称"
                                      v-model="shopInfo.shortName"
                                      style="width:500px;"></el-input>
                        </el-form-item>
                        <el-form-item label="客服电话："
                                      prop="customerPhone">
                            <el-input style="width:500px"
                                      v-model="shopInfo.customerPhone"
                                      placehodler="请输入客服电话"></el-input>
                        </el-form-item>
                        <el-form-item label="类目："
                                      prop="subTypes">
                            <el-cascader class="mar-b-20"
                                         style="width:500px"
                                         v-model="shopInfo.subTypes"
                                         :show-all-levels="false"
                                         :props="{
                                    value: 'subType',
                                    label: 'subTypeName',
                                    children: 'subTypes',
                                    multiple: true,
                                    emitPath: false,
                                }"
                                         :options="categoryData"
                                         @change="changeCategory"></el-cascader>
                        </el-form-item>
                        <div>
                            <el-form-item label="经营资质"
                                          prop="industryLicense"
                                          class="el_uploadimg">
                                <c-upload :limit="1"
                                          style="margin-left:10px;"
                                          ref="industryLicense"
                                          type="text"
                                          :textDesc="'许可证'"
                                          :fileList="shopInfo.industryLicense"
                                          @setData="setCoverImg3"></c-upload>
                                <c-upload :limit="6"
                                          style="margin-left:10px;"
                                          ref="businessLicense"
                                          type="other"
                                          :textDesc="'企业营业执照'"
                                          :fileList="shopInfo.businessLicense"
                                          @setData="setCoverImg"></c-upload>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="关联商家："
                                      prop="sellerId">
                            <el-select v-model="shopInfo.sellerId"
                                       style="width:500px;"
                                       placeholder="请选择关联商家"
                                       :disabled="type == 'edit' || type == 'check'">
                                <el-option v-for="(item, index) in supplierList"
                                           :key="index"
                                           :label="item.name"
                                           :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="营业时间："
                                      prop="openTimeStr"
                                      required>
                            <el-input placeholder="请输入营业时间"
                                      v-model="shopInfo.openTimeStr"
                                      style="width:500px;"></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="营业时间：" required>
                            <el-form-item v-for="(item, index) in shopInfo.openTime" :key="index">
                                <el-select v-model="item.days" multiple placeholder="请选择营业日期" style="width:500px" @focus="changeTime(index)">
                                    <el-option
                                        v-for="(day, index) in daysList"
                                        :key="index"
                                        :label="day.label"
                                        :value="day.value"
                                        :disabled="disabledSelect.includes(day.value)"
                                    ></el-option>
                                </el-select>
                                <el-form-item label="上半场"
                                              style="margin-top:10px;display:inline-block">
                                    <el-time-select v-model="item.startTime1"
                                                    style="width:120px"
                                                    placeholder="开始时间"
                                                    start="00:30"
                                                    step="00:30"
                                                    end="24:00"></el-time-select>
                                    <el-time-select v-model="item.endTime1"
                                                    style="width:120px"
                                                    placeholder="结束时间"
                                                    start="00:30"
                                                    step="00:30"
                                                    end="24:00"></el-time-select>
                                </el-form-item>
                                <el-form-item label="下半场"
                                              style="margin-top:10px;display:inline-block;margin-left:20px">
                                    <el-time-select v-model="item.startTime2"
                                                    style="width:120px"
                                                    placeholder="开始时间"
                                                    start="00:30"
                                                    step="00:30"
                                                    end="24:00"></el-time-select>
                                    <el-time-select v-model="item.endTime2"
                                                    style="width:120px"
                                                    placeholder="结束时间"
                                                    start="00:30"
                                                    step="00:30"
                                                    end="24:00"></el-time-select>
                                </el-form-item>
                                <el-button type="text"
                                           size="small"
                                           style="margin-left:20px;"
                                           @click="deleteOpenTime(index)">删除</el-button>
                            </el-form-item>
                            <el-button type="text" @click="addOpenTime">新增营业时间</el-button>
                        </el-form-item> -->
                        <el-form-item label="店铺logo："
                                      class="el_uploadimg"
                                      required>
                            <c-upload :limit="1"
                                      ref="logo"
                                      type="text"
                                      :textDesc="'店铺logo'"
                                      :fileList="shopInfo.logo"
                                      @setData="setCoverImgLogo"></c-upload>
                        </el-form-item>
                        <el-form-item label="配送区域">
                            <el-select v-model="shopInfo.fencingId"
                                       @change="changeFencingId"
                                       placeholder="请选择配送区域"
                                       style="width:500px">
                                <el-option v-for="(item, index) in fencingList"
                                           :key="index"
                                           :label="item.title"
                                           :value="item.id"></el-option>
                            </el-select>
                            <el-button type="primary"
                                       size="small"
                                       style="margin-top:20px;"
                                       @click="viewArea">查看区域</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-card>
            <!--结算方式--->
            <el-card class="box-card">
                <template class="clearfix"
                          style="font-size:20px;font-weight:900"
                          #header>
                    <span>结算方式</span>
                </template>
                <div>
                    <el-form-item label="商家结算银行与支行："
                                  label-width="170px"
                                  prop="bankName">
                        <el-input style="width:500px"
                                  v-model="shopInfo.bankName"></el-input>
                    </el-form-item>
                    <el-form-item label="银行卡号："
                                  label-width="170px"
                                  prop="bankCardNo">
                        <el-input style="width:500px"
                                  v-model="shopInfo.bankCardNo"></el-input>
                    </el-form-item>
                    <el-form-item label="收款人姓名："
                                  label-width="170px"
                                  prop="bankPersonalName">
                        <el-input style="width:500px"
                                  v-model="shopInfo.bankPersonalName"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="收款人邮箱：" label-width="170px">
                        <el-input style="width:500px"></el-input>
                    </el-form-item> -->
                    <el-form-item label="收款人电话："
                                  label-width="170px"
                                  prop="contactPhone">
                        <el-input style="width:500px"
                                  v-model="shopInfo.contactPhone"></el-input>
                    </el-form-item>
                </div>
            </el-card>
        </el-form>
        <viewAreaDialog :dialogFormVisible="dialogFormVisible"
                        ref="viewAreaDialog"
                        :areaInfo="areaInfo"
                        @close-dialog="closeDialog"></viewAreaDialog>
    </div>
</template>

<script>
import areaData from '@/data/area.json'
import categoryData from '@/data/category.json'
import cUpload from '@/components/fileUpload'
import {
	getSellers,
	addShop,
	getShop,
	editorShop,
	fencingPage,
} from '@/api/newJson/shop'
import { getDivisionGps } from '@/api/newJson/order'
import viewAreaDialog from './viewAreaDialog'
export default {
	data() {
		const imgurlValitor = (rule, value, callback) => {
			// 图片验证
			if (!this.hasFmt) {
				callback(new Error('企业营业执照不能为空'))
			} else {
				callback()
			}
		}
		return {
			hasFmt: false,
			shopInfo: {
				id: '',
				sellerId: '', //关联商家
				longitude: '', //经度
				latitude: '', //纬度
				subTypes: ['1_1'], //关联类目
				// openTime: [
				//     {
				//         days: [],
				//         startTime1: '',
				//         endTime1: '',
				//         startTime2: '',
				//         endTime2: '',
				//     },
				// ],
				openTimeStr: '',
				status: 0,
				logo: '', //店铺logo
				businessLicense: '', //企业营业执照
				bankCardNo: '', //卡号
				bankPersonalName: '', //请输入收款人名称
				contactPhone: '', //联系电话,
				bankName: '', //银行名称
				address: '',
				name: '',
				shortName: '',
				industryLicense: '',
				businessLicense: '',
				customerPhone: '', //客服电话
				fencingId: '',
			},
			shopInfoRule: {
				businessAddress: {
					required: true,
					message: '请输入经营地址',
				},
				name: {
					required: true,
					message: '请输入店名',
				},
				openTimeStr: {
					required: true,
					message: '请输入营业时间',
				},
				shortName: {
					required: true,
					message: '请输入店铺简称',
				},
				sellerId: [
					{
						required: true,
						message: '请选择关联商家',
						trigger: 'change',
					},
				],
				subTypes: [
					{
						required: true,
						message: '请选择关联类目',
						trigger: 'change',
					},
				],
				bankCardNo: [
					{
						required: true,
						message: '请输入卡号',
					},
				],
				bankPersonalName: [
					{
						required: true,
						message: '请输入收款人名称',
					},
				],
				bankName: [
					{
						required: true,
						message: '请输入开户银行名称',
					},
				],
				contactPhone: [
					{
						required: true,
						message: '请输入收款人电话',
					},
				],
				customerPhone: [
					{
						required: true,
						message: '请输入客服电话',
					},
				],
				industryLicense: {
					required: true,
					trigger: 'change',
					validator: imgurlValitor,
				},
			},
			businessAddress: [],
			areaData: areaData,
			categoryData: categoryData,
			businessAddressMap: null,
			supplierList: [],
			disabledSelect: [],
			daysList: [
				{
					label: '周一',
					value: 1,
				},
				{
					label: '周二',
					value: 2,
				},
				{
					label: '周三',
					value: 3,
				},
				{
					label: '周四',
					value: 4,
				},
				{
					label: '周五',
					value: 5,
				},
				{
					label: '周六',
					value: 6,
				},
				{
					label: '周日',
					value: 7,
				},
			],
			type: 'add',
			fencingList: [],
			areaInfo: {
				fencing: [],
				latitude: '',
				longitude: '',
				cityId: '',
			},
			dialogFormVisible: false,
		}
	},

	components: {
		cUpload,
		viewAreaDialog,
	},

	computed: {},

	mounted() {
		this.initAddressMap('businessAddress')
		this.getSellersList({
			pageNum: 1,
			pageSize: 1000,
		})
		if (this.$route.query.id) {
			this.shopInfo.id = this.$route.query.id
			this.getShopDetail(this.shopInfo.id)
		}
		this.type = this.$route.query.type
	},

	methods: {
		//查看配送区域
		viewArea() {
			if (!this.shopInfo.fencingId) {
				this.$message.warning('请选择配送区域')
			} else {
				this.dialogFormVisible = true
				setTimeout(() => {
					this.$refs['viewAreaDialog'].initMap()
				})
			}
		},
		changeFencingId(val) {
			this.fencingList.map((item) => {
				if (item.id == this.shopInfo.fencingId) {
					this.areaInfo.fencing = item.fencing
					this.areaInfo.cityId = item.cityId
				}
			})
			getDivisionGps({
				cityId: this.areaInfo.cityId,
			})
				.then((response) => {
					if (response) {
						this.areaInfo.latitude = response.data.latitude
						this.areaInfo.longitude = response.data.longitude
					}
				})
				.catch((error) => {})
		},
		closeDialog() {
			this.dialogFormVisible = false
		},
		getFencingPage() {
			let _this = this
			fencingPage({
				pageSize: 1000,
				pageNum: 1,
			})
				.then((response) => {
					if (response) {
						_this.fencingList = response.data.data
						if (_this.shopInfo.fencingId) {
							_this.fencingList.map((item) => {
								if (item.id == _this.shopInfo.fencingId) {
									_this.areaInfo.fencing = item.fencing
									_this.areaInfo.cityId = item.cityId
								}
							})
							getDivisionGps({
								cityId: _this.areaInfo.cityId,
							})
								.then((response) => {
									if (response) {
										_this.areaInfo.latitude =
											response.data.latitude
										_this.areaInfo.longitude =
											response.data.longitude
									}
								})
								.catch((error) => {})
						}
					}
				})
				.catch((error) => {})
		},
		changeCategory(value) {
			console.log(value)
		},
		getShopDetail(id) {
			getShop({
				id,
			})
				.then((response) => {
					if (response) {
						this.shopInfo = response.data
						if (response.data.industryLicense) {
							this.hasFmt = true
							this.$refs['industryLicense'].setFileList(
								response.data.industryLicense
							)
						}
						if (response.data.businessLicense) {
							this.$refs['businessLicense'].setFileList(
								response.data.businessLicense
							)
						}
						if (response.data.logo) {
							this.$refs['logo'].setFileList(response.data.logo)
						}
						if (response.data.divisionIdProvince) {
							this.businessAddress = [
								response.data.divisionIdProvince,
								response.data.divisionIdCity,
								response.data.divisionIdArea,
							]
						}
						this.getFencingPage()
					}
				})
				.catch((error) => {
					console.log(error)
				})
		},
		//新增营业时间
		// addOpenTime() {
		//     this.shopInfo.openTime.push({
		//         days: [],
		//         startTime1: '',
		//         endTime1: '',
		//         startTime2: '',
		//         endTime2: '',
		//     });
		// },
		// deleteOpenTime(index) {
		//     if (index != 0) {
		//         this.shopInfo.openTime.splice(index, 1);
		//     }
		// },
		// changeTime(index) {
		//     let disabledSelect = [];
		//     this.shopInfo.openTime.map((item, _index) => {
		//         if (_index != index) {
		//             disabledSelect = disabledSelect.concat(item.days);
		//         }
		//     });
		//     this.disabledSelect = disabledSelect;
		//     console.log(this.disabledSelect);
		// },
		//获取商家列表
		getSellersList(params) {
			getSellers(params)
				.then((response) => {
					if (response) {
						this.supplierList = response.data.data
					}
				})
				.catch((error) => {})
		},
		initAddressMap(key) {
			this[key + 'Map'] = new AMap.Map(key, {
				resizeEnable: true, // 是否监控地图容器尺寸变化
				zoom: 11, // 初始化地图层级
				dragEnable: true,
				keyboardEnable: true,
				doubleClickZoom: true,
				zoomEnable: true,
				rotateEnable: true,
			})
			let scale = new AMap.Scale({
				visible: true,
			})
			let toolBar = new AMap.ToolBar({
				visible: true,
			})
			let placeSearch = new AMap.PlaceSearch({
				map: this[key + 'Map'],
			})
			// let overView = new AMap.OverView({
			//     visible: true,
			// });
			this[key + 'Map'].addControl(scale)
			this[key + 'Map'].addControl(toolBar)
			// this[key + 'Map'].addControl(overView);
			let auto = new AMap.AutoComplete({
				input: key + 'Input',
				city: '全国',
			})
			auto.on('select', (e) => {
				console.log(e)
				//TODO 针对选中的poi实现自己的功能

				placeSearch.setCity(e.poi.adcode)
				placeSearch.search(e.poi.name)
				if (e.poi.location) {
					this.shopInfo.longitude = e.poi.location.lng
					this.shopInfo.latitude = e.poi.location.lat
				}
			})
			this[key + 'Map'].on('click', (e) => {
				let geocoder = new AMap.Geocoder({
					radius: 1000,
					extensions: 'all',
				})
				geocoder.getAddress(
					[e.lnglat.lng, e.lnglat.lat],
					(status, result) => {
						console.log('click', result)
						if (status === 'complete' && result.info === 'OK') {
							this.shopInfo[key + 'Coordinates'] =
								e.lnglat.lng + ',' + e.lnglat.lat
							this.shopInfo.longitude = e.lnglat.lng
							this.shopInfo.latitude = e.lnglat.lat
							this.changeBusinessAddress(result.regeocode, key)
						}
					}
				)
			})
			this[key + 'Map'].plugin('AMap.Geolocation', () => {
				let geolocation = new AMap.Geolocation({
					enableHighAccuracy: true,
					timeout: 10000,
					buttonOffset: new AMap.Pixel(10, 20),
					zoomToAccuracy: true,
					buttonPosition: 'RB',
				})
				geolocation.getCurrentPosition()
			})
		},
		changeBusinessAddress(data, key) {
			this.shopInfo.address = data.formattedAddress
		},
		//输入获取地址
		changeGeoCode(address) {
			let _this = this
			let geocoder = new AMap.Geocoder({
				radius: 1000,
				city: '全国',
			})
			geocoder.getLocation(address, (status, result) => {
				console.log(status, result)
				if (status === 'complete' && result.info === 'OK') {
					_this.shopInfo.longitude = result.geocodes[0].location.lng
					_this.shopInfo.latitude = result.geocodes[0].location.lat
					console.log(
						_this.shopInfo.longitude,
						_this.shopInfo.latitude
					)
				}
			})
		},
		addressChange(data, type) {
			console.log(data)
			this.$refs['shopInfo'].validate()
		},
		//经营资质校验
		setCoverImg3(res) {
			this.shopInfo.industryLicense = res.data
			if (res.data != '') {
				this.hasFmt = true
				this.$refs['shopInfo'].validateField('industryLicense')
			} else {
				this.hasFmt = false
				this.$refs['shopInfo'].validateField('industryLicense')
			}
		},
		setCoverImg(res) {
			this.shopInfo.businessLicense = res.data
		},
		setCoverImgLogo(res) {
			this.shopInfo.logo = res.data
		},
		saveShopInfo() {
			console.log(this.shopInfo)
			let params = {}
			params = JSON.parse(JSON.stringify(this.shopInfo))
			console.log(params)
			this.$refs['shopInfo'].validate((valid) => {
				if (valid) {
					params.longitude = params.longitude.toString()
					params.latitude = params.latitude.toString()
					if (!params.logo) {
						this.$message.error('请上传店铺logo')
						return
					}
					if (this.businessAddress) {
						params.divisionIdProvince = this.businessAddress[0]
						params.divisionIdCity = this.businessAddress[1]
						params.divisionIdArea = this.businessAddress[2]
					}
					if (this.shopInfo.id) {
						editorShop(this.filterData(params))
							.then((response) => {
								if (response) {
									this.$message.success('编辑成功')
									this.$router.push({
										name: 'supplierShop',
									})
								}
							})
							.catch((error) => {})
					} else {
						addShop(this.filterData(params))
							.then((response) => {
								if (response) {
									this.$message.success('添加成功')
									this.$router.push({
										name: 'supplierShop',
									})
								}
							})
							.catch((error) => {
								console.log(error)
							})
					}
				} else {
					return false
				}
			})
		},
	},
}
</script>
<style lang="scss" scoped>
.edit_supplier_shop {
	width: 100%;
	height: 100%;
	background: #fff !important;
	overflow: hidden;

	.shop_info_header {
		min-width: 1300px;
		width: 100%;
		box-shadow: var(--el-box-shadow-light);
		padding: 10px;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.el-form-item {
			margin-bottom: 0;
		}
	}
	.box-card {
		min-width: 1300px;
		margin-top: 10px;
	}
	.el-form {
		height: 100%;
		width: 100%;
		overflow: scroll;
	}
	.amap-container {
		height: 300px;
		width: 500px;
	}
	.el-form-item {
		margin-bottom: 22px;
	}
	:deep() .el_uploadimg {
		.el-form-item__content {
			display: flex;
			.el-upload {
				border-radius: 6px;
				cursor: pointer;
				position: relative;
				overflow: hidden;
				border: 1px dashed #d9d9d9;
				width: 148px;
				height: 148px;
			}
		}
	}
}
</style>
