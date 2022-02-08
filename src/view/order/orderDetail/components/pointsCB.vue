<!--  -->
<template>
    <div class="points-cb">
        <el-table
            :header-cell-style="{ background: '#f2f2f2', color: '#606266' }"
            border
            :data="cbPointsList"
        >
            <el-table-column label="用户ID" header-align="center" width="200px">
                <template slot-scope="scope">
                    {{scope.row.user.userId}}
                </template>
            </el-table-column>
            <el-table-column
                label="用户昵称"
                align="center"
                
            >
             <template slot-scope="scope" >
                    {{scope.row.user.userNick}}
                </template>
            </el-table-column>
            <el-table-column label="国家" align="center"  width="100px">
                <template slot-scope="scope">
                     {{scope.row.user.countryCode | countryFilter}}
                </template>
            </el-table-column>
            <el-table-column
                label="订单金额"
                prop="amount"
                align="center"
                width="120px"
            ></el-table-column>
            <el-table-column
                label="确认收货时间"
                prop="comfirmTime"
                align="center"
                width="200"
            >
            <template slot-scope="scope">
                    <span v-if="scope.row.comfirmTime">{{scope.row.comfirmTime}}</span>
                    <span v-else>-</span>
                </template>
            </el-table-column>
            <el-table-column label="截止售后时间" align="center" width="200px" prop="afterSalesTime">
                <template slot-scope="scope">
                    <span v-if="scope.row.afterSalesTime">{{scope.row.afterSalesTime}}</span>
                    <span v-else>-</span>
                </template>
            </el-table-column>
            <el-table-column label="CB金额" align="center" prop="cbAmount"></el-table-column>
            <el-table-column label="CB类型" align="center" prop="cbType" width="200px"></el-table-column>
            <el-table-column label="CB状态" align="center" prop="cbStatus"></el-table-column>
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
        cbPointsList:{
            type:Array,
            default:()=>{
                return []
            }
        }
    },
    data() {
        return {}
    },

    components: {},

    computed: {},

    mounted() {},

    methods: {},
}
</script>
<style lang="scss" scoped></style>
