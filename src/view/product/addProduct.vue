<!--  -->
<template>
	<div class="add_product">
		<!-- <div v-if="step === 1">
			<back-category
				pageName="product"
				@on-category-link-change="onCategoryLinkChange"
				@onChangeType="changeType"
			></back-category>
			<div class="category-info">
				已选：
				<span>{{ categoryLinkStr }}</span>
				<el-button
					:disabled="disabledStartCreate"
					type="primary"
					class="add-btn"
					@click="startCreat"
					>开始创建</el-button
				>
			</div>
		</div> -->
		<div
			class="product_detail_all"
			ref="productInfo"
			:style="{ paddingTop: type != 'check' ? '60px' : '0' }"
		>
			<div
				class="product_footer"
				:style="{ width: operateAreaWidth + 'px' }"
				v-if="type != 'check'"
			>
				<el-button type="primary" size="small" @click="addProduct">
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
// import backCategory from './productCategory.vue'
import productBaseInfo from './components/productBasicInfo.vue'
import productDetail from './components/productDetail.vue'
import productService from './components/productService.vue'
import productAttribute from './components/productAttribute.vue'
import productLimit from './components/productLimit.vue'
import { getSellers } from '@/api/newJson/shop'
import { packStock } from '@/api/newJson/coupon.js'
import {
	addProduct,
	productDetailInfo,
	updateProduct,
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
			platform: 0,
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
		this.type = this.$route.query.type
		if (this.$route.query.productId) {
			this.getProductDetail(this.$route.query.productId)
		}
		if (this.$route.query.platform) {
			this.platform = this.$route.query.platform
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
		getProductDetail(id) {
			productDetailInfo({
				productId: Number(id),
			})
				.then((response) => {
					if (response) {
						this.platform = response.data.platform || 0
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
			this.$refs['productBaseInfo'].changeSupplier(data.sellerId, 'edit')
			this.$refs['productBaseInfo'].baseInfoForm.productType =
				data.productType
			if (data.productType == 3) {
				this.$refs['productBaseInfo'].baseInfoForm.couponPackId =
					data.couponPackId.toString()
			}
			this.$refs['productBaseInfo'].baseInfoForm.categoryId =
				data.categoryId
			this.$refs['productBaseInfo'].baseInfoForm.shelveStatus =
				data.shelveStatus
			this.$refs['productBaseInfo'].baseInfoForm.needConsume =
				data.needConsume //是否需要核销
			this.$refs['productBaseInfo'].baseInfoForm.sellerId = data.sellerId //商家Id
			this.$refs['productBaseInfo'].baseInfoForm.vipDisplayOnly =
				data.vipDisplayOnly
			this.$refs['productBaseInfo'].baseInfoForm.vipOrderOnly =
				data.vipOrderOnly
			this.$refs['productBaseInfo'].baseInfoForm.addressRequire =
				data.addressRequire
			this.$refs['productBaseInfo'].baseInfoForm.wxActivity =
				data.wxActivity || false

			this.$refs['productBaseInfo'].baseInfoForm.shopIds =
				data.shopInfos.map((item) => {
					return item.shopId
				}) //店铺Id
		},
		editService(data) {
			this.$refs['productService'].promiseLise = data.promiseLise || []
			// if (data.promiseLise && data.promiseLise.includes('过期退')) {
			//     this.$refs['productService'].expireTime = data.expireTime;
			// }
		},
		editProductPrice(data) {
			this.$refs['productAttribute'].priceForm.listPrice = data.listPrice
			this.$refs['productAttribute'].priceForm.salePrice = data.salePrice
			this.$refs['productAttribute'].priceForm.commission =
				data.commission
			this.$refs['productAttribute'].priceForm.stock = data.stock
			this.$refs['productAttribute'].priceForm.purchasePrice =
				data.purchasePrice || 0
		},
		//回显商品参数
		editProductDetail(data) {
			this.$refs['productDetail'].detailForm.title = data.title
			this.$refs['productDetail'].detailForm.detail = data.detail
			this.$refs['productDetail'].detailForm.descriptionImgs =
				data.descriptionImgs
			this.$refs['productDetail'].detailForm.description =
				data.description
			this.$refs['productDetail'].detailForm.rule = data.rule
			this.$refs['productDetail'].editorValue = JSON.parse(
				JSON.stringify(data.rule)
			)
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
			this.$refs['productDetail'].detailForm.postCover = data.postCover
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

			this.$refs['productDetail'].videoInfo.src = data.video
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
		async addProduct() {
			let validorArr = []
			validorArr.push(this.$refs['productBaseInfo'].validateBaseInfo())
			validorArr.push(this.$refs['productDetail'].validateDetail())
			validorArr.push(this.$refs['productAttribute'].validatePriceForm())
			//为券包商品留的特殊处理口子
			if (this.$refs['productBaseInfo'].baseInfoForm.productType == 3) {
				let stock = await this.getCouponPackStock(
					this.$refs['productBaseInfo'].baseInfoForm.couponPackId
				)
				if (stock < this.$refs['productAttribute'].priceForm.stock) {
					return this.$message.warning(`券包的最大库存为${stock}`)
				}
			} else {
				this.$refs['productBaseInfo'].baseInfoForm.couponPackId = ''
			}

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
						}

						if (
							this.$refs['productService'].promiseLise.includes(
								'过期退'
							)
						) {
							// params.expireTime = Number(this.$refs['productService'].expireTime);
						}
						params.platform = this.platform
						if (this.type == 'edit') {
							params.id = this.$route.query.productId
							updateProduct(params)
								.then((response) => {
									if (response) {
										this.$message.success('编辑成功')
										this.$router.go(-1)
									}
								})
								.catch((error) => {
									console.log(error)
								})
						} else {
							addProduct(params)
								.then((response) => {
									if (response) {
										if (this.type == 'copy') {
											this.$message.success('复制成功')
										} else {
											this.$message.success('添加成功')
										}
										this.$router.go(-1)
									}
								})
								.catch((error) => {
									console.log(error)
								})
						}
					}
				})
				.catch((error) => {
					console.log(error)
				})
		},
		cancelProduct() {
			this.$router.go(-1)
		},
		getCouponPackStock(couponPackId) {
			return new Promise((resolve, reject) => {
				packStock({
					couponPackId: couponPackId,
				})
					.then((res) => {
						resolve(res.data.stock)
					})
					.catch((error) => {
						reject(error)
					})
			})
		},
	},
})
</script>
<style lang="scss" scoped>
.add_product {
	width: 100%;
	background: #eff0f4;
	position: relative;
	overflow: hidden;
	.product_detail_all {
		width: 100%;
		height: 100%;
		position: relative;
		overflow-y: scroll;
		padding-top: 60px;
		box-sizing: border-box;
		.product_footer {
			height: 50px;
			width: 100%;
			background: #fff;
			box-shadow: var(--el-box-shadow-light);
			display: flex;
			justify-content: flex-end;
			align-items: center;
			padding-right: 20px;
			border-radius: 5px;
			position: fixed;
			top: 60px;
			box-sizing: border-box;
			z-index: 2000;
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
