<!--  -->
<template>
	<div class="product_list app-container">
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
							clearable
						></el-option>
					</el-select>
				</el-form-item>
				<!-- <el-form-item label="时间查询：" class="filter-item" prop="status">
                    <el-select v-model="queryData.timeType" size="medium" clearable style="width:120px">
                        <el-option v-for="(item, index) in statusList" :key="index" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                    <el-date-picker
                        size="medium"
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
                </el-form-item> -->
				<el-form-item>
					<el-button type="primary" @click="getProductList(1)"
						>搜索</el-button
					>
					<el-button type="info" @click="resetSearch">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="main-content-wrapper">
			<div class="product-header el-card__header">
				<span>视频号商品列表</span>
				<el-button
					type="primary"
					size="small"
					icon="el-icon-refresh"
					style="margin-left: 10px"
					@click="refreshWxProduct"
					:loading="loading"
				>
					刷新微信审核状态
				</el-button>
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
						prop="productId"
						label="商品ID"
						width="180"
						align="center"
					></el-table-column>
					<el-table-column
						label="商品信息"
						width="180"
						align="center"
					>
						<template #default="scope">
							<div class="flex flex-item--center">
								<el-popover
									placement="top-start"
									trigger="hover"
								>
									<img
										:src="scope.row.cover"
										class="previewImage"
									/>
									<template #reference>
										<img
											:src="scope.row.cover"
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
						width="200"
					>
						<template #default="scope">
							<el-input-number
								v-model="scope.row.stock"
								:min="0"
								size="small"
								:disabled="
									!(
										scope.row.cateId &&
										scope.row.brandId &&
										scope.row.outerId
									)
								"
							></el-input-number>
						</template>
					</el-table-column>
					<el-table-column
						prop="shelveStatus"
						label="微信上架状态"
						align="center"
						width="150"
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
						</template>
					</el-table-column>
					<el-table-column
						label="微信审核状态"
						align="center"
						width="200"
					>
						<template #default="scope">
							<el-tag
								v-if="scope.row.auditStatus == 1"
								type="info"
								size="mini"
								>未通过</el-tag
							>
							<el-tag
								type="success"
								size="mini"
								v-else-if="scope.row.auditStatus == 2"
								>通过</el-tag
							>
							<el-tag
								size="mini"
								type="primary"
								v-else-if="scope.row.auditStatus == 0"
								>审核中</el-tag
							>
							<el-tag
								size="mini"
								type="warning"
								v-else-if="scope.row.auditStatus == 3"
								>待提交/未提交过</el-tag
							>
							<el-tooltip
								class="item"
								effect="dark"
								:content="scope.row.offReason"
								placement="top"
								v-if="scope.row.auditStatus == 1"
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
									{{ scope.row.offReason }}
								</span>
							</el-tooltip>
						</template>
					</el-table-column>
					<el-table-column
						label="VIP(¥)"
						align="center"
						prop="salePrice"
						width="200"
					>
						<template #default="scope">
							<el-input-number
								v-model="scope.row.salePrice"
								:min="0"
								:precision="2"
								size="small"
								:disabled="
									!(
										scope.row.cateId &&
										scope.row.brandId &&
										scope.row.outerId
									)
								"
							></el-input-number>
						</template>
					</el-table-column>
					<el-table-column
						label="更新时间"
						align="center"
						width="200"
					>
						<template #default="scope">
							<span>{{
								timestampToTime(scope.row.updateTime)
							}}</span>
						</template>
					</el-table-column>
					<el-table-column
						label="操作"
						width="300"
						align="center"
						fixed="right"
					>
						<template #default="scope">
							<div class="table-opreator">
								<el-button
									type="primary"
									size="small"
									plain
									@click="updateProductToWx(scope.row)"
									>同步更新</el-button
								>
								<el-button
									type="primary"
									size="small"
									plain
									@click="pushProductToWx(scope.row)"
									>推送至微信</el-button
								>
							</div>
							<div class="table-opreator">
								<el-button
									type="primary"
									size="small"
									plain
									@click="additionalEdit(scope.row)"
									>额外编辑</el-button
								>
								<el-button
									type="success"
									size="small"
									v-if="scope.row.shelveStatus == 1"
									plain
									@click="editShelveStatus(scope.row, 2)"
								>
									从微信下架
								</el-button>
								<el-button
									type="warning"
									size="small"
									v-else
									plain
									@click="editShelveStatus(scope.row, 1)"
									>上架至微信</el-button
								>
							</div>
							<div class="table-opreator">
								<el-button
									type="primary"
									size="small"
									plain
									@click="updateStockAndSalePrice(scope.row)"
									v-if="
										scope.row.cateId &&
										scope.row.brandId &&
										scope.row.outerId
									"
								>
									价格和库存保存
								</el-button>
								<el-button
									type="primary"
									size="small"
									plain
									@click="editProduct(scope.row)"
									>普通编辑</el-button
								>
							</div>
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
		<additional-edit-dialig
			ref="additionalEditDialog"
			:dialogFormVisible="dialogFormVisible"
			@close-dialog="closeDialog"
			@confirm-form="confirmWxProduct"
		></additional-edit-dialig>
	</div>
