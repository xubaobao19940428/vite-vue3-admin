<template>
	<el-table :data="list" style="width: 100%; padding-top: 15px">
		<el-table-column label="Order_No" min-width="200">
			<template #default="scope">
				{{ scope.row.order_no }}
			</template>
		</el-table-column>
		<el-table-column label="Price" width="195" align="center">
			<template #default="scope">
				¥{{ scope.row.price | toThousandFilter }}
			</template>
		</el-table-column>
		<el-table-column label="Status" width="100" align="center">
			<template #default="scope">
				<el-tag :type="scope.row.status | statusFilter">
					{{ scope.row.status }}
				</el-tag>
			</template>
		</el-table-column>
	</el-table>
</template>

<script>
import listData from './list.js'
export default {
	filters: {
		statusFilter(status) {
			console.log(status)
			const statusMap = {
				success: 'success',
				pending: 'danger',
			}
			return statusMap[status]
		},
	},
	data() {
		return {
			list: listData,
		}
	},
	created() {},
	methods: {},
}
</script>
