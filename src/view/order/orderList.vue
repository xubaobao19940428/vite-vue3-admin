<!--  -->
<template>
	<div class="product_list app-container">
		<div class="main-content-tab-box">
			<div class="tab-l">
				<el-tabs v-model="activeName" @tab-click="searchOrderList(1)">
					<el-tab-pane label="全部订单" :name="-1"></el-tab-pane>
					<el-tab-pane
						v-for="(item, key) in orderStatusEnum"
						:key="key"
						:label="item"
						:name="key"
					></el-tab-pane>
				</el-tabs>
				<!-- <el-button :class="['search-btn', 'mar-l-10', showSearchParam ? 'active' : '']" icon="el-icon-search" size="small"
                           @click="showSearchParam = !showSearchParam">搜索</el-button> -->
			</div>
		</div>
		<div class="product-list-header">
			<el-form :inline="true" :model="queryData" class="demo-form-inline">
				<el-form-item label="适用商家：" class="filter-item">
					<el-select
						v-model="queryData.sellerId"
						size="medium"
						clearable
					>
						<el-option
							v-for="(item, index) in supplierList"
							:key="index"
							:label="item.name"
							:value="item.id"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="订单编号：">
					<el-input
						v-model="queryData.orderId"
						placeholder="订单编号"
					></el-input>
				</el-form-item>
				<el-form-item label="用户Id：">
					<el-input
						v-model="queryData.userId"
						placeholder="用户Id"
					></el-input>
				</el-form-item>
				<!-- <el-form-item label="商品标题:">
                    <el-input v-model="queryData.productTitle" placeholder="商品标题"></el-input>
                </el-form-item>
                <el-form-item label="用户手机号:">
                    <el-input v-model="queryData.user" placeholder="用户手机号"></el-input>
                </el-form-item> -->
				<!-- <el-form-item :label="getLocalUseLangData('8000076') + ':'">
                    <el-select v-model="queryData.status" :placeholder="getLocalUseLangData('8000076')">
                        <el-option :label="getLocalUseLangData('9000044')" :value="0"></el-option>
                        <el-option :label="getLocalUseLangData('8000002')" :value="1"></el-option>
                        <el-option :label="getLocalUseLangData('8000004')" :value="2"></el-option>
                        <el-option :label="getLocalUseLangData('9000046')" :value="3"></el-option>
                        <el-option :label="getLocalUseLangData('8000094')" :value="4"></el-option>
                        <el-option :label="getLocalUseLangData('8000095')" :value="5"></el-option>
                    </el-select>
                </el-form-item> -->
				<el-form-item label="订单时间：">
					<el-date-picker
						v-model="timeList"
						type="daterange"
						range-separator="-"
						@change="changeTimeList"
						start-placeholder="开始时间"
						end-placeholder="结束时间"
						:default-time="defaultTime2"
						format="YYYY-MM-DD HH:mm:ss"
						value-format="YYYY-MM-DD HH:mm:ss"
					></el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="searchOrderList(1)"
						>查询</el-button
					>
					<el-button type="primary" @click="exportOrder"
						>导出订单</el-button
					>
				</el-form-item>
			</el-form>
		</div>
		<div class="main-content-wrapper">
			<div class="table-detail" v-if="tableData.length">
				<div class="order_list_table_header">
					<div class="order_title" style="width: 300px">商家信息</div>
					<div class="order_title" style="width: 300px">商品信息</div>
					<div class="order_title" style="width: 300px">
						单价/数量
					</div>
					<div class="order_title" style="width: 200px">买家信息</div>
					<!-- <div class="order_title" style="width:200px">
                        时收款
                    </div> -->
					<!-- <div class="order_title" style="width:300px">
                       买家沟通
                    </div> -->
					<div class="order_title" style="width: 300px">订单状态</div>
					<div class="order_title">操作</div>
				</div>
				<div
					class="el-table"
					style="overflow: scroll"
					v-if="tableData.length"
				>
					<div
						class="order_list_data"
						v-for="(item, index) in tableData"
						:key="index"
					>
						<div
							class="order_data order_data_shop"
							style="width: 300px"
						>
							{{ item.shopName }}
						</div>
						<div class="order_data_first_chld">
							<!-- <el-tag size="danger" v-if="item.deliveryType == 1">{{ getLocalUseLangData('8000145') }}</el-tag>
                            <el-tag size="small" v-else>{{ getLocalUseLangData('8000085') }}</el-tag> -->
							<span
								class="order_data_first_chld_span_1"
								style="margin-left: 20px"
								>订单Id：{{ item.orderId }}</span
							>
							<span
								class="order_data_first_chld_span_2"
								style="margin-left: 20px"
								>下单时间：{{
									timestampToTime(item.orderTime)
								}}</span
							>
						</div>
						<div class="order_1 order_data" style="width: 300px">
							<div class="order_1_detail">
								<img
									:src="dealShowFileSrc(item.cover)"
									alt=""
								/>
								<div>
									<!-- <span>skuID：{{ product.skuId }}</span> -->
									<p class="product-title">
										商品名称：{{ item.title }}
									</p>
									<!-- <span v-if="product.skuAttr">
                                        <span v-for="(attr, index) in JSON.parse(product.skuAttr)" :key="index">
                                            <span>{{ attr.name }}:{{ attr.value }}</span>
                                        </span>
                                    </span> -->
								</div>
							</div>
						</div>
						<div class="order_2 order_data" style="width: 300px">
							<div class="order_2_num">
								<div class="order_2_detail">
									<p>{{ '¥' + ' ' + item.realPrice }}</p>
									<p>x{{ item.num }}</p>
								</div>
							</div>
						</div>
						<div class="order_3 order_data" style="width: 200px">
							<div>用户ID:{{ item.userId }}</div>
							<router-link
								target="_blank"
								:to="{
									name: 'memberInfo',
									query: { userId: item.userId },
								}"
							>
								<el-button type="text" size="">{{
									item.userNick ? item.userNick : item.userId
								}}</el-button>
							</router-link>
						</div>
						<!--时收款-->
						<!-- <div class="order_4 order_data" style="width:200px">
                            <div class="order-price">{{ item.currencySymbol + ' ' + item.payAmount }}</div>
                            <div class="order-feight">{{ getLocalUseLangData('8000086') }}：{{ item.currencySymbol + ' ' + item.feight }}</div>
                        </div> -->
						<div class="order_5 order_data" style="width: 300px">
							<div class="order_status">
								<el-tag
									v-if="item.status == 0"
									size="small"
									type="info"
									>待付款</el-tag
								>
								<el-tag v-if="item.status == 1" size="small"
									>待使用(已付款)</el-tag
								>
								<el-tag
									v-else-if="item.status == 2"
									size="small"
									type="success"
									>已使用(已核销)</el-tag
								>
								<el-tag
									v-else-if="item.status == 3"
									size="small"
									type="danger"
									>用户取消</el-tag
								>
								<!-- <span v-else-if="item.status == 6">用户取消</span> -->
							</div>
						</div>
						<div class="order_data order_operator">
							<el-button
								plain
								size="small"
								type="primary"
								@click="viewOrderDetail(item)"
								>查看详情</el-button
							>
							<el-button
								plain
								size="small"
								type="primary"
								@click="cancelOrder(item)"
								v-if="item.status == 1"
								style="margin-top: 10px; margin-left: 0"
							>
								取消订单
							</el-button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="pagination-box">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:page-sizes="[10, 20, 50, 100]"
				:page-size="queryData.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
			></el-pagination>
		</div>
		<!-- <remark-dialog
			:remarkDialogVisible="remarkDialogVisible"
			:remarkForm="remarkForm"
			@confrim-remark="confirmRemark"
			@close-remark-dilaog="closeRemarkDialog"
		></remark-dialog> -->
	</div>
