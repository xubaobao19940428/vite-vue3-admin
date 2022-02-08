<template>
    <div class="app-container">
        <el-form inline>
            <el-form-item>
                <el-button size="medium" type="primary" icon="el-icon-plus" @click="showEditDialog()">
                    新增
                </el-button>
            </el-form-item>
            <!-- <el-form-item>
                <el-button size="medium" type="danger" icon="el-icon-delete" @click="toDeleteAll()">
                    批量删除
                </el-button>
            </el-form-item> -->
        </el-form>
        <div class="main-content-wrapper">
            <el-table border height="100%" :data="dataList" ref="multipleTable" @selection-change="handleSelectionChange">
                <!-- <el-table-column fixed="left" type="selection" width="40"></el-table-column> -->
                <el-table-column prop="title" label="banner标题" align="center" min-width="100px"></el-table-column>
                <el-table-column prop="id" label="ID" align="center" min-width="100px"></el-table-column>

                <!-- <el-table-column label="打开次数" min-width="100px" align="center">
                    <template #default="scope">
                        {{ scope.row.clickNum }}
                    </template>
                </el-table-column> -->
                <el-table-column label="链接" align="center" prop="url" min-width="200px">
                    <template #default="scope">
                        <div v-if="scope.row.jumpType == 2">
                            <span>{{ returnUrl(scope.row.url) }}</span>
                        </div>
                        <div v-else>
                            {{ scope.row.url }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="图片" align="center" min-width="100px">
                    <template #default="scope">
                        <el-popover placement="top-start" trigger="hover">
                            <img :src="dealShowFileSrc(scope.row.cover)" class="previewImage" />
                            <template #reference>
                                <img :src="dealShowFileSrc(scope.row.cover)" class="thumbnail" />
                            </template>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label="开始时间" align="center" min-width="180px">
                    <template #default="scope">
                        {{ timestampToTime(Number(scope.row.startTime)) }}
                    </template>
                </el-table-column>
                <el-table-column label="结束时间" align="center" min-width="180px">
                    <template #default="scope">
                        {{ timestampToTime(Number(scope.row.endTime)) }}
                    </template>
                </el-table-column>
                <el-table-column label="banner位移动" align="center" width="220px">
                    <template #default="scope">
                        <el-input-number v-model="scope.row.sort" controls-position="right" :min="0" size="mini" :precision="0"></el-input-number>
                        <el-button type="primary" plain @click="toSort(scope.row)" size="mini" style="margin-left:5px">
                            排序
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" align="center" min-width="120px">
                    <template #default="scope">
                        <el-button type="text" size="mini" @click="showEditDialog('edit', scope.row)">
                            编辑
                        </el-button>
                        <!-- <el-button type="text" size="mini" v-if="hasPermission('BTN_BANNER_LIST_EDIT')" @click="showEditDialog('copy', scope.row)">
                            复制
                        </el-button> -->
                        <el-button type="text" size="mini" @click="toDelete(scope.row)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination-box">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[5, 10, 20, 50]"
                :page-size="searchParam.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totals"
            ></el-pagination>
        </div>
        <edit-dialog
            :dialogVisible="dialog.show"
            bannerType="1"
            :countryList="countryList"
            :propParam="dialog.param"
            @close="closeEditDialog"
            @confirm="confirmEditItem"
        ></edit-dialog>
    </div>
</template>
<script>
// import { fetchList, fetchBatchDelete, fetchDelete, fetchChangeSort } from '@/request/promotion.js'
import common from '@/js/common/mixins.js';
import editDialog from './bannerEdit';
import { bannerList, deleteBanner, modifyBanner } from '@/api/newJson/pageEdit';
export default {
    props: {
        countryList: Array,
    },
    mixins: [common],
    data() {
        return {
            dataList: [],
            dialogVisible: false,
            multipleSelection: [],
            dataListId: [],
            bannerList: '',
            searchParam: {
                pageNum: 1,
                pageSize: 10,
            },
            totals: 0,
            dialog: {
                show: false,
                param: {},
            },
            openUrlType: [
                {
                    label: '达人页',
                    value: '1',
                },
                {
                    label: '我的页',
                    value: '2',
                },
                {
                    label: '全部订单页面',
                    value: '3',
                },
            ],
        };
    },
    components: {
        editDialog,
    },
    watch: {
        multipleSelection: function() {
            let arr = [];
            for (let i in this.multipleSelection) {
                arr.push(this.multipleSelection[i].bannerId);
            }
            this.dataListId = arr;
        },
    },
    mounted() {
        this.getBannerList();
    },
    methods: {
        returnUrl(url) {
            let str = '';
            this.openUrlType.map(item => {
                if (item.value == url) {
                    str = item.label;
                    return str;
                }
            });
            return str;
        },
        handleSizeChange(value) {
            this.searchParam.pageSize = value;
            this.getBannerList();
        },
        handleCurrentChange(val) {
            this.searchParam.pageNum = val;
            this.getBannerList();
        },
        getBannerList() {
            bannerList(this.searchParam)
                .then(response => {
                    this.dataList = response.data;
                    this.totals = response.total;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        showEditDialog(type, data) {
            this.dialog.param = {};
            if (type == 'edit') {
                this.$nextTick(() => {
                    Object.assign(this.dialog.param, JSON.parse(JSON.stringify(data)));
                });
            }
            this.dialog.show = true;
        },
        closeEditDialog() {
            this.dialog.show = false;
        },
        confirmEditItem() {
            this.dialog.show = false;
            this.getBannerList();
        },
        toDeleteAll() {
            if (this.dataListId.length === 0) {
                this.$message('请先勾选您需操作的banner');
                return;
            }
            this.$confirm('此操作将永久删除所选banner, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    fetchBatchDelete({ bannerIds: this.dataListId }).then(res => {
                        if (res.ret.errcode === 1) {
                            this.$message.success('删除成功');
                            this.getBannerList();
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除',
                    });
                });
        },
        toSort(row) {
            modifyBanner(row).then(res => {
                if (res) {
                    this.getBannerList();
                    this.$message.success('操作成功');
                }
            });
        },
        toggleSelection(rows) {
            rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row);
            });
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        toDelete(row) {
            this.$confirm('此操作将永久删除所选banner, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    deleteBanner({ id: row.id }).then(res => {
                        if (res) {
                            this.$message.success('删除成功');
                            this.getBannerList();
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除',
                    });
                });
        },
    },
};
</script>
<style lang="scss" scoped>
header {
    width: 100%;
    height: 48px;
}
article {
}
</style>
