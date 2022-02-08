<!--  -->
<template>
	<div class="user_list app-container">
		<div class="product-list-header">
			<el-form :inline="true" :model="queryData" class="demo-form-inline">
				<!-- <el-form-item label="订单编号:">
                    <el-input v-model="queryData.userId" placeholder="请输入订单编号" clearable></el-input>
                </el-form-item>
                <el-form-item label="达人：">
                    <el-input v-model="queryData.nickname" placeholder="请输入昵称" clearable></el-input>
                </el-form-item> -->
				<el-form-item label="当日结算状态：">
					<el-select
						v-model="queryData.cbStatus"
						placeholder="订单状态"
					>
						<el-option label="全部" :value="''"></el-option>
						<el-option
							label="付款完成待交易成功"
							:value="1"
						></el-option>
						<el-option
							label="核销完成已返佣"
							:value="2"
						></el-option>
						<el-option label="取消返佣" :value="3"></el-option>
						<el-option
							label="第三方交易成功待返佣"
							:value="4"
						></el-option>
					</el-select>
				</el-form-item>
				<!-- <el-form-item label="订单时间：">
                    <el-date-picker
                        v-model="timeList"
                        type="daterange"
                        :clearable="false"
                        range-separator="-"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        :default-time="defaultTime2"
                        format="YYYY-MM-DD HH:mm:ss"
                        value-format="x"
                    ></el-date-picker>
                </el-form-item> -->
				<el-form-item label="订单时间：">
					<el-select
						v-model="queryData.rangeType"
						placeholder="订单时间"
					>
						<el-option label="今天" :value="1"></el-option>
						<el-option label="昨天" :value="2"></el-option>
						<el-option label="近七天" :value="3"></el-option>
						<el-option label="近30天" :value="4"></el-option>
					</el-select>
				</el-form-item>
				<!-- <el-form-item label="Appkey：">
                    <el-input v-model="queryData.title" placeholder="请填写Appkey" clearable></el-input>
                </el-form-item>
                <el-form-item label="SID：">
                    <el-input v-model="queryData.title" placeholder="请填写推广位名称" clearable></el-input>
                </el-form-item> -->
				<el-form-item>
					<el-button type="primary" @click="getqueryUnionCbList(1)"
						>搜索</el-button
					>
					<el-upload
						:name="uploadFileName"
						:data="uploadParam"
						:on-progress="handleProgress"
						:before-upload="beforeFileUpload"
						:http-request="uploadPurchaseFile"
						:show-file-list="false"
						accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
					>
						<el-button type="primary">饿了么导入</el-button>
					</el-upload>
					<el-button type="info" @click="resetSearch">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="main-content-wrapper">
			<!-- <div class="product-header el-card__header">
                <span>用户列表</span>
            </div> -->
			<div class="table-detail">
				<el-table
					:data="tableData"
					border
					stripe
					style="width: 100%"
					height="100%"
				>
					<el-table-column
						label="订单Id"
						width="180"
						align="center"
						prop="orderId"
					></el-table-column>
					<el-table-column
						label="订单明细"
						width="200"
						align="center"
					>
						<template #default="scope">
							<div class="flex flex-item--center">
								<el-popover
									placement="top-start"
									trigger="hover"
								>
									<img
										:src="scope.row.pictUrl"
										class="previewImage"
									/>
									<template #reference>
										<img
											:src="scope.row.pictUrl"
											class="image-box"
										/>
									</template>
								</el-popover>
								<el-tooltip
									class="item"
									effect="dark"
									:content="scope.row.title"
									placement="top"
								>
									<span
										class="block-right"
										style="
											display: -webkit-box;
											overflow: hidden;
											white-space: normal !important;
											text-overflow: ellipsis;
											word-wrap: break-word;
											-webkit-line-clamp: 3;
											-webkit-box-orient: vertical;
											margin-left: 5px;
										"
									>
										{{ scope.row.title }}
									</span>
								</el-tooltip>
							</div>
						</template>
					</el-table-column>
					<el-table-column
						prop="userId"
						label="用户Id"
						align="center"
						width="180"
					></el-table-column>
					<el-table-column
						label="推广位ID"
						align="center"
						width="180"
						prop="pid"
					></el-table-column>
					<el-table-column
						label="订单来源"
						align="center"
						width="180"
					>
						<template #default="scope">
							<span>{{
								scope.row.commissionPlatform == 1
									? '美团'
									: '饿了么'
							}}</span>
						</template>
					</el-table-column>
					<el-table-column
						label="订单金额"
						align="center"
						width="100"
						prop="orderPrice"
					></el-table-column>

					<el-table-column
						label="订单下单时间"
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
						label="佣金金额"
						align="center"
						width="100"
						prop="commissionAmount"
					></el-table-column>
					<el-table-column
						label="佣金比例"
						align="center"
						width="100"
						prop="commissionRate"
					></el-table-column>
					<el-table-column
						label="第三方佣金金额"
						align="center"
						width="120"
						prop="outCommissionAmount"
					></el-table-column>
					<el-table-column
						label="第三方佣金比例"
						align="center"
						width="120"
						prop="outCommissionRate"
					></el-table-column>
					<el-table-column
						label="返佣状态"
						align="center"
						width="180"
					>
						<template #default="scope">
							<el-tag
								type="success"
								v-if="scope.row.commissionStatus == 2"
								size="small"
								>核销完成已返佣</el-tag
							>
							<el-tag
								type="primary"
								v-if="scope.row.commissionStatus == 1"
								size="small"
								>付款完成待交易成功</el-tag
							>
							<el-tag
								type="primary"
								v-if="scope.row.commissionStatus == 4"
								size="small"
								>第三方交易成功待返佣</el-tag
							>
							<el-tag
								type="danger"
								v-if="scope.row.commissionStatus == 3"
								size="small"
								>取消返佣</el-tag
							>
						</template>
					</el-table-column>
					<el-table-column
						label="结算时间"
						align="center"
						width="200"
					>
						<template #default="scope">
							<span v-if="scope.row.commissionStatus == 2">{{
								timestampToTime(scope.row.settleTime)
							}}</span>
							<span v-else>-</span>
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
import { uploadFileRequest } from '@/api/newJson/file.js'
import { eleExcel, queryUnionCbList } from '@/api/newJson/duoduo'
export default {
	setup() {
		const count = ref(0)
		const object = reactive({
			foo: 'bar',
		})
		const defaultTime2 = ref([
			new Date(2000, 1, 1, 0, 0, 0),
			new Date(2000, 2, 1, 23, 59, 59),
		]) //
		// 暴露到template中
		return {
			count,
			object,
			defaultTime2,
		}
	},
	data() {
		return {
			uploadParam: {},
			uploadFileName: 'file',
			queryData: {
				cbStatus: '',
				rangeType: 4,
				pageNum: 1,
				pageSize: 20,
			},
			total: 0,
			timeList: [],

			tableData: [],
		}
	},
	components: {},
	computed: {
		nowEnd() {
			return this.$store.state.globalNum.nowEnd
		},
		lastMonth() {
			return this.$store.state.globalNum.lastMonth
		},
	},
	mounted() {
		this.timeList = [this.lastMonth, this.nowEnd]
		this.getqueryUnionCbList(1)
	},
	methods: {
		resetSearch() {
			this.queryData.cbStatus = ''
			this.queryData.rangeType = 4
			this.getqueryUnionCbList(1)
		},

		getqueryUnionCbList(type) {
			if (type == 1) {
				this.queryData.pageNum = 1
			}
			queryUnionCbList(this.filterData(this.queryData))
				.then((response) => {
					if (response.data) {
						this.tableData = response.data
						this.total = response.total || 0
					}
				})
				.catch((error) => {})
		},
		handleSizeChange(val) {
			this.queryData.pageSize = val
			this.getqueryUnionCbList(0)
		},
		handleCurrentChange(val) {
			this.queryData.pageNum = val
			this.getqueryUnionCbList(0)
		},
		beforeFileUpload(file) {
			let f_content = file.name
			let fileext = f_content.substring(
				f_content.lastIndexOf('.'),
				f_content.length
			)
			fileext = fileext.toLowerCase()
			let fileType = file.type.split('/')[0]
			// if (fileext != '.xlsx') {
			//     this.$message.error('请上传xlsx类型文件');
			//     return false;
			// }
			if (file.type === 'image/gif') {
				fileType = 'gif'
			} else if (
				fileType != 'image' &&
				fileType != 'video' &&
				fileType != 'audio'
			) {
				fileType = 'other'
			}
			Object.assign(this.uploadParam, {
				param: JSON.stringify({
					type: fileType,
					fileName: file.name,
				}),
			})
			return true
		},
		// 自定义上传
		uploadPurchaseFile(reg) {
			uploadFileRequest(
				{
					file: reg,
				},
				(url) => {
					let newUrl = url
					eleExcel({
						objectKey: url,
					})
						.then((response) => {
							if (response) {
								this.$message.success('导入成功')
								this.getqueryUnionCbList(1)
							}
						})
						.catch((error) => {})
				},
				(err) => {
					console.log(err)
					// this.$message.warning('上传失败');
					reg.onError(err)
				}
			)
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
	:deep() .el-button + div {
		display: inline-block;
		margin: 0 10px;
	}
}
</style>
