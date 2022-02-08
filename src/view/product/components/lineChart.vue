<!--  -->
<template>
    <div class="line_charts">
        <div class="saleLine"
             ref="saleLine"
             style="width: 100%; height: 280px;"></div>
    </div>
</template>

<script>
import _ from 'lodash'
import { markRaw } from 'vue'
export default {
	name: 'lineChart',
	props: {
		originData: {
			type: Object,
			default: () => {
				return {
					xAxis: [],
					data: [],
					lenged: [],
				}
			},
		},
		chartTitle: {
			type: String,
			default: '每日直推间接会员',
		},
	},
	data() {
		return {
			leftChart: null,
			resizeLeftChart: null,
			//   originData: {
			//       xAxis: [0,2,3,4,5],
			//       data: [[1,4,5,6,7],[2,3,5,6,7],[10,20,30,6,7],[10,8,5,6,7],[1,4,5,6,7]],
			//       lenged: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
			// },
		}
	},
	watch: {
		'originData.xAxis': {
			handler(newVal, oldVal) {
				if (newVal) {
					this.setLineChart()
				}
			},
		},
	},
	components: {},

	computed: {},

	mounted() {
		this.initChart()
		this.setLineChart()
	},

	methods: {
		initChart() {
			this.leftChart = markRaw(this.$echarts.init(this.$refs.saleLine))
			this.resizeLeftChart = _.throttle(this.leftChart.resize, 100)
			window.addEventListener('resize', this.resizeLeftChart)
		},
		setLineChart() {
			var series = []
			this.originData.data.map((item, index) => {
				series.push({
					// name: this.originData.lenged[index],
					type: 'line',
					symbol: 'circle',
					symbolSize: 5,
					smooth: true,
					itemStyle: {
						normal: {
							lineStyle: {
								width: 1,
								// color:'green'//控制线条颜色
							},
							label: {
								show: true,
								color: 'green',
								// formatter: function (params) {
								//   return numberReg(params.value)
								// },
							},
						},
					},
					labelLine: {
						show: true,
						smooth: true,
					},
					animation: true,
					data: item,
					animationDuration: 1000,
				})
			})
			let options = {
				title: {
					text: `${this.chartTitle}`,
					textStyle: {
						fontSize: 16,
					},
				},
				legend: {
					data: this.originData.lenged,
					top: '25',
					selected: this.originData.selected,
				},
				grid: {
					left: '3%',
					right: '10%',
					bottom: '3%',
					containLabel: true,
				},
				tooltip: {
					show: true,
					trigger: 'axis',
					formatter: function(params) {
						return `
                          <p>日期:${params[0].name}</p> 
                           <p>访问用户数:${params[0].value}</p>
                        `
					},
				},
				xAxis: [
					{
						name: '日期',
						type: 'category',
						boundaryGap: true,
						axisLine: {
							show: true,
							lineStyle: {
								color: 'black',
							},
						},
						axisTick: {
							show: true,
						},
						data: this.originData.xAxis,
					},
				],
				yAxis: [
					{
						type: 'value',
						name: '用户数',
						axisLabel: {
							formatter: '{value}',
						},
						axisLine: {
							lineStyle: {
								color: '#195384',
							},
						},
						axisTick: {
							show: true,
						},
						splitLine: {
							show: false,
							lineStyle: {
								color: '#11366e',
							},
						},
					},
				],
				series: series,
			}
			this.leftChart.setOption(options, true)
		},
	},
}
</script>
<style lang="scss" scoped>
.line_charts {
  width: 100%;
  height: 300px;
}
</style>