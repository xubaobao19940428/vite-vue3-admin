<template>
    <div class="app-container">
        <div class="filter-container">
            <el-form inline ref="orderFilterForm" label-width="90px" :model="queryData">
                <el-form-item label="时间：">
                    <el-date-picker
                        v-model="queryData.time"
                        type="daterange"
                        value-format="yyyy-MM-dd hh:mm:ss"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['00:00:00', '23:59:59']"
                    ></el-date-picker>
                </el-form-item>
                <!-- <el-form-item label="档位状态：" class="filter-item" prop="returnType">
                    <el-select size="medium" v-model="queryData.returnType" placeholder="请选择">
                        <el-option v-for="item in commissionStatusList" :key="item.label" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
               <el-form-item label="国家：" class="filter-item" prop="countryCode">
                    <el-select size="medium" v-model="queryData.countryCode" placeholder="请选择">
                        <el-option v-for="item in countryList" :key="item.shortCode" :label="item.nameCn" :value="item.shortCode"></el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item class="filter-item" style="margin-left: 20px;">
                    <el-button icon="el-icon-search" type="primary" @click="search" size="medium" @keyup.enter.native="search">搜索</el-button>
                    <el-button icon="el-icon-refresh-left" @click="reset" size="medium">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table-list">
            <el-table border :data="dataList" max-height="600" :header-cell-style="{ background: '#F5F7FA', color: '#606266' }" v-loading="loading">
                <el-table-column label="日期" align="center" prop="day"></el-table-column>
                <el-table-column label="总计" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.totalCRAndCB.currencySymbol }} {{ scope.row.totalCRAndCB.amount }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="档位" align="center" prop="level"></el-table-column>
                <el-table-column label="预估CR" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.totalSalesCR.currencySymbol }} {{ scope.row.totalSalesCR.amount }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="预估CB" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.totalCB.currencySymbol }} {{ scope.row.totalCB.amount }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="一类商品销量" align="center" width="150px">
                    <template slot-scope="scope">
                        <span>{{ scope.row.sales1.currencySymbol }} {{ scope.row.sales1.amount }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="一类商品奖励" align="center" width="150px">
                    <template slot-scope="scope">
                        <span>{{ scope.row.salesCR1.currencySymbol }} {{ scope.row.salesCR1.amount }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="二类商品销量" align="center" width="150px">
                    <template slot-scope="scope">
                        <span>{{ scope.row.sales2.currencySymbol }} {{ scope.row.sales2.amount }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="二类商品奖励" align="center" width="150px">
                    <template slot-scope="scope">
                        <span>{{ scope.row.salesCR2.currencySymbol }} {{ scope.row.salesCR2.amount }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="三类商品销量" align="center" width="150px">
                    <template slot-scope="scope">
                        <span>{{ scope.row.sales3.currencySymbol }} {{ scope.row.sales3.amount }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="三类商品奖励" align="center" width="150px">
                    <template slot-scope="scope">
                        <span>{{ scope.row.salesCR3.currencySymbol }} {{ scope.row.salesCR3.amount }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="四类商品销量" align="center" width="150px">
                    <template slot-scope="scope">
                        <span>{{ scope.row.sales4.currencySymbol }} {{ scope.row.sales4.amount }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="四类商品奖励" align="center" width="150px">
                    <template slot-scope="scope">
                        <span>{{ scope.row.salesCR4.currencySymbol }} {{ scope.row.salesCR4.amount }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="五类商品销量" align="center" width="150px">
                    <template slot-scope="scope">
                        <span>{{ scope.row.sales5.currencySymbol }} {{ scope.row.sales5.amount }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="五类商品奖励" align="center" width="150px">
                    <template slot-scope="scope">
                        <span>{{ scope.row.salesCR5.currencySymbol }} {{ scope.row.salesCR5.amount }}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-box">
                <el-pagination
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
                    :current-page="queryData.pageNum"
                    :page-sizes="[5, 10, 20, 50]"
                    :page-size="queryData.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
// import {dataCrAndCb} from '@/api/newUserJson.js'
export default {
    name: 'saleReport',
    data() {
        return {
            loading: false,
            dataList: [],
            total: 0,
            queryData: {
                pageNum: 1,
                pageSize: 10,
                userId: '',
                time: [],
                // countryCode:'',
            },
            commissionStatusList: [
                {
                    value: 0,
                    label: '已返佣',
                },
                {
                    value: 1,
                    label: '未返佣',
                },
            ],
        };
    },
    computed: {
        countryList() {
            return this.$store.state.dict.countryList ? this.$store.state.dict.countryList : localStorage.getItem('countryList');
        },
    },
    created() {
        if (this.$route.query.userId) {
            this.queryData.userId = this.$route.query.userId;
        }
    },
    methods: {
        getDataCrAndCb() {
            let params = {
                userId: this.queryData.userId,
                pageNum: this.queryData.pageNum,
                pageSize: this.queryData.pageSize,
            };
            if (this.queryData.time != null && this.queryData.time.length > 0) {
                params.startTime = this.queryData.time[0];
                params.endTime = this.queryData.time[1];
            }
            dataCrAndCb(params)
                .then(res => {
                    if (res.data) {
                        this.dataList = res.data;
                        this.total = res.total;
                    }
                })
                .catch(error => {});
        },
        search() {
            this.queryData.pageNum = 1;
            this.getDataCrAndCb();
        },
        reset() {
            this.queryData.time = [];
            this.queryData.pageNum = 1;
            this.getDataCrAndCb();
        },
        handleCurrentChange(value) {
            this.queryData.pageNum = value;
            this.getDataCrAndCb();
        },
        handleSizeChange(value) {
            this.queryData.pageSize = value;
            this.queryData.pageNum = 1;
            this.getDataCrAndCb();
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
