<!--  -->
<template>
	<div class="supplier_shop_list app-container">
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
					<el-select
						v-model="queryData.sellerId"
						size="medium"
						clearable
					>
						<el-option
							v-for="(item, index) in supplierList"
							:key="index"
							:label="item.name"
							:value="item.id"
						></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="店铺名：" class="filter-item" prop="name">
					<el-input
						placeholder="请输入店铺名"
						size="medium"
						clearable
						v-model="queryData.name"
					></el-input>
				</el-form-item>
				<el-form-item
					label="手机号："
					class="filter-item"
					prop="contactPhone"
				>
					<el-input
						placeholder="手机号"
						size="medium"
						clearable
						v-model="queryData.contactPhone"
					></el-input>
				</el-form-item>
				<!-- <el-form-item label="时间查询：" class="filter-item" prop="status">
                    <el-select v-model="queryData.timeType" size="medium" clearable>
                        <el-option v-for="(item, index) in statusList" :key="index" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                    <el-date-picker
                        size="medium"
                        v-model="timeList"
                        type="daterange"
                        range-separator="-"
                        @change="changeTimeList"
                        start-placeholder="Start date"
                        end-placeholder="End date"
                        :default-time="defaultTime2"
                        format="YYYY-MM-DD HH:mm:ss"
                        value-format="x"
                    ></el-date-picker>
                </el-form-item> -->
				<el-form-item class="filter-item" style="margin-left: 20px">
					<el-button
						icon="el-icon-search"
						type="primary"
						@click="getShopsList(1)"
						size="medium"
						>搜索</el-button
					>
					<el-button
						icon="el-icon-refresh-left"
						@click="resetSearch"
						size="medium"
						>重置</el-button
					>
					<el-button
						type="primary"
						icon="el-icon-plus"
						@click="addSupplierShop"
						size="medium"
						>新增店铺</el-button
					>
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
						label="商家"
						width="180"
						align="center"
						prop="seller.name"
					></el-table-column>
					<el-table-column
						label="商家联系人"
						width="180"
						align="center"
						prop="seller.contactPhone"
					></el-table-column>
					<el-table-column
						label="店铺名"
						width="180"
						align="center"
						prop="name"
					></el-table-column>
					<el-table-column
						label="店铺简称"
						width="180"
						align="center"
						prop="shortName"
					></el-table-column>
					<el-table-column
						prop="address"
						label="地址"
						align="center"
						width="300"
					></el-table-column>
					<el-table-column
						prop="bankPersonalName"
						label="银行户名"
						align="center"
						width="200"
					></el-table-column>
					<el-table-column
						prop="contactPhone"
						label="联系人手机号"
						align="center"
						width="200"
					></el-table-column>
					<el-table-column
						prop="statistics.spuCount"
						label="spu数"
						align="center"
						width="200"
					></el-table-column>
					<el-table-column
						prop="statistics.consumeAmount"
						label="已核销金额"
						align="center"
						width="200"
					></el-table-column>
					<el-table-column
						prop="statistics.clearAmount"
						label="已结算金额"
						align="center"
						width="200"
					></el-table-column>
					<el-table-column label="状态" align="center">
						<template #default="scope">
							<el-tag type="success" v-if="scope.row.status == 1"
								>上线</el-tag
							>
							<el-tag type="danger" v-else>下线</el-tag>
						</template>
					</el-table-column>
					<el-table-column
						label="操作"
						width="200"
						align="center"
						fixed="right"
					>
						<template #default="scope">
							<span
								class="table-opreator"
								@click="viewShop(scope.row)"
								>查看</span
							>
							<span
								class="table-opreator"
								@click="editShop(scope.row)"
								>编辑</span
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
	</div>
</template>

<script>
import { ref, reactive } from 'vue'
import { getShops, getSellers } from '@/api/newJson/shop'
import noDataComponent from '@/components/noDataComponent/index.vue'
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
			queryData: {
				sellerId: '',
				name: '',
				contactPhone: '',
				pageNum: 1,
				pageSize: 20,
				// timeType: '',
			},
			total: 0,
			// activeName: 'first',
			tableData: [],
			supplierList: [],
		}
	},
	components: {
		noDataComponent,
	},
	computed: {},
	mounted() {
		this.getShopsList(1)
		this.getSellersList({
			pageNum: 1,
			pageSize: 1000,
		})
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
			this.queryData.sellerId = ''
			this.queryData.name = ''
			this.queryData.contactPhone = ''
			this.queryData.pageNum = 1
			this.getShopsList(1)
		},
		addSupplierShop() {
			this.$router.push({
				name: 'editSupplierShop',
				query: {
					type: 'add',
				},
			})
		},
		getShopsList(type) {
			if (type == 1) {
				this.queryData.pageNum = 1
			}
			getShops(this.filterData(this.queryData))
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
			this.getShopsList(0)
		},
		handleCurrentChange(val) {
			this.queryData.pageNum = val
			this.getShopsList(0)
		},
		editShop(data) {
			this.$router.push({
				name: 'editSupplierShop',
				query: {
					type: 'edit',
					id: data.id,
				},
			})
		},
		viewShop(data) {
			this.$router.push({
				name: 'editSupplierShop',
				query: {
					type: 'check',
					id: data.id,
				},
			})
		},
	},
}
</script>

<style lang="scss" scoped>
.supplier_shop_list {
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
