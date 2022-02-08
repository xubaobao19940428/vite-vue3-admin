<!--  -->
<template>
    <div class="supplier_base">
        <el-card class="box-card">
            <template class="clearfix" style="font-size:20px;font-weight:900" #header>
                <span>基本信息</span>
            </template>
            <el-form class="form" :rules="supplierRules" label-position="top" label-width="80%" :model="supplierDetail" ref="supplierDetail">
                <el-row :gutter="12">
                    <el-col :span="12">
                        <el-form-item prop="name">
                            <template #label>
                                <span>商家名称：</span>
                            </template>
                            <el-input
                                v-model="supplierDetail.name"
                                placeholder="请输入商家名称/最多40个字"
                                style="width:90%"
                                :maxlength="40"
                                size="medium"
                                :readonly="readonly"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="商家简称：" prop="shortName">
                            <el-input
                                v-model="supplierDetail.shortName"
                                placeholder="请输入商家简称/最多40个字"
                                style="width:90%"
                                :maxlength="40"
                                size="medium"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="商家联系人：" prop="contactName">
                            <el-input
                                v-model="supplierDetail.contactName"
                                placeholder="请输入商家联系人"
                                style="width:90%"
                                :maxlength="40"
                                size="medium"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="合作状态：" prop="cooperationStatus">
                            <el-select v-model="supplierDetail.cooperationStatus" placeholder="请选择合作状态" style="width:90%">
                                <el-option :value="0" label="正常合作"></el-option>
                                <el-option :value="1" label="终止合作"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="联系电话：" prop="contactPhone">
                            <el-input
                                v-model="supplierDetail.contactPhone"
                                placeholder="请输入商家联系电话"
                                style="width:90%"
                                :maxlength="40"
                                size="medium"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="邮箱地址：" prop="contactEmail">
                            <el-input
                                v-model="supplierDetail.contactEmail"
                                placeholder="请输入邮箱地址"
                                style="width:90%"
                                :maxlength="40"
                                size="medium"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            supplierDetail: {
                contactPhone: '',
                contactName: '',
                contactEmail: '',
                name: '',
                shortName: '',
                cooperationStatus: 0,
            },
            supplierRules: {
                contactPhone: [
                    {
                        required: true,
                        message: '请输入商家联系电话',
                        trigger: 'blur',
                    },
                ],
                contactName: [
                    {
                        required: true,
                        message: '请输入商家人姓名',
                        trigger: 'blur',
                    },
                ],
                contactEmail: [
                    {
                        required: true,
                        message: '请输入商家联系邮箱',
                        trigger: 'blur',
                    },
                ],
                name: [
                    {
                        required: true,
                        message: '请输入商家名称',
                        trigger: 'blur',
                    },
                ],
                shortName: [
                    {
                        required: true,
                        message: '请输入商家简称',
                        trigger: 'blur',
                    },
                ],
                cooperationStatus: [
                    {
                        required: true,
                        message: '请选择合作状态',
                        trigger: 'change',
                    },
                ],
            },
        };
    },

    components: {},

    computed: {},

    mounted() {},

    methods: {
        resetForm() {
            this.$refs['supplierDetail'].resetFields();
        },
        validateBaseInfo() {
            let _this = this;
            return new Promise((resolve, reject) => {
                this.$refs['supplierDetail'].validate(valid => {
                    if (valid) {
                        resolve(this.supplierDetail);
                    } else {
                        reject(false);
                    }
                });
            });
        },
    },
};
</script>
<style lang="scss" scoped>
.supplier_base {
    margin-top: 10px;
}
</style>
