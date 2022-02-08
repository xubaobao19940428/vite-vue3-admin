<template>
	<el-dialog
		title="编辑商品分组"
		v-model="dialogVisible"
		width="700px"
		@before-close="handleClose"
	>
		<el-form
			:rules="dialogRules"
			ref="dialogForm"
			:model="param"
			label-position="right"
			label-width="100px"
			class="demo-ruleForm"
			style="width: 100%"
		>
			<el-form-item label="站点" prop="divisionId">
				<el-select v-model="param.divisionId">
					<el-option
						v-for="(item, index) in divisionList"
						:key="index"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="名称" prop="title">
				<el-input
					v-model="param.title"
					show-word-limit
					maxlength="100"
					type="text"
					placeholder="请输入"
				></el-input>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button size="small" @click="handleClose">取 消</el-button>
			<el-button size="small" type="primary" @click="confirmAddItem()"
				>确 定</el-button
			>
		</span>
	</el-dialog>
</template>
<script>
import { uploadFileRequest } from '@/api/newJson/file'
import { modifyGroup } from '@/api/newJson/pageEdit'
import { divisionList } from '@/data/globalData.js'
export default {
	props: {
		dialogVisible: Boolean,
		propParam: Object,
		APP_TYPE: Object,
	},
	data() {
		return {
			param: {
				divisionId: 'CN^^^浙江省^^^杭州市',
				title: '',
				id: null,
			},
			divisionList: divisionList,
			IMG_ACCEPT: '.jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP',
			dialogRules: {
				title: [{ required: true, message: '必选', trigger: 'blur' }],
				divisionId: [
					{
						required: true,
						message: '请选择站点',
						trigger: 'change',
					},
				],
			},
		}
	},
	watch: {
		propParam: {
			handler(val) {
				this.$nextTick(() => {
					Object.assign(this.param, val)
				})
			},
			deep: true,
		},
		dialogVisible(val) {
			if (!val) {
				this.reset()
			}
		},
	},
	methods: {
		handleClose() {
			this.reset()
			this.$emit('close')
		},

		uploadPic(file) {
			uploadFileRequest(
				{
					file: file,
				},
				(url) => {
					this.param.cover = url
				}
			)
		},
		reset() {
			this.$refs['dialogForm'] && this.$refs['dialogForm'].resetFields()
		},
		confirmAddItem() {
			this.$refs['dialogForm'].validate((valid) => {
				if (valid) {
					modifyGroup(this.filterData(this.param)).then((res) => {
						if (res) {
							this.reset()
							this.$emit('confirm')
							this.$message.success('成功')
						}
					})
				}
			})
		},
	},
}
</script>
<style lang="scss" scoped>
// .upload-box {
//     display: flex;
//     .cover {
//         width: 148px;
//         height: 148px;
//         margin-right: 10px;
//     }
// }
.image-box {
	position: relative;
	height: 148px;
	width: 148px;
	margin: 10px;
	line-height: 170px;
	text-align: center;
	color: #fff;
	transition: transform 0.3s;
	.image-item {
		width: 148px;
		height: 148px;
		border: 1px dashed #c0ccda;
		border-radius: 6px;
		padding: 4px;
	}
	.media-img {
		width: 100%;
	}
	&:hover {
		.operate-area {
			opacity: 0.5;
			transition: opacity 0.3s;
			border-bottom-left-radius: 6px;
			border-bottom-right-radius: 6px;
		}
		cursor: move;
	}
	.operate-area {
		position: absolute;
		opacity: 0;
		background: #000000;
		height: 40px;
		line-height: 40px;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 0 10px;
		box-sizing: border-box;
		color: #fff;
		font-size: 14px;
		span {
			cursor: pointer;
		}
	}
}
</style>
