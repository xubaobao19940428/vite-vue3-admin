<template>
    <div class="app-container">
        <div class="filter-container">
            <el-form ref="afterSaleOrderFilter"
                     inline
                     :model="queryData"
                     label-position="left">
                <el-form-item label="订单号："
                              prop="orderId"
                              class="filter-item">
                    <el-input v-model="queryData.orderId"
                              clearable
                              placeholder="请输入订单号"
                              size="medium"
                              style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item label="商家："
                              class="filter-item"
                              prop="supplierName">
                    <el-select v-model="queryData.sellerId"
                               size="medium"
                               clearable>
                        <el-option v-for="(item, index) in supplierList"
                                   :key="index"
                                   :label="item.name"
                                   :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <!-- <span v-show="drop"> -->
                <!-- <el-form-item label="商品名称：" prop="productName" class="filter-item">
                    <el-input v-model="queryData.productName" clearable placeholder="请输入商品名称" size="medium"></el-input>
                </el-form-item> -->
                <el-form-item label="微信支付单号："
                              prop="transactionId"
                              class="filter-item">
                    <el-input v-model="queryData.transactionId"
                              clearable
                              placeholder="请输入微信支付单号"
                              size="medium"></el-input>
                </el-form-item>
                <!-- <el-form-item label="收货人手机号：" prop="receiverPhone" class="filter-item">
                    <el-input v-model="queryData.receiverPhone" clearable placeholder="请输入收货人手机号" size="medium"></el-input>
                </el-form-item> -->
                <!-- <el-form-item label="订单状态：" prop="status" class="filter-item">
                    <el-select v-model="queryData.status" clearable size="medium">
                        <el-option v-for="(item, key) in afterStatusList" :key="key" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item> -->
                <!-- </span> -->
                <el-form-item label="售后时间："
                              prop="timeList"
                              class="filter-item">
                    <el-date-picker v-model="timeList"
                                    type="daterange"
                                    start-placeholder="开始时间"
                                    end-placeholder="结束时间"
                                    :default-time="defaultTime2"
                                    range-separator="-"
                                    format="YYYY-MM-DD HH:mm:ss"
                                    value-format="YYYY-MM-DD HH:mm:ss"></el-date-picker>
                </el-form-item>
                <el-form-item class="filter-item"
                              style="margin-left: 20px;">
                    <el-button icon="el-icon-search"
                               type="primary"
                               @click="search"
                               size="medium">搜索</el-button>
                    <el-button icon="el-icon-refresh-left"
                               @click="resetSearch"
                               size="medium">重置</el-button>
                    <!-- <el-button
                        icon="el-icon-download"
                        v-if="hasPermission('BTN_AFTER_SALE_ORDER_EXPORT')"
                        plain
                        type="primary"
                        size="medium"
                        @click="clickToExportOrder"
                    >
                        导出
                    </el-button> -->
                    <!-- <span style="margin-left: 20px;" type="primary" :underline="false" @click="dropDown">
                        {{ dropDownContent }}
                        <i :class="dropDownIcon"></i>
                    </span> -->
                </el-form-item>
            </el-form>
        </div>
        <div class="tabs_list">
            <el-tabs v-model="activeName"
                     @tab-click="handleClick">
                <el-tab-pane label="申请退款"
                             name="APPLY"></el-tab-pane>
                <el-tab-pane label="已同意"
                             name="SUCCESS"></el-tab-pane>
                <el-tab-pane label="已撤销"
                             name="CLOSED"></el-tab-pane>
                <el-tab-pane label="已拒绝"
                             name="REJECT"></el-tab-pane>
            </el-tabs>
        </div>
        <div class="main-content-wrapper">
            <el-table :data="orderList"
                      height="100%"
                      border>
                <el-table-column fixed="left"
                                 label="退款单号"
                                 align="center"
                                 prop="outRefundNo"
                                 width="180px"></el-table-column>
                <el-table-column fixed="left"
                                 label="订单号"
                                 align="center"
                                 prop="outTradeNo"
                                 width="180px">
                    <template #default="scope">
                        <router-link target="_blank"
                                     :to="{ name: 'orderDetail', query: { orderId: scope.row.outTradeNo } }">
                            <el-button type="text"
                                       size="mini">{{scope.row.outTradeNo}}</el-button>
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column label="微信支付单号"
                                 align="center"
                                 prop="transactionId"
                                 width="180px"></el-table-column>
                <el-table-column label="微信退款单号"
                                 align="center"
                                 prop="refundId"
                                 width="180px"></el-table-column>
                <el-table-column label="平台"
                                 align="center"
                                 width="120px"
                                 prop="platform"></el-table-column>
                <el-table-column label="商家"
                                 align="center"
                                 prop="sellerName"
                                 width="180px"></el-table-column>
                <el-table-column label="申请退款金额"
                                 align="center"
                                 prop="applyAmount"
                                 width="180px"></el-table-column>
                <el-table-column label="用户Id"
                                 align="center"
                                 prop="userId"
                                 width="180px">
                    <template #default="scope">
                        <router-link target="_blank"
                                     :to="{ name: 'memberInfo', query: { userId: scope.row.userId } }">
                            <el-button type="text"
                                       size="mini">{{scope.row.userNick?scope.row.userNick:scope.row.userId}}</el-button>
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column label="退款原因"
                                 align="center"
                                 prop="applyRemark"
                                 width="180px"></el-table-column>
                <el-table-column label="退款状态"
                                 align="center"
                                 width="180px">
                    <template #default="scope">
                        <el-button type="primary"
                                   size="mini"
                                   @click="agreeRefund(scope.row)"
                                   v-if="scope.row.status == 'APPLY'">同意退款</el-button>
                        <el-button type=""
                                   size="mini"
                                   @click="rejectRefund(scope.row)"
                                   v-if="scope.row.status == 'APPLY'">拒绝退款</el-button>
                        <el-tag size="small"
                                type="success"
                                v-if="scope.row.status == 'SUCCESS'">退款成功</el-tag>
                        <el-tag size="small"
                                type="danger"
                                v-if="scope.row.status == 'REJECT'">拒绝退款</el-tag>
                        <el-tag size="small"
                                type="danger"
                                v-else-if="scope.row.status == 'CLOSED'">退款关闭</el-tag>
                        <!--<el-tag size="small" type="primary" v-else-if="scope.row.status == 'PROCESSING'">退款处理中</el-tag>
                        <el-tag size="small" type="warning" v-else-if="scope.row.status == 'ABNORMAL'">退款异常</el-tag> -->
                    </template>
                </el-table-column>
                <el-table-column label="拒绝原因"
                                 align="center"
                                 prop="sellerRemark"
                                 width="180px"
                                 v-if="activeName == 'REJECT'"></el-table-column>
                <el-table-column label="操作人"
                                 align="center"
                                 width="180px"
                                 v-if="activeName != 'APPLY'"
                                 prop="auditUser"></el-table-column>
                <el-table-column label="创建时间"
                                 align="center"
                                 width="180px">
                    <template #default="scope">
                        <span>{{ timestampToTime(scope.row.createTime) }}</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column label="退款渠道" align="center" width="180px">
                    <template #default="scope">
                        <span v-if="scope.row.channel == 'ORIGINAL'">原路退回</span>
                        <span v-else-if="scope.row.channel == 'BALANCE'">退回余额</span>
                        <span v-else-if="scope.row.channel == 'OTHER_BALANCE'">账户异常退到其他余额账户</span>
                        <span v-else-if="scope.row.channel == 'OTHER_BANKCARD'">原银行卡异常退到其他银行卡</span>
                    </template>
                </el-table-column> -->
                <!-- <el-table-column label="退款成功时间" align="center" width="180px">
                    <template #default="scope">
                        <span v-if="scope.row.status == 'SUCCESS'">{{ timestampToTime(scope.row.successTime) }}</span>
                        <span v-else>--</span>
                    </template>
                </el-table-column> -->
            </el-table>
        </div>
        <div class="page-wrapper">
            <el-pagination @size-change="handleSizeChanges"
                           @current-change="handleCurrentChanges"
                           :current-page="queryData.pageNum"
                           :page-sizes="[10, 20, 30, 50]"
                           :page-size="queryData.pageSize"
                           layout="total, sizes, prev, pager, next"
                           :total="totals"></el-pagination>
        </div>
    </div>
