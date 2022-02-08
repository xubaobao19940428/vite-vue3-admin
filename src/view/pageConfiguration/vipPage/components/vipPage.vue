<!--  -->
<template>
    <div class="app-container">
        <div class="add_button">
            <el-button type="primary" icon="el-icon-plus" size="small" @click="addModule">新增</el-button>
        </div>
        <div class="main-content-wrapper">
            <el-table :data="tableData" border stripe style="width: 100%" height="100%">
                <el-table-column label="ID" align="center" prop="id"></el-table-column>
                <el-table-column prop="title" label="标题" align="center"></el-table-column>
                <el-table-column prop="sort" label="排序" align="center" width="300px">
                    <template #default="scope">
                        <el-input-number v-model="scope.row.sort" :min="1" controls-position="right" size="mini" />
                        <el-button size="mini" type="primary" plain style="margin-left:5px;" @click="sortComponent(scope.row)">排序</el-button>
                    </template>
                </el-table-column>

                <el-table-column label="应用站点" align="center">
                    <template #default="scope">
                        {{ returnDivision(scope.row.divisionId) }}
                    </template>
                </el-table-column>
                <el-table-column label="更新时间" align="center" width="200px">
                    <template #default="scope">
                        {{ timestampToTime(scope.row.updateTime) }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template #default="scope">
                        <el-button type="primary" size="mini" @click="eidtVipPage(scope.row)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="deleteVipPage(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <edit-dialog
            :dialogVisible="dialog.show"
            :propParam="dialog.param"
            @close="closeEditDialog"
            @confirm="confirmEditItem"
            :moduleId="moduleId"
        ></edit-dialog>
    </div>
</template>

<script>
import editDialog from './vipPageDialog';
import { modifyComponent, deleteComponent } from '@/api/newJson/pageEdit';
export default {
    props: {
        moduleId: Number,
        tableData: {
            type: Array,
            default: () => {
                return [];
            },
        },
    },
    data() {
        return {
            total: 0,
            dialog: {
                show: false,
                param: {},
            },
            divisionList: [
                {
                    label: '杭州站',
                    value: 'CN^^^浙江省^^^杭州市',
                },
            ],
        };
    },

    components: {
        editDialog,
    },

    computed: {},

    mounted() {},

    methods: {
        addModule() {
            this.dialog.param = {};
            this.dialog.show = true;
        },
        closeEditDialog() {
            this.dialog.show = false;
        },
        confirmEditItem() {
            this.$emit('confirm-edit-item');
            this.dialog.show = false;
        },
        returnDivision(divisionId) {
            let str = '';
            this.divisionList.map(item => {
                if ((item.divisionId = divisionId)) {
                    str = item.label;
                    return str;
                }
            });
            return str;
        },
        eidtVipPage(data) {
            this.dialog.param = {};
            this.$nextTick(() => {
                Object.assign(this.dialog.param, JSON.parse(JSON.stringify(data)));
            });
            this.dialog.show = true;
        },
        sortComponent(data) {
            modifyComponent(data)
                .then(res => {
                    if (res) {
                        this.$message.success('成功');
                        this.$emit('confirm-edit-item');
                    }
                })
                .catch(error => {});
        },
        //删除
        deleteVipPage(data) {
            this.$confirm('此操作将永久删除当前组件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    deleteComponent({ id: data.id }).then(res => {
                        if (res) {
                            this.$message.success('删除成功');
                            this.$emit('confirm-edit-item');
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
.add_button {
    margin-bottom: 20px;
}
</style>
