<!--  -->
<template>
	<div class="product_detail">
		<el-card>
			<p class="product_detail_title">商品参数</p>
			<div class="base_info_content">
				<el-form
					ref="detailForm"
					:model="detailForm"
					:rules="detailFormRule"
					label-width="130px"
					class="demo-baseInfoForm"
				>
					<el-form-item label="商品名称：" prop="title">
						<el-input
							placehodler="请输入商品名称"
							v-model="detailForm.title"
							style="width: 300px"
						></el-input>
					</el-form-item>
					<el-form-item label="商品可核销次数：">
						<el-input
							placehodler="请输入商品名称"
							v-model="detailForm.useTimes"
							style="width: 300px"
							disabled
						></el-input>
					</el-form-item>
					<el-form-item label="商品详情：" required>
						<el-button
							size="small"
							type="primary"
							icon="el-icon-plus"
							@click="addDomain"
							style="margin-left: 100px"
						>
							新增商品标题
						</el-button>
						<span
							style="margin-left: 10px"
							v-if="detailForm.detailList.length == 0"
						>
							<i class="iconfont" style="color: red">&#xe8ed;</i>
						</span>
						<div
							v-for="(domain, index) in detailForm.detailList"
							:key="index"
						>
							<el-form-item
								label="标题："
								size="small"
								label-width="100px"
								style="margin-top: 20px"
								:prop="'detailList.' + index + '.detailTitle'"
								:rules="{
									required: true,
									message: '请输入标题',
									trigger: 'blur',
								}"
							>
								<el-input
									v-model="domain.detailTitle"
									placeholder="请输入标题"
									style="width: 200px"
								></el-input>
								<el-button
									type="primary"
									icon="el-icon-plus"
									circle
									style="margin-left: 10px"
									@click="addDomainAttribute(index)"
								></el-button>
								<el-button
									type="danger"
									icon="el-icon-delete"
									circle
									style="margin-left: 10px"
									@click="deleteParentAttr(index)"
								></el-button>
							</el-form-item>
							<div
								class="value_detail"
								v-for="(item, _index) in domain.contentList"
								:key="_index"
							>
								<el-form-item
									label="内容："
									label-width="100px"
									:rules="{
										required: true,
										message: '请输入内容',
										trigger: 'blur',
									}"
								>
									<el-input
										v-model="item.contentTitle"
										placeholder="请输入内容"
										style="width: 200px"
										size="small"
									></el-input>
									<el-radio-group
										v-model="item.commandType"
										style="margin-left: 20px"
									>
										<el-radio :label="1">商家主推</el-radio>
										<el-radio :label="2">网友推荐</el-radio>
										<el-radio :label="3">不展示</el-radio>
									</el-radio-group>
									<span style="margin-left: 40px">
										<span>份数：</span>
										<el-input-number
											v-model="item.num"
											:min="1"
											:step="1"
											step-strictly
											controls-position="right"
											size="small"
										/>
									</span>
									<span style="margin-left: 40px">
										<span>价格：</span>
										<el-input-number
											v-model="item.price"
											:min="0"
											:precision="2"
											controls-position="right"
											size="small"
										/>
									</span>
									<el-button
										type="danger"
										icon="el-icon-delete"
										size="small"
										style="margin-left: 20px"
										circle
										@click="deleteAttrChild(index, _index)"
									></el-button>
								</el-form-item>
							</div>
						</div>
					</el-form-item>

					<!-- <el-form-item label="商品介绍:" prop="description">
                        <el-input
                            placehodler="请输入商品介绍"
                            type="textarea"
                            v-model="detailForm.description"
                            :rows="5"
                            style="width:300px"
                        ></el-input>
                    </el-form-item> -->
					<el-form-item label="使用规则：" required>
						<div style="margin-top: 20px">
							<el-form-item
								label="有效期："
								required
								label-width="100px"
								prop="timeList"
							>
								<el-date-picker
									size="medium"
									v-model="detailForm.timeList"
									type="daterange"
									range-separator="-"
									start-placeholder="开始时间"
									end-placeholder="结束时间"
									:default-time="defaultTime2"
									format="YYYY-MM-DD HH:mm:ss"
									value-format="x"
								></el-date-picker>
								<el-switch
									style="margin-left: 20px"
									v-model="detailForm.restDayAvailable"
									inline-prompt
									:active-icon="Check"
									:inactive-icon="Close"
									:active-value="1"
									:inactive-value="0"
								></el-switch>
								<span style="margin-left: 20px"
									>周末、节假日通用</span
								>
							</el-form-item>
							<!-- <el-form-item label="使用时间：" label-width="100px"> -->
							<el-form-item
								label="上半场："
								style="margin-top: 10px"
								label-width="100px"
							>
								<el-time-select
									v-model="detailForm.serviceTime.firstStart"
									:max-time="detailForm.serviceTime.firstEnd"
									style="width: 120px"
									placeholder="开始时间"
									start="00:30"
									step="00:30"
									end="24:00"
								></el-time-select>
								<el-time-select
									v-model="detailForm.serviceTime.firstEnd"
									:min-time="
										detailForm.serviceTime.firstStart
									"
									:max-time="
										detailForm.serviceTime.secondStart
									"
									style="width: 120px"
									placeholder="结束时间"
									start="00:30"
									step="00:30"
									end="24:00"
								></el-time-select>
							</el-form-item>
							<el-form-item
								label="下半场："
								style="margin-top: 10px"
								label-width="100px"
							>
								<el-time-select
									v-model="detailForm.serviceTime.secondStart"
									style="width: 120px"
									:min-time="detailForm.serviceTime.firstEnd"
									:max-time="detailForm.serviceTime.secondEnd"
									placeholder="开始时间"
									start="00:30"
									step="00:30"
									end="24:00"
								></el-time-select>
								<el-time-select
									v-model="detailForm.serviceTime.secondEnd"
									:min-time="
										detailForm.serviceTime.secondStart
									"
									style="width: 120px"
									placeholder="结束时间"
									start="00:30"
									step="00:30"
									end="24:00"
								></el-time-select>
							</el-form-item>
							<!-- </el-form-item> -->
						</div>
					</el-form-item>
					<div class="editorWrapper">
						<div class="info">
							<el-divider content-position="left"
								>其他规则:</el-divider
							>
						</div>
						<div>
							<el-row>
								<el-col :offset="1" :span="22">
									<div class="grid-content bg-purple-dark">
										<el-card class="box-card">
											<RichEditor
												:model-value="editorValue"
												@update:modelValue="
													handleUpdateValue
												"
											></RichEditor>
										</el-card>
									</div>
								</el-col>
							</el-row>
						</div>
					</div>
					<el-form-item label="商品主图：" required>
						<draggable
							:list="detailForm.cover"
							class="dragArea list-group image-show"
							ghostlass="ghost"
							@change="log"
						>
							<div
								class="list-group-item image-box"
								v-for="(element, index) in detailForm.cover"
								:key="element"
							>
								<div class="list-styles">
									<el-image
										:src="dealShowFileSrc(element)"
										class="image-item"
									></el-image>
									<div class="operate-area">
										<i
											class="el-icon-delete"
											@click.stop="delCoverImgItem(index)"
										></i>
									</div>
								</div>
							</div>
							<div slot="footer" class="upload-box nodrag">
								<el-upload
									action=""
									list-type="picture-card"
									multiple
									:accept="IMG_ACCEPT"
									:http-request="uploadRotationPicCover"
									:show-file-list="false"
									:before-upload="onImgBeforeUpload"
									:on-preview="handlePictureCardPreview"
								>
									<i class="el-icon-plus"></i>
								</el-upload>
							</div>
						</draggable>
						<p class="tips">
							最多上传10张图片，单张图片需小于10M，拖转可以进行排序
						</p>
					</el-form-item>
					<el-form-item label="商品详情图：" required>
						<draggable
							:list="detailForm.descriptionImgs"
							class="dragArea list-group image-show"
							ghostlass="ghost"
							@change="log"
						>
							<div
								class="list-group-item image-box"
								v-for="(
									element, index
								) in detailForm.descriptionImgs"
								:key="element"
							>
								<div class="list-styles">
									<el-image
										:src="dealShowFileSrc(element)"
										class="image-item"
									></el-image>
									<div class="operate-area">
										<i
											class="el-icon-delete"
											@click.stop="
												delDescriptionImgs(index)
											"
										></i>
									</div>
								</div>
							</div>
							<div slot="footer" class="upload-box nodrag">
								<el-upload
									action=""
									list-type="picture-card"
									multiple
									:accept="IMG_ACCEPT"
									:http-request="uploadRotationPic"
									:show-file-list="false"
									:before-upload="onImgBeforeUpload"
									:on-preview="handlePictureCardPreview"
								>
									<i class="el-icon-plus"></i>
								</el-upload>
							</div>
						</draggable>
						<p class="tips">
							最多上传10张图片，单张图片需小于10M，拖转可以进行排序
						</p>
					</el-form-item>
					<el-form-item label="商品视频：">
						<a target="_blank" :href="videoInfo.src">{{
							dealShowFileSrc(videoInfo.src)
						}}</a>
						<div class="product-video">
							<div class="video-wrap" v-if="videoInfo.src != ''">
								<video
									ref="media"
									width="100%"
									height="100%"
									style="width: 100%; height: 100%"
								>
									<source
										:src="dealShowFileSrc(videoInfo.src)"
									/>
									<object
										:data="dealShowFileSrc(videoInfo.src)"
										width="100%"
										height="100%"
									>
										<embed
											:src="
												dealShowFileSrc(videoInfo.src)
											"
											width="100%"
											height="100%"
										/>
									</object>
								</video>
								<div class="operate-area">
									<i
										class="el-icon-video-play"
										@click="showVideo()"
									></i>
									<i
										class="el-icon-delete"
										@click="delVideoItem()"
									></i>
								</div>
							</div>
							<div
								class="upload-box"
								v-show="videoInfo.src === ''"
							>
								<el-upload
									action=""
									list-type="picture-card"
									multiple
									:accept="VIDEO_ACCEPT"
									v-loading="loading"
									:http-request="uploadVideo"
									:on-progress="handleProgress"
									:show-file-list="false"
								>
									<i class="el-icon-plus"></i>
								</el-upload>
							</div>
						</div>
						<p class="tips">
							建议720*1080像素以上，大小10M以下；支持mp4、avi
						</p>
					</el-form-item>
					<el-form-item label="商品海报：" required>
						<div class="image-box" v-if="detailForm.postCover">
							<div class="list-styles">
								<el-image
									:src="dealShowFileSrc(detailForm.postCover)"
									class="image-item"
								></el-image>
								<div class="operate-area">
									<i
										class="el-icon-delete"
										@click.stop="delDetailPostCover"
									></i>
								</div>
							</div>
						</div>
						<div slot="footer" class="upload-box" v-else>
							<el-upload
								action=""
								list-type="picture-card"
								:limit="1"
								:accept="IMG_ACCEPT"
								:http-request="uploadRotationPostCover"
								:show-file-list="false"
								:before-upload="onImgBeforeUpload"
								:on-preview="handlePictureCardPreview"
							>
								<i class="el-icon-plus"></i>
							</el-upload>
						</div>
					</el-form-item>
				</el-form>
			</div>
		</el-card>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import { uploadFileRequest } from '@/api/newJson/file'
