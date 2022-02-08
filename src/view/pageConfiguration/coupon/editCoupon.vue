<!--  -->
<template>
	<div class="edit_coupon">
		<div class="base_info_content">
			<el-form
				ref="baseInfoForm"
				:model="baseInfoForm"
				:rules="baseInfoFormRule"
				label-width="170px"
				class="demo-baseInfoForm"
			>
				<el-card>
					<p class="product_basic_title">基本信息</p>
					<el-form-item label="应用站点：" prop="divisionId">
						<el-select
							v-model="baseInfoForm.divisionId"
							style="width: 300px"
							:disabled="type === 'edit'"
						>
							<el-option
								v-for="(item, index) in divisionList"
								:key="index"
								:label="item.label"
								:value="item.value"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="优惠券类型：" prop="couponType">
						<el-select
							v-model="baseInfoForm.couponType"
							style="width: 300px"
							:disabled="type === 'edit'"
						>
							<el-option
								v-for="(item, index) in couponTypeList"
								:key="index"
								:label="item.value"
								:value="item.label"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="优惠券名称：" prop="name">
						<el-input
							v-model="baseInfoForm.name"
							placeholder="请输入优惠券名称"
							style="width: 300px"
							:disabled="type === 'edit'"
						></el-input>
					</el-form-item>
					<el-form-item label="总发行量：" prop="quantity">
						<el-input-number
							v-model="baseInfoForm.quantity"
							:step="1"
							:min="0"
							step-strictly
							style="width: 300px"
						/>
						<span style="margin-left: 5px">张</span>
					</el-form-item>
					<el-form-item label="每日发行量：" prop="dailyLimit">
						<el-input-number
							v-model="baseInfoForm.dailyLimit"
							:step="1"
							:min="0"
							step-strictly
							style="width: 300px"
						/>
						<span style="margin-left: 5px">张</span>
					</el-form-item>
					<el-form-item label="指定商家：" prop="sellerId">
						<el-select
							v-model="baseInfoForm.sellerId"
							style="width: 300px"
							@change="changeSeller"
						>
							<el-option
								v-for="(item, index) in sellerList"
								:key="index"
								:label="item.name"
								:value="item.id"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="指定商品：" prop="scopeValue">
						<el-select
							v-model="baseInfoForm.scopeValue"
							style="width: 300px"
							multiple
						>
							<el-option
								v-for="(item, index) in productList"
								:key="index"
								:label="item.title"
								:value="item.id"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="优惠内容：" class="is-required">
						<div v-if="baseInfoForm.couponType === 1">
							<span style="margin-right: 5px">减 ¥</span>
							<el-input-number
								v-model="baseInfoForm.amount"
								:step="0.01"
								:min="0"
								step-strictly
								:disabled="type === 'edit'"
							/>
						</div>
						<div v-if="baseInfoForm.couponType === 0">
							<span style="margin-right: 5px">优惠</span>
							<el-input-number
								v-model="baseInfoForm.discount"
								:step="0.01"
								:min="0"
								:max="1"
								step-strictly
								:disabled="type === 'edit'"
							/>
							折扣
						</div>
					</el-form-item>
					<el-form-item
						label="优惠券封面"
						prop="couponCover"
						class="el_uploadimg"
						required
					>
						<c-upload
							:limit="1"
							style="margin-left: 10px"
							ref="couponCover"
							type="text"
							:fileList="baseInfoForm.couponCover"
							@setData="setCouponCoverLogoImg"
						>
							<span>商家logo</span>
						</c-upload>
					</el-form-item>
				</el-card>
				<el-card>
					<p class="product_basic_title">领用规则</p>
					<el-form-item
						label="用户范围："
						class="is-required"
						prop="memberLevel"
						style="min-height: 62px"
					>
						<el-radio-group
							v-model="baseInfoForm.userLevelLimit"
							:disabled="type === 'edit'"
						>
							<el-radio :label="0">普通/所有人可见</el-radio>
							<el-radio :label="1">达人</el-radio>
							<el-radio :label="2">新用户</el-radio>
							<!-- <el-radio :label="2"></el-radio> -->
							<!-- <br /> -->

							<!-- <el-radio :label="0" style="margin-top: 8px">
                                特定用户
                                <div class="member-box" v-show="!isAll">
                                    <el-checkbox-group v-model="baseInfoForm.memberLevel" :disabled="type === 'edit'">
                                        <el-checkbox v-for="(item, key) in userLevel" :label="key" :key="key">{{ item }}</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                            </el-radio> -->
						</el-radio-group>
					</el-form-item>
					<el-form-item label="限领规则：" prop="personLimit">
						每人限领
						<el-input-number
							v-model="baseInfoForm.personLimit"
							placeholder="只能输入正整数，输入9999999为无限制"
							:min="1"
							:max="9999999"
							size="medium"
							:precision="0"
							step-strictly
							:disabled="type === 'edit'"
						></el-input-number>
						张
					</el-form-item>
					<el-form-item
						label="优惠券有效期："
						class="is-required"
						prop="timeRange"
					>
						<el-radio-group
							v-model="timeRange"
							@change="changeType"
							:disabled="type === 'edit'"
							:style="{ marginTop: '-10px' }"
						>
							<el-radio :label="1">
								日期范围
								<el-date-picker
									v-model="timeList"
									style="width: 380px"
									type="datetimerange"
									start-placeholder="生效时间"
									:default-time="defaultTime2"
									format="YYYY-MM-DD HH:mm:ss"
									value-format="x"
									end-placeholder="失效时间"
									:disabled="
										type === 'edit' || timeRange == 2
									"
								></el-date-picker>
							</el-radio>
							<el-radio :label="2">
								自发放之日起
								<el-input-number
									v-model="baseInfoForm.effectiveDays"
									style="margin-top: 10px"
									placeholder="只能输入正整数，输入9999999为无限制"
									:min="num"
									:max="9999999"
									size="medium"
									:precision="0"
									step-strictly
									:disabled="
										type === 'edit' || timeRange == 1
									"
								></el-input-number>
								天
							</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item
						label="是否在商详页展示："
						class="is-required"
						prop="allowPublicity"
					>
						<el-radio-group v-model="baseInfoForm.allowPublicity">
							<el-radio :label="1">展示</el-radio>
							<el-radio :label="2">不展示</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item>
						<el-button
							type="primary"
							@click="confirmCoupon('baseInfoForm')"
							>确定</el-button
						>
						<el-button type="info" plain @click="cancelCoupon"
							>取消</el-button
						>
					</el-form-item>
				</el-card>
			</el-form>
		</div>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import categoryData from '@/data/category.json'
