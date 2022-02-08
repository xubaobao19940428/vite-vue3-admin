<!--  -->
<template>
	<div class="intention_order app-container">
		<div class="order_intention-header el-card__header">
			{{ getLocalUseLangData('8000166') }}
		</div>
		<div class="main-content-wrapper">
			<div class="table-detail" v-if="tableData.length">
				<el-table
					:data="tableData"
					border
					style="width: 100%"
					height="100%"
					header-cell-style="background:#F5F7FA;color: #606266;"
				>
					<el-table-column
						prop="name"
						:label="getLocalUseLangData('8000223')"
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
								<!-- <el-tooltip class="item" effect="dark" :content="scope.row.title" placement="top">
                                    <span
                                        class="block-right"
                                        style="display: -webkit-box; overflow: hidden; white-space: normal !important; text-overflow: ellipsis; word-wrap: break-word; -webkit-line-clamp: 3;-webkit-box-orient: vertical;margin-left:5px;"
                                    >
                                        {{ scope.row.title }}
                                    </span>
                                </el-tooltip> -->
								<div>
									<p>
										{{ scope.row.title }}
									</p>
									<span class="pro-price">
										{{
											scope.row.currencySymbol +
											' ' +
											scope.row.price
										}}
									</span>
									<p>
										<span v-if="scope.row.skuAttr">
											<span
												v-for="(
													item, index
												) in JSON.parse(
													scope.row.skuAttr
												)"
												:key="index"
											>
												<span>{{
													item.name +
													':' +
													item.value +
													' '
												}}</span>
											</span>
										</span>
									</p>
								</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column
						prop="liveRoomName"
						:label="getLocalUseLangData('8000224')"
						align="center"
					></el-table-column>
					<el-table-column
						prop="intentionNick"
						:label="getLocalUseLangData('8000225')"
						align="center"
					></el-table-column>
					<!-- <el-table-column prop="address" label="沟通状态" align="center"></el-table-column>
                    <el-table-column prop="address" label="最后沟通时间" align="center" width="200"></el-table-column> -->
					<el-table-column
						prop="address"
						:label="getLocalUseLangData('8000041')"
						align="center"
						width="180"
					>
						<template #default="scope">
							<el-button type="text" @click="linkMessenger">{{
								getLocalUseLangData('8000226')
							}}</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<noDataComponent v-else></noDataComponent>
		</div>
		<div class="pagination-box">
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:page-sizes="[20, 30, 50, 100]"
				:page-size="queryData.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
			></el-pagination>
		</div>
	</div>
</template>

<script>
import { ref, reactive } from 'vue'
import { intentionOrder } from '@/api/newJson/order'
import noDataComponent from '@/components/noDataComponent.vue'
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
				pageNum: 1,
				pageSize: 20,
			},
			total: 0,
			tableData: [],
		}
	},
	components: {
		noDataComponent,
	},
	computed: {},
	mounted() {
		this.getIntentionOrder()
	},
	methods: {
		// addProduct() {
		//     this.$router.push({
		//         name: 'addProduct',
		//     });
		// },
		getIntentionOrder() {
			intentionOrder(this.queryData)
				.then((response) => {
					if (response.data) {
						this.tableData = response.data
						this.total = response.total
					}
				})
				.catch((error) => {})
		},
		handleSizeChange(val) {
			this.queryData.pageSize = val
			this.getIntentionOrder()
		},
		handleCurrentChange(val) {
			this.queryData.pageNum = val
			this.getIntentionOrder()
		},
		linkMessenger() {
			window.open('https://www.facebook.com/messages')
		},
	},
}
</script>

<style lang="scss" scoped>
.intention_order {
	width: 100%;
	height: 100%;
	.order_intention-header {
		height: 53px;
		border-bottom: 1px solid #ddd;
		line-height: 33px;
		background-color: #fff;
		padding: 10px;
		box-sizing: border-box;
		.demo-form-inline {
			margin-top: 20px;
		}
	}

	.main-content-wrapper {
		display: flex;
		flex-direction: column;
		.table-detail {
			height: 100%;
			.no-data {
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #fff;
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
}
</style>