</template>

<script>
import { ref, reactive } from 'vue'
import {
	orderList,
	cancelOrderDetail,
	downOrderInfo,
} from '@/api/newJson/order'
import { getSellers, getShops } from '@/api/newJson/shop'
// import remarkDialog from './components/remarkDialog.vue'
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
			activeName: -1,
			orderStatusEnum: {
				0: '待付款',
				1: '待使用',
				2: '已使用',
				3: '取消订单',
			},
			remarkDialogVisible: false,
			queryData: {
				pageNum: 1,
				pageSize: 20,
				orderId: '',
				startDate: '',
				endDate: '',
				statusList: [],
				sellerId: '',
				shopId: '',
				startTime: '',
				endTime: '',
				userId: '',
				// productTitle: '',
			},
			tableData: [],
			total: 0,
			remarkForm: {
				remarkBack: '',
				orderId: '',
			},
			supplierList: [],
			shopList: [],
		}
	},
	computed: {},
	mounted() {
		if (this.$route.query.status) {
			this.queryData.status = Number(this.$route.query.status)
		}
		if (this.$route.query.sellerId) {
			this.queryData.sellerId = Number(this.$route.query.sellerId)
		}
		if (this.$route.query.userId) {
			this.queryData.userId = Number(this.$route.query.userId)
		}
		this.searchOrderList(1)
		this.getSellersList({
			pageNum: 1,
			pageSize: 1000,
		})
	},
	methods: {
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
		searchOrderList(type) {
			if (type == 1) {
				this.queryData.pageNum = 1
			}
			if (this.timeList && this.timeList.length) {
				this.queryData.startTime = this.timeList[0]
				this.queryData.endTime = this.timeList[1]
			}
			this.queryData.statusList =
				this.activeName == -1 ? [0, 1, 2, 3] : [this.activeName]
			orderList(this.filterData(this.queryData))
				.then((response) => {
					if (response.data) {
						this.total = response.total
						this.tableData = response.data
					}
				})
				.catch((error) => {})
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
		changeTimeList(val) {
			console.log(val)
		},
		handleSizeChange(val) {
			this.queryData.pageSize = val
			this.searchOrderList()
		},
		handleCurrentChange(val) {
			this.queryData.pageNum = val
			this.searchOrderList()
		},
		exportOrder() {
			if (this.timeList && this.timeList.length) {
				this.queryData.startTime = this.timeList[0]
				this.queryData.endTime = this.timeList[1]
			}
			this.queryData.statusList =
				this.activeName == -1 ? [0, 1, 2, 3] : [this.activeName]
			downOrderInfo(this.filterData(this.queryData))
				.then((response) => {
					if (response.data) {
						this.$message.success('导出成功,请前往文件中心下载')
					}
				})
				.catch((error) => {})
		},
		viewOrderDetail(item) {
			this.$router.push({
				name: 'orderDetail',
				query: {
					orderId: item.orderId,
				},
			})
		},
		//取消订单
		cancelOrder(orderInfo) {
			this.$confirm('此操作将取消改订单, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					cancelOrderDetail({ orderId: orderInfo.orderId }).then(
						(res) => {
							if (res) {
								this.$message.success('取消成功')
								this.searchOrderList()
							}
						}
					)
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消',
					})
				})
		},
	},
}
</script>

