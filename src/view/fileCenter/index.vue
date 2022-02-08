<template>
  <div class="app-container">
    <div class="tip">
      提示：文件中心的文件默认保存30天，上限100条，超出后旧记录会自动删除
    </div>
    <div class="filter-container">
      <el-form
        ref="afterSaleOrderFilter"
        inline
        :model="queryData"
        label-position="left"
      >
        <el-form-item prop="timeList" class="filter-item">
          <el-date-picker
            v-model="timeList"
            type="daterange"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            :default-time="defaultTime2"
            range-separator="-"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item class="filter-item" style="margin-left: 20px;">
          <el-button
            icon="el-icon-search"
            type="primary"
            @click="queryTableData(1)"
            size="medium"
          >
            搜索
          </el-button>
          <!--<el-button icon="el-icon-refresh-left" @click="resetSearch" size="medium">重置</el-button>!-->
        </el-form-item>
      </el-form>
    </div>
    <div class="main-content-wrapper">
      <el-table
        :data="tableData"
        style="width: 100%;"
        fit
        highlight-current-row
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          align="center"
          type="selection"
          width="55"
        ></el-table-column>
        <el-table-column
          align="center"
          label="id"
          prop="id"
          width="55"
        ></el-table-column>
        <!-- <el-table-column align="center" label="导出任务编号" prop="exportNo" width="180"></el-table-column>
                <el-table-column align="center" label="导出任务类型" prop="application" width="180"></el-table-column> -->
        <el-table-column
          align="center"
          label="导出状态"
          prop="exportStatus"
          width="150"
        >
          <template #default="scope">
            <span v-if="scope.row.exportStatus == 0" style="color: #409eff;">
              导出处理中
            </span>

            <span
              v-else-if="scope.row.exportStatus == 1"
              style="color: #67c23a;"
            >
              导出成功
            </span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="创建人"
          prop="userId"
        ></el-table-column>
        <el-table-column
          align="center"
          label="创建人名称"
          prop="userName"
          width="180"
        ></el-table-column>
        <el-table-column
          align="center"
          label="备注"
          prop="remark"
        ></el-table-column>
        <!-- <el-table-column align="center" label="备注" prop="remark"></el-table-column> -->
        <el-table-column
          align="center"
          label="创建时间"
          prop="createTime"
          width="200"
        >
          <template #default="scope">
            <span>{{ timestampToTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="最后更新时间"
          prop="updateTime"
          width="200"
        >
          <template #default="scope">
            <span>{{ timestampToTime(scope.row.updateTime) }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" label="导出时间">
                    <template #default="scope">{{scope.row.createTime | formatTime}}</template>
                </el-table-column>
                <el-table-column align="center" label="相关模块" prop="type"></el-table-column>
                <el-table-column align="center" label="导出人" prop="operationName"></el-table-column> -->
        <el-table-column align="center" label="操作" width="220">
          <template #default="scope">
            <!-- <el-button
                            style="color: #F56C6C;"
                            v-if="scope.row.exportStatus == 1 && scope.row.isDelete == 0"
                            type="text"
                            size="mini"
                            @click="deleteRecord(scope.row)"
                        >
                            删除文件
                        </el-button> -->
            <el-button
              v-if="scope.row.exportStatus == 1"
              type="text"
              size="mini"
            >
              <a :href="dealShowFileSrc(scope.row.exportFileUrl)">下载文件</a>
            </el-button>
            <span class="status-text" v-if="scope.row.exportStatus == 0">
              正在生成文件，完成后可下载
            </span>
            <!-- <span class="status-text" v-if="scope.row.exportStatus == 4">{{ scope.row.failReason }}</span> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-box">
      <el-pagination
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page="page"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
        class="pagination"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
// import { ListExportRecordByPage, DeleteExportTask } from "@/request/fileCenter";
// import {exportFileList} from '@/api/newFileCenterJson'
import { exportTaskList } from '@/api/newJson/fileCenter'
import { ref, reactive } from 'vue'
export default {
  setup() {
    const count = ref(0)
    const defaultTime2 = ref([
      new Date(2000, 1, 1, 0, 0, 0),
      new Date(2000, 2, 1, 23, 59, 59),
    ]) //
    const object = reactive({
      foo: 'bar',
    })
    const timeList = ref([])
    // 暴露到template中
    return {
      count,
      object,
      timeList,
      defaultTime2,
    }
  },
  name: 'exportList',
  data() {
    return {
      queryData: {
        startTime: '',
        endTime: '',
      },
      //表格数据
      tableData: [],
      //分页相关
      total: 0,
      pageNum: 1,
      pageSize: 10,
      selectionList: [], //选中列表
    }
  },
  mounted() {
    this.queryTableData(1)
  },
  methods: {
    //查询列表数据
    queryTableData(type) {
      if (type == 1) {
        this.pageNum = 1
      }
      if (this.timeList && this.timeList.length) {
        this.queryData.startTime = this.timeList[0]
        this.queryData.endTime = this.timeList[1]
      } else {
        this.queryData.startTime = ''
        this.queryData.endTime = ''
      }
      exportTaskList(
        this.filterData({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          startTime: this.queryData.startTime,
          endTime: this.queryData.endTime,
        }),
      )
        .then((response) => {
          this.total = response.total
          this.tableData = response.data
        })
        .catch((err) => {
          console.error(err)
        })
    },
    /**
     * 删除单条记录
     */
    deleteRecord(record) {
      this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.deleteExportTask([record.exportId])
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    /**
     * 批量删除记录
     */
    deleteRecords() {
      //判断是否选择记录
      if (this.selectionList.length <= 0) {
        this.$message({
          type: 'info',
          message: '请选择删除项',
        })
        return
      }

      const ids = [] //删除的id集合
      for (let i = 0; i < this.selectionList.length; i++) {
        const item = this.selectionList[i]
        ids.push(item.exportId)
      }

      this.$confirm('此操作将删除选中的文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.deleteExportTask(ids)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    /**
     * 调用删除接口
     * @param {Array} ids 删除对象的id集合
     */
    deleteExportTask(ids) {
      DeleteExportTask({ exportId: ids })
        .then((response) => {
          //成功
          if (response.ret.errcode == 1) {
            // let arr = [];

            // for (let i = 0; i < this.tableData.length; i++) {
            //     const item = this.tableData[i];
            //     if (ids.indexOf(item.id) < 0) {
            //         arr.push(item);
            //         continue;
            //     }
            // }

            // this.tableData = arr;
            // this.total = arr.length;
            this.queryTableData()

            this.$message({
              type: 'success',
              message: '删除成功!',
            })
          }
        })
        .catch((err) => {
          console.error(err)
        })
    },
    //选中事件回调函数
    handleSelectionChange(selection) {
      this.selectionList = selection
    },
    //表格页码变化回调
    handleCurrentChange(page) {
      this.pageNum = page
      this.queryTableData()
    },
    //表格显示条数变化回调
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.queryTableData()
    },
  },
}
</script>
<style scoped lang="scss">
.app-container {
  background: #fff !important;
}
.tip {
  line-height: 36px;
  color: red;
  font-size: 14px;
}
.status-text {
  color: #909399;
}
</style>
