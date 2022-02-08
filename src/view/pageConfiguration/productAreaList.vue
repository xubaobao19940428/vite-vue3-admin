<!--  -->
<template>
    <div class="product_area_list app-container">
        <div class="main-content-wrapper">
            <div class="product-header el-card__header">
                <span>配置列表</span>
                <el-button type="primary"
                           icon="el-icon-plus"
                           @click="addAreaSet"
                           size="small">新增配置</el-button>
            </div>
            <div class="table-detail">
                <el-table :data="tableData"
                          border
                          stripe
                          style="width: 100%"
                          height="100%">
                    <el-table-column prop="id"
                                     label="ID"
                                     align="center"></el-table-column>
                    <el-table-column label="标题"
                                     align="center"
                                     prop="title">

                    </el-table-column>
                    <el-table-column label="操作"
                                     align="center">
                        <template #default="scope">
                            <span class="table-opreator"
                                  @click="editProductArea(scope.row)">编辑</span>
                            <!--<span class="table-opreator-delete"
                                  @click="editProduct(scope.row)">删除</span>-->
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="pagination-box">
            <el-pagination @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :page-sizes="[10, 20, 50]"
                           :page-size="queryData.pageSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="total"></el-pagination>
        </div>
    </div>
</template>

<script>
import { fencingPage } from '@/api/newJson/shop.js'
export default {
	data() {
		return {
			tableData: [],
			queryData: {
				pageSize: 20,
				pageNum: 1,
			},
			total: 0,
		}
	},

	components: {},

	computed: {},

	mounted() {
		this.getFencingPage()
	},

	methods: {
		addAreaSet() {
			this.$router.push({
				name: 'productAreaEdit',
				query: {
					type: 'add',
				},
			})
		},
		getFencingPage() {
			fencingPage(this.queryData)
				.then((response) => {
					if (response) {
						this.total = response.data.total
						this.tableData = response.data.data
					}
				})
				.catch((error) => {})
		},
		handleSizeChange(val) {
			this.queryData.pageNum = 1
			this.queryData.pageSize = val
			this.getFencingPage()
		},
		handleCurrentChange(val) {
			this.queryData.pageNum = val
			this.getFencingPage()
		},
		editProductArea(data) {
			this.$router.push({
				name: 'productAreaEdit',
				query: {
					type: 'edit',
					id: data.id,
				},
			})
		},
	},
}
</script>
<style lang='scss' scoped>
.product_area_list {
  width: 100%;
  height: 100%;
  .product-list-header {
    padding: 0 10px;
    background-color: #fff;
    .demo-form-inline {
      margin-top: 20px;
    }
  }
  .main-content-wrapper {
    display: flex;
    flex-direction: column;
    overflow: scroll;
    margin-top: 10px;
    background-color: #fff;
    .product-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid #ddd;
      // margin-bottom: 10px;
    }
    .table-detail {
      height: 100%;
      .el-table {
        flex: 1;
      }
    }
  }

  .block-right {
    height: 70px;
  }
  .table-opreator {
    margin-left: 10px;
    color: #409eff;
    cursor: pointer;
    &-delete {
      margin-left: 10px;
      color: #f56c6c;
      cursor: pointer;
    }
  }
}
</style>