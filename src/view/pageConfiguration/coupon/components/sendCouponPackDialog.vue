<template>
	<el-dialog
		class="send-coupon-dialog"
		title="发送至用户账户"
		width="800px"
		v-model="dialogPackDialog"
		:before-close="handleClose"
	>
		<el-form
			label-position="right"
			label-width="120px"
			:rules="rules"
			:model="param"
			ref="sendCouponForm"
		>
			<el-form-item label="优惠券包ID：" prop="couponPackId">
				<el-input
					placeholder="请输入优惠券ID"
					v-model="param.couponPackId"
					onkeyup="value=value.replace(/[^\d]/g,'')"
				></el-input>
			</el-form-item>
			<el-form-item label="用户id：" prop="userIds">
				<el-input
					placeholder="请输入用户id,多个用户使用,号隔开"
					v-model="param.userIds"
				></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="handleClose" size="small">取 消</el-button>
			<el-button
				type="primary"
				@click="confitmSendUserCoupon"
				size="small"
				:loading="saving"
				>确 定</el-button
			>
		</template>
	</el-dialog>
</template>

<script>
import { sendCouponPack } from '@/api/newJson/coupon.js'
export default {
	props: {
		dialogPackDialog: Boolean,
	},
	data() {
		return {
			param: {
				couponPackId: '',
				userIds: '',
			},
			rules: {
				couponPackId: [
					{ required: true, message: '必填', trigger: 'change' },
				],
				userIds: [
					{ required: true, message: '必填', trigger: 'change' },
				],
			},
			saving: false,
		}
	},
	watch: {
		dialogPackDialog: {
			handler: function (newVal, oldVal) {
				console.log(newVal)
				if (!newVal) {
					this.reset()
				}
			},
			deep: true,
		},
	},
	methods: {
		handleClose() {
			this.reset()
			this.$emit('close')
		},
		reset() {
			this.$refs['sendCouponForm'].resetFields()
		},
		confitmSendUserCoupon() {
			this.$refs['sendCouponForm'].validate((valid) => {
				if (valid) {
					this.saving = true
					// let resParam = JSON.parse(JSON.stringify(this.param));
					// resParam.userId = resParam.userId.split(',');
					let params = {
						userIds: this.param.userIds,
						couponPackId: Number(this.param.couponPackId),
					}

					sendCouponPack(this.filterData(params))
						.then((res) => {
							this.saving = false
							if (res) {
								this.$message.success('发放成功')
								this.reset()
								this.$emit('confirm')
							}
						})
						.catch(() => {
							this.saving = false
						})
				} else {
				}
			})
		},
	},
}
</script>

<style lang="scss" scope>
.tip {
	font-size: 14px;
	line-height: 22px;
	color: #888;
}
</style>
