<!--  -->
<template>
	<div class="common_set app-container">
		<div class="main-content-wrapper">
			<div class="product-header el-card__header">
				<span>配置列表</span>
				<el-button
					type="primary"
					icon="el-icon-plus"
					@click="addCommonSet"
					size="small"
					>新增配置</el-button
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
						prop="id"
						label="ID"
						width="180"
						align="center"
					></el-table-column>
					<el-table-column label="配置类型" align="center">
						<template #default="scope">
							<span>商品限购配置</span>
						</template>
					</el-table-column>
					<!-- <el-table-column label="类目" align="center" prop="stock"></el-table-column> -->
					<el-table-column
						label="内容"
						align="center"
						prop="configValue"
					></el-table-column>
					<el-table-column label="操作" width="200" align="center">
						<template #default="scope">
							<span
								class="table-opreator"
								@click="editProduct(scope.row)"
								>编辑</span
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
		<addCommonDialog
			ref="addCommonDialog"
			:dialogFormVisible="dialogFormVisible"
			:title="title"
			@close-dialog="closeDialog"
			@confirm-form="confirmForm"
		></addCommonDialog>
	</div>
</template>

<script>
import { ref, reactive } from 'vue'
import {
	configList,
	saveOrUpdateConfig,
	configDetail,
} from '@/api/newJson/pageEdit'
import noDataComponent from '@/components/noDataComponent.vue'
import addCommonDialog from './components/addCommonDialog.vue'
export default {
	data() {
		return {
			dialogFormVisible: false,
			title: '公共配置',
			queryData: {
				pageNum: 1,
				pageSize: 20,
			},
			total: 0,
			tableData: [],
		}
	},
	components: {
		noDataComponent,
		addCommonDialog,
	},
	computed: {},
	mounted() {
		this.getConfigList(1)
	},
	methods: {
		getConfigList(type) {
			if (type == 1) {
				this.queryData.pageNum = 1
			}
			configList(this.filterData(this.queryData))
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
			this.getConfigList(0)
		},
		handleCurrentChange(val) {
			this.queryData.pageNum = val
			this.getConfigList(0)
		},
		addCommonSet() {
			this.dialogFormVisible = true
		},
		confirmForm(data) {
			saveOrUpdateConfig(data)
				.then((response) => {
					if (response) {
						this.$message.success('成功'), this.getConfigList(1)
						this.dialogFormVisible = false
					}
				})
				.catch((error) => {})
		},
		closeDialog() {
			this.dialogFormVisible = false
		},
		editProduct(row) {
			configDetail({ id: row.id })
				.then((response) => {
					if (response) {
						this.dialogFormVisible = true
						this.$nextTick(() => {
							this.$refs['addCommonDialog'].form.id =
								response.data.id
							this.$refs['addCommonDialog'].form.configType =
								response.data.configType
							this.$refs['addCommonDialog'].form.configValue =
								response.data.configValue
							this.$refs['addCommonDialog'].form.remark =
								response.data.remark
						})
					}
				})
				.catch((error) => {})
		},
	},
}
</script>

<style lang="scss" scoped>
.common_set {
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
		&-delete {
			margin-left: 10px;
			color: #f56c6c;
			cursor: pointer;
		}
	}
}
</style>
