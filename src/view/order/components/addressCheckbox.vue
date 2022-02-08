<!--  -->
<template>
    <div class="address-select-1">
        <div class="address-select">
            <el-tag v-for="(item, index) in selectDetail" :key="index" closable @close="closeItem(item, index)" size="small">
                {{ returnData(item) }}
            </el-tag>
        </div>
        <div class="select-detail" v-show="checked" @click="changeValue($event)">
            <div class="select-detail-warpper">
                <div class="select-detail-warpper-detail" v-for="(item, index) in options1" :key="index">
                    <el-checkbox
                        v-model="item.checkAll"
                        :indeterminate="item.isIndeterminate"
                        @change="handleCheckAllChange(index)"
                        :disabled="item.disabled"
                    >
                        {{ item.divisionName }}
                    </el-checkbox>
                    <div class="ckeckout-box" style="padding-left:10px;box-sizing:border-box;">
                        <el-checkbox-group v-model="item.checkList">
                            <el-checkbox
                                v-for="(child, _chIndex) in item.cityDivisionList"
                                :key="_chIndex"
                                :label="child.divisionId"
                                :disabled="child.disabled"
                                @change="handleCheckedCitiesChange(index, _chIndex)"
                            >
                                {{ child.divisionName }}
                            </el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'addressCheckbox',
    props: {
        options1: {
            type: Array,
            default: () => {
                return [];
            },
        },
        index: {
            type: Number,
            default: 0,
        },
        selectDetail: {
            type: Array,
            default: [],
        },
        addressList: {
            type: Array,
            default: [],
        },
    },
    data() {
        return {
            checked: false,
            // selectDetail: [],
        };
    },

    components: {},

    computed: {},

    mounted() {},

    methods: {
        returnData(divisionId) {
            let str = '';
            this.addressList.map(item => {
                if (item.divisionId == divisionId) {
                    str = item.divisionName;
                    return str;
                } else {
                    item.cityDivisionList.map(child => {
                        if (child.divisionId == divisionId) {
                            str = child.divisionName;
                            return str;
                        }
                    });
                }
            });
            return str;
        },
        changeChecked(event) {
            this.checked = !this.checked;
            let e = event || window.event;
            e.stopPropagation();
            console.log('单个打开');
        },
        changeValue(event) {
            let e = event || window.event;
            e.stopPropagation();
        },
        closeItem(divisionId, dataIndex) {
            this.$emit('close-item', {
                allIndex: this.index,
                dataIndex: dataIndex,
                divisionId: divisionId,
            });
            // this.options1.map((item, index) => {
            //     if (item.divisionId == divisionId) {
            //         this.options1[index].checkList = [];
            //         this.options1[index].checkAll = false;
            //         this.options1[index].isIndeterminate = false;
            //     } else {
            //         item.checkList.map((child, _index) => {
            //             if (child == divisionId) {
            //                 this.options1[index].checkList.splice(_index, 1);
            //             }
            //         });
            //         if (item.checkList.length == 0) {
            //             this.options1[index].checkAll = false;
            //             this.options1[index].isIndeterminate = false;
            //         }
            //     }
            // });
            // this.selectDetail.splice(dataIndex, 1);
        },
        handleCheckedCitiesChange(index, _chIndex) {
            this.$emit('handle-checked-cities-change', {
                allIndex: this.index,
                index: index,
                _chIndex: _chIndex,
            });
            // if (this.options1[index].checkList.length == this.options1[index].cityDivisionList.length) {
            //     this.selectDetail.push(this.options1[index].divisionId);
            //     this.options1[index].cityDivisionList.map(item => {
            //         this.selectDetail = this.selectDetail.filter(data => {
            //             return data != item.divisionId;
            //         });
            //     });
            //     this.options1[index].checkAll = true;
            //     this.options1[index].isIndeterminate = false;
            // } else if (
            //     this.options1[index].checkList.length > 0 &&
            //     this.options1[index].checkList.length < this.options1[index].cityDivisionList.length
            // ) {
            //     //这个是删除功能
            //     if (this.selectDetail.includes(this.options1[index].cityDivisionList[_chIndex].divisionId)) {
            //         this.selectDetail.map((item, _dataIndex) => {
            //             if (item == this.options1[index].cityDivisionList[_chIndex].divisionId) {
            //                 this.selectDetail.splice(_dataIndex, 1);
            //             }
            //         });
            //     }
            //     this.selectDetail = [...new Set(this.selectDetail.concat(this.options1[index].checkList))];
            //     //还差一个不选
            //     if (this.selectDetail.includes(this.options1[index].divisionId)) {
            //         this.selectDetail.map((item, _dataIndex) => {
            //             if (item == this.options1[index].divisionId) {
            //                 this.selectDetail.splice(_dataIndex, 1);
            //             }
            //         });
            //     }
            //     this.options1[index].checkAll = false;
            //     this.options1[index].isIndeterminate = true;
            // } else {
            //     //这个是为了删除功能
            //     if (this.selectDetail.includes(this.options1[index].cityDivisionList[_chIndex].divisionId)) {
            //         this.selectDetail.map((item, _dataIndex) => {
            //             if (item == this.options1[index].cityDivisionList[_chIndex].divisionId) {
            //                 this.selectDetail.splice(_dataIndex, 1);
            //             }
            //         });
            //     }
            //     if (this.selectDetail.includes(this.options1[index].divisionId)) {
            //         this.selectDetail.map((item, _dataIndex) => {
            //             if (item == this.options1[index].divisionId) {
            //                 this.selectDetail.splice(_dataIndex, 1);
            //             }
            //         });
            //     }

            //     this.options1[index].checkAll = false;
            //     this.options1[index].isIndeterminate = false;
            // }
        },
        handleCheckAllChange(index) {
            this.$emit('change-all-index', {
                allIndex: this.index,
                index: index,
            });
            // if (this.options1[index].checkAll) {
            //     let arr = [];
            //     this.options1[index].cityDivisionList.map(item => {
            //         arr.push(item.divisionId);
            //     });
            //     this.options1[index].checkList = arr;
            //     this.selectDetail.push(this.options1[index].divisionId);
            //     this.options1[index].cityDivisionList.map(item => {
            //         this.selectDetail = this.selectDetail.filter(data => {
            //             return data != item.divisionId;
            //         });
            //     });
            // } else {
            //     this.selectDetail.map((item, _dataIndex) => {
            //         if (item == this.options1[index].divisionId) {
            //             this.selectDetail.splice(_dataIndex, 1);
            //         }
            //     });
            //     this.options1[index].checkList = [];
            // }
            // this.options1[index].isIndeterminate = false;
        },
    },
});
</script>
<style lang="scss" scoped>
.address-select-1 {
    position: relative;
    margin-bottom: 10px;
    width: 200px;
    // display: inline;
    .address-select {
        min-height: 40px;
        max-height: 100px;
        overflow: scroll;
        width: 200px;
        border: 1px solid #ccc;
        border-radius: 5px;
        // display: inline-block;
        .el-tag {
            margin-right: 5px;
            margin-top: 5px;
        }
    }
    .select-detail {
        position: absolute;
        width: 370px;
        height: 360px;
        background: #fff;
        overflow: hidden;
        z-index: 5001;
        border-radius: 10px;
        outline: none;
        box-shadow: 0 3px 6px -4px #00000019, 0 6px 16px 0 #00000019, 0 9px 28px 8px #0000000c;
        padding: 10px;
        box-sizing: border-box;
        .select-detail-warpper {
            width: 100%;
            height: 100%;
            overflow: scroll;
            .select-detail-warpper-detail {
                background: #ccc;
                padding: 20px;
                box-sizing: border-box;
                border-radius: 8px;
                margin-bottom: 10px;
            }
        }
    }
}
</style>
