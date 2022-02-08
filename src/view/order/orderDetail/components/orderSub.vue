<template>
    <el-table
        :data="dataList"
        border
        style="width: 100%; font-size: 12px"
        ref="table"
        :row-key="getRowKeys"
        :default-expand-all="true"
        :header-cell-style="{ background: '#F9FAFD' }"
        class="order-sub"
    >
        <el-table-column fixed="left" prop="skuInfo" type="expand" style="width: 100%">
            <template slot-scope="scope">
                <el-table :data="scope.row.subOrderProductList" style="width: 100%; font-size: 10px" :header-cell-style="{ background: '#F9FAFD' }">
                    <el-table-column label="skuCode" align="center" prop="skuCode" width="120px">
                        <template slot-scope="scope">
                            <div>{{ scope.row.skuCode }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="商品" align="center" min-width="300px">
                        <template slot-scope="scope">
                            <div class="product">
                                <img :src="dealShowFileSrc(scope.row.cover)" class="image-box" slot="reference" />
                                <div class="product-desc">
                                    <div class="product-content">{{ scope.row.title }}</div>
                                    <div class="product-id">skuId：{{ scope.row.skuId }}</div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="规格" prop="attr" align="center" min-width="100px">
                        <template slot-scope="scope">
                            <div>{{ scope.row.skuAttr }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="购买数量" align="center" min-width="80px">
                        <template slot-scope="scope">
                            <div>{{ scope.row.num }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="已发货数量" align="center" min-width="100px">
                        <template slot-scope="scope">
                            <div>{{ scope.row.shipNum }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="确认采购数量" align="center" min-width="100px">
                        <template slot-scope="scope">
                            <div>{{ scope.row.purchaseNum }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="关联出库单" align="center" min-width="400px">
                        <template slot-scope="scope">
                            <div>
                                <div v-if="!scope.row.outOrderResponseList" class="status-none">无</div>
                                <div v-else v-for="(item, index) in scope.row.outOrderResponseList" :key="index" class="out-info">
                                    <div class="out-id">{{ item.oon }}</div>
                                    <div class="out-status">{{ outOrderStatus[item.outStatus] }}</div>
                                    <div>{{ formatSecondsTo(item.time) }}</div>
                                    <div v-if="item.label !== ''" class="aging-out">{{ item.label }}</div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="关联采购单" align="center" min-width="400px">
                        <template slot-scope="scope">
                            <div>
                                <div v-if="!scope.row.purchaseOrderResponseList" class="status-none">无</div>
                                <div v-else v-for="(item, index) in scope.row.purchaseOrderResponseList" :key="index" class="out-info">
                                    <div class="out-id">{{ item.pon }}</div>
                                    <div class="out-status">{{ ponStatus[item.ponStatus] }}</div>
                                    <!-- <div class="out-status">{{item.exceptioned}}</div> -->
                                    <div>{{ formatSecondsTo(item.time) }}</div>
                                    <div v-if="item.label !== ''" class="aging-out">{{ item.label }}</div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </el-table-column>
        <el-table-column fixed="left" label="子订单号" align="center" prop="suborderId" min-width="180px">
            <template slot-scope="scope">
                <div>{{ scope.row.subOrderId }}</div>
            </template>
        </el-table-column>
        <el-table-column label="发货仓库" align="center" min-width="80px" prop="warehouseName">
            <template slot-scope="scope">
                <div>{{ scope.row.warehouseName }}</div>
            </template>
        </el-table-column>
        <el-table-column label="订单状态" align="center" min-width="80px" prop="deliveWay">
            <template slot-scope="scope">
                <div>{{ orderStatus[scope.row.status] }}</div>
            </template>
        </el-table-column>
        <el-table-column label="订单状态" align="center" min-width="80px" prop="deliveWay">
            <template slot-scope="scope">
                <div class="order-aging">
                    <div>{{ formatSecondsTo(scope.row.time) }}</div>
                    <div v-if="scope.row.label !== ''" class="aging-out">{{ scope.row.label }}</div>
                </div>
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
// import { SubOrders } from '@/request/order.js'
// import {subOrderDetail} from '@/api/newJsonOrder.js'
export default {
    data() {
        return {
            dataList: [],
            orderStatus: {
                0: '待支付',
                1: '待发货',
                2: '待收货',
                3: '交易成功',
                4: '交易关闭',
                5: '部分发货',
                6: '用户取消',
            },
            outOrderStatus: {
                0: '-',
                1: '已出库',
                2: '未出库',
                3: '已取消',
            },
            ponStatus: {
                WAIT_PURCHASE: '未采购',
                PURCHASED: '待发货',
                SHIPPED: '待入库',
                STORAGED: '已入库',
                CANCELED: '已取消',
                NULL: '',
            },
        };
    },
    props: {
        orderNo: String,
    },
    mounted() {
        // this.getSubOrders()
    },
    methods: {
        getRowKeys(row) {
            return row.suborderId;
        },
        getSubOrders() {
            let params = {
                orderId: this.orderNo,
            };
            subOrderDetail(params).then(res => {
                // if (res.ret.errcode === 1) {
                console.log('字单信息', res);
                this.dataList = res.data;
                console.log(this.dataList);
                // }
            });
        },
        formatSecondsTo(mss) {
            // console.log(mss)
            let duration;
            let days = parseInt(mss / (1000 * 60 * 60 * 24));
            let hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = parseInt((mss % (1000 * 60)) / 1000);
            if (days > 0) duration = days + '天' + hours + '小时' + minutes + '分' + seconds + '秒';
            else if (hours > 0) duration = hours + '小时' + minutes + '分' + seconds + '秒';
            else if (minutes > 0) duration = minutes + '分' + seconds + '秒';
            else if (seconds > 0) duration = seconds + '秒';
            // console.log(duration)
            return duration;
        },
    },
};
</script>
<style lang="scss">
.order-sub {
    .el-table__expanded-cell[class*='cell'] {
        padding: 0px 50px;
    }
}
</style>
<style lang="scss" scoped>
.order-sub {
    .image-box {
        height: 70px;
        width: 70px;
    }
    .product {
        display: flex;
        justify-content: space-around;
        .product-desc {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
        }
        .product-id {
            color: rgb(153, 153, 153);
        }
        .product-content {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
        }
    }
    .order-aging {
        display: flex;
        justify-content: space-around;
    }
    .aging-out {
        width: 35px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        background-color: rgb(229, 104, 143);
        color: #fff;
        border-radius: 3px;
    }
    .out-info {
        display: flex;
        justify-content: space-around;
        .out-id {
            color: #409eff;
        }
        .out-status {
            color: rgb(211, 30, 44);
        }
    }
    .status-none {
        color: #409eff;
    }
}
</style>
