<template>
	<el-dialog
		title="新增banner"
		v-model="dialogVisible"
		width="800px"
		@close="handleClose"
	>
		<div style="height: 100%; width: 100%">
			<el-form
				:rules="adDialogRules"
				ref="addDialog"
				:model="param"
				label-position="right"
				label-width="160px"
				class="demo-ruleForm"
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
				<el-form-item
					hide-required-asterisk="false"
					label="banner标题"
					prop="title"
				>
					<el-input
						v-model="param.title"
						size="medium"
						placeholder="banner标题"
						maxlength="80"
					></el-input>
				</el-form-item>
				<el-form-item
					hide-required-asterisk="false"
					label="跳转类型"
					prop="jumpType"
				>
					<el-radio-group
						v-model="param.jumpType"
						@change="changeJumpType"
					>
						<el-radio :label="1">链接</el-radio>
						<el-radio :label="2">页面</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item
					hide-required-asterisk="false"
					label="跳转链接"
					prop="url"
				>
					<el-input
						v-model="param.url"
						size="medium"
						placeholder="请输入跳转链接"
						maxlength="80"
						v-if="param.jumpType == 1"
					></el-input>
					<el-select
						v-model="param.url"
						placeholder="请选择跳转页面"
						clrearable
						v-else
					>
						<el-option
							v-for="(item, index) in openUrlType"
							:key="index"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="主图标" prop="cover">
					<div class="list-group-item image-box" v-if="param.cover">
						<div class="list-styles">
							<el-image
								:src="dealShowFileSrc(param.cover)"
								class="image-item"
							></el-image>
							<div class="operate-area">
								<i
									class="el-icon-delete"
									@click.stop="delDetailImgItem"
								></i>
							</div>
						</div>
					</div>
					<div slot="footer" class="upload-box" v-else>
						<el-upload
							action=""
							list-type="picture-card"
							:multiple="1"
							:accept="IMG_ACCEPT"
							:http-request="uploadRotationPic"
							:show-file-list="false"
							:before-upload="onImgBeforeUpload"
							:on-preview="handlePictureCardPreview"
						>
							<i class="el-icon-plus"></i>
						</el-upload>
					</div>

					<div class="form-tips mar-t-10">
						建议尺寸：335*170像素以上，大小2M以下；支持jpg、jpeg、png；只能上传一张图片。
					</div>
				</el-form-item>
				<el-form-item label="开始时间" prop="startTime">
					<el-date-picker
						size="medium"
						v-model="param.startTime"
						type="datetime"
						placeholder="请输入开始时间"
						:disabledDate="disabledDate"
						format="YYYY-MM-DD HH:mm:ss"
						value-format="x"
					></el-date-picker>
				</el-form-item>
				<el-form-item label="结束时间" prop="endTime">
					<el-date-picker
						size="medium"
						v-model="param.endTime"
						type="datetime"
						:disabledDate="disabledDate"
						placeholder="请输入结束时间"
						format="YYYY-MM-DD HH:mm:ss"
						value-format="x"
					></el-date-picker>
				</el-form-item>
				<el-form-item label="状态" prop="status">
					<el-radio-group v-model="param.status">
						<el-radio :label="1">显示</el-radio>
						<el-radio :label="2">隐藏</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button size="small" @click="handleClose">取 消</el-button>
			<el-button
				size="small"
				:loading="loading"
				type="primary"
				@click="conformAddItem()"
				>确 定</el-button
			>
		</span>
	</el-dialog>
</template>
<script>
// import validator from 'validator'
// import multiLangFileUpload from '@/components/multiLangFileUpload/'
import { uploadFileRequest } from '@/api/newJson/file'
// import { fetchSaveData } from '@/request/promotion.js'
import { ref, reactive, toRefs } from 'vue'
import { modifyBanner } from '@/api/newJson/pageEdit'
import { divisionList } from '@/data/globalData.js'
export default {
	setup() {
		const state = reactive({
			disabledDate(time) {
				return time.getTime() < Date.now() - 8.64e7
			},
		})
		return {
			...toRefs(state),
		}
	},

	props: {
		dialogVisible: Boolean,
		countryList: Array,
		propParam: Object,
		bannerType: [String, Number], // 1：banner 2：闪屏广告
	},
	components: {
		// multiLangFileUpload
	},
	data() {
		return {
			// pickerOptions: {
			//     disabledDate(time) {
			//         return time.getTime() < Date.now() - 8.64e7;
			//     },
			// },
			IMG_ACCEPT: '.jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP',
			param: {
				id: null,
				title: '',
				jumpType: 1,
				cover: '',
				url: '',
				divisionId: 'CN^^^浙江省^^^杭州市',
				startTime: '',
				endTime: '',
				status: 1,
			},
			divisionList: divisionList,
			loading: false,
			adDialogRules: {
				title: [
					{
						required: true,
						message: '标题不能为空',
						trigger: 'change',
					},
				],
				status: [
					{
						required: true,
						message: '请选择状态',
						trigger: 'change',
					},
				],
				countryCode: [
					{
						required: true,
						message: '标题不能为空',
						trigger: 'change',
					},
				],
				jumpType: [
					{
						required: true,
						message: '跳转类型',
						trigger: 'change',
					},
				],
				url: [
					{
						required: true,
						message: '跳转链接不能为空',
					},
				],
				divisionId: [
					{
						required: true,
						message: '请选择站点',
						trigger: 'change',
					},
				],
				cover: [
					{ required: true, message: '不能为空', trigger: 'change' },
				],
				startTime: [
					{
						required: true,
						message: '初始时间不能为空',
						trigger: 'change',
					},
				],
				endTime: [
					{
						required: true,
						message: '结束时间不能为空',
						trigger: 'change',
					},
					{
						required: true,
						message: '结束时间不能小于开始时间',
						trigger: 'change',
						validator: (rule, value, callback) => {
							const startTime = new Date(this.param.startTime)
							const stopTime = new Date(this.param.endTime)
							if (startTime >= stopTime) {
								callback(new Error('结束时间不能小于开始时间'))
							} else {
								callback()
							}
						},
					},
				],
			},
			openUrlType: [
				{
					label: '达人页',
					value: '1',
				},
				{
					label: '我的页',
					value: '2',
				},
				{
					label: '全部订单页面',
					value: '3',
				},
			],
		}
	},
	watch: {
		propParam: {
			handler(val) {
				Object.assign(this.param, val)
			},
			deep: true,
		},
		dialogVisible(val) {
			if (val) {
				this.$nextTick(() => {
					Object.assign(this.param, this.propParam)
				})
			} else {
				this.reset()
				this.param.id = null
			}
		},
	},
	methods: {
		delDetailImgItem() {
			this.param.cover = ''
		},
		reset() {
			this.$refs['addDialog'].resetFields()
		},
		handleClose() {
			this.reset()
			this.$emit('close')
		},
		uploadRotationPic(file) {
			uploadFileRequest(
				{
					file: file,
				},
				(url) => {
					this.param.cover = url
				}
			)
		},
		changeJumpType() {
			this.param.url = ''
		},
		conformAddItem() {
			this.$refs['addDialog'].validate((valid) => {
				if (valid) {
					this.loading = true
					if (!this.param.cover) {
						this.$message.warning('请上传banner图')
						return
					}
					modifyBanner(this.filterData(this.param))
						.then((res) => {
							this.loading = false
							if (res) {
								this.$message.success('成功')
								this.reset()
								this.$emit('confirm')
							}
						})
						.catch(() => {
							this.loading = false
						})
				}
			})
		},
	},
}
</script>
<style lang="scss" scoped>
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
