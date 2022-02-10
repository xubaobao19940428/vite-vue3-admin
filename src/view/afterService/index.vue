<!--  -->
<template>
	<div class="after-service">
		<el-card class="box-card">
			<template #header>
				<div class="card-header">
					<span>{{ getLocalUseLangData('8000170') }}</span>
					<el-button
						@click="addService"
						class="button"
						type="primary"
						size="small"
						>{{ getLocalUseLangData('8000171') }}</el-button
					>
					<el-dialog
						v-model="dialog"
						:title="getLocalUseLangData('8000171')"
						width="540px"
					>
						<el-form
							ref="form"
							:rules="rules"
							:model="queryData"
							label-width="100px"
						>
							<el-form-item
								prop="name"
								:label="getLocalUseLangData('8000172')"
							>
								<el-input
									style="width: 300px"
									v-model="queryData.name"
									:placeholder="
										getLocalUseLangData('8000227')
									"
								></el-input>
							</el-form-item>
							<el-form-item
								prop="channel"
								:label="getLocalUseLangData('8000173')"
							>
								<el-select
									style="width: 300px"
									v-model="queryData.channel"
									:placeholder="
										getLocalUseLangData('8000228')
									"
								>
									<el-option
										v-for="item in staffChannelTypes"
										:key="item.value"
										:label="item.desc"
										:value="item.value"
									></el-option>
								</el-select>
							</el-form-item>
							<el-form-item
								prop="phone"
								:label="getLocalUseLangData('8000109')"
							>
								<el-input
									style="width: 300px"
									v-model="queryData.phone"
									:placeholder="
										getLocalUseLangData('8000227')
									"
								></el-input>
							</el-form-item>
						</el-form>
						<template #footer>
							<span class="dialog-footer">
								<el-button @click="cancel">{{
									getLocalUseLangData('8000152')
								}}</el-button>
								<el-button type="primary" @click="dialogs">{{
									getLocalUseLangData('8000213')
								}}</el-button>
							</span>
						</template>
					</el-dialog>
				</div>
			</template>
			<div class="table-box" v-if="tableData.length">
				<el-table
					:data="tableData"
					style="width: 100%; display: flex; flex-direction: column"
					height="100%"
					header-cell-style="background:#F5F7FA;color: #606266;"
				>
					<el-table-column
						prop="staffName"
						:label="getLocalUseLangData('8000172')"
						width="180"
					/>
					<el-table-column
						#default="scope"
						:label="getLocalUseLangData('8000173')"
						width="180"
					>
						{{ educationType[scope.row.channelType] }}
					</el-table-column>
					<el-table-column
						prop="channelAccount"
						:label="getLocalUseLangData('8000109')"
					/>
					<el-table-column :label="getLocalUseLangData('8000041')">
						<template #default="scope">
							<el-button
								type="text"
								size="small"
								style="color: red"
								@click="handleClick(scope.row)"
							>
								{{ getLocalUseLangData('8000068') }}
							</el-button>
							<el-button
								type="text"
								size="small"
								@click="amend(scope.row)"
								>{{ getLocalUseLangData('8000168') }}</el-button
							>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<noDataComponent v-else></noDataComponent>
			<!-- <div class="pagination-box">
        <el-pagination
          v-model="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div> -->
		</el-card>
	</div>
</template>

