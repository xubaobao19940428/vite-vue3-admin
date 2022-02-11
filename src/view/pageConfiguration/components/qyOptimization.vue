<template>
	<div class="app-container">
		<el-form inline>
			<el-form-item label="站点：">
				<el-select
					v-model="param.divisionId"
					clearable
					placeholder="请选择"
					size="medium"
				>
					<el-option
						v-for="(item, index) in divisionList"
						:key="index"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button
					type="primary"
					@click="getList(1)"
					icon="el-icon-search"
					size="medium"
					>查询</el-button
				>
				<el-button
					size="medium"
					type="primary"
					icon="el-icon-plus"
					@click="showEditDialog('add')"
				>
					新增
				</el-button>
			</el-form-item>
		</el-form>
		<div class="main-content-wrapper">
			<el-table border height="100%" :data="dataList">
				<el-table-column
					prop="title"
					label="分类名称"
					align="center"
				></el-table-column>
				<el-table-column
					label="ID"
					align="center"
					min-width="100px"
					prop="id"
				></el-table-column>
				<el-table-column
					label="站点"
					min-width="100px"
					header-align="center"
				>
					<template #default="scope">
						{{ scope.row.divisionName }}
					</template>
				</el-table-column>
				<el-table-column
					fixed="right"
					label="操作"
					min-width="200px"
					align="center"
				>
					<template #default="scope">
						<el-button
							type="text"
							size="mini"
							@click="showEditDialog('edit', scope.row)"
						>
							编辑
						</el-button>
						<el-button
							type="text"
							size="mini"
							@click="clickToDelete(scope.row)"
							>删除</el-button
						>
						<el-button
							type="text"
							size="mini"
							@click="toLinkGdOperatione(scope.row)"
						>
							商品管理
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pagination-box">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="getList"
				:current-page="param.pageNum"
				:page-sizes="[5, 10, 20, 50]"
				:page-size="param.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="totals"
			></el-pagination>
		</div>
		<edit-dialog
			:dialogVisible="dialog.show"
			:APP_TYPE="APP_TYPE"
			:propParam="dialog.param"
			@close="closeDialog"
			@confirm="confirmAddItem"
		></edit-dialog>
	</div>
</template>
<script>
import { groupList, deleteGroup } from '@/api/newJson/pageEdit'
import editDialog from './qyOptimizationEdit.vue'
import { divisionList } from '@/data/globalData.js'
export default {
	props: {},
	data() {
		return {
			dataList: [],
			dialogVisible: false,
			productsOperate: {},
			types: '',
			headers: this.$headers,
			param: {
				divisionId: 'CN^^^浙江省^^^杭州市',
				pageNum: 1,
				pageSize: 10,
			},
			divisionList: divisionList,
			totals: 0,
			dialog: {
				show: false,
				param: {},
			},
		}
	},
	components: {
		editDialog,
	},
	created() {
		this.getList()
	},
	methods: {
		handleSizeChange(value) {
			this.param.pageSize = value
			this.getList(1)
		},
		getList(page) {
			this.param.pageNum = page || this.param.pageNum
			groupList(this.filterData(this.param)).then((res) => {
				if (res.data) {
					this.dataList = res.data
					this.totals = res.total
				}
			})
		},
		showEditDialog(type, data) {
			this.dialog.show = true
			this.dialog.param = {}
			if (type == 'edit') {
				this.$nextTick(() => {
					Object.assign(
						this.dialog.param,
						JSON.parse(JSON.stringify(data))
					)
				})
			}
			// else if (type == 'copy') {
			//     Object.assign(this.dialog.param, JSON.parse(JSON.stringify(data)));
			//     this.dialog.param.id = null;
			// }
		},
		closeDialog() {
			this.dialog.show = false
		},
		confirmAddItem() {
			this.dialog.show = false
			this.getList()
		},
		clickToDelete(data) {
			this.$confirm('此操作将永久删除该商品分组, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(async () => {
					deleteGroup({
						id: data.id,
					}).then((res) => {
						if (res) {
							this.$message.success('删除成功')
							this.getList(1)
						}
					})
					this.getList()
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除',
					})
				})
		},
		toSort(data) {
			marketingCategorySetSort({
				serialNo: data.serialNo,
				sort: data.cateSort,
			}).then((res) => {
				if (res.ret.errcode === 1) {
					this.getList()
				}
			})
		},
		changeSwitchstate(data) {
			marketingCategoryHideShow({
				serialNo: data.serialNo,
				showStatus: data.showStatus,
			}).then((res) => {
				if (res.ret.errcode === 1) {
					this.getList()
				}
			})
		},
		toLinkGdOperatione(row) {
			this.$router.push({
				path: 'qyOptimizationProduct',
				query: {
					id: row.id,
				},
			})
		},
	},
}
</script>
<style lang="scss" scoped>
.editGoodsGounp {
	width: 100%;
	height: auto;
	padding: 20px 0;
}
</style>
