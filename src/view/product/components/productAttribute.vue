<!--  -->
<template>
    <div class="product_price">
        <el-card>
            <p class="product_basic_title">商品价格</p>
            <div class="base_info_content">
                <el-form ref="priceForm"
                         :model="priceForm"
                         :rules="priceFormRule"
                         label-width="120px"
                         class="demo-baseInfoForm">
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="划线价："
                                          prop="listPrice">
                                <el-input-number v-model="priceForm.listPrice"
                                                 style="width:200px"
                                                 :min="0"
                                                 :precision="2"></el-input-number>
                            </el-form-item>
                            <el-form-item label="正式价："
                                          prop="salePrice">
                                <el-input-number v-model="priceForm.salePrice"
                                                 style="width:200px"
                                                 :min="0"
                                                 :precision="2"></el-input-number>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="佣金率："
                                          prop="commission">
                                <el-input-number v-model="priceForm.commission"
                                                 style="width:200px"
                                                 :min="0"
                                                 :step="0.01"
                                                 :precision="2"></el-input-number>
                            </el-form-item>

                            <el-form-item label="库存："
                                          prop="stock">
                                <el-input-number v-model="priceForm.stock"
                                                 style="width:200px"
                                                 :min="0"
                                                 :step="1"
                                                 step-strictly></el-input-number>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="商家结算价："
                                          prop="purchasePrice">
                                <el-input-number v-model="priceForm.purchasePrice"
                                                 style="width:200px"
                                                 :min="0"
                                                 :step="0.01"
                                                 :precision="2"></el-input-number>
                            </el-form-item>
                        </el-col>

                    </el-row>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
	data() {
		return {
			checkList: [],
			priceForm: {
				listPrice: 0,
				salePrice: 0,
				commission: 0,
				stock: 0,
				purchasePrice: 0,
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
				purchasePrice: {
					required: true,
					message: '请输入商家结算价',
					trigger: 'blur',
				},
			},
		}
	},

	components: {},

	computed: {},

	mounted() {},

	methods: {
		validatePriceForm() {
			let _this = this
			return new Promise((resolve, reject) => {
				this.$refs['priceForm'].validate((valid) => {
					if (valid) {
						resolve(this.priceForm)
					} else {
						reject(false)
					}
				})
			})
		},
	},
})
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
