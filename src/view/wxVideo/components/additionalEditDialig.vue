<!--  -->
<template>
    <div class="additional_edit_wx_product">
        <el-dialog v-model="dialogFormVisible" title="额外属性编辑" size="medium" :before-close="closeDialog" width="500px">
            <el-form :model="form" ref="form" :rules="formRule" :label-width="formLabelWidth">
                <!-- <el-form-item label="账户类型" prop="role">
                    <el-select v-model="form.role" placeholder="请选择账户类型" style="width:200px">
                        <el-option v-for="(item, index) in roleList" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="库存" prop="stock">
                    <el-input-number v-model="form.stock" :min="0" style="width:200px"></el-input-number>
                </el-form-item>
                <el-form-item label="价格" prop="salePrice">
                    <el-input-number v-model="form.salePrice" :min="0" :precision="2" style="width:200px"></el-input-number>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closeDialog">取消</el-button>
                    <el-button type="primary" @click="confirmForm('form')">确定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        dialogFormVisible: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            formLabelWidth: '100px',
            form: {
                productId: null,
                salePrice: '',
                stock: '',
                brandId: '2100000000',
                cateId: '6764',
            },

            formRule: {
                stock: {
                    required: true,
                    message: '请输入库存',
                    trigger: 'blur',
                },
                salePrice: {
                    required: true,
                    message: '请输入价格',
                    trigger: 'blur',
                },
            },
            shopList: [],
        };
    },
    watch: {
        dialogFormVisible: {
            handler(val) {
                if (!val) {
                    this.resetForm();
                }
            },
            deep: true,
        },
    },
    components: {},

    computed: {},

    mounted() {},

    methods: {
        closeDialog() {
            this.$emit('close-dialog');
        },
        resetForm() {
            this.form.productId = null;
            this.$refs['form'].resetFields();
        },
        confirmForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$emit('confirm-form', this.form);
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    },
};
</script>
<style lang="scss" scoped></style>
