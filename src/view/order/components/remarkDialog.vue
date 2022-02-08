<!--  -->
<template>
    <div class="remark-dialog">
        <el-dialog v-model="remarkDialogVisible" :title="getLocalUseLangData('8000088')" :before-close="closeRemarkDialog">
            <el-form :model="remarkForm">
                <el-form-item :label="getLocalUseLangData('8000088')" label-width="80px">
                    <el-input v-model="remarkForm.remarkBack" autocomplete="off" type="textarea" :row="4"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closeRemarkDialog">{{ getLocalUseLangData('8000152') }}</el-button>
                    <el-button type="primary" @click="confirmRemarkDialog">{{ getLocalUseLangData('8000202') }}</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'remarkDialog',
    props: {
        remarkDialogVisible: {
            type: Boolean,
            default: false,
        },
        remarkForm: {
            type: Object,
            defalut: () => {
                return {
                    remarkBack: '',
                };
            },
        },
    },
    data() {
        return {};
    },

    components: {},

    computed: {},

    mounted() {},

    methods: {
        closeRemarkDialog() {
            this.$emit('close-remark-dilaog');
        },
        confirmRemarkDialog() {
            this.$emit('confrim-remark');
        },
    },
};
</script>
<style lang="scss" scoped></style>
