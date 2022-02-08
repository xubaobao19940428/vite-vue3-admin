<!--  -->
<template>
  <div class="business_scope">
    <!--经营范围--->
    <el-card class="box-card">
      <template class="clearfix" style="font-size:20px;font-weight:900" #header>
        <span>结算方式</span>
      </template>
      <el-form
        class="form"
        :rules="scopeRules"
        label-position="top"
        label-width="80%"
        :model="supplierScope"
        ref="supplierScope"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item prop="brandIdList" label="收款信息">
              <el-input type="textarea" :row="2" style="width:90%"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="businessCategory" label="联系方式">
              <el-input type="textarea" :row="2" style="width:90%"></el-input>
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
      supplierScope: {
        brandIdList: [],
        businessCategory: [],
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
