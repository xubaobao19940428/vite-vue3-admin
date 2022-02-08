<!--  -->
<template>
    <div class="add_account_dialog">
        <el-dialog v-model="dialogFormVisible"
                   title="地址区域"
                   width="1100px"
                   size="medium"
                   :before-close="closeDialog">
            <div id="addressMap"></div>
        </el-dialog>
    </div>
</template>

<script>
import { doClear } from '@/api/newJson/account'
export default {
	props: {
		areaInfo: {
			type: Object,
		},
		dialogFormVisible: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			addressMap: null,
			polyEditor: [],
			polygonList: [],
		}
	},

	components: {},

	computed: {},

	mounted() {
		// this.initAddressMap()
	},

	methods: {
		closeDialog() {
			this.$emit('close-dialog')
		},
		initMap() {
			this.addressMap = new AMap.Map('addressMap', {
				resizeEnable: true, // 是否监控地图容器尺寸变化
				zoom: 11, // 初始化地图层级
				dragEnable: true,
				keyboardEnable: true,
				doubleClickZoom: true,
				zoomEnable: true,
				rotateEnable: true,
				center: [this.areaInfo.longitude, this.areaInfo.latitude],
			})

			this.areaInfo.fencing.map((item, index) => {
				this.polygonList[index] = new AMap.Polygon({
					path: item,
				})
			})
			this.addressMap.add(this.polygonList)
			this.addressMap.setFitView()
			this.polyEditor = new AMap.PolygonEditor(this.addressMap)
			this.polyEditor.addAdsorbPolygons(this.polygonList)
			this.polyEditor.on('add', function (data) {
				this.polygonList[this.polygonList.length] = data.target
				this.polyEditor.addAdsorbPolygons([
					this.polygonList[this.polygonList.length - 1],
				])
				this.polygonList[this.polygonList.length - 1].on(
					'dblclick',
					() => {
						this.polyEditor.setTarget(
							this.polygonList[this.polygonList.length - 1]
						)
						this.polyEditor.open()
					}
				)
			})
		},
		initAddressMap() {
			let _this = this
			this.addressMap = new AMap.Map('addressMap', {
				resizeEnable: true, // 是否监控地图容器尺寸变化
				zoom: 11, // 初始化地图层级
				dragEnable: true,
				keyboardEnable: true,
				doubleClickZoom: true,
				zoomEnable: true,
				rotateEnable: true,
			})
		},
	},
}
</script>
<style lang="scss" scoped>
#addressMap {
  width: 1000px;
  height: 600px;
}
</style>
