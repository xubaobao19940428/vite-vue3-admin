<!--  -->
<template>
	<div class="product_shelvestatus app-container">
		<div class="product-list-header">
			<el-form
				:inline="true"
				:model="queryData"
				class="demo-form-inline"
				size="medium"
				label-width="100px"
			>
				<el-form-item label="上架状态：">
					<el-select
						v-model="queryData.shelveStatus"
						placeholder="商品上下架状态"
						clearable
					>
						<el-option label="已上架" :value="1"></el-option>
						<el-option label="已下架" :value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="商品Id：">
					<el-input
						v-model="queryData.data"
						placeholder="请输入商品ID"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item label="商品标题：">
					<el-input
						v-model="queryData.title"
						placeholder="请输入商品标题"
						clearable
					></el-input>
				</el-form-item>
				<!-- <el-form-item label="类目：">
                    <el-select v-model="queryData.source" placeholder="商品来源">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item> -->
				<el-form-item label="商家：">
					<el-select v-model="queryData.sellerId" placeholder="商家">
						<el-option
							v-for="(item, index) in supplierList"
							:key="index"
							:label="item.name"
							:value="item.id"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getProductList(1)"
						>搜索</el-button
					>
					<el-button type="info" @click="resetSearch">重置</el-button>
				</el-form-item>
				<div style="padding-bottom: 10px">
					<el-button
						type="primary"
						size="medium"
						@click="batchEditShelve"
						>批量下架</el-button
					>
				</div>
			</el-form>
		</div>
		<div class="main-content-wrapper">
			<div class="table-detail">
				<el-table
					:data="tableData"
					border
					stripe
					style="width: 100%"
					height="100%"
					@selection-change="handleSelectionChange"
				>
					<el-table-column type="selection" width="55" />
					<el-table-column
						prop="id"
						label="商品ID"
						align="center"
					></el-table-column>
					<el-table-column label="商品信息" align="center">
						<template #default="scope">
							<div class="flex flex-item--center">
								<el-popover
									placement="top-start"
									trigger="hover"
								>
									<img
										:src="scope.row.cover[0]"
										class="previewImage"
									/>
									<template #reference>
										<img
											:src="scope.row.cover[0]"
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
					<!-- <el-table-column label="类目" align="center" prop="stock"></el-table-column> -->
					<el-table-column
						label="库存"
						align="center"
						prop="stock"
					></el-table-column>
					<el-table-column
						prop="shelveStatus"
						label="上架状态"
						align="center"
					>
						<template #default="scope">
							<el-tag
								type="success"
								v-if="scope.row.shelveStatus == 1"
								>已上架</el-tag
							>
							<el-tag
								type="warning"
								v-else-if="scope.row.shelveStatus == 2"
								>已下架</el-tag
							>
							<el-tag
								type="danger"
								v-else-if="scope.row.shelveStatus == 3"
								>卖家停止合作</el-tag
							>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="200" align="center">
						<template #default="scope">
							<el-button
								type="warning"
								size="mini"
								v-if="scope.row.shelveStatus == 1"
								plain
								@click="offSaleProduct(scope.row)"
							>
								下架
							</el-button>
							<el-button
								type="success"
								size="mini"
								v-if="scope.row.shelveStatus == 2"
								plain
								@click="onSaleProduct(scope.row)"
							>
								上架
							</el-button>
							<!-- <span class="table-opreator" @click="viewProduct(scope.row)">查看</span>
                            <span class="table-opreator" @click="editProduct(scope.row)">编辑</span>
                            <span class="table-opreator" @click="copyProduct(scope.row)">复制</span>
                            <span class="table-opreator-delete" @click="deleteProductInfo(scope.row)">删除</span> -->
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
		<!---上下架弹出框-->
		<on-sale-dialog
			:dialogTableVisible="dialogTableVisible"
			:gridData="gridData"
			@close-dilaog="closeOnSaledialog"
			@confirm-dialog="confirmDialog"
		></on-sale-dialog>
	</div>
</template>

