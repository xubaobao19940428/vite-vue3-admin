<template>
	<div class="file-upload-wrapper">
		<el-upload
			v-if="listType === 'text'"
			:http-request="uploadFile"
			:limit="uploadLimit"
			:multiple="limit == 1 ? false : true"
			:name="uploadFileName"
			:data="uploadParam"
			:ref="refsName"
			:file-list="fileData"
			v-loading="loading"
			:on-exceed="handleExceed"
			:on-error="uploadError"
			:on-success="uploadSuccess"
			:on-progress="handleProgress"
			:before-upload="beforeFileUpload"
		>
			<el-button icon="el-icon-upload2" size="small" type="primary"
				>上传附件</el-button
			>
		</el-upload>
		<el-upload
			v-else
			:headers="headers"
			:limit="uploadLimit"
			:class="limit == 1 ? 'avatar-uploader' : ''"
			:multiple="limit == 1 ? false : true"
			:name="uploadFileName"
			:data="uploadParam"
			:http-request="uploadFile"
			:file-list="fileData"
			:accept="accept"
			:ref="refsName"
			:on-error="uploadError"
			:on-exceed="handleExceed"
			:on-success="uploadSuccess"
			:on-progress="handleProgress"
			:before-upload="beforeFileUpload"
			:on-remove="handleRemove"
			v-loading="loading"
			list-type="picture-card"
		>
			<div slot="default" @click="uploadInit">
				<i class="el-icon-plus"></i>
				<div class="upload-text" v-show="textDesc">
					<span class="red" v-show="isRequired">*</span>
					<span>{{ textDesc }}</span>
				</div>
			</div>
			<template slot="file" slot-scope="{ file }">
				<!-- <el-progress type="circle" :percentage="file.uploadProgress" v-if="file.uploadProgress < 100"></el-progress> -->
				<video
					v-if="getFileType(file) == 'video' && file"
					class="el-upload-list__item-thumbnail"
					:src="dealShowFileSrc(file.url)"
					data-name="videobox"
				></video>

				<div
					v-else-if="getFileType(file) == 'audio' && file"
					class="file-audio"
					data-name="audiobox"
				>
					<i class="iconfont">&#xe6ed;</i>
				</div>
				<img
					v-else-if="getFileType(file) == 'image' && file"
					class="el-upload-list__item-thumbnail"
					:src="dealShowFileSrc(file.url)"
					alt=""
					data-name="imgbox"
				/>
				<span v-else>{{ file ? file.url : '' }}</span>
				<!-- <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                        <i class="el-icon-delete"></i>
                    </span>
                </span> -->
			</template>
		</el-upload>
		<!-- <image-preview v-show="image.show"
                       :fileType="image.fileType"
                       :close="closePreview"
                       :index="image.index"
                       :list="image.list">
        </image-preview> -->
	</div>
</template>
<script>
import { uploadFileRequest } from '@/api/newJson/file'
import { stringToArray, arrayToString } from '@/js/filter'
// import imagePreview from '@/components/imagePreview'
// import Sortable from 'sortablejs';.

