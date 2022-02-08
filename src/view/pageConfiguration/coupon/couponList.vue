<!--  -->
<template>
	<div class="coupon_list app-container">
		<div class="coupon_list_header">
			<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
				<el-tab-pane label="优惠券管理" name="first">
					<el-form
						ref="supplierFilterForm"
						inline
						label-width="120px"
						:model="queryData"
					>
						<el-form-item label="优惠券ID：" class="filter-item">
							<el-input
								placeholder="请输入优惠券ID"
								size="medium"
								clearable
								v-model="queryData.id"
							></el-input>
						</el-form-item>
						<el-form-item label="应用站点：" prop="divisionId">
							<el-select v-model="queryData.divisionId">
								<el-option
									v-for="(item, index) in divisionList"
									:key="index"
									:label="item.label"
									:value="item.value"
								></el-option>
							</el-select>
						</el-form-item>
						<el-form-item
							class="filter-item"
							style="margin-left: 20px"
						>
							<el-button
								icon="el-icon-search"
								type="primary"
								@click="getCouponsList(1)"
								size="medium"
							>
								搜索
							</el-button>
							<el-button
								icon="el-icon-refresh-left"
								@click="resetSearch"
								size="medium"
								>重置</el-button
							>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="优惠券包管理" name="second">
					<el-form
						inline
						label-width="120px"
						:model="queryDataParams"
					>
						<el-form-item label="优惠券包ID：" class="filter-item">
							<el-input
								placeholder="请输入优惠券包ID"
								size="medium"
								clearable
								v-model="queryDataParams.id"
							></el-input>
						</el-form-item>
						<el-form-item label="名称：" class="filter-item">
							<el-input
								placeholder="请输入优惠券包名称"
								size="medium"
								clearable
								v-model="queryDataParams.title"
							></el-input>
						</el-form-item>
						<!-- <el-form-item label="站点：" prop="divisionId">
							<el-select v-model="queryDataParams.divisionId">
								<el-option
									v-for="(item, index) in divisionList"
									:key="index"
									:label="item.label"
									:value="item.value"
								></el-option>
							</el-select>
						</el-form-item> -->
						<el-form-item
							class="filter-item"
							style="margin-left: 20px"
						>
							<el-button
								icon="el-icon-search"
								type="primary"
								size="medium"
								@click="getCouponPackList(1)"
							>
								搜索
							</el-button>
							<el-button
								icon="el-icon-refresh-left"
								@click="resetSearchParmas"
								size="medium"
								>重置</el-button
							>
						</el-form-item>
					</el-form>
				</el-tab-pane>
			</el-tabs>
		</div>
		<div class="main-content-wrapper" v-if="activeName == 'first'">
			<div class="product-header el-card__header">
				<span>优惠券列表</span>
				<div>
					<el-button
						type="primary"
						icon="el-icon-plus"
						size="small"
						@click="addCoupon"
						>新增优惠券</el-button
					>
					<el-button
						type="primary"
						icon="el-icon-download"
						size="small"
						style="margin-left: 10px"
						@click="sendCoupon"
						>发券</el-button
					>
				</div>
			</div>
			<div class="table-detail">
				<el-table
					:data="tableData"
					border
					style="width: 100%"
					height="100%"
				>
					<el-table-column
						label="优惠券ID"
						align="center"
						prop="id"
						width="100"
					></el-table-column>
					<el-table-column
						label="优惠券名称"
						align="center"
						prop="name"
						width="180"
					></el-table-column>
					<el-table-column
						label="应用站点"
						align="center"
						prop="divisionId"
						width="100"
					>
						<template #default="scope">
							<span>{{
								returnDivision(scope.row.divisionId)
							}}</span>
						</template>
					</el-table-column>
					<el-table-column
						label="优惠券类型"
						align="center"
						width="180"
					>
						<template #default="scope">
							<span v-if="scope.row.couponType === 1"
								>立减券</span
							>
							<span v-else-if="scope.row.couponType === 0"
								>折扣券</span
							>
							<span v-else>满减券</span>
						</template>
					</el-table-column>
					<el-table-column
						label="优惠类容"
						align="center"
						prop="description"
						width="200"
					>
						<template #default="scope">
							<span v-if="scope.row.couponType == 1"
								>立减{{ scope.row.amount }}元</span
							>
							<span v-else-if="scope.row.couponType == 0"
								>{{ scope.row.showDiscount }}折</span
							>
						</template>
					</el-table-column>
					<el-table-column
						label="优惠券有效期"
						align="center"
						width="200"
					>
						<template #default="scope">
							<span v-if="scope.row.startTime">
								{{
									timestampToTime(scope.row.startTime) +
									'-' +
									timestampToTime(scope.row.endTime)
								}}
							</span>
							<span v-else
								>自领取{{ scope.row.effectiveDays }}天</span
							>
						</template>
					</el-table-column>
					<el-table-column
						label="发行余量"
						align="center"
						prop="quantity"
						width="120"
					></el-table-column>
					<el-table-column
						label="每日发行上限"
						align="center"
						prop="dailyLimit"
						width="120"
					></el-table-column>
					<el-table-column
						label="每人限领"
						align="center"
						prop="personLimit"
						width="120"
					></el-table-column>
					<el-table-column
						label="是否出现在商详页"
						align="center"
						prop="allowPublicity"
						width="150"
					>
						<template #default="scope">
							<el-tag
								v-if="scope.row.allowPublicity == 1"
								type="success"
								size="small"
								>出现</el-tag
							>
							<el-tag v-else type="warning" size="small"
								>不出现</el-tag
							>
						</template>
					</el-table-column>
					<el-table-column
						label="操作"
						align="center"
						width="200"
						fixed="right"
					>
						<template #default="scope">
							<el-button
								type="primary"
								size="small"
								plain
								@click="editCoupon(scope.row)"
								>查看</el-button
							>
							<el-button
								type="primary"
								size="small"
								plain
								@click="couponDetail(scope.row)"
								>详情</el-button
							>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<!---优惠券包管理-->
		<div class="main-content-wrapper" v-else>
			<div class="product-header el-card__header">
				<span>优惠券包列表</span>
				<div>
					<el-button
						type="primary"
						icon="el-icon-plus"
						size="small"
						@click="addCouponPackDialog"
						>新增优惠券包</el-button
					>
					<el-button
						type="primary"
						icon="el-icon-download"
						size="small"
						style="margin-left: 10px"
						@click="sendCouponPack"
						>发券</el-button
					>
				</div>
			</div>
			<div class="table-detail">
				<el-table
					:data="packTableData"
					border
					style="width: 100%"
					height="100%"
				>
					<el-table-column
						label="优惠券包ID"
						align="center"
						prop="id"
						width="100"
					></el-table-column>
					<el-table-column label="优惠券Id" align="center">
						<template #default="scope">
							<div
								v-for="(item, index) in scope.row
									.packDetailList"
								:key="item.couponId + '_' + index"
							>
								<p>id:{{ item.couponId }}</p>
								<p>数量:{{ item.num }}</p>
							</div>
						</template>
					</el-table-column>
					<el-table-column
						label="券包名称"
						align="center"
						prop="title"
					></el-table-column>
					<el-table-column
						label="券包内容"
						align="center"
						prop="description"
					></el-table-column>
					<!-- <el-table-column
						label="优惠券"
						align="center"
						prop="name"
					></el-table-column> -->
					<!-- <el-table-column
						label="应用站点"
						align="center"
						prop="divisionId"
						width="100"
					>
						<template #default="scope">
							<span>{{
								returnDivision(scope.row.divisionId)
							}}</span>
						</template>
					</el-table-column> -->
					<el-table-column
						label="操作"
						align="center"
						width="200"
						fixed="right"
					>
						<template #default="scope">
							<el-button
								type="primary"
								size="small"
								plain
								@click="editCouponPack(scope.row)"
								>编辑</el-button
							>
							<!-- <el-button
								type="danger"
								size="small"
								plain
								@click="deleteCouponPack(scope.row)"
								>删除</el-button
							> -->
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<div class="pagination-box">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:page-sizes="[10, 20, 50]"
				:page-size="pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
			></el-pagination>
		</div>
		<!--发券弹窗-->
		<send-coupon-dialog
			:dialogVisible="dialogVisible"
			@confirm="confirmCouponDialog"
		></send-coupon-dialog>
		<!--新增券包弹窗-->
		<add-coupon-pack
			ref="addCouponPack"
			:dialogCouponVisible="dialogCouponVisible"
			:divisionList="divisionList"
			@close-dialog="dialogCouponVisible = false"
			@confirm-form="confirmForm"
		></add-coupon-pack>
		<!--券包发券-->
		<sendCouponPackDialog
			:dialogPackDialog="dialogPackDialog"
			@close="handleClose"
			@confirm="handleClose"
		></sendCouponPackDialog>
	</div>
