<template>
    <div class="order-info-wrapper">
        <div>
            <div>
                <span>订单编号：</span>
                {{ orderInfo.orderId }}
            </div>
            <div>
                <span>下单时间：</span>
                {{ timestampToTime(orderInfo.createTime) }}
            </div>
            <div>
                <span>支付时间：</span>
                {{ timestampToTime(orderInfo.payTime) }}
            </div>
            <div>
                <span>实付金额：</span>
                {{ '¥' + orderInfo.totalAmount }}
            </div>
            <div>
                <span>支付交易号：</span>
                {{ orderInfo.payNo || '-' }}
            </div>
        </div>
        <div>
            <div>
                <span>订单总价：</span>
                {{ '¥' + orderInfo.totalAmount }}
            </div>

            <div>
                <span>支付方式：</span>
                {{ '微信支付' || '-' }}
            </div>
            <div>
                <span>买家账号：</span>
                {{ orderInfo.userId + '(' + orderInfo.userNick + ')' }}
            </div>
            <div v-if="orderInfo.discountAmount">
                <span>优惠金额：</span>
                {{ '¥' + orderInfo.discountAmount }}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        orderInfo: Object,
        orderNo: [String, Number],
        userLevel: Object,
    },
    data() {
        return {
            payWay: {
                1: 'molpay',
                2: '积分支付',
                3: '信用卡支付',
                4: 'omise',
                5: 'OnlineBanking',
                6: 'COD',
                7: '组合支付',
            },
        };
    },
    methods: {},
};
</script>
<style lang="scss" scoped>
.order-info-wrapper {
    display: flex;
    > div {
        flex: 1;
        color: #555;
        font-size: 15px;
        span {
            width: 100px;
            text-align: right;
        }
        > div {
            margin-top: 20px;
            display: flex;
            align-items: center;
        }
    }
}
</style>
