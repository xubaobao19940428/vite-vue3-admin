<!--  -->
<template>
    <div class="product_service">
        <el-card>
            <p class="product_basic_title">服务承诺</p>
            <div class="base_info_content">
                <el-checkbox-group v-model="promiseLise">
                    <el-checkbox label="免预约">免预约</el-checkbox>
                    <el-checkbox label="过期退">过期退</el-checkbox>
                    <!-- <el-input-number
                        v-if="promiseLise.includes('过期退')"
                        v-model="expireTime"
                        size="small"
                        style="width:200px;margin-right:20px;"
                        :min="1"
                        :step="1"
                        step-strictly
                    ></el-input-number> -->

                    <el-checkbox label="随时退">随时退</el-checkbox>
                </el-checkbox-group>
            </div>
        </el-card>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
    data() {
        return {
            promiseLise: [],
            // expireTime: 1,
        };
    },

    components: {},

    computed: {},

    mounted() {},

    methods: {},
});
</script>
<style lang="scss" scoped>
.product_service {
    margin-top: 10px;
    .el-card {
        :deep().el-card__body {
            padding: 0;
        }
        .product_basic_title {
            margin-bottom: 20px;
            height: 30px;
            border-left: 4px solid #409eff;
            line-height: 30px;
            padding-left: 20px;
            box-sizing: border-box;
        }
        .base_info_content {
            padding: 0 20px 20px;
            box-sizing: border-box;
        }
    }
}
</style>
