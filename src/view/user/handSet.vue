<!--  -->
<template>
    <div class="hand_set">
        <el-tabs v-model="activeName"
                 @tab-click="handleClick">
            <el-tab-pane label="预设权益"
                         name="first">
                <el-form :model="setForm"
                         class="demo-form-inline"
                         size="medium"
                         label-width="100px"
                         :rules="setFormRule"
                         ref="setForm">
                    <el-form-item label="用户Id："
                                  prop="userId">
                        <el-input v-model="setForm.userId"
                                  placeholder="请输入用户ID"
                                  style="width:195px"></el-input>
                    </el-form-item>
                    <el-form-item label="权益类型："
                                  prop="status">
                        <el-select v-model="setForm.status"
                                   placeholder="请选择要设置的权益">
                            <el-option label="设置成达人"
                                       :value="1"></el-option>
                            <el-option label="设置CR资格"
                                       :value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary"
                                   @click="confirmSetForm('setForm')">确定</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="手动打款"
                         name="handSendMakeMoney">
                <el-form :model="handSendMakeMoney"
                         class="demo-form-inline"
                         size="medium"
                         label-width="100px"
                         :rules="handSendMakeMoneyRule"
                         ref="handSendMakeMoneyRef">
                    <el-form-item label="用户Id："
                                  prop="userId">
                        <el-input v-model="handSendMakeMoney.userId"
                                  placeholder="请输入用户ID"
                                  style="width:195px"></el-input>
                    </el-form-item>
                    <el-form-item label="类型："
                                  prop="type">
                        <el-select v-model="handSendMakeMoney.type"
                                   placeholder="请选择要设置的打款类型">
                            <el-option label="向用户打款"
                                       :value="1"></el-option>
                            <el-option label="向用户扣款"
                                       :value="2"
                                       disabled></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="金额："
                                  prop="amount">
                        <el-input-number v-model="handSendMakeMoney.amount"
                                         style="width:200px"
                                         :min="0"
                                         :precision="2"></el-input-number>
                    </el-form-item>
                    <el-form-item label="备注："
                                  prop="remark">
                        <el-input v-model="handSendMakeMoney.remark"
                                  placeholder="请输入打款备注"
                                  style="width:195px"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary"
                                   @click="handSendMakeMoneyForm('handSendMakeMoneyRef')">确定</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { setAsCrOwner, setAsVip, manualAmount } from '@/api/newJson/user.js'
export default {
	data() {
		return {
			activeName: 'first',
			setForm: {
				userId: '',
				status: 1,
			},
			handSendMakeMoney: {
				userId: '',
				type: 1,
				remark: '',
				amount: 0.0,
			},
			setFormRule: {
				userId: {
					required: true,
					message: '请输入用户ID',
					trigger: 'blur',
				},
				status: {
					required: true,
					message: '请输入要设置的用户状态',
					trigger: 'change',
				},
			},
			handSendMakeMoneyRule: {
				userId: {
					required: true,
					message: '请输入用户ID',
					trigger: 'blur',
				},
				type: {
					required: true,
					message: '请输入要设置的用户状态',
					trigger: 'change',
				},
				remark: {
					required: true,
					message: '请输入备注信息',
					trigger: 'blur',
				},
				amount: {
					required: true,
					message: '请输入金额',
					trigger: 'blur',
				},
			},
		}
	},

	components: {},

	computed: {},

	mounted() {},

	methods: {
		handleClick() {},
		confirmSetForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if (this.setForm.status == 1) {
						setAsVip({
							userId: this.setForm.userId,
						}).then((response) => {
							if (response) {
								this.$message.success('设置成功')
							}
						})
					} else {
						setAsCrOwner({
							userId: this.setForm.userId,
						}).then((response) => {
							if (response) {
								this.$message.success('设置成功')
							}
						})
					}
				} else {
					console.log('error submit!!')
					return false
				}
			})
		},
		handSendMakeMoneyForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.$confirm('是否向该用户打款, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning',
					})
						.then(() => {
							let params = {
								userId: this.handSendMakeMoney.userId,
								type: this.handSendMakeMoney.type,
								remark: this.handSendMakeMoney.remark,
								amount: this.handSendMakeMoney.amount.toString(),
							}
							manualAmount(params)
								.then((response) => {
									if (response) {
										this.$message.success('打款成功')
										this.$refs[formName].resetFields()
									}
								})
								.catch((error) => {})
						})
						.catch(() => {
							this.$message({
								type: 'info',
								message: '已取消',
							})
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
.hand_set {
  width: 100%;
  height: 100%;
  background-color: #fff !important;
  // .top_1 {
  //     width: 200px;
  //     height: 300px;
  //     background-color: red;
  // }
  // .top_1:hover {
  //     transform: scale(0.5) rotateY(45deg);
  // }
  // .top_2 {
  //     width: 200px;
  //     height: 300px;
  //     background-color: blue;
  // }
}
</style>
