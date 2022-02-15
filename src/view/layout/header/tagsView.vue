<!--  -->
<template>
	<div class="tags-view">
        <router-link
        v-for="tag in tagsViewList"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag)?'active':''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
      >
        {{ tag.meta.title }}
        <span  class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
	data() {
		return {}
	},

	components: {},
    watch:{
        $route() {
        
        },
    },
	computed: {
        ...mapState({
            tagsViewList:state=>state.nav.tagsViewList
        })
    },

	mounted() {},

	methods: {
        isActive(route) {
            return route.path === this.$route.path
        },
        closeSelectedTag(tag){
            this.$store.dispatch('deleteTagsViewAction',tag)
           if(this.tagsViewList.length){
               const latestView = this.tagsViewList.slice(-1)[0]
               this.$router.replace(latestView.fullPath)
           }else{
               this.$router.push({
                   name:'dashboard'
               })
           }
        }
    },
}
</script>
<style lang="scss" scoped>
.tags-view {
	height: 34px;
	width: 100%;
	background: #fff;
	border-bottom: 1px solid #d8dce5;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
}
</style>
<style lang="scss">
//reset element css of el-icon-close
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  
}
</style>
