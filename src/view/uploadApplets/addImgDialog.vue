<!--  -->
<template>
	<div class="add_account_dialog">
		<el-dialog
			v-model="dialogFormVisible"
			title="新增图片"
			size="medium"
			:before-close="closeDialog"
		>
			<el-form
				:model="form"
				ref="form"
				:rules="formRule"
				:label-width="formLabelWidth"
			>
				<el-form-item label="图片上传：">
					<c-upload
						:limit="6"
						ref="cooperationImg"
						:fileList="form.imgUrl"
						@setDataImg="setCoverImg"
					></c-upload>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="closeDialog">取消</el-button>
					<el-button type="primary" @click="confirmForm('form')"
						>确定</el-button
					>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script>
import cUpload from '@/components/fileUpload/index.vue'
export default {
	props: {
		dialogFormVisible: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			formLabelWidth: '100px',
			form: {
				imgUrl: '',
			},
		}
	},
	watch: {
		dialogFormVisible: {
			handler(val) {
				if (!val) {
					this.resetForm()
				}
			},
			deep: true,
		},
	},
	components: {
		cUpload,
	},

	computed: {},

	mounted() {},

	methods: {
		setCoverImg(data) {
			this.$nextTick(() => {
				this.form.imgUrl = data.data.map((item) => {
					let obj = {}
					obj.objectKey = item.response
					obj.fileName = item.name
					return obj
				})
			})
		},
		closeDialog() {
			this.$emit('close-dialog')
		},
		resetForm() {
			this.form.imgUrl = ''
			this.$refs['cooperationImg'].setFileList('')
		},
		confirmForm(formName) {
			this.$emit('confirm-form', this.form)
		},
	},
}
</script>
<style lang="scss" scoped></style>