export default {
	props: {
		fileList: {
			type: String,
			default: '',
		},
		listType: {
			type: String,
			default: 'picture-card',
		},
		signCode: String,
		accept: String,
		limit: {
			type: Number,
			default: 1,
		},
		refsName: {
			type: String,
			default: 'fileUpload',
		},
		iscopy: {
			type: Boolean,
		},
		getType: String,
		textDesc: String,
		isRequired: Boolean,
	},
	data() {
		return {
			uploadFileName: 'file',
			headers: this.$headers,
			uploadParam: {},
			fileData: [],
			reUploadIndex: -1,
			uploadLimit: this.limit,
			image: {
				show: false,
				index: 0,
				fileType: 'img',
				list: [],
			},
			loading: false,
		}
	},
	components: {
		// imagePreview,
	},
	created() {
		this.setFileList(this.fileList)
	},
	methods: {
		setFileList(val) {
			if (val) {
				this.fileData = stringToArray(JSON.parse(JSON.stringify(val)))
				this.fileData.forEach((item) => {
					item.url = this.dealShowFileSrc(item.url)
				})
			}
			if (val == '') {
				this.fileData = []
			}
		},
		// 自定义上传
		uploadFile(reg) {
			uploadFileRequest(
				{
					file: reg,
				},
				(url) => {
					reg.onSuccess(url, reg.file, [reg.file])
				},
				(err) => {
					reg.onError(err)
				}
			)
		},
		// 上传之前校验
		beforeFileUpload(file) {
			let fileType = file.type.split('/')[0]
			if (fileType == 'image') {
				// 图片都限制在2MB
				const isLt2M = file.size / 1024 / 1024 < 2
				if (!isLt2M) {
					this.$message.error(`上传图片大小不能超过 2MB!`)
					return false
				}
			} else {
				const isLt30M = file.size / 1024 / 1024 < 30
				if (!isLt30M) {
					this.$message.error(`上传文件大小不能超过 30MB!`)
					return false
				}
			}
			/*
			 *fileType: image gif audio video location other
			 */
			if (file.type === 'image/gif') {
				fileType = 'gif'
			} else if (
				fileType != 'image' &&
				fileType != 'video' &&
				fileType != 'audio'
			) {
				fileType = 'other'
			}
			Object.assign(this.uploadParam, {
				param: JSON.stringify({
					type: fileType,
					fileName: file.name,
				}),
			})
			this.loading = true
			return true
		},
		uploadInit() {
			console.log(this.reUploadIndex)
			if (this.reUploadIndex != -1) {
				this.uploadLimit -= 1
				this.reUploadIndex = -1
			}
		},
		uploadError() {
			console.log(222)
			this.$message({
				message: '上传失败' + this.signCode ? this.signCode : '',
				type: 'warning',
			})
			this.loading = false
		},
		// 上传成功
		uploadSuccess(response, file, fileList) {
			let mappedFileList = []
			if (this.reUploadIndex != -1) {
				fileList[this.reUploadIndex] = fileList[fileList.length - 1]
				fileList.splice(fileList.length - 1, 1)
				this.uploadLimit -= 1
			}
			if (this.getType) {
				mappedFileList = fileList.map((mappingfile) => {
					if (mappingfile.response !== undefined) {
						mappingfile.url =
							mappingfile.response[this.getType] ||
							mappingfile.response
					}
					return mappingfile
				})
			} else {
				console.log('fileList', fileList)
				mappedFileList = fileList.map((mappingfile) => {
					if (mappingfile.response !== undefined) {
						mappingfile.url = mappingfile.response
					}
					return mappingfile
				})
			}
			this.fileData = mappedFileList

			this.$emit('setData', {
				data: arrayToString(this.fileData),
				signCode: this.signCode,
			})
			this.$emit('setDataImg', {
				data: this.fileData,
				signCode: this.signCode,
			})
			this.fileData.forEach((item) => {
				item.url = this.dealShowFileSrc(item.url)
			})
			this.reUploadIndex = -1
			this.loading = false
		},
		// 上传进度
		handleProgress(event, file) {
			file.uploadProgress = parseInt(event.percent)
		},
		handleExceed() {
			console.log(111)
			this.$message.warning(`最多上传${this.limit}个文件`)
		},
		// 删除
		handleRemove(file, fileList) {
			let index = this.fileData.findIndex((val) => {
				return val.url == file.url
			})
			if (index != -1) {
				this.fileData.splice(index, 1)
				this.$emit('setData', {
					data: arrayToString(this.fileData),
					signCode: this.signCode,
				})
			}
		},
		getFileType(file) {
			return file && file.raw ? file.raw.type.split('/')[0] : 'image'
		},
		// 预览
		previewFile(file) {
			this.image.fileType = this.getFileType(file)
			this.image.list = [this.dealShowFileSrc(file.url)]
			this.image.show = true
		},
		// 关闭预览
		closePreview() {
			this.image.show = false
		},
		// 重新上传
		reUploadFile(refsName, file) {
			this.reUploadIndex = this.fileData.findIndex((val) => {
				return val.url == file.url
			})
			this.uploadLimit += 1
			let input =
				this.$refs[refsName].$refs['upload-inner'].$refs['input']
			input.value = null
			input.click()
		},
		// 下载
		downloadFile(file) {
			let a = document.createElement('a')
			a.download = this.dealShowFileSrc(file.url)
			a.href = this.dealShowFileSrc(file.url)
			a.click()
		},
	},
}
</script>
<style lang="scss">
.file-upload-wrapper {
	position: relative;
	.iconfont {
		font-size: 70px;
	}
	.file-audio {
		display: flex;
		justify-content: center;
	}
	.upload-text {
		display: flex;
		align-items: center;
		line-height: 18px;
		position: absolute;
		bottom: 6px;
		left: 50%;
		transform: translateX(-50%);
		.red {
			font-size: 16px;
			color: #f56c6c;
		}
		span {
			margin-left: 4px;
			font-size: 12px;
			word-break: keep-all;
		}
	}
}
</style>
