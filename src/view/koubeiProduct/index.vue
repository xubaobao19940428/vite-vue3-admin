<!--  -->
<template>
    <div class="koubei_product">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="商品公海" name="productSeas">
                <productSeas ref="productSeas"></productSeas>
            </el-tab-pane>
            <el-tab-pane label="精选" name="featuredProduct">
                <featured-product ref="featuredProduct"></featured-product>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import productSeas from './components/productSeas';
import featuredProduct from './components/featured';
export default {
    data() {
        return {
            activeName: 'productSeas',
        };
    },

    components: {
        productSeas,
        featuredProduct,
    },

    computed: {},

    mounted() {
        if (this.$route.query.active) {
            this.activeName = this.$route.query.active;
            this.handleClick({
                props: {
                    name: this.activeName,
                },
            });
        }
    },

    methods: {
        handleClick(tab) {
            switch (tab.props.name) {
                case 'productSeas':
                    this.$refs['productSeas'].getKoubeiProductList();
                    break;
                case 'featuredProduct':
                    this.$refs['featuredProduct'].getProductList(1);
                    break;
                default:
                    break;
            }
        },
    },
};
</script>
<style lang="scss" scoped>
.koubei_product {
    width: 100%;
    // min-height: 100%;
    background-color: #ffffff !important;
    overflow: scroll;
    .el-tabs {
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    :deep() .el-tabs__content {
        height: 100%;
        overflow: scroll;
    }
    :deep() #pane-featuredProduct {
        display: flex;
        height: 100%;
        flex-direction: column;
    }
}
</style>
