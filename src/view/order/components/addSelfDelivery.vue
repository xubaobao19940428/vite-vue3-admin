<!--  -->
<template>
    <div class="add_self_delivery_dialog">
        <el-dialog
            v-model="selfDeliveryVisible"
            :title="type == 'add' ? getLocalUseLangData('8000146') : getLocalUseLangData('8000147')"
            width="70%"
            :before-close="handleClose"
        >
            <el-form ref="selfDeliveryForm" :model="selfDeliveryForm" label-width="120px" :rules="selfDeliveryFormRule">
                <el-form-item :label="getLocalUseLangData('8000148') + '：'" prop="attention">
                    <el-input v-model="selfDeliveryForm.attention" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item :label="getLocalUseLangData('8000109') + '：'" prop="mobile">
                    <el-input style="width:100%;" v-model.number="selfDeliveryForm.mobile" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item :label="getLocalUseLangData('8000149') + '：'" prop="address">
                    <el-input v-model="selfDeliveryForm.address" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item :label="getLocalUseLangData('8000150') + '：'">
                    <el-time-select
                        v-model="selfDeliveryForm.serviceStartTime"
                        :max-time="selfDeliveryForm.serviceEndTime"
                        placeholder="Start time"
                        start="08:00"
                        step="00:60"
                        end="24:00"
                    ></el-time-select>
                    <el-time-select
                        style="margin-left:10px;"
                        v-model="selfDeliveryForm.serviceEndTime"
                        :min-time="selfDeliveryForm.serviceStartTime"
                        placeholder="End time"
                        start="08:00"
                        step="00:60"
                        end="24:00"
                    ></el-time-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="handleClose">{{ getLocalUseLangData('8000152') }}</el-button>
                    <el-button type="primary" @click="confirmSelf('selfDeliveryForm')">{{ getLocalUseLangData('8000151') }}</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
// import { defineComponent } from 'vue';
export default {
    props: {
        selfDeliveryVisible: {
            type: Boolean,
            default: false,
        },
        selfDeliveryForm: {
            type: Object,
            default: {},
        },
        type: {
            type: String,
            default: 'add',
        },
    },
    data() {
        return {
            selfDeliveryFormRule: {
                attention: [{ required: true, trigger: 'blur' }],
                mobile: [{ required: true, trigger: 'blur' }],
                address: [{ required: true, trigger: 'blur' }],
            },
        };
    },
    watch: {
        selfDeliveryVisible: {
            handler(newVal, oldVal) {
                if (!newVal) {
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
        confirmSelf(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$emit('self-success');
                } else {
                    return false;
                }
            });
        },
        resetForm() {
            this.$refs['selfDeliveryForm'].resetFields();
        },
        handleClose() {
            this.$emit('close-dialog');
        },
    },
};
</script>
<style lang="scss" scoped>
:deep().el-input-number__decrease {
    display: none;
}
:deep().el-input-number__increase {
    display: none;
}
:deep().el-input-number {
    .el-input__inner {
        padding: 0 15px;
        text-align: left;
    }
}
</style>
