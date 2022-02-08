<template>
	<div class="app-container">
		<div class="filter-container">
			<el-form
				ref="afterSaleOrderFilter"
				inline
				:model="queryData"
				label-position="left"
			>
				<el-form-item label="站点：" prop="divisionId">
					<el-select v-model="queryData.divisionId">
						<el-option
							v-for="(item, index) in divisionList"
							:key="index"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="用户ID:">
					<el-input
						v-model="queryData.userId"
						placeholder="请输入用户ID"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item label="昵称：">
					<el-input
						v-model="queryData.nickname"
						placeholder="请输入昵称"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item
					label="提现时间："
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
						value-format="YYYY-MM-DD HH:mm:ss"
					></el-date-picker>
				</el-form-item>
				<el-form-item
					label="银行名称："
					prop="orderId"
					class="filter-item"
				>
					<el-input
						v-model="queryData.orderId"
						clearable
						placeholder="请输入订单号"
						size="medium"
						style="width: 200px"
					></el-input>
				</el-form-item>
				<el-form-item
					label="银行卡号："
					prop="orderId"
					class="filter-item"
				>
					<el-input
						v-model="queryData.orderId"
						clearable
						placeholder="请输入订单号"
						size="medium"
						style="width: 200px"
					></el-input>
				</el-form-item>
				<el-form-item
					label="手机号："
					prop="receiverPhone"
					class="filter-item"
				>
					<el-input
						v-model="queryData.receiverPhone"
						clearable
						placeholder="请输入收货人手机号"
						size="medium"
					></el-input>
				</el-form-item>

				<el-form-item class="filter-item" style="margin-left: 20px">
					<el-button
						icon="el-icon-search"
						type="primary"
						@click="search"
						size="medium"
						>搜索</el-button
					>
					<el-button
						icon="el-icon-refresh-left"
						@click="resetSearch"
						size="medium"
						>重置</el-button
					>
					<el-button
						icon="el-icon-download"
						plain
						type="primary"
						size="medium"
					>
						导出
					</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="tabs_list">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="未打款" name="APPLY"></el-tab-pane>
				<el-tab-pane label="已打款" name="SUCCESS"></el-tab-pane>
				<el-tab-pane label="已拒绝" name="CLOSED"></el-tab-pane>
			</el-tabs>
		</div>
		<div class="main-content-wrapper">
			<el-table :data="orderList" height="100%" border>
				<el-table-column
					fixed="left"
					label="申请编号"
					align="center"
					prop="outRefundNo"
					width="180px"
				></el-table-column>
				<el-table-column
					fixed="left"
					label="用户Id"
					align="center"
					prop="outTradeNo"
					width="180px"
				>
					<template #default="scope">
						<router-link
							target="_blank"
							:to="{
								name: 'orderDetail',
								query: { orderId: scope.row.outTradeNo },
							}"
						>
							<el-button type="text" size="mini">{{
								scope.row.outTradeNo
							}}</el-button>
						</router-link>
					</template>
				</el-table-column>
				<el-table-column
					label="用户名"
					align="center"
					prop="transactionId"
					width="180px"
				></el-table-column>
				<el-table-column
					label="站点"
					align="center"
					prop="refundId"
					width="180px"
				></el-table-column>
				<el-table-column
					label="银行名称"
					align="center"
					width="120px"
					prop="platform"
				></el-table-column>
				<el-table-column
					label="银行卡号"
					align="center"
					prop="sellerName"
					width="180px"
				></el-table-column>
				<el-table-column
					label="银行账户名"
					align="center"
					prop="applyAmount"
					width="180px"
				></el-table-column>
				<el-table-column
					label="提现金额"
					align="center"
					prop="userId"
					width="180px"
				>
					<template #default="scope">
						<router-link
							target="_blank"
							:to="{
								name: 'memberInfo',
								query: { userId: scope.row.userId },
							}"
						>
							<el-button type="text" size="mini">{{
								scope.row.userNick
									? scope.row.userNick
									: scope.row.userId
							}}</el-button>
						</router-link>
					</template>
				</el-table-column>
				<el-table-column
					label="到账金额"
					align="center"
					prop="applyRemark"
					width="180px"
				></el-table-column>
				<el-table-column label="退款状态" align="center" width="180px">
					<template #default="scope">
						<!--<el-tag size="small" type="primary" v-else-if="scope.row.status == 'PROCESSING'">退款处理中</el-tag>
                        <el-tag size="small" type="warning" v-else-if="scope.row.status == 'ABNORMAL'">退款异常</el-tag> -->
					</template>
				</el-table-column>
				<el-table-column
					label="提现手续费"
					align="center"
					prop="sellerRemark"
					width="180px"
				></el-table-column>
				<el-table-column
					label="思店扣款"
					align="center"
					prop="sellerRemark"
					width="180px"
				></el-table-column>
				<el-table-column
					label="提现申请时间"
					align="center"
					prop="sellerRemark"
					width="180px"
				></el-table-column>
				<el-table-column
					label="手机号"
					align="center"
					prop="sellerRemark"
					width="180px"
				></el-table-column>
				<el-table-column
					label="操作"
					align="center"
					width="180px"
					v-if="activeName == 'APPLY'"
				>
					<template #default="scope">
						<el-button type="danger" size="small">拒绝</el-button>
					</template>
				</el-table-column>
				<el-table-column
					label="操作人"
					align="center"
					width="180px"
					v-if="activeName != 'APPLY'"
					prop="auditUser"
				></el-table-column>
				<el-table-column
					label="打款时间"
					align="center"
					width="180px"
					v-if="activeName != 'APPLY'"
				>
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
			<el-pagination
				@size-change="handleSizeChanges"
				@current-change="handleCurrentChanges"
				:current-page="queryData.pageNum"
				:page-sizes="[10, 20, 30, 50]"
				:page-size="queryData.pageSize"
				layout="total, sizes, prev, pager, next"
				:total="totals"
			></el-pagination>
		</div>
	</div>
</template>

<script>
import { afterSaleOrder, refundAudit } from '@/api/newJson/order'
import { param } from '@/utils/index'
import { ref, reactive } from 'vue'
import { divisionList } from '@/data/globalData.js'
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
			divisionList: divisionList,
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
				divisionId: '',
				status: null,
				startTime: '',
				endTime: '',
				pageNum: 1,
				pageSize: 20,
			},
			totals: 0,
			afterStatusList: [
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
	},
	methods: {
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