import { getSellers } from '@/api/newJson/shop'
import { productList } from '@/api/newJson/product'
import { addCoupon, couponDetail, modifyCoupon } from '@/api/newJson/coupon.js'
import { divisionList } from '@/data/globalData.js'
import cUpload from '@/components/fileUpload'
import { mapState } from 'vuex'
export default defineComponent({
	setup() {
		const defaultTime2 = ref([
			new Date(2000, 1, 1, 0, 0, 0),
			new Date(2000, 2, 1, 23, 59, 59),
		]) //
		// 暴露到template中
		return {
			defaultTime2,
		}
	},
	data() {
		return {
			num: 1,
			isAll: 1,
			timeRange: 1,
			categoryData: categoryData,
			baseInfoForm: {
				id: null,
				divisionId: 'CN^^^浙江省^^^杭州市',
				name: '',
				couponType: '',
				quantity: 99999,
				dailyLimit: 99999,
				couponScope: 2,
				amount: 0,
				discount: 0,
				sellerId: '',
				scopeValue: [],
				startTime: '',
				endTime: '',
				memberLevel: [],
				userLevelLimit: 2,
				personLimit: 1,
				effectiveDays: 1,
				allowPublicity: 1,
				couponCover: '',
			},
			timeList: [],
			shopList: [],
			dragging: false,
			divisionList: divisionList,
			couponTypeList: [
				{
					label: 0,
					value: '折扣',
				},
				{
					label: 1,
					value: '立减',
				},
				// {
				//     label: 3,
				//     value: '满减',
				// },
			],
			baseInfoFormRule: {
				divisionId: {
					required: true,
					message: '请选择应用站点',
					trigger: 'change',
				},
				name: {
					required: true,
					message: '请输入优惠券名称',
					trigger: 'blur',
				},
				couponType: {
					required: true,
					message: '请选择优惠券类型',
					trigger: 'change',
				},
				dailyLimit: {
					required: true,
					trigger: 'blur',
				},
				quantity: {
					required: true,
					trigger: 'blur',
				},
				personLimit: {
					required: true,
					trigger: 'blur',
				},
				scopeValue: {
					required: true,
					message: '请选择商品',
					trigger: 'change',
				},
				sellerId: {
					required: true,
					message: '请选择商家',
					trigger: 'change',
				},
			},
			sellerList: [],
			productList: [],
			type: 'add',
		}
	},

	components: {
		cUpload,
	},

	computed: {
		...mapState({
			userLevel: (state) => state.user.userLevel,
		}),
	},

	mounted() {
		this.getSellersList({
			pageNum: 1,
			pageSize: 1000,
		})
		this.type = this.$route.query.type
		if (this.type == 'edit') {
			this.baseInfoForm.id = Number(this.$route.query.id)
			this.getCouponDetail(this.baseInfoForm.id)
		}
		this.changeType()
	},

	methods: {
		changeType() {
			if (this.timeRange == 1) {
				this.baseInfoForm.effectiveDays = 0
				this.num = 0
			}
			if (this.timeRange == 2) {
				this.num = 1
				this.timeList = []
				this.baseInfoForm.effectiveDays = 1
			}
		},
		//获取商家列表
		getSellersList(params) {
			getSellers(params)
				.then((response) => {
					if (response) {
						this.sellerList = response.data.data
					}
				})
				.catch((error) => {})
		},
		getCouponDetail(id) {
			let params = {
				id: id,
			}
			couponDetail(params)
				.then((response) => {
					if (response) {
						console.log(response)
						if (response.data.startTime) {
							this.timeList = [
								response.data.startTime,
								response.data.endTime,
							]
						} else {
							this.timeRange = 2
						}
						this.baseInfoForm = response.data
						console.log(this.baseInfoForm)
						this.$refs['couponCover'].setFileList(
							this.baseInfoForm.couponCover
						)
						this.getProductList(response.data.sellerId)
					}
				})
				.catch((error) => {
					console.log(error)
				})
		},
		changeSeller(val) {
			this.baseInfoForm.scopeValue = []
			console.log(val)
			this.getProductList(val)
		},
		getProductList(sellerId) {
			let params = {
				pageSize: 1000,
				pageNum: 1,
				sellerId: sellerId,
			}
			productList(this.filterData(params))
				.then((resultes) => {
					if (resultes.data) {
						resultes.data.forEach((item) => {
							item.id = String(item.id)
						})
						this.productList = resultes.data
					}
				})
				.catch((error) => {})
		},
		confirmCoupon(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if (this.baseInfoForm.couponType == 1) {
						delete this.baseInfoForm.discount
					}
					if (this.baseInfoForm.couponType == 0) {
						delete this.baseInfoForm.amount
					}
					if (this.timeRange == 1) {
						if (!this.timeList.length) {
							this.$message.warning('请选择日期范围')
							return
						} else {
							this.baseInfoForm.startTime = this.timeList[0]
							this.baseInfoForm.endTime = this.timeList[1]
						}
					}
					if (!this.baseInfoForm.couponCover) {
						this.$message.warning('请上传优惠券封面')
						return
					}
					if (this.type == 'add') {
						addCoupon(this.baseInfoForm)
							.then((response) => {
								if (response) {
									this.$message.success('添加成功')
									this.$router.go(-1)
								}
							})
							.catch((error) => {})
					} else {
						modifyCoupon(this.baseInfoForm)
							.then((response) => {
								if (response) {
									this.$message.success('编辑成功')
									this.$router.go(-1)
								}
							})
							.catch((error) => {})
					}
					console.log(this.baseInfoForm)
				} else {
					console.log('error submit!!')
					return false
				}
			})
		},
		//取消
		cancelCoupon() {
			this.$router.go(-1)
		},
		setCouponCoverLogoImg(data) {
			this.baseInfoForm.couponCover = data.data
		},
	},
})
</script>
<style lang="scss" scoped>
.edit_coupon {
	overflow: scroll;
	.el-card {
		box-shadow: none;
		border: 0;
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
	}
	.base_info_content {
		padding: 20px;
		box-sizing: border-box;
		background-color: #fff;
	}
	.inline-form-item {
		display: flex;
		justify-content: space-around;
	}
	.member-box {
		margin-left: 8px;
	}
}
</style>
