<!--  -->
<template>
  <div class="points-cr">
       <el-table
            :header-cell-style="{ background: '#f2f2f2', color: '#606266' }"
            border
            :data="crPointsList"
        >
            <el-table-column label="用户ID" header-align="center" width="200px">
                <template slot-scope="scope">
                    <span>{{scope.row.user.userId}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="用户昵称"
                align="center"
                width="150px"
            >
             <template slot-scope="scope">
                    <span>{{scope.row.user.userNick}}</span>
            </template>
            </el-table-column>
            <el-table-column label="国家" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.user.countryCode | countryFilter}}</span>
                </template>
            </el-table-column>
            <el-table-column label="商品Id" align="center" width="200px" prop="productId"></el-table-column>
            <el-table-column
                label="SKU_ID"
                align="center"
                prop="skuId"
                width="200px"
            ></el-table-column>
            <el-table-column
                label="商品类型"
                align="center"
                prop="classification"
                width="100px"
            ></el-table-column>
            <el-table-column label="商品平摊金额" align="center" prop="amount" width="200px"></el-table-column>
             <el-table-column label="结算日期" align="center" prop="rewardDay" width="200px"></el-table-column>
            <!-- <el-table-column label="确认收货时间" align="center"></el-table-column> -->
            <el-table-column label="CR状态" align="center" prop="crStatus" width="100px"></el-table-column>
            <el-table-column label="实际结算CR金额" align="center" prop="crAmount" width="150px"></el-table-column>
            <el-table-column label="CR结算比例" align="center" prop="crRate" width="200px"></el-table-column>
            <el-table-column label="上级ID" align="center" width="200px">
                 <template slot-scope="scope">
                    <span v-if="scope.row.parent">{{scope.row.parent.userId}}</span>
                     <span v-else>-</span>
                </template>
            </el-table-column>
            <el-table-column label="上级昵称" align="center" width="100px">
                 <template slot-scope="scope">
                    <!-- {{scope.row.parent.userNick}} -->
                    <span v-if="scope.row.parent">{{scope.row.parent.userNick}}</span>
                    <span v-else>-</span>
                </template>
            </el-table-column>
        </el-table>
  </div>
</template>

<script>
export default {
  props:{
      crPointsList:{
          type:Array,
          default:()=>{
              return []
          }
      }
  },
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  mounted(){},

  methods: {}
}

</script>
<style lang='scss' scoped>
</style>