<!--  -->
<template>
	<div class="meimiaotuan_order">
		<el-form
			ref="afterSaleOrderFilter"
			inline
			:model="queryData"
			label-position="left"
		>
			<el-form-item
				label="下单时间："
				prop="timeList"
				class="filter-item"
			>
				<el-date-picker
					v-model="timeList"
					type="daterange"
					start-placeholder="开始时间"
					end-placeholder="结束时间"
					:default-time="defaultTime2"
					range-separator="-"
					format="YYYY-MM-DD HH:mm:ss"
					value-format="x"
				></el-date-picker>
			</el-form-item>
			<el-form-item class="filter-item" style="margin-left: 20px">
				<el-button
					icon="el-icon-download"
					type="primary"
					@click="downLoadTuan"
					size="medium"
					>下载</el-button
				>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import { ref, reactive } from 'vue'
import { downloadPromoterData } from '@/api/newJson/order.js'
export default {
	setup() {
		const count = ref(0)
		const defaultTime2 = ref([
			new Date(2000, 1, 1, 0, 0, 0),
			new Date(2000, 2, 1, 23, 59, 59),
		]) //
		const object = reactive({
			foo: 'bar',
		})
		const timeList = ref([])
		// 暴露到template中
		return {
			count,
			object,
			timeList,
			defaultTime2,
		}
	},
	data() {
		return {
			queryData: {
				startTime: '',
				endTime: '',
			},
		}
	},

	components: {},

	computed: {},

	mounted() {},

	methods: {
		downLoadTuan() {
			if (!this.timeList.length) {
				this.$message.warning('请选择时间')
				return
			}
			if (this.timeList && this.timeList.length) {
				this.queryData.startTime = Number(this.timeList[0])
				this.queryData.endTime = Number(this.timeList[1])
			}
			downloadPromoterData(
				this.filterData({
					startTime: this.queryData.startTime,
					endTime: this.queryData.endTime,
				})
			)
				.then((response) => {
					if (response) {
						this.$message.success('下载成功,请前往文件中心下载')
					}
				})
				.catch((error) => {})
		},
	},
}
</script>
<style lang="scss" scoped>
.meimiaotuan_order {
	width: 100%;
	height: 100%;
	background-color: #ffffff !important;
}
</style>
