<template>
    <div class="app-container">
        <div class="filter-container">
            <el-form inline ref="teamOrderFilterForm" label-width="90px" :model="queryData">
                <el-form-item label="用户Id：" class="filter-item" prop="userId">
                    <el-input
                        type="number"
                        placeholder="用户Id"
                        size="medium"
                        v-model="queryData.userId"
                        maxlength="12"
                        @keyup.enter.native="search"
                    ></el-input>
                </el-form-item>
                <el-form-item label="订单时间：" class="filter-item" prop="rangeType">
                    <el-select size="medium" v-model="queryData.rangeType" placeholder="请选择">
                        <el-option v-for="item in rangeTypeList" :key="item.label" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="订单状态：" class="filter-item" prop="crStatus">
                    <el-select size="medium" v-model="queryData.crStatus" placeholder="请选择">
                        <el-option v-for="item in crStatusList" :key="item.label" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="购买类型：" class="filter-item" prop="buyerType">
                    <el-select size="medium" v-model="queryData.buyerType" placeholder="请选择">
                        <el-option v-for="item in buyerTypeList" :key="item.label" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <!-- <span v-show="drop">
                    <el-form-item label="归属用户id：" class="filter-item" prop="userId">
                        <el-input
                            type="number"
                            placeholder="请输入归属用户id"
                            size="medium"
                            v-model="queryData.userId"
                            maxlength="12"
                            @keyup.enter.native="search"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="等级：" class="filter-item" prop="memberLevel">
                        <el-select size="medium" v-model="queryData.memberLevel" placeholder="请选择">
                            <el-option v-for="item in memberLevelList" :key="item.label" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="关系：" class="filter-item" prop="relationship">
                        <el-select size="medium" v-model="queryData.relationship" placeholder="请选择">
                            <el-option v-for="item in relationshipList" :key="item.label" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </span> -->
                <el-form-item class="filter-item" style="margin-left: 20px;">
                    <el-button icon="el-icon-search" type="primary" @click="search" size="medium" @keyup.enter.native="search">搜索</el-button>
                    <el-button icon="el-icon-refresh-left" @click="reset" size="medium">重置</el-button>
                    <!-- <el-link style="margin-left: 20px;" type="primary" :underline="false" @click="dropDown">
                        {{ dropDownContent }}
                        <i :class="dropDownIcon"></i>
                    </el-link> -->
                </el-form-item>
            </el-form>
        </div>
        <div class="table-list">
            <el-table border :data="dataList" max-height="600" :header-cell-style="{ background: '#F5F7FA', color: '#606266' }">
                <el-table-column label="用户id" align="center" min-width="80px">
                    <template #default="scope">
                        <span>{{ scope.row.buyer.userId }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="nickName" label="昵称" align="center" min-width="120px">
                    <template #default="scope">
                        <span>{{ scope.row.buyer.nickname }}</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="mobile" label="手机号" align="center" min-width="150px">
                    <template #default="scope">
                        <span>{{ scope.row.buyer.mobile || '-' }}</span>
                    </template>
                </el-table-column> -->
                <el-table-column label="商品信息" width="180" align="center">
                    <template #default="scope">
                        <div class="flex flex-item--center">
                            <el-popover placement="top-start" trigger="hover">
                                <img :src="scope.row.product.cover" class="previewImage" />
                                <template #reference>
                                    <img :src="scope.row.product.cover" class="image-box" />
                                </template>
                            </el-popover>
                            <el-tooltip class="item" effect="dark" :content="scope.row.product.title" placement="top">
                                <span
                                    class="block-right"
                                    style="display: -webkit-box; overflow: hidden; white-space: normal !important; text-overflow: ellipsis; word-wrap: break-word; -webkit-line-clamp: 3;-webkit-box-orient: vertical;margin-left:5px;"
                                >
                                    {{ scope.row.product.title }}
                                </span>
                            </el-tooltip>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="支付时间" align="center" min-width="180px">
                    <template #default="scope">
                        <span>{{ scope.row.payTime ? timestampToTime(scope.row.payTime) : '-' }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="结算时间" align="center" min-width="180px">
                    <template #default="scope">
                        <span>{{ scope.row.settleTime ? timestampToTime(scope.row.settleTime) : '-' }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="付款金额" align="center" min-width="180px">
                    <template #default="scope">
                        <span>{{ scope.row.actPayAmount }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="结算金额" align="center" min-width="180px">
                    <template #default="scope">
                        <span>{{ scope.row.settleAmount }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="结算佣金/平台分红" align="center" min-width="180px">
                    <template #default="scope">
                        <span>{{ scope.row.crAmount || '-' }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="结算状态" align="center" min-width="180px">
                    <template #default="scope">
                        <el-tag size="small" type="primary" v-if="scope.row.crStatus == 1">待结算</el-tag>
                        <el-tag size="small" type="success" v-else-if="scope.row.crStatus == 2">已结算</el-tag>
                        <el-tag size="small" type="danger" v-else-if="scope.row.crStatus == 3">已取消</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="注册时间" align="center" min-width="180px">
                    <template #default="scope">
                        <span>{{ timestampToTime(scope.row.buyer.createTime) || '-' }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="等级" align="center" min-width="180px">
                    <template #default="scope">
                        <el-tag size="small" v-if="scope.row.buyer.vip" type="success">达人</el-tag>
                        <el-tag size="small" v-else type="primary">粉丝</el-tag>
                    </template>
                </el-table-column>

                <el-table-column fixed="right" label="操作" align="center" min-width="120px">
                    <template #default="scope">
                        <el-button plain type="primary" @click="operation(scope.row.orderId)">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                :current-page="queryData.pageNum"
                :page-size="queryData.pageSize"
                :page-sizes="[5, 10, 20, 50]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount"
                class="pagination"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
import { queryTeamOrderList } from '@/api/newJson/user';
export default {
    name: 'teamOrderList',
    data() {
        return {
            drop: false,
            dropDownContent: '展开',
            dropDownIcon: 'el-icon-arrow-down',
            dataList: [],
            totalCount: 0,
            queryData: {
                userId: '',
                pageNum: 1,
                pageSize: 10,
                nickName: '',
                mobile: '',
                relationship: '',
            },
            rangeTypeList: [
                {
                    value: 1,
                    label: '今日',
                },
                {
                    value: 2,
                    label: '昨日',
                },
                {
                    value: 3,
                    label: '近七天',
                },
                {
                    value: 4,
                    label: '近30天',
                },
            ],
            crStatusList: [
                {
                    value: null,
                    label: '全部',
                },
                {
                    value: 1,
                    label: '待结算',
                },
                {
                    value: 2,
                    label: '已结算',
                },
                {
                    value: 3,
                    label: '已取消',
                },
            ],
            buyerTypeList: [
                {
                    value: null,
                    label: '全部',
                },
                {
                    value: 1,
                    label: '自己购买',
                },
                {
                    value: 2,
                    label: '社群购买',
                },
            ],

            relationshipList: [
                {
                    value: 0,
                    label: '直属',
                },
                {
                    value: 1,
                    label: '间属',
                },
            ],
            memberLevelList: [
                {
                    value: null,
                    label: '全部',
                },
                {
                    value: 2,
                    label: 'SH',
                },
                {
                    value: 3,
                    label: 'PS',
                },
            ],
            inputValue: '',
        };
    },
    computed: {},
    created() {
        if (this.$route.query.userId) {
            this.queryData.userId = this.$route.query.userId;
        }
    },
    methods: {
        dropDown() {
            if (this.drop) {
                this.dropDownContent = '展开';
                this.dropDownIcon = 'el-icon-arrow-down';
            } else {
                this.dropDownContent = '收起';
                this.dropDownIcon = 'el-icon-arrow-up';
            }
            this.drop = !this.drop;
        },
        search(type) {
            if (type == 1) {
                this.queryData.pageNum = 1;
            }
            queryTeamOrderList(this.filterData(this.queryData))
                .then(response => {
                    this.dataList = response.data;
                    this.totalCount = response.total;
                })
                .catch(error => {});
        },
        reset() {
            this.$refs.teamOrderFilterForm.resetFields();
        },
        handleSizeChange(val) {
            this.queryData.pageSize = val;
            this.search(1);
        },
        handleCurrentChange(val) {
            this.queryData.pageNum = val;
            this.search();
        },
        operation(orderId) {
            this.$router.push({
                name: 'orderDetail',
                query: {
                    orderId: orderId,
                },
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.pagination {
    margin: 20px;
    float: right;
}
</style>
