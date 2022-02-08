<template>
    <div class="app-container">
        <div class="filter-container">
            <el-form inline ref="teamMemberFilterForm" :model="queryData" label-width="90px">
                <el-form-item label="用户id：" class="filter-item" prop="memberId">
                    <el-input
                        placeholder="请输入用户id"
                        size="medium"
                        clearable
                        v-model="queryData.userId"
                        maxlength="12"
                        @keyup.enter.native="search"
                    ></el-input>
                </el-form-item>
                <!-- <el-form-item label="昵称：" class="filter-item" prop="nickname">
                    <el-input placeholder="请输入昵称" size="medium" clearable v-model="queryData.nickname" @keyup.enter.native="search"></el-input>
                </el-form-item> -->
                <!-- <el-form-item label="手机号：" class="filter-item" prop="mobile">
                    <el-input
                        placeholder="请输入手机号"
                        size="medium"
                        clearable
                        v-model="queryData.mobile"
                        maxlength="12"
                        @keyup.enter.native="search"
                    ></el-input>
                </el-form-item> -->

                <!-- <el-form-item label="关系：" class="filter-item" prop="relation">
                    <el-select size="medium" v-model="queryData.relation" placeholder="请选择">
                        <el-option v-for="item in relationshipList" :key="item.label" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="等级：" class="filter-item" prop="memberLevel" clearable>
                    <el-select size="medium" v-model="queryData.level" placeholder="请选择">
                        <el-option v-for="(item, key) in userLevel" :key="key" :label="item" :value="key"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="排序：" class="filter-item" prop="sortType" clearable>
                    <el-select size="medium" v-model="queryData.sortType" placeholder="请选择">
                        <el-option v-for="(item, key) in sortTypeList" :key="key" :label="item" :value="key"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item class="filter-item" style="margin-left: 20px;">
                    <el-button icon="el-icon-search" type="primary" @click="search" size="medium" @keyup.enter.native="search">搜索</el-button>
                    <el-button icon="el-icon-refresh-left" @click="reset" size="medium">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table-list">
            <el-table border :data="dataList" v-loading="loading" max-height="600" :header-cell-style="{ background: '#F5F7FA', color: '#606266' }">
                <el-table-column prop="userId" label="用户id" align="center" min-width="150px">
                    <template #default="scope">
                        <el-link type="primary" :underline="false" @click="jumpToDetail(scope.row.userId)">{{ scope.row.userId }}</el-link>
                    </template>
                </el-table-column>
                <el-table-column prop="nickname" label="昵称" align="center" min-width="120px"></el-table-column>
                <el-table-column prop="mobile" label="手机号" align="center" min-width="150px"></el-table-column>
                <el-table-column label="等级" align="center" min-width="120px">
                    <template #default="scope">{{ scope.row.vip ? '达人' : '粉丝' }}</template>
                </el-table-column>
                <el-table-column label="邀请码" align="center" min-width="120px">
                    <template #default="scope">{{ scope.row.inviteCode }}</template>
                </el-table-column>
                <el-table-column label="注册时间" align="center" min-width="180px">
                    <template #default="scope">{{ timestampToTime(scope.row.createTime) }}</template>
                </el-table-column>
                <el-table-column label="是否有CR权限" align="center" min-width="120px">
                    <template #default="scope">
                        <el-tag v-if="scope.row.crOwner" size="mini">有</el-tag>
                        <el-tag type="danger" v-else size="mini">没有</el-tag>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="commissionAmount" label="贡献收益" align="center" min-width="120px">
                    <template #default="scope">
                        {{ scope.row.commissionAmount || '-' }}
                    </template>
                </el-table-column> -->
                <el-table-column prop="teamMemberCount" label="首单时间" align="center" min-width="120px">
                    <template #default="scope">
                        {{ scope.row.firstOrderTime ? timestampToTime(scope.row.firstOrderTime) : '-' }}
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" align="center" min-width="120px">
                    <template #default="scope">
                        <router-link target="_blank" :to="{ name: 'memberInfo', query: { userId: scope.row.userId } }">
                            <el-button type="text" size="mini">详情</el-button>
                        </router-link>
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
import { queryMyChildList } from '@/api/newJson/user';

export default {
    name: 'teamMemberList',
    data() {
        return {
            drop: false,
            dropDownContent: '展开',
            dropDownIcon: 'el-icon-arrow-down',
            loading: false,
            userId: '',
            dataList: [],
            totalCount: 0,
            queryData: {
                pageNum: 1,
                pageSize: 20,
                userId: '',
                level: '',
                sortType: '',
            },
            relationshipList: [
                {
                    value: 1,
                    label: '直属',
                },
                {
                    value: 2,
                    label: '间属',
                },
            ],
            appTypeEnum: {
                0: 'MeMall',
                // 1: 'MeOne'
            },
            inputValue: '',
            userLevel: {
                1: '达人',
                2: '粉丝',
            },
            sortTypeList: {
                1: '注册时间降序',
                2: '注册时间升序',
                3: '活跃度降序',
                4: '活跃度升序',
            },
        };
    },
    computed: {},
    created() {
        if (this.$route.query.userId) {
            this.userId = this.$route.query.userId;
        }
    },
    methods: {
        search() {
            this.getTeamMemberList();
        },
        reset() {
            this.$refs.teamMemberFilterForm.resetFields();
            this.getTeamMemberList();
        },
        handleCurrentChange() {},
        operation() {},
        getTeamMemberList() {
            this.loading = true;
            let params = this.queryData;
            params.userId = this.userId;
            queryMyChildList(this.filterData(params))
                .then(response => {
                    this.loading = false;
                    if (response) {
                        this.totalCount = response.total;
                        this.dataList = response.data;
                    }
                })
                .catch(err => {
                    this.loading = false;
                    console.log(err);
                });
        },
        handleCurrentChange(val) {
            this.queryData.pageNum = val ? val : this.queryData.pageNum;
            this.getTeamMemberList();
        },
        handleSizeChange(val) {
            this.queryData.pageSize = val;
            this.queryData.pageNum = 1;
            this.getTeamMemberList();
        },
        jumpToDetail(userId) {
            this.$router.push({
                name: 'memberInfo',
                query: {
                    userId: userId,
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