</template>

<script>
// import imagePreview from '@/components/imagePreview'
// import { viewAfterList, handlerAfter, DownloadAfterSalePage } from '@/request/order'
import { getSellers } from '@/api/newJson/shop'
import { afterSaleOrder, refundAudit } from '@/api/newJson/order'
import { param } from '@/utils/index'
import { ref, reactive } from 'vue'
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
	name: 'afterSale',
	components: {},
	data() {
		return {
			activeName: 'APPLY',
			drop: false,
			dropDownContent: '展开',
			dropDownIcon: 'el-icon-arrow-down',
			title: '退款方式',
			show: false,
			orderList: [],
			supplierList: [],
			queryData: {
				orderId: '',
				transactionId: '',
				// productName: '',
				// userPhone: '',
				// receiverPhone: '',
				// prarentPhone: '',
				status: null,
				// timeList: [],
				startTime: '',
				endTime: '',
				pageNum: 1,
				pageSize: 20,
			},
			totals: 0,
			afterStatusList: [
				// {
				//     label: '审核中',
				//     value: 0,
				// },
				// {
				//     label: '审核通过',
				//     value: 1,
				// },
				{
					label: '退款成功',
					value: 'SUCCESS',
				},
				{
					label: '退款关闭',
					value: 'CLOSED',
				},
				{
					label: '退款处理中',
					value: 'PROCESSING',
				},
				{
					label: '退款异常',
					value: 'ABNORMAL',
				},
			],
			statusList: {
				REFUND_SUCCESS: '退款成功',
				REFUND_FAIL: '退款失败',
				REFUND_CANCEL: '取消退款',
				APPLY_REJECTED: '申请驳回',
				WAIT_REFUND: '退款中',
			},
			paywayList: {
				ARTIFICIAL_MONEY: '人工打款',
				INTEGRAL: '积分支付',
			},
			orderDetail: {},
			saleOrderDialogVisible: false,
			image: {
				show: false,
				index: 0,
				list: [],
			},
			param: {},
			afterId: '',
			applyRefund: '',
			rules: {
				amount: [
					{
						required: true,
						message: '请输入退款金额',
						trigger: 'blur',
					},
				],
			},
		}
	},

	created() {
		// this.timeList = [this.lastPartMonth, this.nowEnd];
		this.getAfterSaleOrderList()
		this.getSellersList({
			pageNum: 1,
			pageSize: 1000,
		})
	},
	methods: {
		dropDown() {
			if (this.drop) {
				this.dropDownContent = '展开'
				this.dropDownIcon = 'el-icon-arrow-down'
			} else {
				this.dropDownContent = '收起'
				this.dropDownIcon = 'el-icon-arrow-up'
			}
			this.drop = !this.drop
		},
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
		getAfterSaleOrderList(type) {
			if (type == 1) {
				this.queryData.pageNum = 1
			}
			if (this.timeList && this.timeList.length) {
				this.queryData.startTime = this.timeList[0]
				this.queryData.endTime = this.timeList[1]
			}
			let params = this.queryData
			params.statusList = [this.activeName]
			afterSaleOrder(this.filterData(params))
				.then((res) => {
					if (res) {
						this.totals = res.total
						this.orderList = res.data
					}
				})
				.catch((err) => {
					console.log(err)
				})
		},
		handleClick() {
			this.getAfterSaleOrderList(1)
		},
		handleSizeChanges(val) {
			this.queryData.pageSize = val
			this.getAfterSaleOrderList()
		},
		handleCurrentChanges(val) {
			this.queryData.pageNum = val
			this.getAfterSaleOrderList()
		},
		search() {
			this.queryData.pageNum = 1

			this.getAfterSaleOrderList(1)
		},
		resetSearch() {
			this.queryData.pageNum = 1
			this.queryData.pageSize = 20
			this.timeList = []
			this.queryData.orderId = ''
			this.queryData.transactionId = ''
			this.getAfterSaleOrderList()
		},
		clickToExportOrder() {
			if (!this.timeList || this.timeList.length !== 2) {
				this.$message({
					type: 'warning',
					message: '请选择导出日期范围',
				})
				return
			}
			let params = {
				id: this.queryData.orderId,
				startTime: this.timeList[0],
				endTime: this.timeList[1],
				page: this.queryData.page,
			}
			DownloadAfterSalePage(params).then((res) => {
				if (res.ret.errcode === 1) {
					window.open(`${res.url}`)
				}
			})
			// let href = `${process.env.VUE_APP_API}/manage/orders_manage/selledOrderExport?` + param(this.filterData(Object.assign(
			//     this.param, {
			//         startTime: this.timeList[0],
			//         endTime: this.timeList[1]
			//     }
			// )))
			// let a = document.createElement('a')
			// a.href = href
			// a.click()
		},
		async clickToRefusedOrder({ orderId, afterId }) {
			this.$confirm('确认拒绝售后?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				await this.handlerAfterRequest(orderId, afterId, 2)
			})
		},
		async clickToRejectOrder({ afterId }) {
			this.$confirm('确认驳回售后?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				await this.handlerAfterRequest(afterId, 3)
			})
		},
		//同意退款
		async agreeRefund(data) {
			this.$confirm('同意退款', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'success',
			})
				.then(async () => {
					refundAudit({
						outRefundNo: data.outRefundNo,
						audit: 'PROCESSING',
					})
						.then((response) => {
							if (response) {
								this.$message.success('已同意退款')
								this.getAfterSaleOrderList(1)
							}
						})
						.catch((error) => {})
				})
				.catch((error) => {
					console.log(error)
				})
		},
		//拒绝退款
		async rejectRefund(data) {
			this.$prompt('拒绝退款理由', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				inputType: 'textarea',
				inputPattern: /\S{5,}/,
				inputPlaceholder: '请输入退款理由',
				inputErrorMessage: '拒绝理由不能为空,最低五个字',
			})
				.then(({ value }) => {
					// this.$message({
					//     type: 'success',
					//     message: `Your email is:${value}`,
					// });
					refundAudit({
						outRefundNo: data.outRefundNo,
						audit: 'REJECT',
						sellerRemark: value,
					})
						.then((response) => {
							if (response) {
								this.$message.success('已拒绝退款')
								this.getAfterSaleOrderList(1)
							}
						})
						.catch((error) => {})
				})
				.catch(() => {
					// this.$message({
					//     type: 'info',
					//     message: '取消',
					// });
				})
		},
		/// /退款成功
		clickToResolveRefund() {
			this.$refs['Refund'].validate((valid) => {
				if (valid) {
					if (Number(this.param.amount) > Number(this.applyRefund)) {
						this.$message.warning('退款金额不能大于总金额！')
					} else {
						this.handlerAfterRequest(
							this.orderId,
							this.afterId,
							0,
							this.param.amount + ''
						)
					}
				} else {
					return false
				}
			})
		},
		clickToRejectRefund({ orderId, afterId }) {
			this.$confirm('确认退款失败?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(async () => {
				await this.handlerAfterRequest(orderId, afterId, 1)
			})
		},
		handlerAfterRequest(orderId, afterId, handlerType, amount) {
			let params = {
				orderId: orderId,
				afterId: afterId,
				handlerType: handlerType,
				amount: amount,
			}
			handlerAfter(this.filterData(params))
				.then((res) => {
					if (res.ret.errcode === 1) {
						this.$message.success('操作成功！')
						this.show = false
						this.getAfterSaleOrderList()
					}
				})
				.catch((err) => {
					console.log(err)
				})
		},
	},
}
</script>

<style lang="scss" scoped>
.main-content-wrapper {
	margin-top: 10px;
}
.filter-container {
	background-color: #fff;
	padding: 10px;
	box-sizing: border-box;
}
.image-box {
	height: 100px;
	width: 100px;
}
.block-right {
	height: auto;
}
.after-order-item {
	height: 140px;
}
.page-wrapper {
	height: 40px;
	margin-top: 0;
	background: #fff;
}
:deep() .el-range-separator {
	width: 20px;
}
.tabs_list {
	padding-left: 20px;
	background-color: #fff;
}
.el-table {
	:deep() .el-button + .el-button {
		margin-left: 0;
		margin-top: 10px;
	}
}
</style>
