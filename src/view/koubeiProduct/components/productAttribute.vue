<!--  -->
<template>
  <div class="product_price">
    <el-card>
      <p class="product_basic_title">商品价格</p>
      <div class="base_info_content">
        <el-form
          ref="priceForm"
          :model="priceForm"
          :rules="priceFormRule"
          label-width="120px"
          class="demo-baseInfoForm"
        >
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="划线价：" prop="listPrice">
                <el-input-number
                  v-model="priceForm.listPrice"
                  style="width: 200px;"
                  :min="0"
                  :precision="2"
                ></el-input-number>
                <span
                  style="margin-left: 10px;"
                  v-if="priceForm.listPrice == 0.0"
                >
                  <i class="iconfont" style="color: red;">&#xe8ed;</i>
                </span>
                <span class="label_other">
                  口碑划线价 {{ priceForm.thirdListPrice }}
                </span>
              </el-form-item>
              <el-form-item label="正式价：" prop="salePrice">
                <el-input-number
                  v-model="priceForm.salePrice"
                  style="width: 200px;"
                  :min="0"
                  :precision="2"
                ></el-input-number>
                <span
                  style="margin-left: 10px;"
                  v-if="priceForm.salePrice == 0.0"
                >
                  <i class="iconfont" style="color: red;">&#xe8ed;</i>
                </span>
                <span class="label_other">
                  口碑正式价 {{ priceForm.thirdSalePrice }}
                </span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="佣金率：" prop="commission">
                <el-input-number
                  v-model="priceForm.commission"
                  style="width: 200px;"
                  :min="0"
                  :step="0.01"
                  :precision="2"
                ></el-input-number>
                <span style="margin-left: 10px;" v-if="!priceForm.commission">
                  <i class="iconfont" style="color: red;">&#xe8ed;</i>
                </span>
                <span class="label_other">
                  口碑佣金 {{ priceForm.activityPrice }}
                </span>
                <span class="label_other">
                  口碑佣金率 {{ priceForm.thirdCommissionRate }}
                </span>
              </el-form-item>

              <el-form-item label="库存：" prop="stock">
                <el-input-number
                  v-model="priceForm.stock"
                  style="width: 200px;"
                  :min="0"
                  :step="1"
                  step-strictly
                ></el-input-number>
                <span class="label_other">
                  口碑库存 {{ priceForm.thirdStock }}
                </span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="商家结算价：" prop="purchasePrice">
                <el-input-number
                  v-model="priceForm.purchasePrice"
                  style="width: 200px;"
                  :min="0"
                  :step="0.01"
                  :precision="2"
                ></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  data() {
    return {
      checkList: [],
      priceForm: {
        listPrice: 0,
        salePrice: 0,
        commission: 0,
        stock: 0,
        thirdSalePrice: 0,
        thirdCommissionRate: 0,
        originalPrice: 0,
        thirdStock: 0,
        purchasePrice: 0,
      },
      priceFormRule: {
        listPrice: {
          required: true,
          message: '请输入划线价',
          trigger: 'blur',
        },
        salePrice: {
          required: true,
          message: '请输入正式价',
          trigger: 'blur',
        },
        commission: {
          required: true,
          message: '请输入佣金率',
          trigger: 'blur',
        },
        stock: {
          required: true,
          message: '请输入库存',
          trigger: 'blur',
        },
        purchasePrice: {
          required: true,
          message: '请输入库存',
          trigger: 'blur',
        },
      },
    }
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    validatePriceForm() {
      let _this = this
      return new Promise((resolve, reject) => {
        this.$refs['priceForm'].validate((valid) => {
          if (valid) {
            console.log(2222)
            resolve(this.priceForm)
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
.product_price {
  margin-top: 10px;
  .el-card {
    :deep().el-card__body {
      padding: 0;
    }
    .product_basic_title {
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
    }
  }
  .label_other {
    color: red;
    margin-left: 10px;
  }
}
</style>
