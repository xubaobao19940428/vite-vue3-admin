<!--  -->
<template>
	<div class="settle_shop app-container">
		<el-tabs v-model="activeName" type="card" @tab-click="tabChange">
			<el-tab-pane label="已结算" name="1"></el-tab-pane>
			<el-tab-pane label="未结算" name="2"></el-tab-pane>
		</el-tabs>
		<div class="settle_shop-header">
			<el-form
				:inline="true"
				:model="queryData"
				class="demo-form-inline"
				size="medium"
				label-width="120px"
			>
				<!-- <el-form-item label="店铺名："> -->
				<el-form-item label="适用商家/店铺：" class="filter-item">
					<el-select
						v-model="queryData.sellerId"
						size="medium"
						clearable
						style="width: 100px"
						@change="changeSupplier"
					>
						<el-option
							v-for="(item, index) in supplierList"
							:key="index"
							:label="item.name"
							:value="item.id"
						></el-option>
					</el-select>
					<el-select
						v-model="queryData.shopId"
						size="medium"
						clearable
						style="width: 150px"
						placeholder="请选择店铺"
					>
						<el-option
							v-for="(item, index) in shopList"
							:key="index"
							:label="item.name"
							:value="item.id"
						></el-option>
					</el-select>
				</el-form-item>
				<!-- <el-input v-model="queryData.title" placeholder="请输入店铺名" clearable></el-input>
                </el-form-item> -->
				<el-form-item label="时间：">
					<el-date-picker
						v-model="timeList"
						type="daterange"
						:clearable="false"
						range-separator="-"
						start-placeholder="开始时间"
						end-placeholder="结束时间"
						:default-time="defaultTime2"
						format="YYYY-MM-DD HH:mm:ss"
						value-format="YYYY-MM-DD HH:mm:ss"
					></el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="search">搜索</el-button>
					<el-button type="info" @click="resetSearch">重置</el-button>
				</el-form-item>
			</el-form>
			<div class="settle_shop_detail">
				<!-- <div class="settle_shop_detail_left">
                    <el-button type="success" size="small">批量结算</el-button>
                    <span>总收入：{{ 0 }}</span>
                    <span>已消费：{{ 0 }}</span>
                    <span>已结算：{{ 0 }}</span>
                    <span>选中已结算：{{ 0 }}</span>
                    <span>未结算：{{ 0 }}</span>
                    <span>选中未结算：{{ 0 }}</span>
                </div> -->
				<!-- <el-button type="primary" size="small" icon="el-icon-download" plain>导出</el-button> -->
			</div>
		</div>
		<div class="main-content-wrapper">
			<div class="table-detail" v-if="activeName == 1">
				<el-table
					:data="clearTableData"
					ref="multipleTable"
					border
					stripe
					style="width: 100%"
					height="100%"
				>
					<el-table-column label="商家" align="center">
						<template #default="scope">
							<span v-if="scope.row.seller">{{
								scope.row.seller.name
							}}</span>
						</template>
					</el-table-column>
					<el-table-column label="消费店铺" align="center">
						<template #default="scope">
							<span v-if="scope.row.shop">{{
								scope.row.shop.name
							}}</span>
						</template>
					</el-table-column>
					<el-table-column label="结算时间" align="center">
						<template #default="scope">
							<span>{{
								timestampToTime(scope.row.updateTime)
							}}</span>
						</template>
					</el-table-column>
					<el-table-column label="结算金额" align="center">
						<template #default="scope">
							<div class="flex flex-item--center">
								<el-popover
									placement="top-start"
									trigger="hover"
									v-if="scope.row.receiptImg"
								>
									<img
										:src="scope.row.receiptImg"
										class="previewImage"
									/>
									<template #reference>
										<img
											:src="scope.row.receiptImg"
											class="image-box"
										/>
									</template>
								</el-popover>
								<div style="margin-left: 10px">
									{{ '¥' + scope.row.originalAmount }}
								</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column
						label="到账金额"
						align="center"
						prop="discountedAmount"
					>
						<template #default="scope">
							<div>
								{{ '¥' + scope.row.discountedAmount }}
							</div>
						</template>
					</el-table-column>
					<el-table-column
						label="费率"
						align="center"
						prop="clearRate"
					></el-table-column>
					<!-- <el-table-column label="结算人员" align="center" prop="stock"></el-table-column> -->
					<el-table-column label="操作" align="center">
						<template #default="scope">
							<span
								class="table-opreator"
								@click="viewOrder(scope.row)"
								>查看订单</span
							>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="table-detail" v-else>
				<el-table
					:data="
						notClearTableData.slice(
							(queryData.pageNum - 1) * queryData.pageSize,
							queryData.pageNum * queryData.pageSize
						)
					"
					ref="multipleTable"
					border
					stripe
					style="width: 100%"
					height="100%"
				>
					<el-table-column label="商家" align="center">
						<template #default="scope">
							<span v-if="scope.row.seller">{{
								scope.row.seller.name
							}}</span>
						</template>
					</el-table-column>
					<el-table-column label="消费店铺" align="center">
						<template #default="scope">
							<span v-if="scope.row.shop">{{
								scope.row.shop.name
							}}</span>
						</template>
					</el-table-column>
					<el-table-column
						label="待结算金额"
						align="center"
						prop="notClearAmount"
					></el-table-column>
					<el-table-column
						label="待结算订单数"
						align="center"
						prop="notClearCount"
					></el-table-column>
					<el-table-column
						label="已结算金额"
						align="center"
						prop="clearAmount"
					></el-table-column>
					<el-table-column
						label="已结算订单数"
						align="center"
						prop="clearCount"
					></el-table-column>
					<el-table-column label="是否结算" align="center">
						<template #default="scope">
							<span
								class="table-opreator"
								@click="clearShopAccount(scope.row)"
								>结算</span
							>
						</template>
					</el-table-column>
					<!-- <el-table-column label="结算人员" align="center">
                        <template #default="scope">
                            <span>--</span>
                        </template>
                    </el-table-column> -->

					<el-table-column label="操作" align="center">
						<template #default="scope">
							<span
								class="table-opreator"
								@click="viewNotClearOrder(scope.row)"
								>查看订单</span
							>
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
				:page-size="queryData.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
			></el-pagination>
		</div>
		<shop-accounts-dialog
			ref="shopAccountDialog"
			:dialogFormVisible="dialogFormVisible"
			:startTime="queryData.startTime"
			:endTime="queryData.endTime"
			@close-dialog="closeDialog"
			@confirm-success="confirmSuccess"
		></shop-accounts-dialog>
	</div>
