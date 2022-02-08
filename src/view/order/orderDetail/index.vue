<template>
	<div class="app-container">
		<div>
			<!-- <el-card class="info-card">
                <c-order-progress :orderNo="orderNo"></c-order-progress>
            </el-card> -->
			<el-card class="info-card">
				<div class="info-title mar-b-10">订单信息</div>
				<c-order-info
					:orderInfo="orderInfo"
					:orderNo="orderNo"
					@refresh="getOrderDetail"
					:userLevel="userLevel"
				></c-order-info>
			</el-card>
			<el-card class="info-card">
				<div class="info-title mar-b-10">商品信息</div>
				<c-product-info :productInfo="productInfo"></c-product-info>
			</el-card>
			<!-- <el-card class="info-card">
                <div class="info-title mar-b-10">子单信息</div>
                <c-order-sub :orderNo="orderNo"></c-order-sub>
            </el-card> -->
			<el-card class="info-card">
				<div class="info-title mar-b-10">用户信息</div>
				<c-receiver-info
					@refresh="getOrderDetail"
					:receiverInfo="receiverInfo"
					:orderInfo="orderInfo"
					:orderNo="orderNo"
				></c-receiver-info>
			</el-card>
			<el-card class="info-card">
				<div class="info-title mar-b-10">消费信息</div>
				<consumption-order
					@refresh="getOrderDetail"
					:receiverInfo="orderReceiverInfo"
					:orderInfo="orderInfo"
					:orderNo="orderNo"
				></consumption-order>
			</el-card>
			<!-- <el-card class="info-card">
                <div class='info-title mar-b-10'>积分信息</div>
                <c-points-info :pointsInfo="pointsInfo" :userLevel="userLevel"></c-points-info>
            </el-card> -->
			<!-- <el-card class="info-card">
                <div class="info-title mar-b-10">CB分配明细表</div>
                <c-points-cb :cbPointsList="cbPointsList"></c-points-cb>
            </el-card>
            <el-card class="info-card">
                <div class="info-title mar-b-10">CR分配明细表</div>
                <c-points-cr :crPointsList="crPointsList"></c-points-cr>
            </el-card> -->
		</div>
	</div>
</template>
<script>
// import { viewOrderDetail } from '@/request/order.js'
import { orderDetail } from '@/api/newJson/order.js'
// import {orderDetail} from '@/api/newJsonOrder.js'
// import {commissionOrderCb,bossSalesRewardDetailCr} from '@/api/newJsonOrder.js'
import cOrderInfo from './components/orderInfo.vue'
import cProductInfo from './components/productInfo.vue'
import cReceiverInfo from './components/receiverInfo.vue'
import cPointsInfo from './components/pointsInfo.vue'
import cOrderProgress from './components/orderProgress.vue'
// import cOrderSub from './components/orderSub.vue';
// import cPointsCb from './components/pointsCB.vue';
// import cPointsCr from './components/pointsCR.vue';
import consumptionOrder from './components/consumptionOrder.vue'
export default {
	components: {
		cOrderInfo,
		cProductInfo,
		cPointsInfo,
		cOrderProgress,
		cReceiverInfo,
		consumptionOrder,
	},
	data() {
		return {
			cbPointsList: [],
			crPointsList: [],
			orderInfo: {
				discountAmount: '',
				totalAmount: '',
				usePoints: '',
				nickname: '',
				userId: '',
				orderStatus: '',
				paied: '',
				userLevel: '',
				orderType: '',
				transCode: '',
				parentNick: '',
				parentId: '',
				parentLevel: '',
				payWay: '',
				createTime: '',
				paySupplier: '',
				payTime: '',
				receiveTime: '',
				paiedCurrency: '',
				currency: '',
				countryCode: '',
			},
			productInfo: [],
			orderReceiverInfo: {
				shopName: '',
				verifyTime: '',
				verifyUser: '',
			},
			receiverInfo: {
				userNick: '',
				userId: '',
				tel: '',
			},
			pointsInfo: {
				title: [],
				skuPointsInfo: [],
				pointsVerticalSum: [],
				pointsHorizontalSum: [],
			},
			orderId: '',
		}
	},

	computed: {
		countryList() {
			return this.$store.state.dict.countryList
		},
		userLevel() {
			return this.$store.state.user.userLevel
		},
	},
	created() {
		this.orderId = this.$route.query.orderId
			? this.$route.query.orderId
			: ''
		this.getOrderDetail()
		// this.getCommissionOrderCb()
		// this.getBossSalesRewardDetailCr()
	},
	methods: {
		getOrderDetail() {
			orderDetail({
				orderId: this.orderId,
			}).then((res) => {
				console.log('订单信息', res)
				this.productInfo = [res.data]
				// if (res.ret.errcode === 1) {
				Object.assign(this.orderInfo, {
					discountAmount: res.data.discountAmount,
					orderId: res.data.orderId,
					totalAmount: res.data.totalAmount,
					// usePoints: res.data.userPoints,
					userNick: res.data.userNick,
					userId: res.data.userId,
					payWay: res.data.payWay,
					createTime: res.data.orderTime,
					payNo: res.data.payNo,
					// paySupplier: res.data.paySupplier,
					payTime: res.data.payTime,
					// receiveTime: res.data.finishTime,
					// paiedCurrency: res.data.currencySymbol,
					// currency: res.data.currencySymbol,
				})

				Object.assign(this.orderReceiverInfo, {
					shopName: res.data.shopName,
					verifyTime: res.data.verifyTime,
					verifyUser: res.data.verifyUser,
				})
				Object.assign(this.receiverInfo, {
					userNick: res.data.userNick,
					userId: res.data.userId,
					tel: res.data.tel,
				})
				Object.assign(this.pointsInfo, res.pointsInfo)
				// }
			})
		},
		// getCommissionOrderCb() {
		//     commissionOrderCb({
		//         orderId: this.orderNo,
		//     })
		//         .then(response => {
		//             console.log(response);
		//             this.cbPointsList = response.data;
		//         })
		//         .catch(error => {
		//             console.log(error);
		//         });
		// },
		// getBossSalesRewardDetailCr() {
		//     bossSalesRewardDetailCr({
		//         orderId: this.orderNo,
		//     })
		//         .then(response => {
		//             console.log(response);
		//             this.crPointsList = response.data;
		//         })
		//         .catch(error => {
		//             console.log(error);
		//         });
		// },
	},
}
</script>
