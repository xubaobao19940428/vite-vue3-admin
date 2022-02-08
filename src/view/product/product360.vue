<template>
	<div class="member_follow">
		<el-form
			:inline="true"
			:model="queryData"
			class="demo-form-inline"
			size="small"
		>
			<el-form-item label="商品Id：">
				<el-input
					v-model="queryData.productId"
					placeholder="请输入商品Id"
				></el-input>
			</el-form-item>
			<el-form-item label="时间：">
				<el-select v-model="queryData.type" placeholder="请选择">
					<el-option
						v-for="(item, index) in typeList"
						:key="index"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="queryDataCenter"
					>查询</el-button
				>
			</el-form-item>
		</el-form>
		<!--图表部分--->
		<div class="member_f_detail">
			<div class="member_f_d_right">
				<el-row :gutter="24">
					<el-col :span="12">
						<div class="sale_left">
							<line-chart
								ref="dailyNewChilds"
								:originData="userDailyLineChart"
								:chartTitle="'访问用户数'"
							></line-chart>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="sale_right">
							<div
								class="pie_data"
								style="width: 100%; height: 300px"
								ref="pieChart"
							></div>
						</div>
					</el-col>
				</el-row>
				<el-row :gutter="24">
					<el-col :span="24">
						<div class="line-title">
							<p class="title">分享用户与触达数据(前两百名)</p>
							<el-button
								type="primary"
								size="small"
								@click="downloadShareDetailInfo"
							>
								下载明细
							</el-button>
						</div>

						<div class="sale_left">
							<el-table
								:header-cell-style="{
									background: '#F5F7FA',
									color: '#606266',
								}"
								:data="shareTableData"
								border
								style="
									width: 100%;
									height: 100%;
									overflow: scroll;
								"
							>
								<el-table-column align="center" width="100">
									<template #default="scope">
										<img
											:src="scope.row.user.avatar"
											alt=""
											v-if="scope.row.user.avatar"
											style="
												width: 50px;
												height: 50px;
												borer-radius: 50%;
											"
										/>
									</template>
								</el-table-column>
								<el-table-column align="center" label="分享人">
									<template #default="scope">
										<router-link
											target="_blank"
											:to="{
												name: 'memberInfo',
												query: {
													userId: scope.row.user
														.userId,
												},
											}"
										>
											<el-button type="text" size="mini">
												{{ scope.row.user.nickname }}
											</el-button>
										</router-link>
									</template>
								</el-table-column>
								<el-table-column
									label="用户等级"
									align="center"
								>
									<template #default="scope">
										<el-tag
											size="small"
											type="success"
											v-if="scope.row.user.vip"
										>
											达人
										</el-tag>
										<el-tag
											size="small"
											type="primary"
											v-else
											>粉丝</el-tag
										>
									</template>
								</el-table-column>
								<el-table-column
									label="是否拥有CR资格"
									align="center"
									width="150"
								>
									<template #default="scope">
										<el-tag
											v-if="scope.row.user.crOwner"
											type="success"
											size="small"
										>
											已拥有
										</el-tag>
										<el-tag
											type="warning"
											size="small"
											v-else
											>未拥有</el-tag
										>
									</template>
								</el-table-column>
								<el-table-column
									prop="touchUser"
									align="center"
									label="触达用户数"
								></el-table-column>
							</el-table>
						</div>
					</el-col>
					<!-- <el-col :span="12">
                        <div class="sale_right">
                            <line-chart
                                :originData="productLineChart"
                                :chartTitle="'商品曲线'"
                            ></line-chart>
                        </div>
                    </el-col> -->
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
import { markRaw } from 'vue'
import _ from 'lodash'
import lineChart from './components/lineChart.vue'
import {
	productViewListByTime,
	productViewByMiniApp,
	getShareTouchUserList,
	downloadShareDetail,
} from '@/api/newJson/product'
export default {
	name: 'dataReport',
	data() {
		return {
			typeList: [
				{
					label: '近7天',
					value: 0,
				},
				{
					label: '近30天',
					value: 1,
				},
			],
			queryData: {
				type: 1,
				productId: '',
			},
			originData: {
				xAxis: ['1', '2', '3', '10', '20', '30'],
				data: [[4, 3, 2, 7, 8, 9]],
				lenged: ['测试'],
			},
			activeName: '',
			pieChart: null,
			resizePieChart: null,
			pieData: [],
			labelTips: '',
			//下级饼图
			pieChartData: [
				// {value:100,name:'手机号'},
				// {value:100,name:'Facebook'},
				// {value:100,name:'Google'},
				// {value:100,name:'Apple'},
				// {value:100,name:'Line'},
			],
			pickerOptions0: {
				disabledDate(time) {
					return (
						time.getTime() > Date.now() ||
						time.getTime() < Date.now() - 8.64e7 * 365
					)
				},
			},
			shareTableData: [],
			//订单表格
			orderTableData: [],
			orderDailyLineChart: {
				xAxis: [],
				data: [],
				lenged: [
					'创建订单数',
					'支付订单数',
					'取消订单数',
					'交易成功数',
					'拒签/售后订单数',
					'订单覆盖spu数',
					'下单用户数',
				],
				selected: {
					创建订单数: true,
					支付订单数: true,
					取消订单数: false,
					交易成功数: true,
					'拒签/售后订单数': false,
					订单覆盖spu数: false,
					下单用户数: false,
				},
			},
			productLineChart: {
				xAxis: [],
				data: [],
				lenged: [
					'新增商品数',
					'上架商品数',
					'下架商品数',
					'在售商品数',
				],
				selected: {
					新增商品数: true,
					上架商品数: true,
					下架商品数: true,
					在售商品数: true,
				},
			},
			pieLegend: [],
			userDailyLineChart: {
				xAxis: [],
				data: [],
				// lenged: ['注册用户数', '登录用户数'],
				// selected: {
				//     注册用户数: true,
				//     登录用户数: true
				// }
			},
			updateTime: 1,
		}
	},

	components: {
		lineChart,
	},

	computed: {},
	watch: {},
	created() {},
	mounted() {
		// this.queryDataCenter()
		this.initData()
		this.setPieChart()
		if (this.$route.query.productId) {
			this.queryData.productId = this.$route.query.productId
			this.queryDataCenter()
		}
	},

	methods: {
		queryDataCenter() {
			if (!this.queryData.productId) {
				this.$message.warning('请输入要查询的商品名称')
				return
			}
			let params = {
				productId: Number(this.queryData.productId),
				type: this.queryData.type,
			}
			this.getUserRegBasicLineData(params)
			this.getUserRegBasicPieData(params)
			this.shareTouchUserList(params)
		},
		//商品折线图
		getUserRegBasicLineData(params) {
			let userX = []
			let userY = [[]]
			productViewListByTime(params)
				.then((res) => {
					if (res) {
						res.data.map((item) => {
							userX.push(this.timestampToYear(item.viewDate))
							userY[0].push(item.viewCount)
						})
						this.userDailyLineChart.xAxis = userX
						this.userDailyLineChart.data = userY
					}
				})
				.catch((error) => {
					console.log(error)
				})
		},
		//小程序饼图
		getUserRegBasicPieData(params) {
			let pieChartData = []
			this.pieLegend = []
			productViewByMiniApp(params)
				.then((response) => {
					if (response) {
						response.data.map((item) => {
							this.pieLegend.push(item.miniApp)
							pieChartData.push({
								name: item.miniApp,
								value: item.count,
							})
						})
						this.pieChartData = pieChartData
						this.setPieChart()
					}
				})
				.catch((error) => {})
		},
		//分享数据
		shareTouchUserList(params) {
			getShareTouchUserList(params).then((response) => {
				if (response) {
					this.shareTableData = response.data
				}
			})
		},

		initData() {
			this.pieChart = markRaw(this.$echarts.init(this.$refs.pieChart))
			this.resizePieChart = _.throttle(this.pieChart.resize, 100)
			window.addEventListener('resize', this.resizePieChart)
		},
		setPieChart() {
			// if (this.pieChart) {
			// 	this.pieChart.clear()
			// } else {
			// 	this.pieChart = markRaw(this.$echarts.init(this.$refs.pieChart))
			// }
			let options = {
				title: {
					text: '来源小程序',
					left: 'center',
					textStyle: {
						color: '#333333',
						fontWeight: 900,
					},
					// top:0,
					// padding:0
				},
				tooltip: {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} ({d}%)',
				},
				legend: {
					left: 'left',
					orient: 'vertical',
					data: this.pieLegend,
				},
				series: [
					{
						name: '来自小程序',
						type: 'pie',
						radius: '70%',
						center: ['50%', '50%'],
						color: [
							'#5470c6',
							'#73c0de',
							'#ee6666',
							'#fac858',
							'#91cc75',
						],
						data: this.pieChartData,
						animation: true,
						animationDuration: 2000,
						animationEasing: 'cabicOut',
						avoidLabelOverlap: true,
						label: {
							position: 'outer',
							alignTo: 'none',
							bleedMargin: 5,
							//   formatter: function(params) {
							//     var str = numberReg(params.value.toString());
							//     return `{value|${params.name}}\n${params.percent}%\n${str}`;
							//   },
							rich: {
								value: {
									fontSize: 14,
								},
							},
						},
						itemStyle: {
							normal: {
								borderWidth: 2,
								borderColor: '#ffffff',
							},
						},
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)',
							},
						},
						left: 0,
						right: 0,
						top: 50,
						bottom: 0,
					},
				],
			}
			this.pieChart.setOption(options, true)
		},
		downloadShareDetailInfo() {
			if (!this.queryData.productId) {
				this.$message.warning('请输入要查询的商品名称')
				return
			}
			let params = {
				productId: Number(this.queryData.productId),
			}
			downloadShareDetail(params)
				.then((res) => {
					if (res) {
						this.$message.success('请到文件中心下载')
					}
				})
				.catch((error) => {
					console.log(error)
				})
		},
	},
}
</script>
<style lang="scss" scoped>
.member_follow {
	overflow: scroll;
	width: 100%;
	height: 100%;
	padding-bottom: 20px;
	background-color: #ffffff !important;
	.member_f_detail {
		width: 100%;
		height: auto;
		.member_f_d_right {
			position: relative;

			.el-row {
				padding: 20px;
				margin-bottom: 20px;
				background: #ddd;
				.title {
					font-size: 20px;
					font-weight: 900;
				}
			}
		}
		:deep() .sale_left {
			width: 100%;
			height: 300px;
			margin-right: 20px;
			background: #fff;
		}
		:deep() .sale_right {
			width: 100%;
			height: 300px;
			background: #fff;
		}
	}
	.data_report_rule {
		p {
			margin-top: 10px;
			font-size: 14px;
		}
	}
	:deep() .el-row {
		flex-wrap: nowrap;
	}
	.line-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
	}
}
</style>
