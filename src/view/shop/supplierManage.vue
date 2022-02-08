<!--  -->
<template>
	<div class="supplier_manage app-container">
		<div class="supplier_manage_header">
			<el-form
				ref="supplierFilterForm"
				inline
				label-width="90px"
				:model="queryData"
			>
				<el-form-item
					label="商家名："
					class="filter-item"
					prop="supplierName"
				>
					<el-input
						placeholder="请输入商家名"
						size="medium"
						clearable
						v-model="queryData.name"
					></el-input>
				</el-form-item>
				<el-form-item
					label="商家简称："
					class="filter-item"
					prop="shortName"
				>
					<el-input
						placeholder="请输入商家简称"
						size="medium"
						clearable
						v-model="queryData.shortName"
					></el-input>
				</el-form-item>
				<el-form-item
					label="合作状态："
					class="filter-item"
					prop="cooperativeStatus"
				>
					<el-select
						v-model="queryData.cooperationStatus"
						size="medium"
						clearable
					>
						<el-option
							v-for="(item, index) in cooperationStatusList"
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
						size="medium"
						@click="getSellersList(1)"
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
				<span>商家列表</span>
				<el-button
					type="primary"
					icon="el-icon-plus"
					@click="addSupplier"
					size="small"
					>新增商家</el-button
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
						label="商家ID"
						align="center"
						prop="id"
					></el-table-column>
					<el-table-column
						prop="name"
						label="商家名称"
						align="center"
					></el-table-column>
					<el-table-column
						prop="shortName"
						label="商家简称"
						align="center"
					></el-table-column>
					<el-table-column label="订单信息" align="center">
						<template #default="scope">
							<el-button
								type="text"
								@click="checkoutOrderList(scope.row)"
								>查看订单</el-button
							>
						</template>
					</el-table-column>
					<el-table-column label="商品信息" align="center">
						<template #default="scope">
							<el-button
								type="text"
								@click="checkoutProductList(scope.row)"
								>查看商品</el-button
							>
						</template>
					</el-table-column>
					<el-table-column label="结算信息" align="center">
						<template #default="scope">
							<el-button
								type="text"
								@click="checkoutSettle(scope.row)"
								>查看</el-button
							>
						</template>
					</el-table-column>
					<el-table-column label="合作状态" align="center">
						<template #default="scope">
							<el-tag
								type="success"
								size="small"
								v-if="scope.row.cooperationStatus == 0"
								>正常合作</el-tag
							>
							<el-tag type="danger" size="small" v-else
								>终止合作</el-tag
							>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="200" align="center">
						<template #default="scope">
							<span
								class="table-opreator"
								@click="editSupplier(scope.row)"
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
	</div>
</template>

<script>
import { ref, reactive } from 'vue'
import { getSellers } from '@/api/newJson/shop'
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
				cooperationStatus: '',
				name: '',
				shotName: '',
				pageNum: 1,
				pageSize: 20,
			},
			total: 0,
			cooperationStatusList: [
				{
					value: 0,
					label: '正常合作',
				},
				{
					value: 1,
					label: '终止合作',
				},
			],
			// activeName: 'first',
			tableData: [],
		}
	},
	components: {},
	computed: {},
	mounted() {
		this.getSellersList(1)
	},
	methods: {
		resetSearch() {
			this.queryData.cooperationStatus = ''
			this.queryData.name = ''
			this.queryData.shotName = ''
			this.getSellersList(1)
		},
		addSupplier() {
			this.$router.push({
				name: 'editSupplier',
				query: {
					type: 'add',
				},
			})
		},
		editSupplier(data) {
			this.$router.push({
				name: 'editSupplier',
				query: {
					type: 'edit',
					supplierId: data.id,
				},
			})
		},
		getSellersList(type) {
			if (type == 1) {
				this.queryData.pageNum = 1
			}
			getSellers(this.filterData(this.queryData))
				.then((resultes) => {
					if (resultes.data) {
						this.tableData = resultes.data.data
						this.total = resultes.data.total
					}
				})
				.catch((error) => {})
		},
		handleSizeChange(val) {
			this.queryData.pageSize = val
			this.getSellersList(0)
		},
		handleCurrentChange(val) {
			this.queryData.pageNum = val
			this.getSellersList(0)
		},
		//商家订单查询
		checkoutOrderList(row) {
			this.$router.push({
				name: 'orderList',
				query: {
					sellerId: row.id,
				},
			})
		},
		//商家商品查询
		checkoutProductList(row) {
			this.$router.push({
				name: 'productList',
				query: {
					sellerId: row.id,
				},
			})
		},
		checkoutSettle(row) {
			this.$router.push({
				name: 'settleShop',
				query: {
					sellerId: row.id,
				},
			})
		},
	},
}
</script>

<style lang="scss" scoped>
.supplier_manage {
	width: 100%;
	height: 100%;
	.supplier_manage_header {
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
	}
}
</style>