<style lang="scss" scoped>
.product_list {
	width: 100%;
	height: 100%;
	.product-list-header {
		background-color: #fff;
		padding: 0 10px;
		.demo-form-inline {
			margin-top: 20px;
		}
	}
	.main-content-wrapper {
		overflow-y: hidden;
		overflow-x: scroll;
		background-color: #fff;
		margin-top: 10px;
		display: flex;
		flex-direction: column;
		::-webkit-scrollbar {
			display: none; /* Chrome Safari */
		}
		.table-detail {
			height: 100%;
			overflow: hidden;
			display: flex;
			flex-direction: column;
			min-width: 1600px;
			.order_list_table_header {
				min-width: 100%;
				display: flex;
				position: relative;
				height: 40px;
				line-height: 40px;
				background: #f5f7fa;
				color: #606266;
				overflow: scroll;
				.order_title {
					font-weight: 600;
					text-align: center;
					&:last-child {
						flex: 1;
					}
				}
			}
			.el-table {
				&::before {
					height: 0;
				}
			}
			.order_list_data {
				width: 100%;
				display: flex;
				position: relative;
				border-bottom: 1px solid #ddd;
				.order_data_first_chld {
					position: absolute;
					width: 100%;
					height: 40px;
					padding-left: 10px;
					box-sizing: border-box;
					background: #fafbfc;
					border-right: 1px solid #ddd;
					display: flex;
					align-items: center;
					font-weight: 500;
					color: #333;
					border-bottom: 1px solid #ddd;
					.order_data_first_chld_span_1 {
						width: 570px;
						border-right: 1px solid #ddd;
					}
				}
				.order_data {
					padding: 20px 10px;
					box-sizing: border-box;
					text-align: center;
					margin-top: 40px;
					border-right: 1px solid #ddd;
					&:last-child {
						flex: 1;
					}
					&.order_data_shop {
						display: flex;
						justify-content: center;
						align-items: center;
					}
					&.order_operator {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						.el-button {
							display: block;
						}
					}
					&.order_1 {
						display: flex;
						flex-direction: column;
						margin-bottom: 10px;
						.order_1_detail {
							display: flex;
							img {
								width: 80px;
								height: 80px;
								margin-right: 10px;
							}
							div {
								text-align: left;
								p {
									margin-bottom: 10px;
								}
							}
						}
					}
					&.order_2 {
						.order_2_detail {
							p {
								margin-bottom: 10px;
							}
						}
					}
					&.order_4 {
						text-align: left;
						.order-price {
							margin-bottom: 10px;
							font-weight: 900;
							font-size: 16px;
						}
					}
					&.order_6 {
						.order_status {
							font-size: 16px;
							font-weight: 900;
							margin-bottom: 20px;
						}
					}
					&.order_5 {
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}
			}
		}
	}
	:deep() .el-range-separator {
		width: 20px;
	}
}
</style>
