<template>
    <div>
        <el-table :header-cell-style="{ background: '#f2f2f2', color: '#606266' }"
                  border
                  :data="productInfo">
            <el-table-column label="商品信息"
                             header-align="center">
                <template #default="scope">
                    <div class="product-info">
                        <div class="flex">
                            <el-popover placement="top-start"
                                        trigger="hover">
                                <img :src="dealShowFileSrc(scope.row.cover)"
                                     class="previewImage" />
                                <template #reference>
                                    <img :src="dealShowFileSrc(scope.row.cover)"
                                         class="thumbnail" />
                                </template>
                            </el-popover>
                        </div>
                        <div class="product-detail">
                            <div class="product-name">{{ scope.row.title }}</div>
                        </div>
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="数量"
                             align="center">
                <template #default="scope">
                    <div>{{ scope.row.num }}</div>
                </template>
            </el-table-column>
            <el-table-column label="划线价"
                             align="center">
                <template #default="scope">
                    <div>{{ '¥' + scope.row.price }}</div>
                </template>
            </el-table-column>

            <el-table-column label="售价"
                             align="center">
                <template #default="scope">
                    <div>{{ '¥' + scope.row.realPrice }}</div>
                </template>
            </el-table-column>
            <el-table-column label="核销码"
                             align="center"
                             width="200">
                <template #default="scope">
                    <img :src="dealShowFileSrc(scope.row.eticketCodeUrl)"
                         style="width:180px;height:180px"
                         v-if="scope.row.eticketCodeUrl" />
                </template>
            </el-table-column>
            <!--分佣比--->
            <!-- <el-table-column label="自提点服务费率" align="center" width="120">
                <template slot-scope="scope">
                    <div>{{ scope.row.selfServiceFee }}</div>
                </template>
            </el-table-column>
             <el-table-column label="上级分佣率" align="center" width="120">
                 <template slot="header" slot-scope="scope">
                     <el-tooltip class="item" effect="dark" content="给予上级的分佣率 例如 0.1 则分10%分佣给上级" placement="top">
                        <span>上级分佣率 <i class="el-icon-question"></i></span>
                        
                    </el-tooltip>
                 </template>
                <template slot-scope="scope">
                    <div>{{ scope.row.parentServiceFee }}</div>
                </template>
            </el-table-column> -->
            <!-- <el-table-column label="子单编号" align="center">
                <template slot-scope="scope">
                    <div v-for="(subOrder, subOrderI) in scope.row.suborderItem" :key="subOrderI" class="sub-order-wrapper">
                        <div>{{ subOrder.suborderId}}</div>
                        <div>{{ subOrder.warehouseName}}</div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="子单状态" header-align="center">
                <template slot-scope="scope">
                    <div v-for="(subOrder, subOrderI) in scope.row.suborderItem"
                         :key="subOrderI" class="sub-order-wrapper">{{ subOrder.status | statusFilter }}</div>
                </template>
            </el-table-column> -->

            <el-table-column label="售后状态"
                             align="center">
                <template #default="scope">
                    <div>
                        <div v-if="!scope.row.hasAfter">无售后</div>
                        <router-link v-else
                                     target="_blank"
                                     :to="{ name: 'afterSale', query: { refundId: scope.row.afterId } }">
                            <div class="have-after-sale">有售后</div>
                        </router-link>
                    </div>
                </template>
            </el-table-column>
            <!-- <el-table-column fixed="right" label="操作" align="center">
                <template slot-scope="scope">
                    <div class="table-action-btn-box">
                        <el-button @click="triggerToLogistics()" plain type="primary" size="mini">查看物流</el-button>
                    </div>
                </template>
            </el-table-column> -->
        </el-table>
        <div class="product-footer">
            <!-- <div>商品总价：{{ orderInfo.currency + ' ' + productInfo.totalAmount }}</div>
            <div>实付金额：{{ orderInfo.paiedCurrency + ' ' + orderInfo.paied }}</div>
            <div>{{ orderInfo.orderStatus | statusFilter }}</div> -->
        </div>
    </div>
</template>
<script>
export default {
	props: {
		productInfo: Array,
	},
	methods: {
		triggerToLogistics() {},
	},
}
</script>
<style lang="scss" scoped>
.product-info {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  overflow: hidden;
  width: 100%;
  padding: 10px 0;
  font-size: 14px;
  .product-detail {
    flex: 1;
    overflow: hidden;
    margin-left: 10px;
    line-height: 30px;
    .product-id {
      display: flex;
      align-items: center;
      img {
        display: flex;
        width: 30px;
        margin-left: 10px;
      }
    }
    .product-name {
      overflow: hidden;
      width: 100%;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .service-wrapper {
      overflow: hidden;
      width: 100%;
      color: #d9001bd8;
      text-overflow: ellipsis;
      white-space: nowrap;
      span {
        margin-right: 10px;
      }
    }
    .promotion-coupon-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 30px;
      .promotion,
      .coupon {
        display: flex;
        align-items: center;
        flex: 1;
        overflow: hidden;
        max-width: 150px;
        height: 100%;
        em {
          box-sizing: border-box;
          height: 100%;
          padding: 0 5px;
          color: #fff;
          background: #fd9a38;
        }
         > div {
          display: inline-block;
          flex: 1;
          overflow: hidden;
          height: 100%;
          color: #fd9a38;
          text-overflow: ellipsis;
          vertical-align: center;
          white-space: nowrap;
          border: 1px solid #fd9a38;
        }
        span {
          margin-left: 4px;
        }
      }
      .coupon {
        margin-left: 10px;
         > div {
          color: #e30326;
          border: 1px solid #e30326;
        }
        em {
          background: #e30326;
        }
      }
    }
  }
}
.product-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  border: 1px solid #ebeef5;
  border-top: 0;
   > div {
    box-sizing: border-box;
    padding: 20px 40px;
    border-left: 1px solid #ebeef5;
  }
}
</style>
