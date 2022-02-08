<!--  -->
<template>
    <div class="add_account_dialog">
        <el-dialog v-model="dialogFormVisible" title="结算银行信息" size="medium" :before-close="closeDialog">
            <el-form :model="form" ref="form" :rules="formRule" :label-width="formLabelWidth">
                <el-form-item label="结算区间：">
                    <span>{{ startTime + '~' + endTime }}</span>
                </el-form-item>
                <el-form-item label="结算金额：">
                    <span>{{ form.notClearAmount }}</span>
                </el-form-item>
                <el-form-item label="收款银行：">
                    <span>{{ form.bankName }}</span>
                </el-form-item>
                <el-form-item label="结算人：">
                    <span>{{ form.bankPersonalName }}</span>
                </el-form-item>
                <el-form-item label="收款账户：">
                    <span>{{ form.bankCardNo }}</span>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="confirmForm('form')">确认结算</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { doClear } from '@/api/newJson/account';
export default {
    props: {
        dialogFormVisible: {
            type: Boolean,
            default: false,
        },
        timeType: {
            type: Number,
            default: 3,
        },
        startTime: {
            type: String,
        },
        endTime: {
            type: String,
        },
    },
    data() {
        return {
            formLabelWidth: '100px',
            form: {
                notClearAmount: '',
                bankCardNo: '',
                bankName: '',
                bankPersonalName: '',
                shopId: '',
                sellerId: '',
            },
        };
    },
    watch: {
        dialogFormVisible: {
            handler(val) {
                if (!val) {
                    this.form.notClearAmount = '';
                    this.form.address = '';
                    this.form.bankCardNo = '';
                    this.form.bankName = '';
                    this.form.bankPersonalName = '';
                    this.form.shopId = '';
                    this.form.sellerId = '';
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
            let params = {
                startTime: this.startTime,
                endTime: this.endTime,
                timeType: this.timeType,
                ...this.form,
            };
            doClear(this.filterData(params))
                .then(response => {
                    if (response) {
                        this.$message.success('结算成功');
                        this.$emit('confirm-success');
                    }
                })
                .catch(error => {});
        },
    },
};
</script>
<style lang="scss" scoped></style>
