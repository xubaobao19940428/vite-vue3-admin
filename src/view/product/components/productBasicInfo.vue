<!--  -->
<template>
	<div class="product_basic_info">
		<el-card>
			<p class="product_basic_title">基本信息</p>
			<div class="base_info_content">
				<el-form
					ref="baseInfoForm"
					:model="baseInfoForm"
					:rules="rules"
					label-width="170px"
					class="demo-baseInfoForm"
				>
					<el-form-item label="商品类目：" prop="categoryId">
						<el-cascader
							class="mar-b-20"
							style="width: 300px"
							v-model="baseInfoForm.categoryId"
							:show-all-levels="false"
							:props="{
								value: 'subType',
								label: 'subTypeName',
								children: 'subTypes',
								emitPath: false,
							}"
							:options="categoryData"
							@change="changeCategory"
						></el-cascader>
					</el-form-item>
					<el-row :getter="20">
						<el-col :span="12">
							<el-form-item label="商品分类：" prop="productType">
								<el-select
									v-model="baseInfoForm.productType"
									placehodler="请选择商品分类"
									style="width: 300px"
								>
									<el-option
										v-for="(type, index) in productTypeList"
										:key="index"
										:label="type.label"
										:value="type.value"
									></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item
								label="券包Id："
								prop="couponPackId"
								v-if="baseInfoForm.productType == 3"
							>
								<el-input
									v-model="baseInfoForm.couponPackId"
									placeholder="请输入券包Id"
								></el-input>
							</el-form-item>
						</el-col>
					</el-row>

					<el-form-item label="适用商家：" prop="sellerId">
						<el-select
							v-model="baseInfoForm.sellerId"
							@change="changeSupplier($event, type)"
							style="width: 300px"
						>
							<el-option
								v-for="(item, index) in supplierList"
								:key="index"
								:label="item.name"
								:value="item.id"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="适用店铺：" prop="shopIds">
						<el-select
							multiple
							v-model="baseInfoForm.shopIds"
							style="width: 300px"
						>
							<el-option
								v-for="(item, index) in shopList"
								:key="index"
								:label="item.name"
								:value="item.id"
							></el-option>
						</el-select>
					</el-form-item>
					<div class="inline-form-item">
						<el-form-item
							label="商品是否需要核销："
							prop="needConsume"
						>
							<el-radio-group v-model="baseInfoForm.needConsume">
								<el-radio :label="1">需要核销</el-radio>
								<el-radio :label="0">不需要核销</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item
							label="商品是否是达人专享："
							prop="vipOrderOnly"
						>
							<el-radio-group v-model="baseInfoForm.vipOrderOnly">
								<el-radio :label="1">是</el-radio>
								<el-radio :label="0">不是</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="商品展示：">
							<el-checkbox
								v-model="baseInfoForm.vipDisplayOnly"
								:true-label="1"
								:false-label="0"
								>仅达人可见</el-checkbox
							>
						</el-form-item>
					</div>
					<div class="inline-form-d">
						<el-form-item label="上下架状态：" prop="shelveStatus">
							<el-radio-group v-model="baseInfoForm.shelveStatus">
								<el-radio :label="1">上架</el-radio>
								<el-radio :label="2">下架</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item
							label="是否是微信商品："
							prop="shelveStatus"
						>
							<el-radio-group v-model="baseInfoForm.wxActivity">
								<el-radio :label="true">是</el-radio>
								<el-radio :label="false">不是</el-radio>
							</el-radio-group>
						</el-form-item>
					</div>

					<!--<el-form-item label="是否需要地址：" prop="addressRequire">
                        <el-radio-group v-model="baseInfoForm.addressRequire">
                            <el-radio :label="0">不需要</el-radio>
                            <el-radio :label="1">需要</el-radio>
                        </el-radio-group>
                    </el-form-item>-->
				</el-form>
			</div>
		</el-card>
	</div>
</template>

