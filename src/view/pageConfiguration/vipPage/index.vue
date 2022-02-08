<!--  -->
<template>
    <div class="app-container vip_page">
        <div class="head-btn-wrapper">
            <el-button
                type="primary"
                size="medium"
                plain
                v-for="(item, index) in divisionList"
                :key="item.value + index"
                :class="['btn-padding', { active: divisionId == item.value }]"
            >
                {{ item.label }}
            </el-button>
        </div>
        <div class="main-content-wrapper module_page">
            <el-tabs v-model="activePage" type="card" @tab-click="tabChange">
                <el-tab-pane v-for="(item, index) in moduleList" :label="item.title" :name="item.id" :key="item.id + index">
                    <component :is="item.keyword" :moduleId="item.id" :tableData="tableData" @confirm-edit-item="confrimEditItem"></component>
                </el-tab-pane>
            </el-tabs>
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
import { modulesList, componentsByModuleId } from '@/api/newJson/pageEdit';
import vip from './components/vipPage';
import { divisionList } from '@/data/globalData.js';
export default {
    data() {
        return {
            tableData: [],
            divisionId: 'CN^^^浙江省^^^杭州市',
            divisionList: divisionList,
            moduleList: [],
            activePage: 1,
            componentId: 'vipPage',
            queryData: {
                pageSize: 20,
                pageNum: 1,
            },
            total: 0,
        };
    },

    components: {
        vip,
    },

    computed: {},

    mounted() {
        this.getModulesList();
        this.getModulePageList(1);
    },

    methods: {
        getModulesList() {
            modulesList({
                divisionId: this.divisionId,
            })
                .then(response => {
                    console.log(response);
                    this.moduleList = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        getModulePageList(type) {
            if (type == 1) {
                this.queryData.pageNum = 1;
            }
            let params = {
                pageNum: this.queryData.pageNum,
                pageSize: this.queryData.pageSize,
                moduleId: this.activePage,
            };
            componentsByModuleId(params)
                .then(response => {
                    if (response) {
                        this.tableData = response.data;
                        this.total = response.total;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        confrimEditItem() {
            this.getModulePageList(1);
        },
        //分页
        handleCurrentChange(val) {
            this.queryData.pageNum = val;
            this.getModulePageList();
        },
        handleSizeChange(val) {
            this.queryData.pageSize = val;
            this.getModulePageList();
        },
    },
};
</script>
<style lang="scss" scoped>
.vip_page {
    width: 100%;
    height: 100%;
    background-color: #fff !important;
    .add_button {
        margin-bottom: 20px;
    }
    .head-btn-wrapper {
        background: #fff;
        padding: 10px 0;
        border-bottom: 1px solid #eee;
        margin-bottom: 10px;
        .btn-padding {
            width: 100px;
            padding: 10px 0;
            text-align: center;
        }
    }
    .module_page {
        .el-tabs {
            display: flex;
            height: 100%;
            flex-direction: column;
            :deep() .el-tabs__content {
                flex: 1;
                .el-tab-pane {
                    height: 100%;
                    display: flex;
                }
            }
        }
    }

    .el-button {
        &.active {
            color: #ffffff;
            background-color: #409eff;
            border-color: #409eff;
        }
    }
}
</style>
