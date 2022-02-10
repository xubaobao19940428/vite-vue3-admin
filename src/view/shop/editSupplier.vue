<!--  -->
<template>
	<div class="edit_supplier">
		<div class="edit_supplier_header">
			<el-button type="primary" size="small" @click="setAddSeller">
				保存
			</el-button>
			<el-button type="info" size="small" plain @click="cancelSeller">
				取消
			</el-button>
		</div>
		<supplier-base-info ref="shopBaseInfo"></supplier-base-info>
		<business-scope ref="shopBusiness"></business-scope>
		<!-- <settlement-type></settlement-type> -->
		<!--资质&合同-->
		<business-qualification
			ref="shopQualification"
		></business-qualification>
	</div>
</template>

<script>
import supplierBaseInfo from './supplierComponents/supplierBaseInfo.vue'
import businessScope from './supplierComponents/businessScope.vue'
// import settlementType from './supplierComponents/settlementType';
import businessQualification from './supplierComponents/businessQualification.vue'
import { addSeller, getSeller, editorSeller } from '@/api/newJson/shop.js'
export default {
	data() {
		return {
			id: '',
		}
	},

	components: {
		supplierBaseInfo,
		businessScope,
		// settlementType,
		businessQualification,
	},

	computed: {},

	mounted() {
		if (this.$route.query.supplierId) {
			this.id = this.$route.query.supplierId
			this.getSupplierInfo(this.id)
		}
	},

	methods: {
		getSupplierInfo(id) {
			getSeller({
				id: id,
			})
				.then((response) => {
					if (response) {
						let _this = this
						_this.$nextTick(() => {
							_this.$refs[
								'shopBaseInfo'
							].supplierDetail.contactPhone =
								response.data.contactPhone
							_this.$refs[
								'shopBaseInfo'
							].supplierDetail.contactName =
								response.data.contactName
							_this.$refs[
								'shopBaseInfo'
							].supplierDetail.contactEmail =
								response.data.contactEmail
							_this.$refs['shopBaseInfo'].supplierDetail.name =
								response.data.name
							_this.$refs[
								'shopBaseInfo'
							].supplierDetail.shortName = response.data.shortName
							_this.$refs[
								'shopBaseInfo'
							].supplierDetail.cooperationStatus =
								response.data.cooperationStatus
							if (response.data.remark) {
								_this.$refs[
									'shopBusiness'
								].supplierScope.remark = response.data.remark
							}

							_this.$refs[
								'shopQualification'
							].qualification.endTimeStamp =
								response.data.endTimeStamp
							_this.$refs[
								'shopQualification'
							].qualification.startTimeStamp =
								response.data.startTimeStamp
							_this.$refs[
								'shopQualification'
							].qualification.contract = response.data.contract
							_this.$refs[
								'shopQualification'
							].qualification.logo = response.data.logo
							_this.$refs[
								'shopQualification'
							].qualification.enterpriseWeChat =
								response.data.enterpriseWeChat || ''
							_this.$refs['shopQualification'].$refs[
								'cooperationImg'
							].setFileList(
								_this.$refs['shopQualification'].qualification
									.contract
							)
							_this.$refs['shopQualification'].$refs[
								'logo'
							].setFileList(
								_this.$refs['shopQualification'].qualification
									.logo
							)
							if (response.data.enterpriseWeChat) {
								_this.$refs['shopQualification'].$refs[
									'enterpriseWeChat'
								].setFileList(
									_this.$refs['shopQualification']
										.qualification.enterpriseWeChat
								)
							}
						})
					}
				})
				.catch((error) => {})
		},
		//数据返回时回填数据

		setAddSeller() {
			let validateProduct = []
			validateProduct.push(this.$refs['shopBaseInfo'].validateBaseInfo())
			validateProduct.push(
				this.$refs['shopQualification'].validateQualification()
			)
			Promise.all(validateProduct)
				.then((data) => {
					if (data) {
						let shopInfo = {
							...this.$refs['shopBaseInfo'].supplierDetail,
							...this.$refs['shopQualification'].qualification,
							remark: this.$refs['shopBusiness'].supplierScope
								.remark,
						}
						if (this.id) {
							shopInfo.id = this.id
							editorSeller(shopInfo)
								.then((response) => {
									if (response) {
										this.$message.success('编辑成功')
										this.$router.push({
											name: 'supplierManage',
										})
									}
								})
								.catch((error) => {
									console.log(error)
								})
						} else {
							addSeller(shopInfo)
								.then((response) => {
									if (response) {
										this.$message.success('添加成功')
										this.$router.push({
											name: 'supplierManage',
										})
									}
								})
								.catch((error) => {
									console.log(error)
								})
						}
					}
				})
				.catch((error) => {
					console.log(error)
					this.$message.error('有必填项未填写')
				})
		},
		cancelSeller() {
			this.$router.go(-1)
		},
	},
	// unmounted() {
	//     this.$refs['shopBaseInfo'].resetForm();
	// },
}
</script>
<style lang="scss" scoped>
.edit_supplier {
	width: 100%;
	height: 100%;
	overflow: scroll;
	// background: #fff !important;
	.edit_supplier_header {
		height: 50px;
		width: 100%;
		padding-right: 20px;
		box-sizing: border-box;
		border-bottom: 1px solid #ddd;
		background-color: #fff;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
}
</style>
