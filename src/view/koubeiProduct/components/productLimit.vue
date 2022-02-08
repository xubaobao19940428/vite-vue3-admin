<!--  -->
<template>
    <div class="product_price">
        <el-card>
            <p class="product_basic_title">限购</p>
            <div class="base_info_content">
                <el-form ref="limitForm" :model="purchaseLimit" label-width="140px" class="demo-baseInfoForm">
                    <el-form-item label="单人累积购买件数：" prop="totalLimit">
                        <el-input-number v-model="purchaseLimit.totalLimit" style="width:200px" :min="0" :step="1" step-strictly></el-input-number>
                        <div class="tips">
                            正整数，不录入代表不限制
                        </div>
                    </el-form-item>

                    <el-form-item label="单次最大购买件数：" prop="onceLimit">
                        <el-input-number v-model="purchaseLimit.onceLimit" style="width:200px" :min="0" :step="1" step-strictly></el-input-number>
                        <div class="tips">
                            正整数，不录入代表不限制
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
    data() {
        return {
            checkList: [],
            purchaseLimit: {
                totalLimit: '',
                onceLimit: '',
            },
            priceFormRule: {
                listPrice: {
                    required: true,
                    message: '请输入划线价',
                    trigger: 'blur',
                },
                salePrice: {
                    required: true,
                    message: '请输入正式价',
                    trigger: 'blur',
                },
                commission: {
                    required: true,
                    message: '请输入佣金率',
                    trigger: 'blur',
                },
                stock: {
                    required: true,
                    message: '请输入库存',
                    trigger: 'blur',
                },
            },
        };
    },

    components: {},

    computed: {},

    mounted() {},

    methods: {},
});
</script>
<style lang="scss" scoped>
.product_price {
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
