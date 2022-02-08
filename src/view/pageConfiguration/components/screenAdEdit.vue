<template>
	<el-dialog
		title="提示"
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
				<el-form-item label="站点：" prop="divisionId">
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
					:label="adDialogTitles.title"
					prop="title"
				>
					<el-input
						v-model="param.title"
						size="medium"
						placeholder="请输入内容"
						maxlength="80"
					></el-input>
				</el-form-item>
				<el-form-item label="弹出频率：" prop="showType">
					<el-radio-group v-model="param.showType">
						<el-radio :label="0">首次弹</el-radio>
						<el-radio :label="1">每次弹</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="曝光用户类型：" prop="userType">
					<el-radio-group v-model="param.userType">
						<el-radio :label="0">所有用户可见</el-radio>
						<el-radio :label="1">新用户可见</el-radio>
						<el-radio :label="2">老用户可见</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="曝光会员类型：" prop="memberType">
					<el-radio-group v-model="param.memberType">
						<el-radio :label="0">非会员可见</el-radio>
						<el-radio :label="1">会员可见</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item :label="adDialogTitles.url" prop="url">
					<el-input
						v-model="param.url"
						size="medium"
						placeholder="请输入内容"
					></el-input>
				</el-form-item>
				<el-form-item :label="adDialogTitles.image" prop="image">
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
					<!-- <multi-lang-file-upload v-if="dialogVisible" :propFileList="param.image" @setData="setCover" accept="image/jpeg,image/jpg,image/png"></multi-lang-file-upload> -->
				</el-form-item>
				<el-form-item
					:label="adDialogTitles.startTime"
					prop="startTime"
				>
					<el-date-picker
						size="medium"
						v-model="param.startTime"
						type="datetime"
						placeholder="请输入开始时间"
						:picker-options="pickerOptions"
						format="YYYY-MM-DD HH:mm:ss"
						value-format="x"
					></el-date-picker>
				</el-form-item>
				<el-form-item :label="adDialogTitles.endTime" prop="endTime">
					<el-date-picker
						size="medium"
						v-model="param.endTime"
						type="datetime"
						:picker-options="pickerOptions"
						placeholder="请输入结束时间"
						format="YYYY-MM-DD HH:mm:ss"
						value-format="x"
					></el-date-picker>
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
import { divisionList } from '@/data/globalData.js'
export default {
	props: {
		dialogVisible: Boolean,
		countryList: Array,
		propParam: Object,
		bannerType: [String, Number], // 1：banner 2：闪屏广告 3： PS店铺
	},
	components: {
		// multiLangFileUpload
	},
	data() {
		return {
			IMG_ACCEPT: '.jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP',
			pickerOptions: {
				disabledDate(time) {
					return time.getTime() < Date.now() - 8.64e7
				},
			},
			adDialogTitles: {
				title: '广告标题：',
				url: '广告 URL 地址：',
				image: '广告图：',
				startTime: '广告开始时间：',
				endTime: '广告结束时间：',
			},
			divisionList: divisionList,
			param: {
				id: null,
				title: '',
				cover: '',
				url: '',
				image: [],
				bannerType: '',
				startTime: '',
				endTime: '',
				showType: 0,
				userType: '',
				memberType: '',
				divisionId: 'CN^^^浙江省^^^杭州市',
			},
			loading: false,
			adDialogRules: {
				title: [
					{
						required: true,
						message: '标题不能为空',
						trigger: 'change',
					},
				],
				divisionId: [
					{
						required: true,
						message: '站点不能为空',
						trigger: 'change',
					},
				],
				showType: [
					{
						required: true,
						message: '请选择弹出频率',
						trigger: 'change',
					},
				],
				url: [
					{
						required: false,
						message: '广告 Url 格式不正确',
						trigger: 'change',
						validator: (rule, value, callback) => {
							if (
								this.param.url &&
								this.param.url.length > 0 &&
								!validator.isURL(this.param.url, {
									require_protocol: true,
								})
							) {
								callback(new Error())
							} else {
								callback()
							}
						},
					},
				],
				image: [
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
		}
	},
	watch: {
		propParam: {
			handler(val) {
				Object.assign(this.param, val)
			},
			deep: true,
		},
	},
	methods: {
		reset() {
			this.param = {
				name: '',
				countryCode: '',
				url: '',
				image: [],
				startTime: '',
				endTime: '',
				bannerType: '',
			}
			this.$refs['addDialog'] && this.$refs['addDialog'].clearValidate()
		},
		handleClose() {
			this.reset()
			this.$emit('close')
		},
		setCover(data) {
			this.param.image = data
		},
		delDetailImgItem() {
			this.param.cover = ''
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
		conformAddItem() {
			this.$refs['addDialog'].validate((valid) => {
				if (valid) {
					this.param.bannerType = this.bannerType
					this.loading = true
					fetchSaveData({ bannerInfo: this.filterData(this.param) })
						.then((res) => {
							this.loading = false
							if (res.ret.errcode === 1) {
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
<style lang="scss">
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