</template>

<script>
import { ref, reactive } from 'vue'
import noDataComponent from '@/components/noDataComponent.vue'
import { uploadApplets } from '@/api/newJson'
import {
	getCoupons,
	couponPackList,
	getPack,
	disablePack,
} from '@/api/newJson/coupon.js'
import sendCouponDialog from './components/sendCouponDailog.vue'
import { divisionList } from '@/data/globalData.js'
import addCouponPack from './components/addCouponPackDialog.vue'
import sendCouponPackDialog from './components/sendCouponPackDialog.vue'
export default {
	setup() {
		const count = ref(0)
		const object = reactive({
			foo: 'bar',
		})
		// 暴露到template中
		return {
			count,
			object,
		}
	},
	data() {
		return {
			dialogPackDialog: false,
			dialogCouponVisible: false,
			activeName: 'first',
			dialogVisible: false,
			dialogFormVisible: false,
			queryData: {
				divisionId: 'CN^^^浙江省^^^杭州市',
				id: '',
				name: '',
			},
			queryDataParams: {
				// divisionId: 'CN^^^浙江省^^^杭州市',
				id: '',
				title: '',
			},
			total: 0,
			pageNum: 1,
			pageSize: 20,
			type: 'add',
			// activeName: 'first',
			tableData: [],
			divisionList: divisionList,
			packTableData: [],
		}
	},
	components: {
		noDataComponent,
		sendCouponDialog,
		addCouponPack,
		sendCouponPackDialog,
	},
	computed: {},
	mounted() {
		this.getCouponsList(1)
	},
	methods: {
		//新增优惠券
		addCoupon() {
			this.$router.push({
				name: 'editCoupon',
				query: {
					type: 'add',
				},
			})
		},
		editCoupon(row) {
			this.$router.push({
				name: 'editCoupon',
				query: {
					type: 'edit',
					id: row.id,
				},
			})
		},
		returnDivision(divisionId) {
			let str = ''
			this.divisionList.map((item) => {
				if (item.value == divisionId) {
					str = item.label
					return str
				}
			})
			return str
		},
		resetSearch() {
			this.queryData.id = ''
			this.queryData.name = ''
			this.getCouponsList(1)
		},
		handleSizeChange(val) {
			this.pageSize = val
			if (this.activeName == 'first') {
				this.getCouponsList(1)
			} else {
				this.getCouponPackList(1)
			}
		},
		handleCurrentChange(val) {
			this.pageNum = val
			if (this.activeName == 'first') {
				this.getCouponsList(0)
			} else {
				this.getCouponPackList(0)
			}
		},
		getCouponsList(type) {
			if (type == 1) {
				this.pageNum = 1
			}
			if (this.queryData.id) {
				this.queryData.id = Number(this.queryData.id)
			}
			this.queryData.pageNum = this.pageNum
			this.queryData.pageSize = this.pageSize
			getCoupons(this.filterData(this.queryData))
				.then((response) => {
					if (response) {
						this.tableData = response.data
						this.total = response.total
					}
				})
				.catch((error) => {})
		},
		sendCoupon() {
			this.dialogVisible = true
		},
		confirmCouponDialog() {
			this.dialogVisible = false
			this.getCouponsList(1)
		},
		handleClick(event) {
			if (event.props.name == 'second') {
				this.getCouponPackList(1)
			} else {
				this.getCouponsList(1)
			}
		},
		resetSearchParmas() {
			this.queryDataParams.id = ''
			this.queryDataParams.title = ''
			this.getCouponPackList(1)
		},
		//获得券包列表
		getCouponPackList(type) {
			if (type == 1) {
				this.pageNum = 1
			}
			this.queryDataParams.pageNum = this.pageNum
			this.queryDataParams.pageSize = this.pageSize
			couponPackList(this.filterData(this.queryDataParams)).then(
				(response) => {
					if (response) {
						this.packTableData = response.data
						this.total = response.total
						this.$refs[
							'addCouponPack'
						].couponPackForm.packDetailList = [
							{
								couponId: '',
								num: 1,
							},
						]
					}
				}
			)
		},
		editCouponPack(data) {
			getPack({
				couponPackId: data.id,
			})
				.then((res) => {
					if (res) {
						this.dialogCouponVisible = true
						this.$nextTick(function () {
							this.$refs['addCouponPack'].couponPackForm.id =
								res.data.id
							this.$refs['addCouponPack'].couponPackForm.title =
								res.data.title
							this.$refs[
								'addCouponPack'
							].couponPackForm.packDetailList =
								res.data.packDetailList
							this.$refs[
								'addCouponPack'
							].couponPackForm.description = res.data.description
						})
					}
				})
				.catch((error) => {})
		},
		addCouponPackDialog() {
			this.dialogCouponVisible = true
		},
		sendCouponPack() {
			this.dialogPackDialog = true
		},
		handleClose() {
			this.dialogPackDialog = false
		},
		deleteCouponPack(data) {
			this.$confirm('是否删除该券包, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					disablePack({
						couponPackId: data.id,
					})
						.then((response) => {
							this.$message.success('删除成功')
							this.getCouponPackList(1)
						})
						.catche((error) => {})
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除',
					})
				})
		},
		confirmForm() {
			this.dialogCouponVisible = false
			this.getCouponPackList(1)
		},
	},
}
</script>

<style lang="scss" scoped>
.coupon_list {
	width: 100%;
	height: 100%;
	.coupon_list_header {
		background-color: #fff;
		padding: 10px;
		box-sizing: border-box;
		.el-form-item {
			margin-bottom: 10px;
		}
	}
	.main-content-wrapper {
		background-color: #fff;
		margin-top: 10px;
		display: flex;
		flex-direction: column;
		overflow: scroll;
		.product-header {
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid #ddd;
			align-items: center;
			padding: 10px;
			// margin-bottom: 10px;
		}
		.table-detail {
			height: 100%;
			.el-table {
				flex: 1;
			}
		}
	}
	:deep().el-popover {
		width: auto !important;
	}
	.image-box {
		height: 70px;
		width: 70px;
	}
	.block-right {
		height: 70px;
	}
	.table-opreator {
		color: #409eff;
		margin-left: 10px;
		cursor: pointer;
		&-delete {
			color: #f56c6c;
			cursor: pointer;
		}
	}
}
</style>
