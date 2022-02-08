<!--  -->
<template>
	<div class="user_list app-container">
		<div class="product-list-header">
			<el-form :inline="true" :model="queryData" class="demo-form-inline">
				<el-form-item label="用户ID:">
					<el-input
						v-model="queryData.userId"
						placeholder="请输入用户ID"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item label="昵称：">
					<el-input
						v-model="queryData.nickname"
						placeholder="请输入昵称"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item label="注册时间">
					<el-date-picker
						v-model="timeList"
						type="daterange"
						range-separator="-"
						@change="changeTimeList"
						start-placeholder="开始时间"
						end-placeholder="结束时间"
						:default-time="defaultTime2"
						format="YYYY-MM-DD HH:mm:ss"
						value-format="x"
					></el-date-picker>
				</el-form-item>
				<!-- <el-form-item label="抖音号：">
                    <el-input v-model="queryData.title" placeholder="请输入抖音号" clearable></el-input>
                </el-form-item>
                <el-form-item label="手机号码：">
                    <el-input v-model="queryData.title" placeholder="请输入手机号" clearable></el-input>
                </el-form-item> -->
				<el-form-item>
					<el-button type="primary" @click="getUserList(1)"
						>搜索</el-button
					>
					<el-button type="info" @click="resetSearch">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="main-content-wrapper">
			<!-- <div class="product-header el-card__header">
                <span>用户列表</span>
            </div> -->
			<div class="table-detail" v-if="tableData.length">
				<el-table
					:data="tableData"
					border
					stripe
					style="width: 100%"
					height="100%"
				>
					<el-table-column
						label="用户ID"
						width="180"
						align="center"
						prop="userId"
					></el-table-column>
					<el-table-column
						prop="nickname"
						label="昵称"
						width="180"
						align="center"
					>
						<template #default="scope">
							<div class="user_detail">
								<img :src="scope.row.avatar" alt="" />
								<span>{{ scope.row.nickname }}</span>
							</div>
						</template>
					</el-table-column>
					<!-- <el-table-column prop="mobile" label="手机号" align="center" width="150"></el-table-column> -->
					<el-table-column
						prop="inviteCode"
						label="邀请码"
						align="center"
						width="100"
					></el-table-column>
					<el-table-column
						label="用户等级"
						align="center"
						width="100"
					>
						<template #default="scope">
							<el-tag
								size="small"
								type="success"
								v-if="scope.row.vip"
								>达人</el-tag
							>
							<el-tag size="small" type="primary" v-else
								>粉丝</el-tag
							>
						</template>
					</el-table-column>
					<el-table-column label="上级Id" align="center" width="100">
						<template #default="scope">
							<span>{{
								scope.row.parentUserId
									? scope.row.parentUserId
									: ''
							}}</span>
						</template>
					</el-table-column>
					<el-table-column
						label="是否拥有CR资格"
						align="center"
						width="150"
					>
						<template #default="scope">
							<el-tag
								v-if="scope.row.crOwner"
								type="success"
								size="small"
								>已拥有</el-tag
							>
							<el-tag type="warning" size="small" v-else
								>未拥有</el-tag
							>
						</template>
					</el-table-column>
					<el-table-column
						label="注册时间"
						align="center"
						width="200"
					>
						<template #default="scope">
							<span>{{
								timestampToTime(scope.row.createTime)
							}}</span>
						</template>
					</el-table-column>
					<el-table-column
						label="成为达人时间"
						align="center"
						width="200"
					>
						<template #default="scope">
							<span>{{
								scope.row.memberTime
									? timestampToTime(scope.row.memberTime)
									: '-'
							}}</span>
						</template>
					</el-table-column>
					<el-table-column
						label="是否已签约"
						align="center"
						width="100"
					>
						<template #default="scope">
							<span v-if="scope.row.signAgreement">已签约</span>
							<span v-else>未签约</span>
						</template>
					</el-table-column>
					<el-table-column
						label="签约时间"
						align="center"
						width="200"
					>
						<template #default="scope">
							<span>{{
								scope.row.signAgreementTime
									? timestampToTime(
											scope.row.signAgreementTime
									  )
									: '-'
							}}</span>
						</template>
					</el-table-column>
					<!-- <el-table-column prop="source" label="商品来源" align="center"></el-table-column> -->
					<el-table-column
						label="最近活跃时间"
						align="center"
						width="200"
					>
						<template #default="scope">
							<span>{{
								timestampToTime(scope.row.loginTime)
							}}</span>
						</template>
					</el-table-column>
					<el-table-column
						label="操作"
						width="200"
						align="center"
						fixed="right"
					>
						<template #default="scope">
							<el-button
								type="primary"
								size="small"
								@click="toMemberInfo(scope.row)"
								>查看详情</el-button
							>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<div class="pagination-box">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:page-sizes="[10, 20, 50]"
				:page-size="queryData.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
			></el-pagination>
		</div>
	</div>
