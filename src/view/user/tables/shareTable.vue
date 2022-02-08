<template>
    <div class="app-container">
        <div class="table-list">
            <el-table
                border
                :data="dataList.slice((queryData.pageNum - 1) * queryData.pageSize, queryData.pageNum * queryData.pageSize)"
                v-loading="loading"
                :header-cell-style="{ background: '#F5F7FA', color: '#606266' }"
            >
                <el-table-column prop="id" label="序号" align="center" min-width="60px"></el-table-column>

                <el-table-column prop="bankName" label="创建时间" align="center" min-width="150px">
                    <template #default="scope">
                        {{ timestampToTime(scope.row.createTime) }}
                    </template>
                </el-table-column>
                <el-table-column prop="targetType" label="targetType" align="center" min-width="120px"></el-table-column>
                <el-table-column prop="targetId" label="targetId" align="center" min-width="120px"></el-table-column>
                <el-table-column prop="toAppId" label="toAppId" align="center" min-width="120px"></el-table-column>
                <el-table-column prop="toAppName" label="toAppName" align="center" min-width="120px"></el-table-column>
                <el-table-column prop="toOpenId" label="toOpenId" align="center" min-width="120px"></el-table-column>
                <el-table-column label="分享用户" align="center" min-width="120px">
                    <template #default="scope">
                        <router-link
                            class="user_detail"
                            target="_blank"
                            v-if="scope.row.fromUser"
                            :to="{
                                name: 'memberInfo',
                                query: {
                                    userId: scope.row.fromUser.userId,
                                },
                            }"
                        >
                            <img :src="scope.row.fromUser.avatar" alt="" />
                            <span>{{ scope.row.fromUser.nickname }}</span>
                        </router-link>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-pagination
            style="margin-top:20px;"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            :page-size="queryData.pageSize"
            :page-sizes="[10, 20, 50]"
            layout="total, prev, pager, next, jumper"
            :total="totalCount"
            class="pagination"
        ></el-pagination>
    </div>
</template>

<script>
import { queryLast7DaysShareRecords } from '@/api/newJson/user';
export default {
    name: 'shareTable',
    data() {
        return {
            loading: false,
            dataList: [],
            userId: '',
            queryData: {
                pageSize: 10,
                pageNum: 1,
            },
            totalCount: 0,
        };
    },
    computed: {},
    created() {
        if (this.$route.query.userId) {
            this.userId = this.$route.query.userId;
        }
    },
    methods: {
        getLast7DaysShareRecords() {
            let params = {};
            params.userId = this.userId;
            this.loading = true;
            queryLast7DaysShareRecords(params)
                .then(res => {
                    this.loading = false;
                    this.dataList = res.data;
                    this.totalCount = res.data.length;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        handleCurrentChange(val) {
            this.queryData.pageNum = val;
        },
    },
};
</script>

<style lang="scss" scoped>
.user_detail {
    display: flex;
    align-items: center;
    img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 5px;
    }
}
</style>
