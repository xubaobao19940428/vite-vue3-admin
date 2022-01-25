<script setup>
import {
	productList,
	deleteProduct,
	updateShowSoldCount,
} from '@/api/newJson/product'
import { getSellers } from '@/api/newJson/shop'
import { splitData } from '@/utils/index'
import { add2Downstream } from '@/api/newJson/wxProduct'
</script>
<script>
export default {
	data() {
		return {
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
			selectProductList: [],
		}
	},
	methods: {
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
	},
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
}
</script>
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
				<div>
					<span>商品列表</span>
				</div>
				<div>
					<el-button
						type="primary"
						size="small"
						icon="el-icon-s-unfold"
						style="margin-left: 10px"
						@click="uploadWxProduct"
					>
						同步至微信视频号
					</el-button>
					<el-button
						type="primary"
						icon="el-icon-plus"
						@click="addProduct"
						size="small"
						>新增商品</el-button
					>
				</div>
			</div>
			<div class="table-detail">
				<el-table
					:data="tableData"
					ref="multipleTable"
					border
					stripe
					style="width: 100%"
					height="100%"
					@selection-change="handleSelectionChange"
				>
					<el-table-column
						type="selection"
						width="55"
						align="center"
						:selectable="selectable"
					/>
					<el-table-column
						prop="id"
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
							<div
								class="flex flex-item--center"
								v-if="scope.row.cover"
							>
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
						width="100"
					></el-table-column>
					<el-table-column
						prop="shelveStatus"
						label="上架状态"
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
							<el-tag
								type="danger"
								v-else-if="scope.row.shelveStatus == 3"
								>卖家停止合作</el-tag
							>
						</template>
					</el-table-column>
					<!-- <el-table-column label="商品360" align="center" width="200">
						<template #default="scope">
							<router-link
								:to="{
									name: 'product360',
									query: { productId: scope.row.id },
								}"
							>
								<el-button type="text" size="mini"
									>商品360</el-button
								>
							</router-link>
						</template>
					</el-table-column> -->
					<el-table-column label="折扣" align="center">
						<template #default="scope">
							<span>{{
								(
									(scope.row.salePrice /
										scope.row.listPrice) *
									100
								).toFixed(2) + '%'
							}}</span>
						</template>
					</el-table-column>
					<el-table-column label="销量" align="center" width="200">
						<template #default="scope">
							<el-input-number
								v-model="scope.row.showSoldCount"
								:min="0"
								:step="1"
								step-strictly
								size="small"
							></el-input-number>
						</template>
					</el-table-column>

					<el-table-column
						label="划线价(¥)"
						align="center"
						prop="listPrice"
					></el-table-column>
					<el-table-column
						label="VIP(¥)"
						align="center"
						prop="salePrice"
					></el-table-column>
					<el-table-column
						label="操作"
						width="200"
						align="center"
						fixed="right"
					>
						<template #default="scope">
							<span
								class="table-opreator"
								@click="updateProductSoldCount(scope.row)"
								>保存</span
							>
							<span
								class="table-opreator"
								@click="viewProduct(scope.row)"
								>查看</span
							>
							<span
								class="table-opreator"
								@click="editProduct(scope.row)"
								>编辑</span
							>
							<span
								class="table-opreator"
								@click="copyProduct(scope.row)"
								>复制</span
							>
							<span
								class="table-opreator-delete"
								@click="deleteProductInfo(scope.row)"
								>删除</span
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
<style lang="scss" scoped>
.product_list {
	width: 100%;
	height: 100%;
	background: #eff0f4;
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
