<!--  -->
<template>
	<div class="batch_ship">
		<div class="batch_ship_header">
			<el-steps :active="active" simple>
				<el-step title="下载发货模板" icon="el-icon-download"></el-step>
				<el-step title="按模板填写信息" icon="el-icon-edit"></el-step>
				<el-step title="导入发货单" icon="el-icon-upload2"></el-step>
				<el-step title="确认发货" icon="el-icon-finished"></el-step>
			</el-steps>
			<div class="download_template">
				<el-button
					size="small"
					type="primary"
					style="margin-right: 10px"
					@click="downNotUseOrder"
					:loading="loading"
					>导出未使用订单</el-button
				>
				<el-link
					target="_blank"
					href="https://mmxx-hz-octstream.oss-cn-hangzhou.aliyuncs.com/oct_stream/202201/740ba86c2a8b4512857bc42f3c8d2c36.xlsx"
					:underline="false"
					type="primary"
				>
					下载发货模版
				</el-link>
			</div>
		</div>
		<div class="batch_ship_upload">
			<el-card>
				<template #header>
					<div class="card-header">
						<span>导入发货单</span>
					</div>
				</template>
				<el-upload
					:name="uploadFileName"
					:data="uploadParam"
					:on-progress="handleProgress"
					:before-upload="beforeFileUpload"
					:http-request="uploadPurchaseFile"
					:show-file-list="false"
				>
					<el-button size="medium" type="danger"
						>上传发货单</el-button
					>
				</el-upload>
			</el-card>
		</div>
		<div class="ship_table" v-show="showBatchShip">
			<el-card class="box-card">
				<template #header>
					<div class="card-header">
						<span>确认核销</span>
						<el-button
							@click="deliver"
							class="button"
							type="primary"
							size="small"
							>确认核销</el-button
						>
					</div>
				</template>
				<div class="table-box">
					<el-table
						:data="tableData"
						style="width: 100%"
						height="100%"
						header-cell-style="background:#F5F7FA;color: #606266;"
					>
						<el-table-column
							prop="orderId"
							label="订单编号"
							width="180"
						/>
						<!-- <el-table-column prop="expressName" :label="getLocalUseLangData('8000124')" width="180" />
                        <el-table-column prop="expressNo" :label="getLocalUseLangData('8000125')" /> -->
					</el-table>
				</div>
			</el-card>
		</div>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { uploadFileRequest } from '@/api/newJson/file'
import {
	uploadShipOrder,
	ackShipOrder,
	downOrderShipInfo,
} from '@/api/newJson/order'
export default defineComponent({
	setup() {
		return {
			active: ref(4),
		}
	},
	data() {
		return {
			showBatchShip: false,
			uploadParam: {},
			uploadFileName: 'file',
			tableData: [],
			loading: false,
		}
	},

	components: {},

	computed: {},

	mounted() {},

	methods: {
		beforeFileUpload(file) {
			console.log(file)
			let f_content = file.name
			let fileext = f_content.substring(
				f_content.lastIndexOf('.'),
				f_content.length
			)
			fileext = fileext.toLowerCase()
			let fileType = file.type.split('/')[0]
			if (fileext != '.xlsx') {
				this.$message.error(`请上传xlsx格式文件`)
				return false
			}
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
					console.log(url)
					let newUrl = process.env.VUE_APP_FILE_URL + url
					uploadShipOrder({
						fileUrl: url,
					})
						.then((response) => {
							if (response) {
								this.showBatchShip = true
								this.tableData = response.data
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
		uploadError() {
			// this.$message.warning('上传失败');
		},
		// 上传成功
		uploadSuccess(response, file, fileList) {
			console.log(response)
		},
		// 上传进度
		handleProgress(event, file) {
			file.uploadProgress = parseInt(event.percent)
		},
		// 确定发货
		deliver() {
			ackShipOrder({ shipVOList: this.tableData }).then((res) => {
				if (res) {
					this.showBatchShip = false
					this.$message.success('发货成功')
				}
			})
		},
		downNotUseOrder() {
			this.loading = true
			downOrderShipInfo()
				.then((response) => {
					if (response) {
						this.$message.success('导出成功,请到文件中心下载')
						this.loading = false
					}
				})
				.catch((error) => {
					this.loading = false
				})
		},
	},
})
</script>
<style lang="scss" scoped>
.batch_ship {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	.batch_ship_header {
		display: flex;
		align-items: center;
		background-color: #fff;
		.el-steps {
			flex: 1 0 auto;
			background: #fff;
		}
		.download_template {
			width: 230px;
			margin-left: 40px;
		}
	}
	.batch_ship_upload {
		margin-top: 10px;
		:deep() .el-card__body {
			height: 300px;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	.ship_table {
		flex: 1;
		overflow: hidden;
		margin-top: 10px;
		.el-card {
			height: 100%;
			width: 100%;
			display: flex;
			flex-direction: column;
		}
		.el-card__header {
			.card-header {
				display: flex;
				justify-content: space-between;
			}
		}
		:deep() .el-card__body {
			flex: 1;
			display: flex;
			flex-direction: column;
			overflow: scroll;
			.table-box {
				flex: 1;
				overflow: hidden;
			}
		}
	}
	.el-card {
		box-shadow: none;
	}
	:deep().el-card__header {
		height: 53px;
		line-height: 33px;
	}
	:deep().el-steps--simple {
		padding: 13px 10px;
	}
	:deep().el-step__title {
		max-width: none !important;
	}
}
</style>