import RichEditor from '@/components/richEditor.vue'

const MAX_ROTATION_LENGTH = 10
export default defineComponent({
	name: 'productDetail',
	props: {
		productDetailTitle: {
			type: String,
		},
	},
	setup() {
		const defaultTime2 = ref([
			new Date(2000, 1, 1, 0, 0, 0),
			new Date(2000, 2, 1, 23, 59, 59),
		]) //
		const editorValue = ref() // 富文本引用
		const richHtml = ref() // 富文本内容；
		/**
		 * @description  获取接收最新文本
		 */
		const handleUpdateValue = (val) => {
			richHtml.value = val
		}
		return {
			handleUpdateValue,
			editorValue,
			defaultTime2,
			richHtml,
		}
	},
	data() {
		return {
			// rangHtml:
			//     '<p><br/></p><img src="https://mm-sg-octstream.memall.shop/image/202108/3a80f94a51184dbe9142105008ce1df8.jpg!W500" style="max-width:100%;" contenteditable="false"/>',
			IMG_ACCEPT: '.jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP',
			VIDEO_ACCEPT: '.mp4,.avi,.MP4,.AVI',
			detailForm: {
				title: '',
				descriptionImgs: [],
				description: '',
				rule: '',
				cover: [],
				postCover: '',
				timeList: [],
				serviceTime: {
					firstStart: '',
					firstEnd: '',
					secondStart: '',
					secondEnd: '',
				},
				useTimes: 0,
				restDayAvailable: 1,
				detailList: [],
				expireStart: '',
				expireEnd: '',
				rule: '',
			},
			detailFormRule: {
				title: {
					required: true,
					message: '请输入商品名称',
					trigger: 'blur',
				},
				detail: {
					required: true,
					message: '请输入商品详情',
					trigger: 'blur',
				},
				rule: {
					required: true,
					message: '请输入商品使用规则',
					trigger: 'blur',
				},
				timeList: {
					required: true,
					message: '请输入商品使用规则',
					trigger: 'change',
				},
				description: {
					required: true,
					message: '请输入商品介绍',
					trigger: 'blur',
				},
			},
			videoInfo: {
				src: '',
			},
		}
	},

	components: {
		draggable: VueDraggableNext,
		RichEditor,
	},

	computed: {},

	mounted() {
		// setTimeout(() => {
		//     // 3秒后设置数据为'3秒后的数据'
		//     // editorValue.value = '3秒后的数据';
		//     this.editorValue = this.rangHtml;
		// }, 3000);
	},

	methods: {
		//新增商品标题
		addDomain() {
			this.detailForm.detailList.push({
				detailTitle: '',
				contentList: [],
			})
		},
		addDomainAttribute(index) {
			this.detailForm.detailList[index].contentList.push({
				contentTitle: '',
				commandType: 3,
				num: 1,
				price: '',
			})
			console.log(this.detailForm.detailList)
		},
		deleteParentAttr(index) {
			this.detailForm.detailList.splice(index, 1)
		},
		deleteAttrChild(index, childIndex) {
			this.detailForm.detailList[index].contentList.splice(childIndex, 1)
		},
		uploadRotationPic(file) {
			uploadFileRequest(
				{
					file: file,
				},
				(url) => {
					let length = this.detailForm.descriptionImgs.length
					if (length < MAX_ROTATION_LENGTH) {
						let picObj = url
						this.detailForm.descriptionImgs.push(picObj)
					} else {
						this.$message.warning('商品详情图最多上传十张')
					}
				}
			)
		},
		uploadRotationPicCover(file) {
			uploadFileRequest(
				{
					file: file,
				},
				(url) => {
					console.log(url)
					let length = this.detailForm.cover.length
					if (length < MAX_ROTATION_LENGTH) {
						let picObj = url
						this.detailForm.cover.push(picObj)
					} else {
						this.$message.warning('商品主图最多上传十张')
					}
				}
			)
		},
		uploadRotationPostCover(file) {
			uploadFileRequest(
				{
					file: file,
				},
				(url) => {
					this.detailForm.postCover = url
				}
			)
		},
		uploadVideo(file) {
			uploadFileRequest(
				{
					file: file,
				},
				(url) => {
					this.videoInfo.src = url
				}
			)
		},
		delCoverImgItem(index) {
			this.detailForm.cover.splice(index, 1)
		},
		delVideoItem() {
			this.videoInfo.src = ''
		},
		delDescriptionImgs(index) {
			this.detailForm.descriptionImgs.splice(index, 1)
		},
		delDetailPostCover() {
			this.detailForm.postCover = ''
		},
		validateDetail() {
			let _this = this
			console.log(this.richHtml)
			return new Promise((resolve, reject) => {
				this.$refs['detailForm'].validate((valid) => {
					if (valid) {
						if (this.richHtml) {
							this.detailForm.rule = this.richHtml
						}
						this.detailForm.expireStart =
							this.detailForm.timeList[0].toString()
						this.detailForm.expireEnd =
							this.detailForm.timeList[1].toString()
						console.log(this.detailForm)
						if (!this.detailForm.cover.length) {
							this.$message.error('请上传商品主图')
							reject(false)
						} else if (!this.detailForm.descriptionImgs.length) {
							this.$message.error('请上传商品详情图')
							reject(false)
						} else if (!this.detailForm.postCover) {
							this.$message.error('请上传商品海报')
							reject(false)
						} else {
							console.log(33333)
							resolve({ ...this.detailForm, ...this.videoInfo })
						}
					} else {
						reject(false)
					}
				})
			})
		},
	},
})
</script>
<style lang="scss" scoped>
.product_detail {
	margin-top: 10px;
	.el-card {
		:deep().el-card__body {
			padding: 0;
		}
		.product_detail_title {
			margin-bottom: 20px;
			height: 30px;
			border-left: 4px solid #409eff;
			line-height: 30px;
			padding-left: 20px;
			box-sizing: border-box;
		}
		.base_info_content {
			padding: 0 20px 20px;
			box-sizing: border-box;
			.image-show {
				display: flex;
				flex-wrap: wrap;
				width: 800px;
				.darg-item {
					height: 100px;
					width: 100px;
				}
				.nodrag {
					user-select: none;
					user-drag: none;
				}
			}
			.product-video {
				display: flex;
				position: relative;
				flex-wrap: wrap;

				.video-wrap {
					width: 100px;
					height: 100px;
					border: 1px dashed #c0ccda;
					border-radius: 6px;
					padding: 4px;
					&:hover {
						.operate-area {
							opacity: 0.5;
							transition: opacity 0.3s;
						}
					}
					.operate-area {
						height: 100px;
						width: 100px;
						line-height: 100px;
						position: absolute;
						opacity: 0;
						background: #000000;
						bottom: 0;
						left: 0;
						box-sizing: border-box;
						color: #fff;
						font-size: 14px;
						text-align: center;
						font-size: 24px;
						i {
							padding: 8px;
						}
					}
				}
				.upload-box {
					padding-top: 10px;
					margin-left: 10px;
				}
			}
			.tips {
				font-size: 14px;
			}
		}
	}
	.image-box {
		position: relative;
		height: 100px;
		width: 100px;
		margin: 10px;
		line-height: 170px;
		text-align: center;
		color: #fff;
		transition: transform 0.3s;
		.image-item {
			width: 100px;
			height: 100px;
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
	.upload-box {
		height: 100px;
		width: 100px;
		margin: 10px;
		:deep().el-upload--picture-card {
			height: 100px;
			width: 100px;
			line-height: 100px;
		}
	}
	.editorWrapper {
		margin-top: 40px;
		:deep(.w-e-text-container) {
			text-align: left;
		}
		.info {
			text-align: left;
			padding-left: 20px;
			margin-bottom: 20px;
			font-size: 12px;
		}
		.section {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
		}
		.el-row {
			margin-bottom: 20px;
		}
	}
	:deep().editor-container {
		div {
			position: relative;
			z-index: 1;
		}
	}
}
</style>
