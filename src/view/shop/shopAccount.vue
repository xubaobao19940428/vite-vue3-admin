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
				<el-form-item
					label="用户名搜索："
					class="filter-item"
					prop="contactName"
				>
					<el-input
						placeholder="请输入商家名"
						size="medium"
						clearable
						v-model="queryData.contactName"
					></el-input>
				</el-form-item>
				<el-form-item label="适用商家/店铺：" class="filter-item">
					<el-select
						v-model="queryData.sellerId"
						size="medium"
						clearable
						style="width: 100px"
						@change="changeSupplier"
					>
						<el-option
							v-for="(item, index) in supplierList"
							:key="index"
							:label="item.name"
							:value="item.id"
						></el-option>
					</el-select>
					<el-select
						v-model="queryData.shopId"
						size="medium"
						clearable
						style="width: 150px"
						placeholder="请选择店铺"
					>
						<el-option
							v-for="(item, index) in shopList"
							:key="index"
							:label="item.name"
							:value="item.id"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item
					label="对应角色："
					class="filter-item"
					prop="status"
				>
					<el-select v-model="queryData.role" size="medium" clearable>
						<el-option
							v-for="(item, index) in roleList"
							:key="index"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item class="filter-item" style="margin-left: 20px">
					<el-button
						icon="el-icon-search"
						type="primary"
						@click="getAssistants(1)"
						size="medium"
						>搜索</el-button
					>
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
				<span>账号列表</span>
				<el-button
					type="primary"
					icon="el-icon-plus"
					@click="addShopAccount"
					size="small"
					>新增账号</el-button
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
						label="ID"
						width="180"
						align="center"
						prop="id"
					></el-table-column>
					<el-table-column label="商家" width="180" align="center">
						<template #default="scope">
							<span>{{
								scope.row.seller ? scope.row.seller.name : ''
							}}</span>
						</template>
					</el-table-column>
					<el-table-column label="店铺" align="center" width="180">
						<template #default="scope">
							<span>{{
								scope.row.shop ? scope.row.shop.name : ''
							}}</span>
						</template>
					</el-table-column>
					<el-table-column
						prop="contactPhone"
						label="电话"
						align="center"
						width="180"
					></el-table-column>
					<el-table-column label="名称" align="center" width="180">
						<template #default="scope">
							<span>{{ scope.row.contactName }}</span>
						</template>
					</el-table-column>
					<el-table-column
						label="对应角色"
						align="center"
						width="180"
					>
						<template #default="scope">
							<el-tag
								v-if="scope.row.role == 0"
								type="success"
								size="small"
								>{{ returnRoleName(scope.row.role) }}</el-tag
							>
							<el-tag
								v-else-if="scope.row.role == 1"
								type="primary"
								size="small"
								>{{ returnRoleName(scope.row.role) }}</el-tag
							>
							<el-tag
								v-else-if="scope.row.role == 2"
								type="info"
								size="small"
								>{{ returnRoleName(scope.row.role) }}</el-tag
							>
							<el-tag
								v-else-if="scope.row.role == 3"
								type="warning"
								size="small"
								>{{ returnRoleName(scope.row.role) }}</el-tag
							>
						</template>
					</el-table-column>
					<el-table-column
						label="创建时间"
						align="center"
						width="180"
					>
						<template #default="scope">
							<span>{{
								timestampToTime(scope.row.createTime)
							}}</span>
						</template>
					</el-table-column>
					<el-table-column
						label="更新时间"
						align="center"
						width="180"
					>
						<template #default="scope">
							<span>{{
								timestampToTime(scope.row.updateTime)
							}}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="200" align="center">
						<template #default="scope">
							<span
								class="table-opreator-delete"
								@click="deleteShopAccount(scope.row)"
								>删除</span
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
		<add-acount-dialog
			:dialogFormVisible="dialogFormVisible"
			:title="title"
			:supplierList="supplierList"
			:roleList="roleList"
			@close-dialog="closeDialog"
			@confirm-form="confirmForm"
		></add-acount-dialog>
	</div>
</template>

<script>
import { ref, reactive } from 'vue'
import noDataComponent from '@/components/noDataComponent/index.vue'
import addAcountDialog from './shopComponents/addAcountDialog.vue'
import { addAssistant, assistants, delAssistant } from '@/api/newJson/account'
import { getSellers, getShops } from '@/api/newJson/shop'
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
			title: '新增店铺账户',
			queryData: {
				sellerId: '',
				shopId: '',
				role: '',
				contactName: '',
				pageNum: 1,
				pageSize: 20,
			},
			total: 0,
			type: 'add',
			// activeName: 'first',
			tableData: [],
			supplierList: [],
			shopList: [],
			roleList: [
				{
					label: '店员',
					value: 0,
				},
				{
					label: '店长',
					value: 1,
				},
				{
					label: '商家',
					value: 2,
				},
				{
					label: '管理员',
					value: 3,
				},
			],
		}
	},
	components: {
		noDataComponent,
		addAcountDialog,
	},
	computed: {},
	mounted() {
		this.getAssistants(1)
		this.getSellersList()
	},
	methods: {
		returnRoleName(role) {
			let str = ''
			this.roleList.map((item) => {
				if (item.value == role) {
					str = item.label
					return str
				}
			})
			return str
		},
		getSellersList() {
			getSellers({
				pageSize: 1000,
				pageNum: 1,
			})
				.then((response) => {
					this.supplierList = response.data.data
				})
				.catch((error) => {})
		},
		//关闭弹窗
		closeDialog() {
			this.dialogFormVisible = false
		},
		addShopAccount() {
			this.title = '新增店铺账户'
			this.type = 'add'
			this.dialogFormVisible = true
		},
		changeSupplier(val) {
			if (val) {
				getShops({
					sellerId: val,
				})
					.then((response) => {
						if (response) {
							this.shopList = response.data.data
						}
					})
					.catch((error) => {})
			}
		},
		resetSearch() {
			this.queryData.sellerId = ''
			this.queryData.shopId = ''
			this.queryData.contactName = ''
			this.queryData.pageNum = 1
			this.getAssistants(1)
		},
		getAssistants(type) {
			if (type == 1) {
				this.queryData.pageNum = 1
			}
			assistants(this.filterData(this.queryData))
				.then((resultes) => {
					console.log(resultes)
					if (resultes.data) {
						this.tableData = resultes.data.data
						this.total = resultes.data.total
					}
				})
				.catch((error) => {})
		},
		handleSizeChange(val) {
			this.queryData.pageSize = val
			this.getAssistants(0)
		},
		handleCurrentChange(val) {
			this.queryData.pageNum = val
			this.getAssistants(0)
		},
		confirmForm(form) {
			if (this.type == 'add') {
				addAssistant(form)
					.then((response) => {
						if (response) {
							this.$message.success('添加成功')
							this.dialogFormVisible = false
							this.getAssistants(1)
						}
					})
					.catch((error) => {})
			}
		},
		deleteShopAccount(data) {
			let _this = this
			_this
				.$confirm('此操作讲永久删除该账号', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				})
				.then(() => {
					delAssistant({
						id: data.id,
					}).then((res) => {
						_this.$message.success('删除成功')
						_this.getAssistants(1)
					})
				})
				.catch(() => {
					_this.$message.info('取消删除')
				})
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
