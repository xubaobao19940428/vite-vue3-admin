<template>
    <div>
        <el-form label-width="120px" inline>
            <el-form-item label="UserId：">{{ receiverInfo.userId }}</el-form-item>
            <el-form-item label="手机号：">{{ receiverInfo.tel }}</el-form-item>
            <el-form-item label="昵称：">{{ receiverInfo.userNick }}</el-form-item>
            <!-- <el-form-item label="抖音昵称：">{{ receiverInfo.remark }}</el-form-item> -->
        </el-form>
    </div>
</template>
<script>
export default {
    props: {
        receiverInfo: Object,
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
