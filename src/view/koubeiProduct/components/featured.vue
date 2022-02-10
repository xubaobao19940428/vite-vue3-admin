<!--  -->
<template>
	<div class="product_list app-container">
		<div class="product-list-header">
			<el-form
				:inline="true"
				:model="queryData"
				class="demo-form-inline"
				size="medium"
				label-width="120px"
			>
				<el-form-item>
					<el-select
						v-model="queryData.shelveStatus"
						placeholder="请选择商品上下架状态"
						clearable
					>
						<el-option label="已上架" :value="1"></el-option>
						<el-option label="已下架" :value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-cascader
						class="mar-b-20"
						v-model="queryData.categoryId"
						:show-all-levels="false"
						:props="{
							value: 'subType',
							label: 'subTypeName',
							children: 'subTypes',
							emitPath: false,
							checkStrictly: true,
						}"
						:options="categoryData"
						placeholder="请选择商品类目"
						@change="changeCategory"
					></el-cascader>
				</el-form-item>
				<el-form-item>
					<el-cascader
						class="mar-b-20"
						v-model="queryData.city"
						:show-all-levels="false"
						:props="{
							value: 'cityId',
							label: 'city',
							children: 'cityTypes',
							emitPath: false,
							checkStrictly: true,
						}"
						:options="cityList"
						placeholder="请选择城市"
						@change="changeCity"
					></el-cascader>
				</el-form-item>
				<!--<el-form-item >
                    <el-date-picker
                        v-model="timeList"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="口碑可售开始时间"
                        end-placeholder="口碑可售开始时间"
                        :default-time="defaultTime2"
                        format="YYYY-MM-DD HH:mm:ss"
                        value-format="x"
                    ></el-date-picker>
                </el-form-item>-->
				<el-form-item>
					<el-button type="primary" @click="getProductList(1)"
						>搜索</el-button
					>
					<el-button type="info" @click="resetSearch">重置</el-button>
				</el-form-item>
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
				>
					<el-table-column
						prop="id"
						label="商品ID"
						width="180"
						align="center"
					></el-table-column>
					<el-table-column
						label="商品标题"
						width="180"
						align="center"
					>
						<template #default="scope">
							<div class="flex flex-item--center">
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
					<el-table-column
						label="商品图片"
						align="center"
						width="120"
					>
						<template #default="scope">
							<el-popover placement="top-start" trigger="hover">
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
						</template>
					</el-table-column>
					<el-table-column
						label="佣金设置"
						align="center"
						width="200"
					>
						<template #default="scope">
							<div>口碑佣金率：{{ scope.row.commission }}</div>
							<div>
								达人佣金率：{{
									scope.row.mmxxCommission
										? scope.row.mmxxCommission
										: '#'
								}}
							</div>
						</template>
					</el-table-column>
					<el-table-column
						label="价格设置"
						align="center"
						width="200"
					>
						<template #default="scope">
							<div>口碑：¥{{ scope.row.salePrice }}</div>
							<div>
								美妙：{{
									scope.row.mmxxSalePrice
										? '¥' + scope.row.mmxxSalePrice
										: '#'
								}}
							</div>
						</template>
					</el-table-column>
					<el-table-column
						label="库存"
						align="center"
						prop="stock"
					></el-table-column>
					<el-table-column label="编辑状态" align="center">
						<template #default="scope">
							<span>{{
								scope.row.productId ? '已发布' : '草稿'
							}}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="200" align="center">
						<template #default="scope">
							<!-- <span class="table-opreator" @click="viewProduct(scope.row)">查看</span> -->
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
	</div>
</template>

<script>
import { ref, reactive } from 'vue'
import { collectThirdProductList, deleteProduct } from '@/api/newJson/product'
import noDataComponent from '@/components/noDataComponent/index.vue'
import { getSellers } from '@/api/newJson/shop'
import { splitData } from '@/utils/index'
import categoryData from '@/data/category.json'
import cityList from '@/data/districts.json'
export default {
	setup() {
		const count = ref(0)
		const timeList = ref([])
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
			timeList,
		}
	},
	data() {
		return {
			queryData: {
				city: '500100',
				categoryId: '',
				shelveStatus: '',
				platform: 1,
				pageNum: 1,
				pageSize: 20,
				// startTime:'',
				// endTime:'',
			},
			total: 0,
			// activeName: 'first',
			tableData: [],
			cityList: cityList,
			categoryData: categoryData,
		}
	},
	components: {
		noDataComponent,
	},
	computed: {},
	mounted() {
		if (this.$route.query.city) {
			this.queryData.city = this.$route.query.city
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
		resetSearch() {
			this.queryData.productId = ''
			this.queryData.title = ''
			this.queryData.data = ''
			this.queryData.sellerId = ''
			this.queryData.shelveStatus = ''
			this.getProductList(1)
		},
		changeCity() {
			this.getProductList(1)
		},
		addProduct() {
			this.$router.push({
				name: 'addProduct',
				query: {
					type: 'add',
				},
			})
		},
		getProductList(type) {
			if (type == 1) {
				this.queryData.pageNum = 1
			}
			// if(this.timeList&&this.timeList.length){
			//     this.queryData.startTime = this.timeList[0]
			//     this.queryData.endTime = this.timeList[1]
			// }
			collectThirdProductList(this.filterData(this.queryData))
				.then((resultes) => {
					if (resultes.data) {
						this.tableData = resultes.data
						this.total = resultes.total || 0
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
		// viewProduct(row) {
		// this.$router.push({
		//     name: 'addProduct',
		//     query: {
		//         productId: row.id,
		//         type: 'check',
		//     },
		// });
		// },
		editProduct(row) {
			if (!row.productId) {
				this.$router.push({
					name: 'koubeiProductEdit',
					query: {
						outerId: row.outerId,
						city: this.queryData.city,
						plactform: 1,
						type: 'edit',
					},
				})
			} else {
				this.$router.push({
					name: 'addProduct',
					query: {
						productId: row.productId,
						city: this.queryData.city,
						platform: 1,
						type: 'edit',
					},
				})
			}
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
	}
	.main-content-wrapper {
		background-color: #fff;
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
