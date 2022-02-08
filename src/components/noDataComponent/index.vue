<!--  -->
<template>
    <div class="no-data">
        <el-empty :image-size="200"></el-empty>
    </div>
</template>

<script>
export default {
    name: 'noDataComponent',
    data() {
        return {};
    },

    components: {},

    computed: {},

    mounted() {},

    methods: {},
};
</script>
<style lang="scss" scoped>
.no-data {
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-content: center;
    background: #fff;
}
</style>
