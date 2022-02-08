<template>
    <div class="app-container">
        <el-tabs v-model="currentView" type="card" @tab-click="tabChange">
            <el-tab-pane label="banner列表" name="bannerList"></el-tab-pane>
            <el-tab-pane label="首页商品列表" name="qyOptimization"></el-tab-pane>
        </el-tabs>
        <keep-alive>
            <component v-bind:is="currentView" :countryList="countryList" :langList="langList"></component>
        </keep-alive>
    </div>
</template>
<script>
import productListAd from './components/productListAd';
import qyOptimization from './components/qyOptimization';
import bannerList from './components/bannerList';
export default {
    data() {
        return {
            currentView: 'bannerList',
        };
    },
    components: {
        productListAd,
        qyOptimization,
        bannerList,
    },
    props: {
        countryList: Array,
        langList: Array,
    },
    methods: {
        tabChange() {
            // if (this.currentView != 'qyOptimization' && this.currentView != 'bannerList') {
            //     setTimeout(() => {
            //         this.currentView = 'qyOptimization';
            //     }, 100);
            // }
        },
    },
};
</script>
