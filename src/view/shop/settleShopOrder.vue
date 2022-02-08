<!--  -->
<template>
    <div class="settle_shop_order app-container">
        <div class="main-content-wrapper">
            <el-table :data="tableData" border stripe style="width: 100%" height="100%">
                <el-table-column label="订单Id" align="center" prop="orderId"></el-table-column>
                <el-table-column label="商品信息" align="center">
                    <template #default="scope">
                        <div class="flex flex-item--center">
                            <el-popover placement="top-start" trigger="hover">
                                <img :src="scope.row.cover" class="previewImage" />
                                <template #reference>
                                    <img :src="scope.row.cover" class="image-box" />
                                </template>
                            </el-popover>
                            <el-tooltip class="item" effect="dark" :content="scope.row.title" placement="top">
                                <span
                                    class="block-right"
                                    style="display: -webkit-box; overflow: hidden; white-space: normal !important; text-overflow: ellipsis; word-wrap: break-word; -webkit-line-clamp: 3;-webkit-box-orient: vertical;margin-left:5px;"
                                >
                                    {{ scope.row.title }}
                                </span>
                            </el-tooltip>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="店铺名称" align="center">
                    <template #default="scope">
                        <span v-if="scope.row.shop">{{ scope.row.shop.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="店铺简称" align="center">
                    <template #default="scope">
                        <span v-if="scope.row.shop">{{ scope.row.shop.shortName }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="订单金额" align="center" prop="amount"></el-table-column>
                <el-table-column label="创建时间" align="center">
                    <template #default="scope">
                        <span>{{ timestampToTime(scope.row.createTime) }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="200" align="center">
                    <template #default="scope">
                        <el-button type="text" class="table-opreator" @click="vierOrderDetail(scope.row)">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <no-data-component v-else></no-data-component> -->
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
    </div>
</template>

<script>
import { clearsShopOrder } from '@/api/newJson/account.js';
export default {
    data() {
        return {
            queryData: {
                clearId: '',
                timeType: 3,
                shopId: '',
                sellerId: '',
                startTime: '',
                endTime: '',
                pageSize: 20,
                pageNum: 1,
            },
            tableData: [],
            total: 0,
        };
    },

    components: {},

    computed: {},

    mounted() {
        if (this.$route.query.clearId) {
            this.queryData.clearId = this.$route.query.clearId;
            this.queryData.timeType = '';
        } else {
            this.queryData.shopId = Number(this.$route.query.shopId);
            this.queryData.sellerId = Number(this.$route.query.sellerId);
            this.queryData.startTime = this.$route.query.startTime;
            this.queryData.endTime = this.$route.query.endTime;
        }
        this.getClearsShopOrder();
    },

    methods: {
        getClearsShopOrder() {
            clearsShopOrder(this.filterData(this.queryData))
                .then(response => {
                    if (response) {
                        this.tableData = response.data.data;
                        this.total = response.data.total;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        handleSizeChange(val) {
            this.queryData.pageSize = val;
            this.getClearsShopOrder();
        },
        handleCurrentChange(val) {
            this.queryData.pageNum = val;
            this.getClearsShopOrder();
        },
        vierOrderDetail(row) {
            this.$router.push({
                name: 'orderDetail',
                query: {
                    orderId: row.orderId,
                },
            });
        },
    },
};
</script>
<style lang="scss" scoped></style>
