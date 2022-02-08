<!--  -->
<template>
    <div class="business_scope">
        <!--经营范围--->
        <el-card class="box-card">
            <template class="clearfix" style="font-size:20px;font-weight:900" #header>
                <span>备注</span>
            </template>
            <el-form class="form" :rules="scopeRules" label-position="top" label-width="80%" :model="supplierScope" ref="supplierScope">
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item prop="brandIdList" label="备注">
                            <el-input placeholder="请输入备注信息" type="textarea" :rows="6" v-model="supplierScope.remark"></el-input>
                            <!-- <el-select
                v-model="supplierScope.brandIdList"
                multiple
                filterable
                placeholder="请选择"
                size="medium"
                style="width:90%;"
              >
                <el-option
                  v-for="item in brandList"
                  :key="item.brandId"
                  :label="item.nameCn"
                  :value="item.brandId"
                ></el-option>
              </el-select> -->
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <!-- <el-form-item prop="businessCategory" label="经营品类">
              <div>
                <el-tag
                  v-for="(tag, i) in supplierScope.businessCategory"
                  :key="tag.cateId"
                  @close="removeCategory(tag, i)"
                  closable
                  >{{ tag.cateName }}</el-tag
                >
              </div>
              <el-cascader
                style="width: 90%"
                filterable
                clearable
                remote
                @visible-change="clearSelectCategory"
                @change="addCategory"
                :props="{
                  label: 'cateName',
                  multiple: true,
                  checkStrictly: false,
                  children: 'levelValue',
                  value: 'prop',
                  lazy: true,
                  lazyLoad: getSubCategory,
                }"
                placeholder="请选择商品后台分组"
                :options="categoryOptions"
                v-model="selectedOptions"
                class="normalOperatorBox"
                size="medium"
              ></el-cascader>
            </el-form-item> -->
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
            supplierScope: {
                remark: '',
            },
            scopeRules: {},
        };
    },

    components: {},

    computed: {},

    mounted() {},

    methods: {},
};
</script>
<style lang="scss" scoped>
.business_scope {
    margin-top: 10px;
}
</style>
