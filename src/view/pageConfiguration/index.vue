<template>
    <div class="app-container new-app-set-wrapper">
        <div class="head-btn-wrapper">
            <el-button type="primary" plain size="medium" @click="handleChange('screen')" :class="['btn-padding', { active: curPage == 'screen' }]">
                开屏
            </el-button>
            <el-button type="primary" plain size="medium" :class="['btn-padding', { active: curPage == 'home' }]" @click="curPage = 'home'">
                首页
            </el-button>
            <!-- <el-button class="right" v-show="curPage == 'home'" @click="showSort = true" type="text">
                排序
            </el-button> -->
        </div>
        <keep-alive>
            <component v-bind:is="curPage"></component>
        </keep-alive>

        <!-- <home-sort-dialog v-if="showSort" :showSort="showSort" :countryList="countryList" @close="showSort = false"></home-sort-dialog> -->
    </div>
</template>

<script>
import screen from './screenPage';
import home from './homePage';
// import homeSortDialog from './components/homeSortDialog'
export default {
    data() {
        return {
            curPage: 'home',
            showSort: false,
        };
    },
    components: {
        screen,
        home,
    },
    computed: {},
    created() {},
    methods: {
        handleChange(type) {
            this.curPage = type;
        },
    },
};
</script>

<style scoped lang="scss">
.new-app-set-wrapper {
    padding: 10px 14px;
    width: 100%;
    background-color: #fff !important;
    .head-btn-wrapper {
        background: #fff;
        padding: 10px 0;
        border-bottom: 1px solid #eee;
        margin-bottom: 10px;
        .btn-padding {
            width: 100px;
            padding: 10px 0;
            text-align: center;
        }
    }
    .el-button {
        &.active {
            color: #ffffff;
            background-color: #409eff;
            border-color: #409eff;
        }
    }
}
</style>
