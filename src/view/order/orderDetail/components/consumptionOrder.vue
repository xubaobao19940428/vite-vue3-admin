<template>
    <div>
        <el-form label-width="120px" inline>
            <el-form-item label="消费店家：">{{ receiverInfo.shopName }}</el-form-item>
            <el-form-item label="核销时间：">{{ receiverInfo.verifyTime ? timestampToTime(receiverInfo.verifyTime) : '--' }}</el-form-item>
            <el-form-item label="核销人员：">{{ receiverInfo.verifyUser }}</el-form-item>
            <!-- <el-form-item label="抖音昵称：">{{ receiverInfo.remark }}</el-form-item> -->
        </el-form>
    </div>
</template>
<script>
export default {
    props: {
        receiverInfo: Object,
        orderInfo: Object,
        orderNo: [String, Number],
    },
    components: {
        // appAddress,
    },
    data() {
        return {};
    },
    methods: {},
};
</script>
