<template>
    <div class="category-card">
        <el-card class="box-card" :style="{ height: cardHeight + 'px' }" shadow="never">
            <template class="clearfix" #header>
                <span class="parent-name" v-if="parentInfo.cateName">{{ parentInfo.cateName }}</span>
                <span>{{ levelText }}类目</span>
            </template>
            <div class="category-list">
                <draggable
                    v-loading="loading"
                    :list="categoryList"
                    :disabled="!enableSort"
                    class="list-group"
                    ghost-class="ghost"
                    @start="dragging = true"
                    @end="onEnd"
                >
                    <!-- <div > -->
                    <div
                        class="list-group-item"
                        v-for="item in categoryList"
                        :key="item.cateId"
                        :class="{ active: active === item.cateName }"
                        @click="selectItem(item)"
                    >
                        <p class="category-name">{{ item.cateId }} {{ item.cateName }}</p>
                        <div class="operate" v-if="active === item.cateName">
                            <el-button type="text" @click="editItem(item)">
                                <i class="el-icon-edit-outline"></i>
                            </el-button>
                            <el-button type="text" @click="delItem(item)">
                                <i class="el-icon-close"></i>
                            </el-button>
                        </div>
                    </div>
                    <!-- </div> -->
                </draggable>
                <!-- <div v-show="categoryList.length = 0" class="empty">
                    <i class="el-icon-collection-tag"></i>无子类目
                </div> -->
            </div>
            <div class="add-category" v-if="page === 'category'">
                <el-button type="text" @click="addItem">+ 新建{{ levelText }}类目</el-button>
            </div>
        </el-card>
        <!-- <confirm-dialog
            :dialogVisible="confirmVisible"
            :title="confirmDialogTitle"
            :text="confirmDialogText"
            @on-cancle="cancleConfirm"
            @on-confirm="submitDel"
        ></confirm-dialog> -->
    </div>
</template>

<script>
import { VueDraggableNext } from 'vue-draggable-next';
// import ConfirmDialog from '@/components/ConfirmDialog/index'

export default {
    // 类目卡片
    name: 'CategoryCard',
    inject: ['page'],
    props: {
        level: {
            type: Number,
            default: 1,
        },
        parentInfo: {
            type: Object,
            default: function() {
                return {
                    pid: 0,
                    cateName: '',
                    level: 0,
                };
            },
        },
        categoryList: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            enableSort: true,
            active: '',
            loading: false,
            sort: false,
            cardHeight: 500,
            item: null,
            confirmVisible: false,
            confirmDialogTitle: '',
            confirmDialogText: '',
        };
    },
    components: {
        draggable: VueDraggableNext,
        // ConfirmDialog
    },
    computed: {
        levelText() {
            let textArr = ['一级', '二级'];
            return textArr[this.level - 1];
        },
    },
    watch: {
        categoryList: function(newValue, oldValue) {
            if (newValue.length > 0) {
                this.active = newValue[0].cateName;
                this.selectItem(newValue[0]);
                // this.loading = false
            }
        },
    },
    created() {
        if (this.page === 'product') {
            this.enableSort = false;
        } else {
            if (this.hasPermission('BTN_BACK_CATE_SORT')) {
                this.enableSort = true;
            } else {
                this.enableSort = false;
            }
        }
    },
    mounted() {
        if (this.page === 'product') {
            this.cardHeight = 450;
        }
    },
    methods: {
        addItem() {
            let parentInfo = {
                pid: this.parentInfo.pid,
                level: this.level,
            };
            this.$emit('on-create', parentInfo);
        },
        selectItem(item) {
            // this.sort = false
            this.active = item.cateName;
            this.$emit('on-select', item);
        },
        editItem(item) {
            let parentInfo = {
                pid: this.parentInfo.pid,
                level: this.level,
            };
            item.parentInfo = parentInfo;
            this.$emit('on-edit', item);
        },
        cancleConfirm() {
            this.confirmVisible = false;
        },
        submitDel() {
            this.confirmVisible = false;
            this.$emit('on-delete', this.item);
        },
        delItem(item) {
            this.confirmVisible = true;
            this.confirmDialogTitle = '确定要删除该类目吗？';
            this.item = item;
        },
        onEnd(data) {
            console.log(data);
            console.log(this.categoryList);

            let target = {
                targetSort: data.newIndex + 1,
                cateId: this.categoryList[data.newIndex].cateId,
            };
            this.$emit('on-end-sort', target);
            this.sort = true;
        },
    },
};
</script>

<style lang="scss" scoped>
.category-card {
    .box-card {
        height: 510px;
        .parent-name {
            max-width: 160px;
            color: #409eff;
            font-weight: bold;
            padding-right: 4px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
        .category-list {
            height: 410px;
            padding: 20px;
            .list-group {
                height: 380px;
                overflow: auto;
            }
            .list-group-item {
                display: flex;
                height: 36px;
                line-height: 36px;
                cursor: pointer;
            }
            .active {
                background-color: #c6e5ff;
                color: #3a97ff;
            }
            .category-name {
                padding: 0 10px;
                display: inline-block;
                width: 82%;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
            .category-name:hover {
                color: #3a97ff;
            }
            .operate {
                display: inline-block;
            }
            .empty {
                text-align: center;
                line-height: 320px;
                color: #999;
            }
        }
    }
    .add-category {
        text-align: center;
        border-top: 1px solid #ebeef5;
        .el-button {
            padding: 16px;
        }
    }
}
</style>
