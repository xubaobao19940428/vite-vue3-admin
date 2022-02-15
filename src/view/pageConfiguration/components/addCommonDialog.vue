<!--  -->
<template>
    <div class="add_account_dialog" >
        <el-dialog v-model="dialogFormVisible" v-el-drag-dialog :title="title" size="medium" :before-close="closeDialog">
            <el-form :model="form" ref="form" :rules="formRule" :label-width="formLabelWidth">
                <el-form-item label="配置类型" prop="configType">
                    <el-select v-model="form.configType" placeholder="请选择账户类型" style="width:100%">
                        <el-option v-for="(item, index) in configTypeList" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="内容" prop="configValue">
                    <el-input v-model="form.configValue" autocomplete="off"  placeholder="请输入内容用英文,隔开" type="textarea"></el-input>
                    <div class="tips">
                        内容请用英文,隔开
                    </div>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="form.remark" autocomplete="off" placeholder="请输入备注" type="textarea"></el-input>
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
        title: {
            type: String,
            default: '新增店铺账户',
        },
    },
    data() {
        return {
            formLabelWidth: '100px',
            form: {
                id: null,
                configType: 1,
                configValue: '',
                remark: '',
            },
            configTypeList: [
                {
                    label: '商品限购配置',
                    value: 1,
                },
            ],
            formRule: {
                configType: {
                    required: true,
                    message: '请选择配置类型',
                    trigger: 'change',
                },
                configValue: {
                    required: true,
                    message: '请输入内容',
                    trigger: 'blur',
                },
            },
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

    mounted() {
        console.log(this)
    },

    methods: {
        closeDialog() {
            this.$emit('close-dialog');
        },
        resetForm() {
            this.form.id = null;
            this.form.remark = '';
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
        dragDialog(){
            console.log(this)
        }
    },
};
</script>
<style lang="scss" scoped></style>