<script>
import { defineComponent } from 'vue'
import categoryData from '@/data/category.json'
// import { VueDraggableNext } from 'vue-draggable-next';
// import { uploadFileRequest } from '@/api/newJson/file';
import { getShops } from '@/api/newJson/shop'
const MAX_ROTATION_LENGTH = 10
export default defineComponent({
	props: {
		basciInfoTitle: {
			type: String,
			default: '',
		},
		supplierList: {
			type: Array,
			default: () => {
				return []
			},
		},
	},
	data() {
		return {
			categoryData: categoryData,
			IMG_ACCEPT: '.jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP',
			baseInfoForm: {
				productType: '',
				shelveStatus: 1,
				needConsume: 1, //是否需要核销
				sellerId: '', //商家Id
				shopIds: [], //店铺Id
				vipDisplayOnly: 0,
				vipOrderOnly: 0,
				categoryId: '',
				addressRequire: 0,
				wxActivity: false,
				couponPackId: '',
			},
			shopList: [],
			dragging: false,
			productTypeList: [
				{
					label: '券类商品',
					value: 1,
				},
				{
					label: 'VIP商品',
					value: 2,
				},
				{
					label: '券包商品',
					value: 3,
				},
			],
			rules: {
				sellerId: [
					{
						required: true,
						trigger: 'change',
					},
				],
				shopIds: [
					{
						required: true,
						trigger: 'change',
					},
				],
				shelveStatus: {
					required: true,
					trigger: 'change',
				},
				needConsume: {
					required: true,
					trigger: 'change',
				},
				productType: {
					required: true,
					trigger: 'change',
				},
				vipOrderOnly: {
					required: true,
					trigger: 'change',
				},
				categoryId: {
					required: true,
					trigger: 'change',
				},
				addressRequire: {
					required: true,
					trigger: 'change',
				},
				wxActivity: {
					required: true,
					trigger: 'change',
				},
				couponPackId: {
					required: true,
					message: '请输入券包Id',
					trigger: 'blur',
				},
			},
		}
	},

	components: {},

	computed: {},

	mounted() {},

	methods: {
		//得到选择商家所有店铺
		changeSupplier(val, type) {
			console.log(val, type)
			getShops({
				sellerId: val,
				status: 1,
			})
				.then((response) => {
					if (response) {
						if (type != 'edit') {
							this.baseInfoForm.shopIds = []
						}
						this.shopList = response.data.data
					}
				})
				.catch((error) => {})
		},
		validateBaseInfo() {
			let _this = this
			return new Promise((resolve, reject) => {
				this.$refs['baseInfoForm'].validate((valid) => {
					if (valid) {
						resolve(this.baseInfoForm)
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
.product_basic_info {
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
			.image-show {
				display: flex;
				flex-wrap: wrap;
				width: 800px;
				.darg-item {
					height: 100px;
					width: 100px;
				}
				.nodrag {
					user-select: none;
					user-drag: none;
				}
				.image-box {
					position: relative;
					height: 100px;
					width: 100px;
					margin: 10px;
					line-height: 170px;
					text-align: center;
					color: #fff;
					transition: transform 0.3s;
					.image-item {
						width: 100px;
						height: 100px;
						border: 1px dashed #c0ccda;
						border-radius: 6px;
						padding: 4px;
					}
					.media-img {
						width: 100%;
					}
					&:hover {
						.operate-area {
							opacity: 0.5;
							transition: opacity 0.3s;
							border-bottom-left-radius: 6px;
							border-bottom-right-radius: 6px;
						}
						cursor: move;
					}
					.operate-area {
						position: absolute;
						opacity: 0;
						background: #000000;
						height: 40px;
						line-height: 40px;
						bottom: 0;
						left: 0;
						width: 100%;
						padding: 0 10px;
						box-sizing: border-box;
						color: #fff;
						font-size: 14px;
						span {
							cursor: pointer;
						}
					}
				}
				.upload-box {
					height: 100px;
					width: 100px;
					margin: 10px;
					:deep().el-upload--picture-card {
						height: 100px;
						width: 100px;
						line-height: 100px;
					}
				}
			}
		}
	}
	.inline-form-item {
		display: flex;
		justify-content: space-around;
	}
	.inline-form-d {
		display: flex;
	}
}
</style>
