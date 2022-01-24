<template>
	<div class="login-container">
		<el-form
			autoComplete="on"
			:model="loginForm"
			:rules="loginRules"
			ref="loginForm"
			label-position="left"
			label-width="0px"
			class="card-box login-form"
		>
			<h3 class="title">美妙心选后台</h3>
			<el-form-item prop="phone">
				<i class="iconfont">&#xe612;</i>
				<el-input
					name="username"
					type="text"
					onkeyup="value=value.replace(/[^\d]/g,'')"
					v-model="loginForm.phone"
					autoComplete="on"
					placeholder="手机号"
				/>
			</el-form-item>
			<el-form-item prop="code">
				<i class="iconfont">&#xe638;</i>
				<el-input
					@keyup.enter.native="handleLogin"
					v-model="loginForm.code"
					autoComplete="on"
					placeholder="验证码"
				>
					<!-- <template #append>
                        <el-button type="primary">{{ text }}</el-button>
                    </template> -->
				</el-input>
				<span class="show-pwd" @click="sendCode">
					<el-button type="primary" :disabled="disabledButton">{{
						text
					}}</el-button>
				</span>
			</el-form-item>
			<el-form-item>
				<el-button
					type="primary"
					style="width: 100%"
					:loading="loading"
					@click.native.prevent="handleLogin"
				>
					登录
				</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
import { sendSmsCode } from '@/api/newJson/login'
export default {
	name: 'login',
	data() {
		const validatorPhone = function (rule, value, callback) {
			if (value === '') {
				callback(new Error('手机号不能为空'))
			} else if (!/^1\d{10}$/.test(value)) {
				callback(new Error('手机号格式错误'))
			} else {
				callback()
			}
		}
		return {
			loginForm: {
				phone: '',
				code: '',
			},
			text: '发送验证码',
			loginRules: {
				phone: [
					{
						required: true,
						validator: validatorPhone,
						trigger: 'blur',
					},
				],
				code: [
					{
						required: true,
						message: '验证码不能为空',
						trigger: 'blur',
					},
				],
			},
			loading: false,
			pwdType: 'text',
			timer: null,
			disabledButton: false,
		}
	},
	methods: {
		sendCode() {
			let _this = this
			_this.$refs['loginForm'].validateField('phone', (error) => {
				if (error) {
					console.log(error)
				} else {
					sendSmsCode({
						phone: _this.loginForm.phone,
					})
						.then((response) => {
							_this.loginForm.code = response.data
							let time = 60
							_this.timer = window.setInterval(() => {
								time--
								_this.text = time + 's后重新获取'
								_this.disabledButton = true
								if (time == 0) {
									window.clearInterval(_this.timer)
									_this.timer = null
									_this.disabledButton = false
									_this.text = '重新获取'
								}
							}, 1000)
						})
						.catch((error) => {
							console.log(error)
						})
				}
			})
		},
		handleLogin() {
			this.$refs.loginForm.validate((valid) => {
				if (valid) {
					this.loading = true
					this.$store
						.dispatch('Login', this.filterData(this.loginForm))
						.then((res) => {
							console.log(res)
							if (res) {
								this.$router.push({
									path: '/',
								})
							}
						})
						.catch((err) => {})
				} else {
					return false
				}
			})
		},
	},
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #23463e;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
	position: fixed;
	height: 100%;
	width: 100%;
	background-color: $bg;

	input:-webkit-autofill {
		-webkit-box-shadow: 0 0 0 1000px #293444 inset !important;
		-webkit-text-fill-color: #fff !important;
	}
	.el-input {
		display: inline-block;
		height: 47px;
		width: 85%;
		input {
			background: 0;
			border: 0;
			-webkit-appearance: none;
			border-radius: 0;
			padding: 12px 5px 12px 15px;
			color: #fff;
			height: 100%;
		}
	}
	.title {
		font-size: 26px;
		color: $light_gray;
		margin: 0 auto 40px auto;
		text-align: center;
		font-weight: bold;
	}

	.login-form {
		position: absolute;
		left: 0;
		right: 0;
		width: 500px;
		padding: 35px 35px 15px 35px;
		margin: 120px auto;
	}

	.el-form-item {
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(0, 0, 0, 0.1);
		border-radius: 5px;
		color: #454545;

		i {
			color: #fff;
			margin-left: 10px;
		}
	}

	.show-pwd {
		display: inline-block;
		position: absolute;
		right: 0;
		top: 0;
		font-size: 16px;
		color: $dark_gray;
		cursor: pointer;
		user-select: none;
		button {
			height: 47px;
		}
	}
}
</style>
