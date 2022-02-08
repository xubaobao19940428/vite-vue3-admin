<!--  -->
<template>
	<div class="add_product_koubei">
		<!-- <div v-if="step === 1">
            <back-category pageName="product" @on-category-link-change="onCategoryLinkChange" @onChangeType="changeType"></back-category>
            <div class="category-info">
                已选：
                <span>{{ categoryLinkStr }}</span>
                <el-button :disabled="disabledStartCreate" type="primary" class="add-btn" @click="startCreat">开始创建</el-button>
            </div>
        </div> -->
		<div class="product_detail_all" ref="productInfo">
			<div
				class="product_footer"
				:style="{ width: operateAreaWidth + 'px' }"
				v-if="type != 'check'"
			>
				<el-button type="success" size="small" @click="addProductInfo">
					发布
				</el-button>
				<el-button
					type="primary"
					size="small"
					@click="draftThirdProductDetail"
				>
					保存
				</el-button>
				<el-button type="info" size="small" @click="cancelProduct">
					取消
				</el-button>
			</div>
			<!--基本信息-->
			<productBaseInfo
				:supplierList="supplierList"
				ref="productBaseInfo"
			></productBaseInfo>
			<!--商品参数-->
			<productDetail ref="productDetail"></productDetail>
			<!--服务承诺-->
			<productService ref="productService"></productService>
			<!--商品价格-->
			<productAttribute ref="productAttribute"></productAttribute>
			<!--限购-->
			<productLimit ref="productLimit"></productLimit>
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue'
import _ from 'lodash'
import productBaseInfo from './components/productBasicInfo'
import productDetail from './components/productDetail'
import productService from './components/productService'
import productAttribute from './components/productAttribute'
import productLimit from './components/productLimit'
import { getSellers } from '@/api/newJson/shop'
import {
	addProduct,
	productDetailInfo,
	updateProduct,
	thirdDetail,
	draftThirdProduct,
} from '@/api/newJson/product'
export default defineComponent({
	data() {
		return {
			operateAreaWidth: 1400, //初始化宽度
			step: 2, // 步骤 1：选择类目、2：商品编辑
			categoryLinkStr: '',
			disabledStartCreate: false,
			productData: {},
			productId: '',
			type: 'add',
			supplierList: [],
			outerId: '',
			city: '',
			plactform: 1,
		}
	},

	components: {
		// backCategory,
		productBaseInfo,
		productDetail,
		productService,
		productAttribute,
		productLimit,
	},

	computed: {},

	mounted() {
		window.addEventListener('resize', _.throttle(this.onResize, 100))

		if (this.$route.query) {
			this.city = this.$route.query.city
			this.outerId = this.$route.query.outerId
			this.getProductDetail()
		}
		this.calculateWidth()
		this.getSellersList({
			pageNum: 1,
			pageSize: 1000,
		})
	},

	methods: {
		calculateWidth() {
			this.$nextTick(() => {
				if (this.$refs.productInfo) {
					this.operateAreaWidth = this.$refs.productInfo.clientWidth
				}
			})
		},
		onResize() {
			this.calculateWidth()
		},
		//获取商品详情
		getProductDetail() {
			thirdDetail({
				city: this.city,
				outerId: this.outerId,
				plactform: 1,
			})
				.then((response) => {
					if (response) {
						this.editBaseInfo(response.data)
						this.editService(response.data)
						this.editProductPrice(response.data)
						this.editProductDetail(response.data)
						this.editProductLimit(response.data)
					}
				})
				.catch((error) => {
					console.log(error)
				})
		},
		editBaseInfo(data) {
			// this.$refs['productBaseInfo'].changeSupplier(data.sellerId, 'edit');
			this.$refs['productBaseInfo'].baseInfoForm.productType =
				data.productType || 1
			this.$refs['productBaseInfo'].baseInfoForm.categoryId =
				data.categoryId
			this.$refs['productBaseInfo'].baseInfoForm.shelveStatus =
				data.shelveStatus || 2
			this.$refs['productBaseInfo'].baseInfoForm.needConsume =
				data.needConsume || 1 //是否需要核销
			this.$refs['productBaseInfo'].baseInfoForm.sellerId = data.sellerId //商家Id
			this.$refs['productBaseInfo'].baseInfoForm.vipDisplayOnly =
				data.vipDisplayOnly
			this.$refs['productBaseInfo'].baseInfoForm.vipOrderOnly =
				data.vipOrderOnly || 0
			//
			// this.$refs['productBaseInfo'].baseInfoForm.shopIds = data.shopInfos.map(item => {
			//     return item.shopId;
			// }); //店铺Id
		},
		editService(data) {
			this.$refs['productService'].promiseLise = data.promiseLise || []
			// if (data.promiseLise && data.promiseLise.includes('过期退')) {
			//     this.$refs['productService'].expireTime = data.expireTime;
			// }
		},
		editProductPrice(data) {
			this.$refs['productAttribute'].priceForm.listPrice =
				data.listPrice || 0.0
			this.$refs['productAttribute'].priceForm.salePrice =
				data.salePrice || 0.0
			this.$refs['productAttribute'].priceForm.commission =
				data.commission || 0.0
			this.$refs['productAttribute'].priceForm.stock = data.stock || 0
			this.$refs['productAttribute'].priceForm.thirdStock =
				data.thirdStock || 0
			this.$refs['productAttribute'].priceForm.thirdSalePrice =
				data.thirdSalePrice
			this.$refs['productAttribute'].priceForm.thirdCommissionRate =
				data.thirdCommissionRate
			this.$refs['productAttribute'].priceForm.originalPrice =
				data.originalPrice
			this.$refs['productAttribute'].priceForm.thirdListPrice =
				data.thirdListPrice

			this.$refs['productAttribute'].priceForm.purchasePrice =
				data.purchasePrice || 0
		},
		//回显商品参数
		editProductDetail(data) {
			this.$refs['productDetail'].detailForm.title = data.title
			this.$refs['productDetail'].detailForm.useTimes = data.useTimes || 1
			this.$refs['productDetail'].detailForm.detail = data.detail
			this.$refs['productDetail'].detailForm.descriptionImgs =
				data.descriptionImgs || []
			this.$refs['productDetail'].detailForm.description =
				data.description
			this.$refs['productDetail'].detailForm.rule = data.rule
			this.$refs['productDetail'].editorValue = data.rule
			this.$refs['productDetail'].detailForm.detailList =
				data.detailList || []
			this.$refs['productDetail'].detailForm.restDayAvailable =
				data.restDayAvailable
			if (!data.expireStart) {
				this.$refs['productDetail'].detailForm.timeList = [
					new Date().getTime(),
					new Date().getTime(),
				]
			} else {
				this.$refs['productDetail'].detailForm.timeList = [
					data.expireStart,
					data.expireEnd,
				]
			}

			this.$refs['productDetail'].detailForm.cover = data.cover
			this.$refs['productDetail'].detailForm.postCover =
				data.postCover || ''
			if (!data.serviceTime) {
				this.$refs['productDetail'].detailForm.serviceTime = {
					firstStart: '',
					firstEnd: '',
					secondStart: '',
					secondEnd: '',
				}
			} else {
				this.$refs['productDetail'].detailForm.serviceTime =
					data.serviceTime
			}

			this.$refs['productDetail'].videoInfo.src = data.video || ''
		},
		//回显限购
		editProductLimit(data) {
			console.log(data)
			if (data.purchaseLimit) {
				this.$refs['productLimit'].purchaseLimit.totalLimit =
					data.purchaseLimit.totalLimit
				this.$refs['productLimit'].purchaseLimit.onceLimit =
					data.purchaseLimit.onceLimit
			}
		},
		//获取商家列表
		getSellersList(params) {
			getSellers(params)
				.then((response) => {
					if (response) {
						this.supplierList = response.data.data
					}
				})
				.catch((error) => {})
		},
		draftThirdProductDetail() {
			let params = {
				...this.$refs['productBaseInfo'].baseInfoForm,
				...this.$refs['productAttribute'].priceForm,
				...this.$refs['productDetail'].detailForm,
				rule: this.$refs['productDetail'].richHtml,
				video: this.$refs['productDetail'].videoInfo.src,
				purchaseLimit: this.$refs['productLimit'].purchaseLimit,
				promiseLise: this.$refs['productService'].promiseLise,
			}
			params.outerId = this.outerId
			draftThirdProduct(params)
				.then((response) => {
					if (response) {
						this.$message.success('草稿成功')
						this.$router.push({
							name: 'koubeiProduct',
							query: {
								active: 'featuredProduct',
								city: this.city,
							},
						})
					}
				})
				.catch((error) => {
					console.log(error)
				})
		},
		//保存为正式商品
		addProductInfo() {
			let validorArr = []
			validorArr.push(this.$refs['productBaseInfo'].validateBaseInfo())
			validorArr.push(this.$refs['productDetail'].validateDetail())
			validorArr.push(this.$refs['productAttribute'].validatePriceForm())
			Promise.all(validorArr)
				.then((data) => {
					if (data) {
						let params = {
							...this.$refs['productBaseInfo'].baseInfoForm,
							...this.$refs['productAttribute'].priceForm,
							...this.$refs['productDetail'].detailForm,
							video: this.$refs['productDetail'].videoInfo.src,
							purchaseLimit:
								this.$refs['productLimit'].purchaseLimit,
							promiseLise:
								this.$refs['productService'].promiseLise,
							city: this.city,
							platform: 1,
							outerId: this.outerId,
						}

						if (
							this.$refs['productService'].promiseLise.includes(
								'过期退'
							)
						) {
							// params.expireTime = Number(this.$refs['productService'].expireTime);
						}

						addProduct(params)
							.then((response) => {
								if (response) {
									this.$message.success('添加成功')
									this.$router.push({
										name: 'koubeiProduct',
										query: {
											active: 'featuredProduct',
											city: this.city,
										},
									})
								}
							})
							.catch((error) => {
								console.log(error)
							})
					}
				})
				.catch((error) => {
					console.log(error)
				})
		},
		cancelProduct() {
			this.$router.push({
				name: 'koubeiProduct',
				query: {
					active: 'featuredProduct',
					city: this.city,
				},
			})
		},
	},
})
</script>
<style lang="scss" scoped>
.add_product_koubei {
	position: relative;
	overflow: hidden;
	width: 100%;
	background: #eff0f4;
	.product_detail_all {
		position: relative;
		box-sizing: border-box;
		overflow-y: scroll;
		width: 100%;
		height: 100%;
		padding-top: 60px;
		.product_footer {
			position: fixed;
			top: 60px;
			z-index: 2000;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			box-sizing: border-box;
			width: 100%;
			height: 50px;
			padding-right: 20px;
			background: #fff;
			box-shadow: var(--el-box-shadow-light);
			border-radius: 5px;
		}
	}
	.category-info {
		width: 850px;
		margin: 0 auto;
		margin-top: 30px;
		span {
			color: #409eff;
		}
		.add-btn {
			float: right;
			width: 200px;
		}
	}
}
</style>