<script>
import {
	getShopStaffList,
	saveOrUpdateShopStaff,
	deleteShopStaff,
} from '@/api/newJson/service.js'
import { mapState } from 'vuex'
import { defineComponent, ref } from 'vue'
import noDataComponent from '@/components/noDataComponent/index.vue'
export default defineComponent({
	setup() {
		const dialog = ref(false)
		return {
			dialog,
		}
	},
	data() {
		return {
			educationType: {
				1: 'facebook',
				2: 'whatsApp',
				3: 'telegram',
				4: 'line',
				5: 'mobile',
			},
			queryData: {
				name: '',
				phone: '',
				channel: '',
			},
			serviceId: '',
			rules: {
				name: [
					{
						required: true,
						message: '请输入昵称',
						// trigger: "blur",
					},
					// {
					//     min: 3,
					//     max: 5,
					//     message: 'Length should be 3 to 5',
					//     trigger: 'blur',
					// },
				],
				channel: [
					{
						required: true,
						message: '请选择渠道',
						// trigger: "change",
					},
				],
				phone: [
					{
						required: true,
						message: '请输入联系方式',
						// trigger: "change",
					},
				],
			},
			tableData: [],
		}
	},

	components: {
		noDataComponent,
	},

	computed: {
		...mapState({
			staffChannelTypes: (state) => state.system.staffChannelTypes,
		}),
	},
	mounted() {
		this.serviceData()
		console.log(this.staffChannelTypes)
	},

	methods: {
		// close() {
		//   this.dialog = false;
		//   this.$refs["form"].resetFields();
		// },
		serviceData() {
			getShopStaffList().then((res) => {
				console.log(res)
				this.tableData = res.data
			})
		},

		close() {
			this.dialog = false
			this.$refs['form'].resetFields()
		},
		serviceData() {
			getShopStaffList().then((res) => {
				console.log(res)
				this.tableData = res.data
			})
		},
		dialogs() {
			this.$refs['form'].validate((valid) => {
				if (valid) {
					// 请求后台接口  表示验证通过
					saveOrUpdateShopStaff(
						this.serviceId
							? {
									id: this.serviceId,
									staffName: this.queryData.name,
									channelType: parseInt(
										this.queryData.channel
									),
									channelAccount: this.queryData.phone,
							  }
							: {
									staffName: this.queryData.name,
									channelType: parseInt(
										this.queryData.channel
									),
									channelAccount: this.queryData.phone,
							  }
					).then((res) => {
						console.log(res)
						this.$refs['form'].resetFields()
						this.serviceId = ''
						this.serviceData()
						this.dialog = false
					})
				}
			})
		},
		cancel() {
			console.log(11)
			this.$refs['form'].resetFields()
			this.dialog = false
		},
		handleClick(item) {
			deleteShopStaff({
				id: item.id,
				staffName: item.staffName,
				channelType: parseInt(item.channelType),
				channelAccount: item.channelAccount,
			}).then((res) => {
				console.log(res)
				this.serviceData()
			})
		},
		// amend(item) {
		//     this.dialog = true;
		//     this.serviceId = item.id;
		//     this.$nextTick(() => {
		//         this.queryData.name = item.staffName;
		//         this.queryData.channel = item.channelType.toString();
		//         this.queryData.phone = item.channelAccount;
		//     });
		// },
		addService() {
			this.dialog = true
			this.serviceId = ''
			this.queryData.name = ''
			this.queryData.channel = ''
			this.queryData.phone = ''
		},
		amend(item) {
			this.dialog = true
			this.serviceId = item.id
			this.$nextTick(() => {
				this.queryData.name = item.staffName
				this.queryData.channel = item.channelType
				this.queryData.phone = item.channelAccount
			})
		},
	},
})
</script>
<style lang="scss" scoped>
.after-service {
	width: 100%;
	height: 100%;
	overflow: hidden;
	.el-card {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		box-shadow: none;
		// overflow: auto;
	}
	.el-card__header {
		padding: 10px;
		.card-header {
			display: flex;
			justify-content: space-between;
		}
	}
}
.el-table {
	overflow: auto;
}
:deep() .el-card__body {
	flex: 1;
	height: 90%;
	display: flex;
	flex-direction: column;
	overflow: auto;
	.table-box {
		flex: 1;
		overflow: hidden;

		.el-card {
			height: 100%;
			overflow: hidden;
			.el-card {
				height: 100%;
				width: 100%;
				display: flex;
				flex-direction: column;
				box-shadow: none;
				// overflow: auto;
			}
			.el-card__header {
				padding: 10px;
			}
		}
		:deep() .el-card__body {
			flex: 1;
			display: flex;
			flex-direction: column;
			overflow: auto;
			.table-box {
				flex: 1;
				overflow: hidden;
			}
		}
	}
}
</style>
