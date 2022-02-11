<template>
	<div class="app-container">
		<el-form inline>
			<el-form-item>
				<el-button
					size="medium"
					type="primary"
					icon="el-icon-plus"
					@click="showEditDialog('add')"
				>
					新增
				</el-button>
			</el-form-item>
			<el-form-item>
				<el-button size="medium" type="danger" icon="el-icon-delete">
					批量删除
				</el-button>
			</el-form-item>
		</el-form>
		<div class="main-content-wrapper">
			<el-table
				border
				height="100%"
				:data="dataList"
				ref="multipleTable"
				@selection-change="handleSelectionChange"
			>
				<el-table-column
					fixed="left"
					type="selection"
					width="40"
				></el-table-column>
				<el-table-column
					label="国家"
					min-width="100px"
					header-align="center"
				>
					<template slot-scope="scope">
						{{ scope.row.countryCode | countryFilter }}
					</template>
				</el-table-column>
				<el-table-column
					prop="name"
					label="广告位标题"
					align="center"
					width="150px"
				></el-table-column>
				<el-table-column
					prop="url"
					label="链接"
					align="center"
					min-width="150px"
				></el-table-column>
				<el-table-column label="图片" align="center" min-width="100px">
					<template slot-scope="scope">
						<el-popover placement="top-start" trigger="hover">
							<img
								:src="
									getMultiLangShowInfo(
										scope.row.image,
										'image'
									)
								"
								class="previewImage"
							/>
							<img
								:src="
									getMultiLangShowInfo(
										scope.row.image,
										'image'
									)
								"
								class="thumbnail"
								slot="reference"
							/>
						</el-popover>
					</template>
				</el-table-column>
				<el-table-column
					label="开始时间"
					align="center"
					min-width="180px"
				>
					<template slot-scope="scope">
						{{ scope.row.startTime | formatTime }}
					</template>
				</el-table-column>
				<el-table-column
					label="结束时间"
					align="center"
					min-width="180px"
				>
					<template slot-scope="scope">
						{{ scope.row.endTime | formatTime }}
					</template>
				</el-table-column>
				<el-table-column
					fixed="right"
					label="操作"
					align="center"
					width="200px"
				>
					<template slot-scope="scope">
						<el-button
							plain
							type="primary"
							size="mini"
							@click="showEditDialog('edit', scope.row)"
						>
							编辑
						</el-button>
						<el-button
							plain
							type="danger"
							size="mini"
							@click="toDelete(scope.row)"
						>
							删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pagination-box">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="getList"
				:current-page="searchParam.page.pageNum"
				:page-sizes="[5, 10, 20, 50]"
				:page-size="searchParam.page.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="totals"
			></el-pagination>
		</div>
		<edit-dialog
			:dialogVisible="dialog.show"
			bannerType="2"
			:propParam="dialog.param"
			@close="closeEditDialog"
			@confirm="confirmEditItem"
		></edit-dialog>
	</div>
</template>
<script>
// import { fetchList, fetchBatchDelete, fetchDelete } from '@/request/promotion.js'
import common from '@/js/mixins.js'
import editDialog from './screenAdEdit.vue'
export default {
	components: {
		editDialog,
	},
	mixins: [common],
	data() {
		return {
			searchParam: {
				bannerType: 2,
				countryCode: '',
				page: {
					pageNum: 1,
					pageSize: 10,
					pagingSwitch: true,
				},
			},
			totals: 0,
			dataList: [],
			multipleSelection: [],
			dataListId: [],
			dialog: {
				show: false,
				param: {},
			},
		}
	},
	watch: {
		multipleSelection: function () {
			let arr = []
			for (let i in this.multipleSelection) {
				arr.push(this.multipleSelection[i].bannerId)
			}
			this.dataListId = arr
		},
	},
	created() {
		// this.getList();
	},
	methods: {
		handleSizeChange(value) {
			this.searchParam.page.pageSize = value
			this.getList(1)
		},
		getList(page) {
			this.searchParam.page.pageNum =
				page || this.searchParam.page.pageNum
		},
		showEditDialog(type, data) {
			this.dialog.param = {}
			if (type == 'edit') {
				Object.assign(this.dialog.param, data)
			}
			this.dialog.show = true
		},
		closeEditDialog() {
			this.dialog.show = false
		},
		confirmEditItem() {
			this.dialog.show = false
			this.getList()
		},
		toggleSelection(rows) {
			rows.forEach((row) => {
				this.$refs.multipleTable.toggleRowSelection(row)
			})
		},
		handleSelectionChange(val) {
			this.multipleSelection = val
		},
		toDeleteAll() {
			if (this.dataListId.length === 0) {
				this.$message('请先勾选您需操作的广告')
				return
			}
			this.$confirm('此操作将永久删除所选广告位, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					fetchBatchDelete({ bannerIds: this.dataListId }).then(
						(res) => {
							if (res.ret.errcode === 1) {
								this.$message.success('删除成功')
								this.getList()
							}
						}
					)
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除',
					})
				})
		},
		toDelete(row) {
			this.$confirm('此操作将永久删除该广告位, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					fetchDelete({ bannerId: row.bannerId }).then((res) => {
						if (res.ret.errcode === 1) {
							this.$message.success('删除成功')
							this.getList()
						}
					})
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除',
					})
				})
		},
	},
}
</script>
<style lang="scss" scoped>
header {
	width: 100%;
	height: 48px;
}
article {
}
</style>
