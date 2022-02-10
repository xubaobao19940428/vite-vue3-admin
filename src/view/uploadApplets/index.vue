<!--  -->
<template>
	<div class="shop_account app-container">
		<div class="shop_account_header">
			<el-form
				ref="supplierFilterForm"
				inline
				label-width="120px"
				:model="queryData"
			>
				<el-form-item label="文件名：" class="filter-item">
					<el-input
						placeholder="请输入图片地址"
						size="medium"
						clearable
						v-model="queryData.fileName"
					></el-input>
				</el-form-item>

				<el-form-item
					label="用户Id："
					class="filter-item"
					prop="status"
				>
					<el-input
						placeholder="请输入用户Id"
						size="medium"
						clearable
						v-model="queryData.userId"
					></el-input>
				</el-form-item>
				<el-form-item class="filter-item" style="margin-left: 20px">
					<el-button
						icon="el-icon-search"
						type="primary"
						@click="getQueryAssetsList(1)"
						size="medium"
					>
						搜索
					</el-button>
					<el-button
						icon="el-icon-refresh-left"
						@click="resetSearch"
						size="medium"
						>重置</el-button
					>
				</el-form-item>
			</el-form>
		</div>
		<div class="main-content-wrapper">
			<div class="product-header el-card__header">
				<span>小程序图片</span>
				<el-button
					type="primary"
					icon="el-icon-plus"
					size="small"
					@click="addImg"
					>新增图片</el-button
				>
			</div>
			<div class="table-detail">
				<el-table
					:data="tableData"
					border
					stripe
					style="width: 100%"
					height="100%"
				>
					<el-table-column
						label="文件名"
						align="center"
						prop="fileName"
					></el-table-column>
					<el-table-column label="图片" align="center">
						<template #default="scope">
							<div class="flex flex-item--center">
								<el-popover
									placement="top-start"
									trigger="hover"
								>
									<img
										:src="scope.row.absoluteUrl"
										class="previewImage"
									/>
									<template #reference>
										<img
											:src="scope.row.absoluteUrl"
											class="image-box"
										/>
									</template>
								</el-popover>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="创建时间" align="center">
						<template #default="scope">
							<span>{{
								timestampToTime(scope.row.createTime)
							}}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" align="center" width="200">
						<template #default="scope">
							<el-button
								type="primary"
								size="small"
								plain
								@click="copyLink(scope.row.absoluteUrl)"
								>复制链接</el-button
							>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!-- <no-data-component v-else></no-data-component> -->
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
		<addImgDialog
			:dialogFormVisible="dialogFormVisible"
			@close-dialog="closeDialog"
			ref="addImgDialog"
			@confirm-form="confirmImgForm"
		></addImgDialog>
	</div>
</template>

<script>
import { ref, reactive } from 'vue'
import noDataComponent from '@/components/noDataComponent/index.vue'
import addImgDialog from './addImgDialog.vue'
import { uploadApplets, queryAssetsList } from '@/api/newJson'
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
			dialogFormVisible: false,
			queryData: {
				fileName: '',
				userId: '',
				pageNum: 1,
				pageSize: 20,
			},
			total: 0,
			type: 'add',
			// activeName: 'first',
			tableData: [],
		}
	},
	components: {
		noDataComponent,
		addImgDialog,
	},
	computed: {},
	mounted() {
		this.getQueryAssetsList(1)
	},
	methods: {
		addImg() {
			this.dialogFormVisible = true
		},
		//关闭弹窗
		closeDialog() {
			this.dialogFormVisible = false
		},
		resetSearch() {
			this.queryData.userId = ''
			this.queryData.fileName = ''
			this.getQueryAssetsList(1)
		},
		handleSizeChange(val) {
			this.queryData.pageSize = val
			this.getQueryAssetsList(0)
		},
		handleCurrentChange(val) {
			this.queryData.pageNum = val
			this.getQueryAssetsList(0)
		},
		getQueryAssetsList(type) {
			if (type == 1) {
				this.queryData.pageNum = 1
			}
			queryAssetsList(this.filterData(this.queryData))
				.then((response) => {
					if (response) {
						this.tableData = response.data
						this.total = response.total
					}
				})
				.catch((error) => {})
		},
		confirmImgForm(data) {
			if (data.imgUrl) {
				uploadApplets({ uploadItems: data.imgUrl })
					.then((response) => {
						if (response) {
							this.$message.success('上传成功')
							this.dialogFormVisible = false
							this.getQueryAssetsList(1)
						}
					})
					.catch((error) => {
						console.log(error)
					})
			} else {
				this.dialogFormVisible = false
			}
		},
		copyLink(url) {
			var input = document.createElement('input')
			// 赋值
			input.setAttribute('value', url)
			// 添加节点
			document.body.appendChild(input)
			// 选取文本域中的内容
			input.select()
			// 复制
			document.execCommand('Copy')
			// 删除掉没用的节点
			document.body.removeChild(input)
			this.$message.success('复制成功')
		},
	},
}
</script>

<style lang="scss" scoped>
.shop_account {
	width: 100%;
	height: 100%;
	.shop_account_header {
		background-color: #fff;
		padding: 10px;
		box-sizing: border-box;
		.el-form-item {
			margin-bottom: 10px;
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
		&-delete {
			color: #f56c6c;
			cursor: pointer;
		}
	}
}
</style>
