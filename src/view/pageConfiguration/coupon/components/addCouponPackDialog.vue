<!--  -->
<template>
	<div class="add_coupon_page">
		<el-dialog
			title="收货地址"
			v-model="dialogCouponVisible"
			width="900px"
			:before-close="closePackDialog"
		>
			<el-form
				:model="couponPackForm"
				ref="couponPackForm"
				:rules="couponPackFormRule"
				:label-width="formLabelWidth"
			>
				<el-form-item label="券包名称：" prop="title">
					<el-input
						v-model="couponPackForm.title"
						autocomplete="off"
						placeholder="请输入券包名称"
					></el-input>
				</el-form-item>
				<!-- <el-form-item label="站点：" prop="divisionId">
					<el-select v-model="couponPackForm.divisionId">
						<el-option
							v-for="(item, index) in divisionList"
							:key="index"
							:label="item.label"
							:value="item.value"
							placeholder="请选择应用站点"
						></el-option>
					</el-select>
				</el-form-item> -->
				<el-form-item label="券包内容：" required>
					<div
						v-for="(item, index) in couponPackForm.packDetailList"
						:key="index"
						class="inline-block-form"
					>
						<el-form-item
							label="ID："
							size="small"
							label-width="60px"
							:prop="'packDetailList.' + index + '.couponId'"
							:rules="{
								required: true,
								message: '请输入优惠券ID',
								trigger: 'blur',
							}"
						>
							<el-input
								v-model="item.couponId"
								placeholder="请输入优惠券ID"
								style="width: 200px"
							></el-input>
						</el-form-item>
						<el-form-item
							label="数量："
							size="small"
							label-width="80px"
							:prop="'packDetailList.' + index + '.num'"
							:rules="{
								required: true,
								message: '请输入优惠券数量',
								trigger: 'blur',
							}"
						>
							<el-input-number
								v-model="item.num"
								placeholder="请输入优惠券数量"
								style="width: 200px"
								:step="1"
								:min="1"
								step-strictly
							></el-input-number>
						</el-form-item>
						<el-button
							type="danger"
							icon="el-icon-delete"
							circle
							style="margin-left: 10px"
							@click="deleteCouponList(index)"
						></el-button>
					</div>
				</el-form-item>
				<el-button
					size="small"
					type="primary"
					icon="el-icon-plus"
					@click="addCouponList"
					style="margin-left: 100px; margin-bottom: 20px"
				>
					新增
				</el-button>
				<el-form-item label="券包内容：" prop="description">
					<el-input
						type="textarea"
						:row="4"
						v-model="couponPackForm.description"
						placeholder="请输入券包内容"
					></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="closePackDialog">取 消</el-button>
					<el-button
						type="primary"
						@click="confirmCouponPack('couponPackForm')"
						>确 定</el-button
					>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script>
import { addOrEditCouponPack } from '@/api/newJson/coupon.js'
export default {
	props: {
		dialogCouponVisible: {
			type: Boolean,
			default: false,
		},
		divisionList: {
			type: Array,
			default: () => {
				return []
			},
		},
	},
	data() {
		return {
			formLabelWidth: '120px',
			couponPackForm: {
				id: null,
				title: '',
				// divisionId: '',
				packDetailList: [
					{
						couponId: '',
						num: 1,
					},
				],
				description: '',
			},
			couponPackFormRule: {
				title: [
					{
						required: true,
						message: '请输入券包名称',
						trigger: 'blur',
					},
				],
				description: [
					{
						required: true,
						message: '请输入券包类容',
						trigger: 'blur',
					},
				],
			},
		}
	},

	components: {},
	watch: {
		dialogCouponVisible: {
			handler(newVal, oldVal) {
				if (!newVal) {
					this.resetForm()
				}
			},
			deep: true,
		},
	},
	computed: {},

	mounted() {},

	methods: {
		closePackDialog() {
			this.$emit('close-dialog')
		},
		resetForm() {
			this.couponPackForm.id = null
			this.$refs['couponPackForm'].resetFields()
		},
		addCouponList() {
			this.couponPackForm.packDetailList.push({
				couponId: '',
				num: 1,
			})
		},
		deleteCouponList(index) {
			if (this.couponPackForm.packDetailList.length == 1) {
				this.$message.warning('请保证当前券包至少有一个优惠券')
			} else {
				this.couponPackForm.packDetailList.splice(index, 1)
			}
		},
		confirmCouponPack(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					addOrEditCouponPack(this.filterData(this.couponPackForm))
						.then((response) => {
							if (response) {
								if (this.couponPackForm.id == null) {
									this.$message.success('券包创建成功')
								} else {
									this.$message.success('券包修改成功')
								}
								this.$emit('confirm-form', this.couponPackForm)
							}
						})
						.catch((error) => {
							console.log(error)
						})
				} else {
					console.log('error submit!!')
					return false
				}
			})
		},
	},
}
</script>
<style lang="scss" scoped>
.inline-block-form {
	.el-form-item {
		display: inline-flex;
	}
}
</style>
