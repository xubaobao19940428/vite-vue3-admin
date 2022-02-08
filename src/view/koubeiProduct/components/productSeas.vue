<!--  -->
<template>
    <div class="product_seas">
        <div class="product_seas_header">
            <el-form :inline="true" :model="queryData" class="demo-form-inline" size="medium" label-width="100px">
                <el-form-item>
                    <el-select v-model="queryData.shelveStatus" placeholder="请选择排序" clearable>
                        <el-option label="已上架" :value="1"></el-option>
                        <el-option label="已下架" :value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-cascader
                        class="mar-b-20"
                        v-model="queryData.categoryId"
                        :show-all-levels="false"
                        :props="{
                            value: 'subType',
                            label: 'subTypeName',
                            children: 'subTypes',
                            emitPath: false,
                            checkStrictly: true,
                        }"
                        :options="categoryData"
                        placeholder="请选择商品类目"
                        @change="getKoubeiProductList(1)"
                    ></el-cascader>
                </el-form-item>
                <el-form-item>
                    <el-cascader
                        class="mar-b-20"
                        v-model="queryData.city"
                        :show-all-levels="false"
                        :props="{
                            value: 'cityId',
                            label: 'city',
                            children: 'cityTypes',
                            emitPath: false,
                            checkStrictly: true,
                        }"
                        :options="cityList"
                        placeholder="请选择城市"
                        @change="getKoubeiProductList(1)"
                    ></el-cascader>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="allCheck">全选</el-button>
                    <el-button type="primary" @click="allNotCheck">全不选</el-button>
                </el-form-item>
            </el-form>
            <div>
                <el-button type="success" size="medium" @click="moveToFeatured">移到精选</el-button>
            </div>
        </div>
        <div class="product_content" v-loading="loading">
            <el-checkbox-group v-model="productCheckList">
                <el-checkbox v-for="item in productList" :key="item" :label="item.itemId" :disabled="item.productId">
                    <div class="product_item">
                        <img :src="item.mainPicture" alt="" class="product_cover" />
                        <div class="product_item_content">
                            <div class="product_title">
                                {{ item.title }}
                            </div>
                            <div class="product_price">
                                <span class="product_sale_price">¥{{ item.activityPrice }}</span>
                                <span class="product_line_price">¥{{ item.originalPrice }}</span>
                            </div>
                            <!---分佣部分-->
                        </div>
                        <div class="koubei_sale_time">
                            <div>商品开始销售时间：<span>{{timestampToTime(Number(item.startTime))}}</span></div>
                            <div>商品停止销售时间：<span>{{timestampToTime(Number(item.endTime))}}</span></div>
                        </div>
                        <div class="product_commsion">
                            <div class="product_commsion_left">
                                <p>核销佣金(元)</p>
                                <span>{{ item.commission }}</span>
                            </div>
                            <div class="product_commsion_right">
                                <p>佣金比例</p>
                                <span>{{ (Number(item.commissionRate) * 100).toFixed(2) }}%</span>
                            </div>
                        </div>
                    </div>
                </el-checkbox>
            </el-checkbox-group>
        </div>
        <div class="pagination-box">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryData.pageNum"
                :page-sizes="[10, 20, 50]"
                :page-size="queryData.pageSize"
                layout="total, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
import categoryData from '@/data/category.json';
import cityList from '@/data/districts.json';
import { thirdProductList, collectThirdProduct } from '@/api/newJson/product.js';
export default {
    data() {
        return {
            cityList: cityList,
            categoryData: categoryData,
            queryData: {
                categoryId: '',
                city: '330100',
                pageSize: 20,
                platform: 1,
                pageNum: 1,
            },
            total: 0,
            productList: [],
            productCheckList: [],
            loading: true,
        };
    },

    components: {},

    computed: {},

    mounted() {
        this.getKoubeiProductList(1);
    },

    methods: {
        allCheck() {
            this.productCheckList = this.productList.map(item => {
                return item.itemId;
            });
        },
        allNotCheck() {
            this.productCheckList = [];
        },
        getKoubeiProductList(type) {
            this.productCheckList = []
            this.loading = true;
            if (type == 1) {
                this.queryData.pageNum = 1;
            }
            thirdProductList(this.filterData(this.queryData))
                .then(response => {
                    if (response) {
                        this.loading = false;
                        this.productList = response.data;
                       response.data.map(item => {
                            if (item.collected) {
                                this.productCheckList.push(item.itemId) 
                            }
                        });
                        console.log(this.productCheckList)
                        this.total = response.total;
                    }
                })
                .catch(error => {
                    this.loading = false;
                });
        },
        //批量移到精选
        moveToFeatured() {
            console.log(this.productCheckList)
            let params = {
                city: this.queryData.city,
                itemIds: this.productCheckList,
                platform: 1,
            };
            if (this.productCheckList.length == 0) {
                this.$message.warning('请先挑选商品');
                return;
            }
            collectThirdProduct(params)
                .then(response => {
                    if (response) {
                        this.$message.success('成功移到精选');
                        this.getKoubeiProductList(1);
                    }
                })
                .catch(error => {});
        },
        handleCurrentChange(val){
            this.queryData.pageNum = val
            this.getKoubeiProductList()
        }
    },
};
</script>
<style lang="scss" scoped>
.product_seas {
    .product_seas_header {
        display: flex;
        justify-content: space-between;
    }
    .product_content {
        .el-checkbox {
            margin-top: 10px;
            border: 1px solid #cccccc;
            margin-right: 5px;
            :deep() .el-checkbox__label {
                padding-left: 0;
            }
        }
        .product_item {
            width: 280px;
            .product_cover {
                width: 100%;
                height: 200px;
            }
            .product_item_content {
                padding: 10px 20px;
                box-sizing: border-box;
                margin-top: 10px;
                .product_title {
                    width: 100%;
                    font-size: 15px;
                    font-weight: 500;
                    color: #333333;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
                .product_price {
                    margin-top: 10px;
                    .product_sale_price {
                        color: red;
                        margin-right: 10px;
                        font-size: 16px;
                    }
                    .product_line_price {
                        font-size: 14px;
                        color: #cccccc;
                        text-decoration: line-through;
                    }
                }
            }
            .koubei_sale_time{
                padding:0 20px;
                color:#666666;
                div{
                    margin-bottom:10px;
                }
            }
            .product_commsion {
                width: 100%;
                height: 50px;
                background-color: #dddddd;
                display: flex;
                justify-content: space-between;
                padding: 0 20px;
                box-sizing: border-box;
                align-items: center;
                color: #606266;
                .product_commsion_left,
                .product_commsion_right {
                    flex: 1;
                }
                .product_commsion_left {
                    margin-right: 10px;
                }
                .product_commsion_right {
                    border-left: 1px solid #cccccc;
                    text-align: right;
                }
            }
        }
        .product_item:hover {
        }
        :deep() .el-checkbox__input {
            position: absolute;
            right: 0;
            .el-checkbox__inner {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                &::after {
                    height: 15px;
                    left: 10px;
                    top: 2px;
                    width: 8px;
                }
            }
        }
    }
    :deep().el-checkbox-group{
        display: flex;
        flex-wrap: wrap;
    }
}
</style>
