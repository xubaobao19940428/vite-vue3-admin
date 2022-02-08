<!--  -->
<template>
    <div class="add_account_dialog">
        <el-dialog v-model="dialogFormVisible" :title="title" size="medium" :before-close="closeDialog">
            <el-form :model="form" ref="form" :rules="formRule" :label-width="formLabelWidth">
                <el-form-item label="账户类型" prop="role">
                    <el-select v-model="form.role" placeholder="请选择账户类型" style="width:100%">
                        <el-option v-for="(item, index) in roleList" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商家：" prop="sellerId">
                    <el-select v-model="form.sellerId" placeholder="请选择商家" style="width:100%" @change="changeSupplier">
                        <el-option v-for="(item, index) in supplierList" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="店铺：" prop="shopId">
                    <el-select v-model="form.shopId" placeholder="请选择店铺" style="width:100%">
                        <el-option v-for="(item, index) in shopList" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="真实姓名" prop="contactName">
                    <el-input v-model="form.contactName" autocomplete="off" placeholder="请输入真实姓名"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="contactPhone">
                    <el-input v-model="form.contactPhone" autocomplete="off" placeholder="请输入手机号"></el-input>
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
import { getShops } from '@/api/newJson/shop';
export default {
    props: {
        dialogFormVisible: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: '新增店铺账户',
        },
        supplierList: {
            type: Array,
            default: () => {
                return [];
            },
        },
        roleList: {
            type: Array,
            default: () => {
                return [];
            },
        },
    },
    data() {
        return {
            formLabelWidth: '100px',
            form: {
                sellerId: '',
                shopId: '',
                role: '',
                contactPhone: '',
                contactName: '',
            },

            formRule: {
                sellerId: {
                    required: true,
                    message: '请选择对应商家',
                    trigger: 'change',
                },
                shopId: {
                    required: true,
                    message: '请选择对应店铺',
                    trigger: 'change',
                },
                role: {
                    required: true,
                    message: '请选择对应角色',
                    trigger: 'change',
                },
                contactName: {
                    required: true,
                    message: '请选择对应店铺',
                    trigger: 'blur',
                },
                contactPhone: {
                    required: true,
                    message: '请输入手机号',
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
        changeSupplier(val) {
            getShops({
                sellerId: val,
            })
                .then(response => {
                    if (response) {
                        this.shopList = response.data.data;
                        this.form.shopId = '';
                    }
                })
                .catch(error => {});
        },
    },
};
</script>
<style lang="scss" scoped></style>