</template>

<script>
import { ref, reactive } from 'vue'
import { queryBossUserList } from '@/api/newJson/user'
export default {
	setup() {
		const count = ref(0)
		const object = reactive({
			foo: 'bar',
		})
		// 暴露到template中
		return {
			count,
			object,
		}
	},
	data() {
		return {
			queryData: {
				userId: '',
				nickname: '',
				startCreateTimeStr: '',
				endCreateTime: '',
				pageNum: 1,
				pageSize: 20,
			},
			total: 0,
			timeList: [],
			// activeName: 'first',
			tableData: [],
		}
	},
	components: {},
	computed: {},
	mounted() {
		this.getUserList(1)
	},
	methods: {
		resetSearch() {
			this.queryData.nickname = ''
			this.queryData.userId = ''
			this.queryData.startCreateTimeStr = ''
			this.queryData.endCreateTime = ''
			this.timeList = []
			this.getUserList(1)
		},
		addProduct() {
			this.$router.push({
				name: 'addProduct',
				query: {
					type: 'add',
				},
			})
		},
		getUserList(type) {
			if (type == 1) {
				this.queryData.pageNum = 1
			}
			if (this.timeList && this.timeList.length) {
				this.queryData.startCreateTimeStr = this.timeList[0]
				this.queryData.endCreateTime = this.timeList[1]
			}
			queryBossUserList(this.filterData(this.queryData))
				.then((resultes) => {
					if (resultes.data) {
						this.tableData = resultes.data
						this.total = resultes.total
					}
				})
				.catch((error) => {})
		},
		handleSizeChange(val) {
			this.queryData.pageSize = val
			this.getUserList(0)
		},
		handleCurrentChange(val) {
			this.queryData.pageNum = val
			this.getUserList(0)
		},
		//用户详情
		toMemberInfo(data) {
			this.$router.push({
				name: 'memberInfo',
				query: {
					userId: data.userId,
				},
			})
		},
	},
}
</script>

<style lang="scss" scoped>
.user_list {
	width: 100%;
	height: 100%;
	.product-list-header {
		background-color: #fff;
		padding: 0 10px;
		.demo-form-inline {
			margin-top: 20px;
		}
	}
	.main-content-wrapper {
		background-color: #fff;
		margin-top: 10px;
		display: flex;
		flex-direction: column;
		overflow: scroll;
		.product-header {
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid #ddd;
			align-items: center;
			padding: 10px;
			// margin-bottom: 10px;
		}
		.table-detail {
			height: 100%;
			.el-table {
				flex: 1;
			}
		}
	}
	:deep().el-popover {
		width: auto !important;
	}
	.image-box {
		height: 70px;
		width: 70px;
	}
	.block-right {
		height: 70px;
	}
	.table-opreator {
		color: #409eff;
		margin-left: 10px;
		cursor: pointer;
	}
	.user_detail {
		display: flex;
		align-items: center;
		img {
			width: 40px;
			height: 40px;
			border-radius: 50%;
			margin-right: 5px;
		}
	}
}
</style>