</template>

<script>
import { ref, reactive } from 'vue'
import noDataComponent from '@/components/noDataComponent/index.vue'
import { getSellers } from '@/api/newJson/shop'
import { splitData } from '@/utils/index'
import {
	getDownstreamProducts,
	fastUpdate,
	pushProduct,
	updateMmxxToWxProductList,
	modifyShelveStatus,
	modifyDownstreamPriceStock,
	refreshAll,
} from '@/api/newJson/wxProduct'
import additionalEditDialig from './components/additionalEditDialig.vue'
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
			loading: false,
			dialogFormVisible: false,
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
		}
	},
	components: {
		noDataComponent,
		additionalEditDialig,
	},
	computed: {},
	mounted() {
        console.log(this)
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
		//刷新微信审核状态
		refreshWxProduct() {
			this.loading = true
			this.$notify({
				title: '提示',
				message:
					'当前操作为主动同步微信审核状态,接口返回较慢,无需关心接口请求结果',
				type: 'success',
			})
			refreshAll()
				.then((response) => {
					this.loading = false
				})
				.catch((error) => {
					this.loading = false
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
			getDownstreamProducts(this.filterData(this.queryData))
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
		//商品编辑只编辑美妙商品，如需更改微信端商品需要点击同步更新按钮
		editProduct(row) {
			this.$router.push({
				name: 'addProduct',
				query: {
					productId: row.productId,
					type: 'edit',
				},
			})
		},
		deleteProductInfo(data) {
			let _this = this
			_this
				.$confirm('此操作讲永久删除该商品', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				})
				.then(() => {
					deleteProduct({
						id: data.id,
					}).then((res) => {
						_this.$message.success('删除成功')
						_this.getProductList(1)
					})
				})
				.catch(() => {
					_this.$message.info('取消删除')
				})
		},
		//同步库存以及价格
		updateStockAndSalePrice(data) {
			fastUpdate({
				productId: data.productId,
				stock: data.stock,
				salePrice: data.salePrice,
			})
				.then((response) => {
					if (response) {
						this.$message.success('价格与库存快速同步成功')
						this.getProductList(1)
					}
				})
				.catch((error) => {})
		},
		//商品同步至微信
		pushProductToWx(data) {
			if (data.cateId && data.brandId) {
				pushProduct({
					productId: data.productId,
				})
					.then((response) => {
						if (response) {
							this.$message.success('同步成功')
							this.getProductList(1)
						}
					})
					.catch((error) => {})
			} else {
				this.$message.warning('请先点击额外编辑，设置品牌以及类目')
			}
		},
		//讲商品信息同步到微信的商品信息
		updateProductToWx(data) {
			updateMmxxToWxProductList({
				productId: data.productId,
			})
				.then((response) => {
					if (response) {
						this.$message.success(
							'将美妙商品同步到微信商品列表成功'
						)
						this.getProductList(1)
					}
				})
				.catch((error) => {})
		},
		//商品上下架
		editShelveStatus(data, shelveStatus) {
			let _this = this
			_this
				.$confirm(
					`是否在微信平台${
						shelveStatus == 1 ? '上架' : '下架'
					}该商品`,
					'提示',
					{
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: `${shelveStatus == 1 ? 'success' : 'warning'}`,
					}
				)
				.then(() => {
					modifyShelveStatus({
						productId: data.productId,
						shelveStatus: shelveStatus,
					})
						.then((response) => {
							if (response) {
								this.$message({
									message: `微信视频号商铺${
										shelveStatus == 1 ? '上架' : '下架'
									}成功`,
									type: 'success',
								})
								this.getProductList(1)
							}
						})
						.catch((error) => {})
				})
				.catch(() => {})
		},
		additionalEdit(data) {
			this.dialogFormVisible = true
			this.$nextTick(() => {
				this.$refs['additionalEditDialog'].form.stock = data.stock
				this.$refs['additionalEditDialog'].form.productId =
					data.productId
				this.$refs['additionalEditDialog'].form.salePrice =
					data.salePrice
			})
		},
		closeDialog() {
			this.dialogFormVisible = false
		},
		confirmWxProduct(data) {
			modifyDownstreamPriceStock(data)
				.then((response) => {
					if (response) {
						this.$message.success('额外属性更新成功')
						this.dialogFormVisible = false
						this.getProductList(1)
					}
				})
				.catch((error) => {})
		},
	},
}
</script>

<style lang="scss" scoped>
.product_list {
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
		// color: #409eff;
		// margin-left: 10px;
		// cursor: pointer;
		// display: block;
		margin-top: 10px;
		// font-size: 12px;
		// &-delete {
		//     margin-left: 10px;
		//     color: #f56c6c;
		//     cursor: pointer;
		// }
	}
	.el-table {
		.el-button {
			width: 120px;
		}
		.el-button + .el-button {
			margin-left: 10px;
			// margin-top: 10px;
		}
	}
}
</style>
