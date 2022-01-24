<!-- 头部 -->
<template>
	<div class="memall_admin_header">
		<div class="hread-l">
			<div class="nav_header_fold">
				<i
					class="el-icon-s-fold"
					@click="openCollapse(true)"
					v-if="!isCollapse"
				></i>
				<i
					class="el-icon-s-unfold"
					@click="openCollapse(false)"
					v-else
				></i>
			</div>
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item
					v-for="(item, i) in levelList"
					:to="{ name: item.name }"
					:key="i"
					>{{ item.meta.title }}
				</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="header-r">
			<el-dropdown class="avatar-container" trigger="click">
				<div class="avatar-wrapper">
					<img
						src="https://cdn-hz.mehome.shop/image/202104/bbfa0295f5a84825951d155f549145e6.jpg"
					/>
					<span>{{
						userInfo.nickName || userInfo.mobile || 'MeMall'
					}}</span>
					<i class="iconfont">&#xe659;</i>
				</div>
				<template #dropdown>
					<el-dropdown-menu class="user-dropdown">
						<router-link to="/dashboard">
							<el-dropdown-item>首页</el-dropdown-item>
						</router-link>
						<el-dropdown-item>修改密码</el-dropdown-item>
						<el-dropdown-item>设置</el-dropdown-item>
						<el-dropdown-item
							><span @click="logout">退出</span></el-dropdown-item
						>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	name: 'memallHeader',
	data() {
		return {
			userInfo: {
				nickName: '',
				mobile: '',
			},
		}
	},

	components: {},

	computed: {
		...mapState({
			isCollapse: (state) => state.nav.isCollapse,
		}),
		levelList() {
			return this.$route.matched
		},
	},

	mounted() {},

	methods: {
		openCollapse(value) {
			this.$store.commit('setCollapse', value)
		},
		logout() {
			this.$store.dispatch('LogOut')
		},
	},
}
</script>
<style lang="scss" scoped>
.memall_admin_header {
	width: 100%;
	height: 50px;
	border-bottom: 1px solid #ccc;
	display: flex;
	align-items: center;
	padding: 0 20px;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.hread-l {
		.nav_header_fold {
			//   margin-right: 10px;
			display: inline-block;
			i {
				font-size: 20px;
				cursor: pointer;
				margin-right: 20px;
			}
		}
		.el-breadcrumb {
			display: inline-block;
		}
	}
	.header-r {
		display: flex;
		.avatar-wrapper {
			display: flex;
			align-items: center;
			cursor: pointer;

			img {
				width: 40px;
				margin-right: 10px;
				border-radius: 50%;
			}
		}
	}
}
</style>
