<template>
    <el-dialog title="会员权益页" v-model="dialogVisible" width="800px" @close="handleClose">
        <div style="height: 100%; width: 100%">
            <el-form :rules="adDialogRules" ref="addDialog" :model="param" label-position="right" label-width="160px" class="demo-ruleForm">
                <el-form-item label="站点：" prop="divisionId">
                    <el-select v-model="param.divisionId">
                        <el-option v-for="(item, index) in divisionList" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item hide-required-asterisk="false" label="标题：" prop="title">
                    <el-input v-model="param.title" size="medium" placeholder="标题" maxlength="80"></el-input>
                </el-form-item>
                <el-form-item hide-required-asterisk="false" label="样式：" prop="displayStyle">
                    <el-radio-group v-model="param.displayStyle">
                        <el-radio :label="0">横版</el-radio>
                        <el-radio :label="1">竖版3列</el-radio>
                        <el-radio :label="2">竖版2列</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item hide-required-asterisk="false" label="展示商品ID:：" prop="productIds">
                    <el-input v-model="param.productIds" size="medium" placeholder="请输入商品Id用英文逗号分隔"></el-input>
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
            <el-button size="small" :loading="loading" type="primary" @click="conformAddItem()">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { ref, reactive, toRefs } from 'vue';
import { modifyComponent } from '@/api/newJson/pageEdit';
import { divisionList } from '@/data/globalData.js';
export default {
    props: {
        dialogVisible: Boolean,
        propParam: Object,
        moduleId: Number,
    },
    components: {},
    data() {
        return {
            param: {
                id: null,
                moduleId: this.moduleId,
                title: '',
                displayStyle: 0,
                productIds: '',
                divisionId: 'CN^^^浙江省^^^杭州市',
                status: 1,
                sort: 1,
            },
            divisionList: divisionList,
            loading: false,
            adDialogRules: {
                title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
                status: [{ required: true, message: '请选择状态', trigger: 'change' }],
                productIds: [{ required: true, message: '展示商品Id不能为空', trigger: 'blur' }],
                displayStyle: [{ required: true, message: '请选择状态', trigger: 'change' }],
                divisionId: [{ required: true, message: '请选择站点', trigger: 'change' }],
            },
        };
    },
    watch: {
        propParam: {
            handler(val) {
                this.$nextTick(() => {
                    Object.assign(this.param, val);
                });
            },
            deep: true,
        },
        dialogVisible(val) {
            if (val) {
                this.$nextTick(() => {
                    Object.assign(this.param, this.propParam);
                });
            } else {
                this.reset();
            }
        },
    },
    methods: {
        reset() {
            this.$refs['addDialog'].resetFields();
            this.param.id = null;
        },
        handleClose() {
            this.reset();
            this.$emit('close');
        },

        conformAddItem() {
            this.$refs['addDialog'].validate(valid => {
                if (valid) {
                    this.loading = true;
                    modifyComponent(this.filterData(this.param))
                        .then(response => {
                            if (response) {
                                this.loading = false;
                                this.reset();
                                this.$message.success('成功');
                                this.$emit('confirm');
                            }
                        })
                        .catch(error => {
                            this.loading = false;
                        });
                }
            });
        },
    },
};
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
