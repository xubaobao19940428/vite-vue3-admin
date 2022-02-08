<!--  -->
<template>
    <div class="business_qualification">
        <el-card class="box-card">
            <template class="clearfix" style="font-size:20px;font-weight:900" #header>
                <span>资质&合同</span>
            </template>
            <el-form class="form" :rules="qualificationRule" label-position="top" label-width="80%" :model="qualification" ref="qualification">
                <!-- <div>
                    <el-form-item label="经营资质" prop="imageUrl" class="el_uploadimg">
                        <c-upload
                            :limit="1"
                            style="margin-left:10px;"
                            ref="businessImage"
                            type="text"
                            :fileList="qualification.imageUrl"
                            @setData="setCoverImg3"
                        >
                            <span>企业营业执照</span>
                        </c-upload>
                        <c-upload
                            :limit="6"
                            style="margin-left:10px;"
                            ref="businessImg"
                            type="other"
                            :fileList="qualification.businessQualification"
                            @setData="setCoverImg"
                        ></c-upload>
                    </el-form-item>
                </div>-->
                <el-row>
                    <el-col :span="12">
                        <div>
                            <el-form-item label="合同开始时间" prop="startTimeStamp">
                                <el-date-picker
                                    v-model="qualification.startTimeStamp"
                                    type="date"
                                    @change="selectStartTime('noValitor')"
                                    style="width:90%"
                                    placeholder="选择合同开始日期"
                                    format="YYYY/MM/DD"
                                    value-format="x"
                                ></el-date-picker>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div>
                            <el-form-item label="合同截止时间" prop="endTimeStamp">
                                <el-date-picker
                                    style="width:90%"
                                    v-model="qualification.endTimeStamp"
                                    @change="selectEndTime('noValitor')"
                                    type="date"
                                    placeholder="选择合同截止日期"
                                    format="YYYY/MM/DD"
                                    value-format="x"
                                ></el-date-picker>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="合作合同" required>
                            <c-upload :limit="6" ref="cooperationImg" :fileList="qualification.contract" @setData="setCoverImg2"></c-upload>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="商家logo" prop="logo" class="el_uploadimg" required>
                            <c-upload
                                :limit="1"
                                style="margin-left:10px;"
                                ref="logo"
                                type="text"
                                :fileList="qualification.logo"
                                @setData="setCoverLogoImg"
                            >
                                <span>商家logo</span>
                            </c-upload>
                        </el-form-item>
                    </el-col>
                    <!--企微-->
                    <el-col :span="8">
                        <el-form-item label="老板企微" prop="enterpriseWeChat" class="el_uploadimg">
                            <c-upload
                                :limit="1"
                                style="margin-left:10px;"
                                ref="enterpriseWeChat"
                                type="text"
                                :fileList="qualification.enterpriseWeChat"
                                @setData="setCoverEnterpriseWeChatImg"
                            >
                                <span>商家企微</span>
                            </c-upload>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import cUpload from '@/components/fileUpload';
export default defineComponent({
    data() {
        const imgurlValitor = (rule, value, callback) => {
            // 图片验证
            if (!this.hasFmt) {
                callback(new Error('企业营业执照不能为空'));
            } else {
                callback();
            }
        };
        const startTimeValitor = (rule, value, callback) => {
            if (value != '' && value != null) {
                if (this.qualification.endTimeStamp != '' && this.qualification.endTimeStamp != null) {
                    if (value >= this.qualification.endTimeStamp) {
                        callback(new Error('合同开始时间不得大于等于合同截止时间'));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            } else {
                callback('合同开始时间不能为空');
            }
        };
        const endTimeValitor = (rule, value, callback) => {
            if (value != '' && value != null) {
                if (this.qualification.startTimeStamp != '' && this.qualification.startTimeStamp != null) {
                    if (value <= this.qualification.startTimeStamp) {
                        callback(new Error('合同截止时间不得小于等于合同开始时间'));
                    } else {
                        callback();
                    }
                }
            } else {
                callback('合同截止时间不能为空');
            }
        };
        return {
            hasFmt: false,
            qualification: {
                contract: '',
                endTimeStamp: '',
                startTimeStamp: '',
                logo: '',
                enterpriseWeChat: '',
            },
            qualificationRule: {
                startTimeStamp: [
                    {
                        type: 'date',
                        required: true,
                        validator: startTimeValitor,
                        trigger: 'change',
                    },
                ],
                endTimeStamp: [
                    {
                        type: 'date',
                        required: true,
                        validator: endTimeValitor,
                        trigger: 'change',
                    },
                ],
            },
        };
    },

    components: {
        cUpload,
    },

    computed: {},

    mounted() {},

    methods: {
        //去校验开始时间以及截止时间
        selectStartTime(formName) {
            if (formName == 'noValitor') {
                if (this.qualification.endTimeStamp != '' && this.qualification.endTimeStamp != null) {
                    if (this.qualification.startTimeStamp >= this.qualification.endTimeStamp) {
                        this.$message.warning('合同结束时间不能小于等于合同截止时间');
                        this.qualification.startTimeStamp = '';
                    }
                }
            }
        },
        selectEndTime(formName) {
            console.log(this.qualification.startTimeStamp);
            if (formName != 'noValitor') {
                this.$refs[formName].validateField('startTimeStamp', errMsg => {
                    if (errMsg) {
                        return false;
                    } else {
                    }
                });
            } else {
                if (this.qualification.startTimeStamp != '' && this.qualification.startTimeStamp != null) {
                    if (this.qualification.startTimeStamp >= this.qualification.endTimeStamp) {
                        this.$message.warning('合同结束时间不能小于等于合同截止时间');
                        this.qualification.endTimeStamp = '';
                    }
                }
            }
        },
        setCoverImg2(data) {
            this.qualification.contract = data.data;
        },
        setCoverLogoImg(data) {
            this.qualification.logo = data.data;
        },
        setCoverEnterpriseWeChatImg(data) {
            this.qualification.enterpriseWeChat = data.data;
        },
        validateQualification() {
            let _this = this;
            return new Promise((resolve, reject) => {
                this.$refs['qualification'].validate(valid => {
                    if (valid) {
                        if (!this.qualification.logo) {
                            this.$message.warning('请上传商家logo');
                            reject(false);
                        }
                        if (!this.qualification.contract) {
                            this.$message.warning('请上传合同');
                            reject(false);
                        } else {
                            resolve(this.qualification);
                        }
                    } else {
                        reject(false);
                    }
                });
            });
        },
    },
});
</script>
<style lang="scss" scoped>
.business_qualification {
    margin-top: 10px;
}
:deep() .el_uploadimg {
    .el-form-item__content {
        display: flex;
        .el-upload {
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            border: 1px dashed #d9d9d9;
            width: 148px;
            height: 148px;
        }
    }
}
</style>