</template>

<script>
import { ref, reactive } from 'vue'
import noDataComponent from '@/components/noDataComponent/index.vue'
import shopAccountsDialog from './components/shopAccountsDialog.vue'
import { getSellers, getShops } from '@/api/newJson/shop'
import { clearsShop, accountsShop } from '@/api/newJson/account.js'
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
		// 暴露到template中
		return {
			count,
			object,
			defaultTime2,
		}
	},
	data() {
		return {
			dialogFormVisible: false,
			activeName: '1',
			timeList: [],
			shopList: [],
			supplierList: [],

			queryData: {
				sellerId: '',
				shopId: '',
				startTime: '',
				endTime: '',
				timeType: 3,
				pageNum: 1,
				pageSize: 20,
			},
			total: 0,
			// activeName: 'first',
			tableData: [],
			clearTableData: [],
			notClearTableData: [],
			multipleSelection: [],
		}
	},
	components: {
		noDataComponent,
		shopAccountsDialog,
	},
	computed: {
		nowEnd() {
			return this.timestampToTime(this.$store.state.globalNum.nowEnd)
		},
		lastMonth() {
			return this.timestampToTime(this.$store.state.globalNum.lastMonth)
		},
	},
	mounted() {
		if (this.$route.query.sellerId) {
			this.queryData.sellerId = Number(this.$route.query.sellerId)
		}
		this.timeList = [this.lastMonth, this.nowEnd]
		this.getClearShop(1)
		this.getSellersList()
	},
	methods: {
		//得到结算列表
		getClearShop(type) {
			if (type == 1) {
				this.queryData.pageNum = 1
			}
			if (this.timeList && this.timeList.length) {
				this.queryData.startTime = this.timeList[0]
				this.queryData.endTime = this.timeList[1]
			}
			clearsShop(this.filterData(this.queryData))
				.then((response) => {
					if (response.data) {
						this.clearTableData = response.data.data
						this.total = response.data.total
					}
				})
				.catch((error) => {})
		},
		//未结算
		getAccountsShop(type) {
			if (type == 1) {
				this.queryData.pageNum = 1
			}
			if (this.timeList && this.timeList.length) {
				this.queryData.startTime = this.timeList[0]
				this.queryData.endTime = this.timeList[1]
			}
			accountsShop(this.filterData(this.queryData))
				.then((response) => {
					if (response) {
						this.notClearTableData = response.data
						this.total = response.data.length
					}
				})
				.catch((error) => {})
		},
		tabChange(val) {
			if (this.activeName == 2) {
				this.getAccountsShop(1)
			} else {
				this.getClearShop(1)
			}
		},
		confirmSuccess() {
			this.dialogFormVisible = false
			this.getAccountsShop(1)
		},
		search() {
			if (this.activeName == 2) {
				this.getAccountsShop(1)
			} else {
				this.getClearShop(1)
			}
		},
		//获得全部店铺
		getSellersList() {
			getSellers({
				pageSize: 1000,
				pageNum: 1,
			})
				.then((response) => {
					this.supplierList = response.data.data
				})
				.catch((error) => {})
		},
		resetSearch() {
			this.queryData.sellerId = ''
			this.queryData.shopId = ''
			this.search()
		},
		closeDialog() {
			this.dialogFormVisible = false
		},
		handleSizeChange(val) {
			this.queryData.pageSize = val
			this.queryData.pageNum = 1
			if (this.activeName == 1) {
				this.getClearShop()
			}
		},
		handleCurrentChange(val) {
			this.queryData.pageNum = val
			if (this.activeName == 1) {
				this.getClearShop()
			}
		},
		viewOrder(row) {
			this.$router.push({
				name: 'settleShopOrder',
				query: {
					clearId: row.id,
				},
			})
		},
		//查看未结算订单
		viewNotClearOrder(row) {
			this.$router.push({
				name: 'settleShopOrder',
				query: {
					shopId: row.shopId,
					sellerId: row.sellerId,
					startTime: this.queryData.startTime.substr(0, 10),
					endTime: this.queryData.endTime.substr(0, 10),
				},
			})
		},
		changeSupplier(val) {
			if (val) {
				getShops({
					sellerId: val,
				})
					.then((response) => {
						if (response) {
							this.shopList = response.data.data
							this.queryData.shopId = ''
						}
					})
					.catch((error) => {})
			}
		},
		//结算
		clearShopAccount(row) {
			this.$refs['shopAccountDialog'].form.notClearAmount =
				row.notClearAmount
			this.$refs['shopAccountDialog'].form.bankCardNo =
				row.shop.bankCardNo
			this.$refs['shopAccountDialog'].form.bankName = row.shop.bankName
			this.$refs['shopAccountDialog'].form.bankPersonalName =
				row.shop.bankPersonalName
			this.$refs['shopAccountDialog'].form.shopId = row.shopId
			this.$refs['shopAccountDialog'].form.sellerId = row.sellerId
			this.dialogFormVisible = true
		},
		// handleSelectionChange(val) {
		//     this.multipleSelection = val;
		// },
	},
}
</script>

<style lang="scss" scoped>
.settle_shop {
	width: 100%;
	height: 100%;
	.el-tabs {
		background-color: #fff;
		margin-bottom: 10px;
		padding-top: 10px;
		box-sizing: border-box;
	}
	.settle_shop-header {
		background-color: #fff;
		padding: 0 10px 10px;
		box-sizing: border-box;
		.demo-form-inline {
			margin-top: 20px;
		}
		.el-form-item {
			margin-bottom: 10px;
		}
		.settle_shop_detail {
			display: flex;
			justify-content: flex-end;
			.settle_shop_detail_left {
				span {
					margin-left: 40px;
					font-size: 14px;
					font-weight: 500;
				}
			}
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
	.block-right {
		height: 70px;
	}
	.table-opreator {
		color: #409eff;
		margin-left: 10px;
		cursor: pointer;
	}
}
</style>