<script>
import { ref, reactive } from 'vue'
import { productList, batchModifyShelve } from '@/api/newJson/product'
import noDataComponent from '@/components/noDataComponent/index.vue'
import { getSellers } from '@/api/newJson/shop'
import { splitData } from '@/utils/index'
import offSaleDialog from './components/offSale.vue'
import onSaleDialog from './components/onSale.vue'
export default {
	setup() {
		const count = ref(0)
		const defaultTime2 = ref([
			new Date(2000, 1, 1, 0, 0, 0),
			new Date(2000, 2, 1, 23, 59, 59),
		]) //
		const object = reactive({
			foo: 'bar',
		})
		// 暴露到template中
		return {
			count,
			object,
			defaultTime2,
		}
	},
	data() {
		return {
			dialogTableVisible: false,
			gridData: [], //上架弹窗
			timeList: [],
			queryData: {
				data: '',
				shelveStatus: '',
				sellerId: '',
				title: '',
				source: '',
				productIds: [],
				pageNum: 1,
				pageSize: 20,
			},
			total: 0,
			// activeName: 'first',
			tableData: [],
			supplierList: [],
			multipleSelection: [],
			selectOffSaleProductList: [],
		}
	},
	watch: {
		multipleSelection: function () {
			let arr = []
			for (let i in this.multipleSelection) {
				arr.push(this.multipleSelection[i].id)
			}
			this.selectOffSaleProductList = arr
		},
	},
	components: {
		noDataComponent,
		offSaleDialog,
		onSaleDialog,
	},
	computed: {},
	mounted() {
		if (this.$route.query.sellerId) {
			this.queryData.sellerId = Number(this.$route.query.sellerId)
		}
		this.getProductList(1)
		this.getSellersList({
			pageNum: 1,
			pageSize: 1000,
		})
	},
	methods: {
		handleSelectionChange(val) {
			this.multipleSelection = val
		},
		batchEditShelve() {
			if (this.selectOffSaleProductList.length == 0) {
				this.$message.warning('请挑选需要下架的商品')
				return
			}
			this.setBatchModifyShelve(2, this.selectOffSaleProductList)
		},
		offSaleProduct(row) {
			let productIds = [row.id]
			this.setBatchModifyShelve(2, productIds)
		},
		confirmDialog(data) {
			let productIds = []
			data.map((item) => {
				productIds.push(item.id)
			})
			this.setBatchModifyShelve(1, productIds)
		},
		setBatchModifyShelve(type, produtIds) {
			let params = {
				shelveStatus: type == 1 ? 1 : 2,
				productIds: produtIds,
			}
			batchModifyShelve(params)
				.then((response) => {
					if (response) {
						if (type == 1) {
							if (!response.data.length) {
								this.$message.success('上架成功')
							} else {
								this.$message.error(
									`${response.data.toString()}上架失败`
								)
							}

							this.dialogTableVisible = false
						} else {
							this.$message.success('下架成功')
						}

						this.getProductList(1)
					}
				})
				.catch((error) => {
					console.log(error)
				})
		},
		//获取商家列表
		getSellersList(params) {
			getSellers(params)
				.then((response) => {
					if (response) {
						this.supplierList = response.data.data
					}
				})
				.catch((error) => {})
		},
		resetSearch() {
			this.queryData.productId = ''
			this.queryData.title = ''
			this.queryData.data = ''
			this.queryData.sellerId = ''
			this.queryData.shelveStatus = ''
			this.getProductList(1)
		},
		getProductList(type) {
			if (type == 1) {
				this.queryData.pageNum = 1
			}
			this.queryData.productIds = splitData(this.queryData.data) || []
			productList(this.filterData(this.queryData))
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
			this.getProductList(0)
		},
		handleCurrentChange(val) {
			this.queryData.pageNum = val
			this.getProductList(0)
		},
		//上架
		onSaleProduct(data) {
			if (!data.stock) {
				data.message = '库存不足'
			}
			this.gridData = [data]
			this.dialogTableVisible = true
		},
		closeOnSaledialog() {
			this.dialogTableVisible = false
		},
	},
}
</script>

<style lang="scss" scoped>
.product_shelvestatus {
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
