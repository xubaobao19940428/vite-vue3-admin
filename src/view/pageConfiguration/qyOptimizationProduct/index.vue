<template>
    <div class="qyOptimization_product app-container">
        <div>
            <!-- <el-form inline>
                <el-form-item label="商品ID：" class="filter-item">
                    <el-input placeholder="请输入商品ID" size="medium" v-model="searchParam.productId"></el-input>
                </el-form-item>
                <el-form-item label="商品名称：" class="filter-item">
                    <el-input placeholder="请输入商品名称" size="medium" v-model="searchParam.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" plain type="primary" @click="getList(1)" size="small">搜索</el-button>
                </el-form-item>
            </el-form> -->
            <el-form inline>
                <el-form-item>
                    <el-button icon="el-icon-plus" plain type="primary" @click="showAddDialog" size="small">新增</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-plus" plain type="primary" @click="toDeleteAll" size="small">批量删除</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="main-content-wrapper">
            <el-table border height="100%" @selection-change="handleSelectionChange" :data="dataList">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="商品信息" align="center">
                    <template #default="scope">
                        <div class="flex flex-item--center">
                            <el-popover placement="top-start" trigger="hover">
                                <img :src="dealShowFileSrc(scope.row.cover)" class="previewImage" />
                                <template #reference>
                                    <img :src="dealShowFileSrc(scope.row.cover)" class="thumbnail" />
                                </template>
                            </el-popover>
                            <span class="block-right">{{ scope.row.title }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="当前排序" align="center" min-width="70">
                    <template #default="scope">
                        <el-input-number v-model="scope.row.sort" controls-position="right" :min="0" size="small" :precision="0"></el-input-number>
                    </template>
                </el-table-column>
                <el-table-column label="是否显示商品折扣" align="center" min-width="70">
                    <template #default="scope">
                        <el-switch
                            style="display: block"
                            v-model="scope.row.showDiscount"
                            :active-value="1"
                            :inactive-value="0"
                            @change="changeDiscount($event, scope.row, scope.$index)"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            active-text="显示"
                            inactive-text="隐藏"
                        ></el-switch>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" align="center">
                    <template #default="scope">
                        <el-button plain type="primary" size="mini" @click="toSort(scope.row)">保存排序</el-button>
                        <el-button plain type="danger" size="mini" @click="deleteProduct([scope.row.productId])">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination-box">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="getList"
                :current-page="searchParam.pageNum"
                :page-sizes="[5, 10, 20, 50]"
                :page-size="searchParam.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totals"
            ></el-pagination>
        </div>
        <select-product :dialogVisible="dialog.show" :countryCode="countryCode" @close="closeEditDialog" @confirm="confirmEditItem"></select-product>
    </div>
</template>
<script>
import common from '@/js/common/mixins.js';
import selectProduct from '../productSelect/index';
import { productsByGroup, BatchSave, modifyProductByGroup, addProductsByGroup, deleteProductsByGroup } from '@/api/newJson/pageEdit';
export default {
    data() {
        return {
            searchParam: {
                productName: '',
                productId: '',
                pageNum: 1,
                pageSize: 10,
                groupId: '',
            },
            multipleSelection: [],
            dataListId: [],
            totals: 0,
            dataList: [],
            countryCode: '',
            dialog: {
                show: false,
            },
        };
    },
    components: {
        selectProduct,
    },
    mixins: [common],
    watch: {
        multipleSelection: function() {
            let arr = [];
            for (let i in this.multipleSelection) {
                arr.push(this.multipleSelection[i].productId);
            }
            this.dataListId = arr;
        },
    },
    created() {
        this.searchParam.groupId = Number(this.$route.query.id);
        this.getList();
    },
    methods: {
        handleSizeChange(value) {
            this.searchParam.pageSize = value;
            this.getList(1);
        },
        getList(page) {
            this.searchParam.pageNum = page || this.searchParam.pageNum;
            productsByGroup(this.filterData(this.searchParam))
                .then(response => {
                    if (response.data) {
                        this.dataList = response.data;
                        this.totals = response.total;
                        console.log(response.data);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        showAddDialog() {
            this.dialog.show = true;
        },
        closeEditDialog() {
            this.dialog.show = false;
        },
        confirmEditItem(ids) {
            addProductsByGroup({
                productIds: ids,
                groupId: Number(this.searchParam.groupId),
            }).then(res => {
                if (res) {
                    this.$message.success('添加成功');
                    this.getList();
                    this.dialog.show = false;
                }
            });
        },
        changeDiscount(event, row, index) {
            var newData1 = {};
            for (var key in row) {
                newData1[key] = row[key];
            }
            newData1.showDiscount = newData1.showDiscount == 1 ? 0 : 1;
            this.dataList[index] = newData1;

            var newData2 = {};
            for (var key in row) {
                newData2[key] = row[key];
            }
            newData2.showDiscount = newData2.showDiscount == 1 ? 1 : 0;
            modifyProductByGroup({
                groupId: this.searchParam.groupId,
                sort: row.sort,
                productId: row.productId,
                showDiscount: newData2.showDiscount,
            })
                .then(res => {
                    if (res) {
                        this.$message.success('切换成功');
                        this.getList();
                    }
                })
                .catch(error => {
                    let newData = row;
                    newData.showDiscount = newData.showDiscount == 1 ? 1 : 0;
                    this.dataList[index] = newData;
                });
        },
        toSort(data) {
            modifyProductByGroup({
                groupId: this.searchParam.groupId,
                productId: data.productId,
                sort: data.sort,
                showDiscount: data.showDiscount,
            }).then(res => {
                if (res) {
                    this.$message.success('保存成功');
                    this.getList();
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
        toDeleteAll() {
            if (this.dataListId.length === 0) {
                this.$message('请先勾选商品');
                return;
            }
            this.deleteProduct(this.dataListId);
        },
        deleteProduct(ids) {
            console.log(ids);

            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    deleteProductsByGroup({
                        productIds: ids,
                        groupId: this.searchParam.groupId,
                    }).then(res => {
                        if (res) {
                            this.$message.success('删除成功');
                            this.getList();
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
.qyOptimization_product {
    width: 100%;
    height: 100%;
    background-color: #fff !important;
}
</style>
