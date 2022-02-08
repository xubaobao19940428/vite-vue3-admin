<!--  -->
<template>
    <div class="on_sale_dialog">
        <el-dialog v-model="dialogTableVisible" title="商品上架" :before-close="closeDialog">
            <el-table :data="gridData">
                <el-table-column label="商品ID" prop="id" align="center"></el-table-column>
                <el-table-column label="提醒" align="center">
                    <template #default="scope">
                        <span style="color:red">{{ scope.row.message }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template #default="scope">
                        <el-button type="primary" size="small" v-if="scope.row.stock == 0" @click="addProductStock">增加库存</el-button>
                        <el-button type="primary" size="small" v-else @click="confirmForm">确认上架</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="confirmForm" v-if="gridData[0] && gridData[0].stock != 0" size="small">
                        确认上架
                    </el-button>
                    <!-- <el-button type="primary" @click="addProductStock" v-else size="small">增加库存</el-button> -->
                    <el-button @click="closeDialog" size="small">取消</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        gridData: {
            type: Array,
            default: () => {
                return [];
            },
        },
        dialogTableVisible: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {};
    },

    components: {},

    computed: {},

    mounted() {},

    methods: {
        closeDialog() {
            this.$emit('close-dilaog');
        },
        addProductStock() {
            this.$router.push({
                name: 'productDetail',
                query: {
                    productId: this.gridData[0].id,
                },
            });
        },
        confirmForm() {
            this.$emit('confirm-dialog', this.gridData);
        },
    },
};
</script>
<style lang="scss" scoped></style>
