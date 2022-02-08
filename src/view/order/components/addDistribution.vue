<!--  -->
<template>
    <div class="add_distribution">
        <el-dialog
            v-model="dialogForm.show"
            :title="ruleForm.freightTemplateId ? getLocalUseLangData('8000221') : getLocalUseLangData('8000127')"
            width="900px"
            :before-close="handleClose"
        >
            <div class="distribution_content" @click="closeAllCheckbox($event)">
                <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" class="demo-ruleForm">
                    <el-form-item :label="getLocalUseLangData('8000128') + '：'" prop="templateName">
                        <el-input :placeholder="getLocalUseLangData('8000220')" v-model="ruleForm.templateName"></el-input>
                    </el-form-item>
                    <el-form-item :label="getLocalUseLangData('8000101') + '：'" prop="deliverTime">
                        <el-select v-model="ruleForm.deliverTime" :placeholder="getLocalUseLangData('8000101')">
                            <el-option v-for="(item, index) in deliverTimeList" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="getLocalUseLangData('8000129') + '：'" prop="freeShip">
                        <el-radio-group v-model="ruleForm.freeShip">
                            <el-radio :label="true">{{ getLocalUseLangData('8000130') }}</el-radio>
                            <el-radio :label="false">{{ getLocalUseLangData('8000131') }}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <div class="default-free" v-if="!ruleForm.freeShip">
                        <el-form-item
                            :label="getLocalUseLangData('8000133') + '：'"
                            v-for="(defaultValue, index) in ruleForm.defaultFee"
                            :key="index + '_'"
                        >
                            <el-form-item class="label-line">
                                <el-input-number v-model="defaultValue.pcs" :min="1" controls-position="right" />
                            </el-form-item>
                            <span>{{ getLocalUseLangData('8000134') }}</span>
                            <el-form-item class="label-line">
                                <el-input onkeyup="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')" v-model="defaultValue.price" :min="1" />
                            </el-form-item>
                            <span>{{ getLocalUseLangData('8000135') }}，{{ getLocalUseLangData('8000136') }}</span>
                            <el-form-item class="label-line">
                                <el-input v-model="defaultValue.extraPcs" :min="1" onkeyup="value=value.replace(/[^\d]/g,'')" />
                            </el-form-item>
                            <span>{{ getLocalUseLangData('8000067') }}，{{ getLocalUseLangData('8000218') }}</span>
                            <el-form-item class="label-line">
                                <el-input
                                    onkeyup="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')"
                                    v-model="defaultValue.extraPrice"
                                    :min="1"
                                />
                            </el-form-item>
                            <span>{{ getLocalUseLangData('8000135') }}</span>
                        </el-form-item>
                    </div>
                    <!---指定地区运费-->
                    <el-form-item :label="getLocalUseLangData('8000137')" v-if="!ruleForm.freeShip">
                        <div class="specify_distribution">
                            <el-form-item v-for="(area, index) in ruleForm.areaFee" :key="index">
                                <!-- <el-select v-model="item.value1" multiple>
                                    <el-option-group v-for="group in options" :key="group.label" :label="group.label">
                                        <el-option
                                            v-for="item in group.options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        ></el-option>
                                    </el-option-group>
                                </el-select> -->
                                <addressCheckbox
                                    :addressList="options2"
                                    :options1="options1"
                                    :ref="'areaFee' + index"
                                    :index="index"
                                    :selectDetail="area.divisionList"
                                    @click="changeOptionsArea($event, index)"
                                    @change-all-index="changeAllAreaIndex"
                                    @close-item="closeAreaItem"
                                    @handle-checked-cities-change="handleAreaCheckedCitiesChange"
                                ></addressCheckbox>
                                <div style="margin:10px 0;">
                                    <el-form-item class="label-line">
                                        <el-input-number v-model="area.pcs" :min="1" controls-position="right" />
                                    </el-form-item>
                                    <span>{{ getLocalUseLangData('8000134') }}</span>
                                    <el-form-item class="label-line">
                                        <el-input onkeyup="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')" v-model="area.price" :min="1" />
                                    </el-form-item>
                                    <span>{{ getLocalUseLangData('8000135') }}，{{ getLocalUseLangData('8000136') }}</span>
                                    <el-form-item class="label-line">
                                        <el-input v-model="area.extraPcs" :min="1" onkeyup="value=value.replace(/[^\d]/g,'')" />
                                    </el-form-item>
                                    <span>{{ getLocalUseLangData('8000067') }}，{{ getLocalUseLangData('8000218') }}</span>
                                    <el-form-item class="label-line">
                                        <el-input
                                            onkeyup="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')"
                                            v-model="area.extraPrice"
                                            :min="1"
                                        />
                                    </el-form-item>
                                    <span>{{ getLocalUseLangData('8000135') }}</span>
                                    <el-button type="text" size="small" @click="deleteArea(index)">{{ getLocalUseLangData('8000068') }}</el-button>
                                </div>
                            </el-form-item>
                        </div>
                    </el-form-item>
                    <el-form-item label=" " v-if="!ruleForm.freeShip">
                        <el-button type="text" size="small" icon="el-icon-plus" @click="addArea">{{ getLocalUseLangData('8000138') }}</el-button>
                    </el-form-item>
                    <el-form-item :label="getLocalUseLangData('8000139')" style="margin-bottom:0px;" v-if="!ruleForm.freeShip"></el-form-item>
                    <div class="freeArea-form-item" v-if="!ruleForm.freeShip">
                        <el-form-item v-for="(items, index) in ruleForm.freeArea" :key="index">
                            <!-- <el-select v-model="items.value1" multiple>
                                <el-option-group v-for="group in options" :key="group.label" :label="group.label">
                                    <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-option-group>
                            </el-select> -->
                            <!-- <el-cascader
                                :options="options1"
                                :props="props"
                                clearable
                                v-model="items.value1"
                                :ref="'box' + index"
                                @visible-change="focusChange($event, index)"
                            /> -->
                            <addressCheckbox
                                :addressList="options2"
                                :options1="options1"
                                :ref="'freeArea' + index"
                                @click="changeOptions($event, index)"
                                :index="index"
                                :selectDetail="items.divisionList"
                                @change-all-index="changeAllIndex"
                                @close-item="closeItem"
                                @handle-checked-cities-change="handleCheckedCitiesChange"
                            ></addressCheckbox>
                            <el-form-item class="label-line-freeArea">
                                <el-input
                                    :placeholder="getLocalUseLangData('8000141')"
                                    v-model="items.extraPcs"
                                    @blur="validatorHello"
                                    onkeyup="value=value.replace(/[^\d]/g,'')"
                                ></el-input>
                            </el-form-item>
                            <el-form-item class="label-line-freeArea">
                                <el-input
                                    :placeholder="getLocalUseLangData('8000142')"
                                    v-model="items.extraPrice"
                                    @blur="validatorHello"
                                    onkeyup="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')"
                                ></el-input>
                            </el-form-item>
                            <el-button type="text" style="margin-left:10px;" size="small" @click="deletefreeArea(index)">
                                {{ getLocalUseLangData('8000068') }}
                            </el-button>
                        </el-form-item>
                        <p class="label-tips">
                            {{ getLocalUseLangData('8000140') }}
                        </p>
                        <p class="label-error" v-if="showError">
                            {{ getLocalUseLangData('8000222') }}
                        </p>
                        <el-form-item label=" ">
                            <el-button type="text" size="small" icon="el-icon-plus" @click="addfreeArea">
                                {{ getLocalUseLangData('8000143') }}
                            </el-button>
                        </el-form-item>
                    </div>

                    <el-form-item :label="getLocalUseLangData('8000132') + '：'">
                        <!-- <el-select v-model="ruleForm.type" multiple clearable>
                            <el-option-group v-for="group in options" :key="group.label" :label="group.label">
                                <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
                                    <el-checkbox v-model="item.label" :label="item.label"></el-checkbox>
                                </el-option>
                            </el-option-group>
                        </el-select> -->
                        <addressCheckbox
                            :addressList="options2"
                            :options1="options1"
                            ref="unavailableArea"
                            :index="0"
                            :selectDetail="ruleForm.unavailableArea[0].divisionList"
                            @click="changeOptionsUnavailableArea($event)"
                            @change-all-index="changeUnavailableAreaAllIndex"
                            @close-item="closeUnavailableAreaItem"
                            @handle-checked-cities-change="handleUnavailableAreaCheckedCitiesChange"
                        ></addressCheckbox>
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="handleClose">{{ getLocalUseLangData('8000152') }}</el-button>
                    <el-button type="primary" @click="confirmDistribution('ruleForm')">{{ getLocalUseLangData('8000213') }}</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import addressCheckbox from './addressCheckbox';
import { getDivision, addOrUpdateModifyFreight } from '@/api/newJson/order';
import { deliveryTimeList } from './deliveryList';
export default defineComponent({
    props: {
        dialogForm: {
            type: Object,
        },
    },
    data() {
        return {
            showError: false,
            options1: [],
            options2: [],
            ruleForm: {
                templateName: '',
                freightTemplateId: '',
                freeShip: true,
                deliverTime: '', //发货事件
                defaultFee: [
                    {
                        divisionList: [],
                        pcs: 1, //初件数
                        extraPcs: '1', //额外件数
                        price: '0', //初件数邮费
                        extraPrice: '0', //每额外件数邮费
                    },
                ],
                areaFee: [
                    {
                        divisionList: [],
                        pcs: 1, //初件数
                        extraPcs: '1', //额外件数
                        price: '0', //初件数邮费
                        extraPrice: '0', //每额外件数邮费
                    },
                ],
                freeArea: [
                    {
                        divisionList: [],
                        extraPcs: '',
                        extraPrice: '',
                    },
                ],
                unavailableArea: [
                    {
                        divisionList: [],
                    },
                ],
            },
            rules: {
                templateName: [
                    {
                        required: true,
                        message: 'Please input Activity name',
                        trigger: 'blur',
                    },
                    {
                        required: true,
                        // message: 'Length should be 3 to 5',
                        trigger: 'blur',
                    },
                ],
                freeShip: [
                    {
                        required: true,
                        message: 'Please select activity resource',
                        trigger: 'change',
                    },
                ],
                deliverTime: [
                    {
                        required: true,
                        message: 'Please select activity deliverTime',
                        trigger: 'change',
                    },
                ],
            },
            deliverTimeList: deliveryTimeList,
        };
    },

    components: {
        addressCheckbox,
    },
    watch: {
        'dialogForm.show': {
            handler(newVal, oldVal) {
                if (!newVal) {
                    this.resetForm();
                }
            },
            deep: true,
        },
    },
    computed: {},

    mounted() {
        // var arr4 = [
        //     { name: 'a', id: 1 },
        //     { name: 'a', id: 2 },
        //     { name: 'b', id: 3 },
        //     { name: 'c', id: 4 },
        //     { name: 'c', id: 6 },
        //     { name: 'b', id: 6 },
        //     { name: 'd', id: 7 },
        // ];
        // // array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
        // // (function(必选初始值或计算结束返回值, 必选当前元素, 可选索引, 可选原数组),可选函数初始值)
        // var obj = {};
        // function deWeightFour() {
        //     arr4 = arr4.reduce(function(a, b) {
        //         obj[b.name] ? '' : (obj[b.name] = true && a.push(b));
        //         return a;
        //     }, []);
        //     return arr4;
        // }
        // var newArr4 = deWeightFour();
        // console.log('%c%s', 'color:red;', '方法四：es5,newArr4', newArr4);
        this.getDivision();
    },

    methods: {
        resetForm() {
            this.$refs['ruleForm'].resetFields();
        },
        //获取后台地址接口
        getDivision() {
            getDivision()
                .then(response => {
                    if (response.data) {
                        response.data.forEach(item => {
                            item.checkList = [];
                            item.checkAll = false;
                            item.isIndeterminate = false;
                        });
                        this.options1 = JSON.parse(JSON.stringify(response.data));
                        this.options2 = JSON.parse(JSON.stringify(response.data));
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // reduceArr(newArrayList) {
        //     var arr4 = newArrayList.concat([]);
        //     // array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
        //     // (function(必选初始值或计算结束返回值, 必选当前元素, 可选索引, 可选原数组),可选函数初始值)
        //     var obj = {};
        //     arr4 = arr4.reduce(function(a, b) {
        //         obj[b.divisionId] ? '' : (obj[b.divisionId] = true && a.push(b));
        //         return a;
        //     }, []);
        //     return arr4;
        // },
        //全部关闭addressCheckbox
        closeAllCheckbox(event) {
            // let e = event || window.event;
            // e.preventDefault();
            console.log('关闭全部');
            this.ruleForm.areaFee.map((item, _index) => {
                if (this.$refs['areaFee' + _index] && this.$refs['areaFee' + _index].checked) {
                    this.$refs['areaFee' + _index].checked = false;
                }
            });
            this.ruleForm.freeArea.map((item, _index) => {
                if (this.$refs['freeArea' + _index] && this.$refs['freeArea' + _index].checked) {
                    this.$refs['freeArea' + _index].checked = false;
                }
            });
            if (this.$refs['unavailableArea'] && this.$refs['unavailableArea'].checked) {
                this.$refs['unavailableArea'].checked = false;
            }
        },
        handleClose() {
            this.$emit('handle-close');
        },
        addArea() {
            this.ruleForm.areaFee.push({
                divisionList: [],
                pcs: 1, //初件数
                extraPcs: '1', //额外件数
                price: '0', //初件数邮费
                extraPrice: '0', //每额外件数邮费
            });
        },
        deleteArea(index) {
            // this.$confirm('proxy will permanently delete the file. Continue?', 'Warning', {
            //     confirmButtonText: 'OK',
            //     cancelButtonText: 'Cancel',
            //     type: 'warning',
            // })
            //     .then(() => {
            this.ruleForm.area.splice(index, 1);
            // })
            // .catch(() => {
            //     this.$message({
            //         type: 'info',
            //         message: 'Delete canceled',
            //     });
            // });
        },
        addfreeArea() {
            this.ruleForm.freeArea.push({
                divisionList: [],
                extraPcs: '',
                extraPrice: '',
            });
        },
        deletefreeArea(index) {
            // this.$confirm('proxy will permanently delete the file. Continue?', 'Warning', {
            //     confirmButtonText: 'OK',
            //     cancelButtonText: 'Cancel',
            //     type: 'warning',
            // })
            //     .then(() => {
            this.ruleForm.freeArea.splice(index, 1);
            // })
            // .catch(() => {
            //     this.$message({
            //         type: 'info',
            //         message: 'Delete canceled',
            //     });
            // });
        },
        validatorHello() {
            this.ruleForm.freeArea.map(item => {
                if (item.divisionList.length && !item.extraPcs && !item.extraPrice) {
                    this.showError = true;
                    return;
                } else {
                    this.showError = false;
                }
            });
        },

        //指定区域运费操作
        /**
         * 点击事件
         */
        changeOptionsArea(event, index) {
            let e = event || window.event;
            event.stopPropagation();
            let disDivisionList = [];
            this.$refs['areaFee' + index].checked = !this.$refs['areaFee' + index].checked;
            this.options1 = JSON.parse(JSON.stringify(this.options2));
            //重新选择的操作
            if (this.$refs['areaFee' + index].checked == true) {
                this.ruleForm.areaFee.map((item, _index) => {
                    if (_index != index) {
                        disDivisionList = disDivisionList.concat(this.ruleForm.areaFee[_index].divisionList);
                        this.$refs['areaFee' + _index].checked = false;
                    }
                });
                this.ruleForm.freeArea.map((item, _index) => {
                    this.$refs['freeArea' + _index].checked = false;
                });
                disDivisionList = disDivisionList.concat(this.ruleForm.unavailableArea[0].divisionList);
                this.$refs['unavailableArea'].checked = false;
                this.ruleForm.areaFee[index].divisionList.map((hasCheck, _hasCheckIndex) => {
                    this.options1.forEach(child => {
                        if (child.divisionId == hasCheck) {
                            child.checkAll = true;
                            child.isIndeterminate = false;
                            child.disabled = false;

                            child.cityDivisionList.forEach(cityChild => {
                                child.checkList.push(cityChild.divisionId);
                                cityChild.disabled = false;
                            });
                        } else {
                            child.checkAll = false;
                            child.cityDivisionList.forEach(cityChild => {
                                if (cityChild.divisionId == hasCheck) {
                                    child.checkList.push(cityChild.divisionId);
                                    cityChild.disabled = false;
                                }
                            });
                            if (child.checkList.length == child.cityDivisionList.length) {
                                child.checkAll = true;
                            } else if (child.checkList.length && child.checkList.length != child.cityDivisionList.length) {
                                child.isIndeterminate = true;
                                child.disabled = false;
                            } else {
                                child.isIndeterminate = false;
                            }
                            // console.log('选择的子项', child.checkList);
                        }
                    });
                });
                disDivisionList.map(item => {
                    this.options1.forEach(child => {
                        if (child.divisionId == item) {
                            console.log('disabled');
                            child.checkAll = false;
                            child.isIndeterminate = false;
                            child.checkList = [];
                            child.disabled = true;
                            child.cityDivisionList.forEach(cityChild => {
                                cityChild.disabled = true;
                            });
                        } else {
                            console.log('disabled');
                            child.cityDivisionList.forEach(cityChild => {
                                if (cityChild.divisionId == item) {
                                    cityChild.disabled = true;
                                }
                            });
                            let disabledItem = child.cityDivisionList.filter(item => {
                                return item.disabled;
                            });
                            if (disabledItem.length) {
                                child.isIndeterminate = true;
                                child.disabled = true;
                            } else {
                                child.disabled = false;
                                child.isIndeterminate = false;
                            }
                        }
                    });
                });
            }
        },

        changeAllAreaIndex(data) {
            let { allIndex, index } = data;
            // this.options1[index].checkAll = !this.options1[index].checkAll;
            if (this.options1[index].checkAll) {
                let arr = [];
                this.options1[index].cityDivisionList.map(item => {
                    arr.push(item.divisionId);
                });
                this.options1[index].checkList = arr;
                this.ruleForm.areaFee[allIndex].divisionList;
                this.ruleForm.areaFee[allIndex].divisionList.push(this.options1[index].divisionId);
                this.options1[index].cityDivisionList.map(item => {
                    this.ruleForm.areaFee[allIndex].divisionList = this.ruleForm.areaFee[allIndex].divisionList.filter(data => {
                        return data != item.divisionId;
                    });
                });
            } else {
                this.ruleForm.areaFee[allIndex].divisionList.map((item, _dataIndex) => {
                    if (item == this.options1[index].divisionId) {
                        this.ruleForm.areaFee[allIndex].divisionList.splice(_dataIndex, 1);
                    }
                });
                this.options1[index].checkList = [];
            }
            this.options1[index].isIndeterminate = false;
        },
        closeAreaItem(data) {
            let { allIndex, dataIndex, divisionId } = data;
            this.options1.map((item, index) => {
                if (item.divisionId == divisionId) {
                    this.options1[index].checkList = [];
                    this.options1[index].checkAll = false;
                    this.options1[index].isIndeterminate = false;
                } else {
                    item.checkList.map((child, _index) => {
                        if (child == divisionId) {
                            this.options1[index].checkList.splice(_index, 1);
                        }
                    });
                    if (item.checkList.length == 0) {
                        this.options1[index].checkAll = false;
                        this.options1[index].isIndeterminate = false;
                    }
                }
            });
            this.ruleForm.areaFee[allIndex].divisionList.splice(dataIndex, 1);
        },
        handleAreaCheckedCitiesChange(data) {
            let { allIndex, index, _chIndex } = data;
            if (this.options1[index].checkList.length == this.options1[index].cityDivisionList.length) {
                this.ruleForm.areaFee[allIndex].divisionList.push(this.options1[index].divisionId);
                this.options1[index].cityDivisionList.map(item => {
                    this.ruleForm.areaFee[allIndex].divisionList = this.ruleForm.areaFee[allIndex].divisionList.filter(data => {
                        return data != item.divisionId;
                    });
                });
                this.options1[index].checkAll = true;
                this.options1[index].isIndeterminate = false;
            } else if (
                this.options1[index].checkList.length > 0 &&
                this.options1[index].checkList.length < this.options1[index].cityDivisionList.length
            ) {
                //这个是删除功能
                if (this.ruleForm.areaFee[allIndex].divisionList.includes(this.options1[index].cityDivisionList[_chIndex].divisionId)) {
                    this.ruleForm.areaFee[allIndex].divisionList.map((item, _dataIndex) => {
                        if (item == this.options1[index].cityDivisionList[_chIndex].divisionId) {
                            this.ruleForm.areaFee[allIndex].divisionList.splice(_dataIndex, 1);
                        }
                    });
                }
                this.ruleForm.areaFee[allIndex].divisionList = [
                    ...new Set(this.ruleForm.areaFee[allIndex].divisionList.concat(this.options1[index].checkList)),
                ];
                //还差一个不选
                if (this.ruleForm.areaFee[allIndex].divisionList.includes(this.options1[index].divisionId)) {
                    this.ruleForm.areaFee[allIndex].divisionList.map((item, _dataIndex) => {
                        if (item == this.options1[index].divisionId) {
                            this.ruleForm.areaFee[allIndex].divisionList.splice(_dataIndex, 1);
                        }
                    });
                }
                // this.ruleForm.areaFee[allIndex].divisionList = this.options1[index].checkList;
                this.options1[index].checkAll = false;
                this.options1[index].isIndeterminate = true;
            } else {
                //这个是为了删除功能
                if (this.ruleForm.areaFee[allIndex].divisionList.includes(this.options1[index].cityDivisionList[_chIndex].divisionId)) {
                    this.ruleForm.areaFee[allIndex].divisionList.map((item, _dataIndex) => {
                        if (item == this.options1[index].cityDivisionList[_chIndex].divisionId) {
                            this.ruleForm.areaFee[allIndex].divisionList.splice(_dataIndex, 1);
                        }
                    });
                }
                if (this.ruleForm.areaFee[allIndex].divisionList.includes(this.options1[index].divisionId)) {
                    this.ruleForm.areaFee[allIndex].divisionList.map((item, _dataIndex) => {
                        if (item == this.options1[index].divisionId) {
                            this.ruleForm.areaFee[allIndex].divisionList.splice(_dataIndex, 1);
                        }
                    });
                }
                this.options1[index].checkAll = false;
                this.options1[index].isIndeterminate = false;
            }
        },
        /////////////////////////
        /**
         * 分割符
         */
        //单个条件包邮的点击事件
        changeOptions(event, index) {
            let e = event || window.event;
            e.stopPropagation();
            this.$refs['freeArea' + index].checked = !this.$refs['freeArea' + index].checked;
            let disDivisionList = [];
            this.options1 = JSON.parse(JSON.stringify(this.options2));

            if (this.$refs['freeArea' + index].checked == true) {
                this.ruleForm.freeArea.map((item, _index) => {
                    if (_index != index) {
                        this.ruleForm.freeArea[_index].divisionList;
                        disDivisionList = disDivisionList.concat(this.ruleForm.freeArea[_index].divisionList);
                        this.$refs['freeArea' + _index].checked = false;
                    }
                });
            }
            this.ruleForm.areaFee.map((item, _index) => {
                this.$refs['areaFee' + _index].checked = false;
            });
            disDivisionList = disDivisionList.concat(this.ruleForm.unavailableArea[0].divisionList);
            this.$refs['unavailableArea'].checked = false;
            this.ruleForm.freeArea[index].divisionList.map((hasCheck, _hasCheckIndex) => {
                this.options1.forEach(child => {
                    if (child.divisionId == hasCheck) {
                        child.checkAll = true;
                        child.isIndeterminate = false;
                        child.disabled = false;
                        child.cityDivisionList.forEach(cityChild => {
                            child.checkList.push(cityChild.divisionId);
                            cityChild.disabled = false;
                        });
                    } else {
                        child.checkAll = false;

                        child.cityDivisionList.forEach(cityChild => {
                            if (cityChild.divisionId == hasCheck) {
                                child.checkList.push(cityChild.divisionId);
                                cityChild.disabled = false;
                            }
                        });
                        if (child.checkList.length == child.cityDivisionList.length) {
                            child.checkAll = true;
                        } else if (child.checkList.length && child.checkList.length != child.cityDivisionList.length) {
                            child.isIndeterminate = true;
                            child.disabled = false;
                        } else {
                            child.isIndeterminate = false;
                        }
                        // console.log('选择的子项', child.checkList);
                    }
                });
            });
            disDivisionList.map(item => {
                this.options1.forEach(child => {
                    if (child.divisionId == item) {
                        child.checkAll = false;
                        child.isIndeterminate = false;
                        child.checkList = [];
                        child.disabled = true;
                        child.cityDivisionList.forEach(cityChild => {
                            cityChild.disabled = true;
                        });
                    } else {
                        child.cityDivisionList.forEach(cityChild => {
                            if (cityChild.divisionId == item) {
                                cityChild.disabled = true;
                            }
                        });
                        let disabledItem = child.cityDivisionList.filter(item => {
                            return item.disabled;
                        });
                        if (disabledItem.length) {
                            child.isIndeterminate = true;
                            child.disabled = true;
                        } else {
                            child.disabled = false;
                            child.isIndeterminate = false;
                        }
                    }
                });
            });
        },
        //改变单个全选条件包邮
        changeAllIndex(data) {
            let { allIndex, index } = data;
            // this.options1[index].checkAll = !this.options1[index].checkAll;
            if (this.options1[index].checkAll) {
                let arr = [];
                this.options1[index].cityDivisionList.map(item => {
                    arr.push(item.divisionId);
                });
                this.options1[index].checkList = arr;

                this.ruleForm.freeArea[allIndex].divisionList.push(this.options1[index].divisionId);
                this.options1[index].cityDivisionList.map(item => {
                    this.ruleForm.freeArea[allIndex].divisionList = this.ruleForm.freeArea[allIndex].divisionList.filter(data => {
                        return data != item.divisionId;
                    });
                });
            } else {
                this.ruleForm.freeArea[allIndex].divisionList.map((item, _dataIndex) => {
                    if (item == this.options1[index].divisionId) {
                        this.ruleForm.freeArea[allIndex].divisionList.splice(_dataIndex, 1);
                    }
                });
                this.options1[index].checkList = [];
            }
            this.options1[index].isIndeterminate = false;
        },
        //删除操作条件包邮
        closeItem(data) {
            let { allIndex, dataIndex, divisionId } = data;
            this.options1.map((item, index) => {
                if (item.divisionId == divisionId) {
                    this.options1[index].checkList = [];
                    this.options1[index].checkAll = false;
                    this.options1[index].isIndeterminate = false;
                } else {
                    item.checkList.map((child, _index) => {
                        if (child == divisionId) {
                            this.options1[index].checkList.splice(_index, 1);
                        }
                    });
                    if (item.checkList.length == 0) {
                        this.options1[index].checkAll = false;
                        this.options1[index].isIndeterminate = false;
                    }
                }
            });
            this.ruleForm.freeArea[allIndex].divisionList.splice(dataIndex, 1);
        },
        //单个选择条件包邮
        handleCheckedCitiesChange(data) {
            let { allIndex, index, _chIndex } = data;
            if (this.options1[index].checkList.length == this.options1[index].cityDivisionList.length) {
                this.ruleForm.freeArea[allIndex].divisionList.push(this.options1[index].divisionId);
                this.options1[index].cityDivisionList.map(item => {
                    this.ruleForm.freeArea[allIndex].divisionList = this.ruleForm.freeArea[allIndex].divisionList.filter(data => {
                        return data != item.divisionId;
                    });
                });
                this.options1[index].checkAll = true;
                this.options1[index].isIndeterminate = false;
            } else if (
                this.options1[index].checkList.length > 0 &&
                this.options1[index].checkList.length < this.options1[index].cityDivisionList.length
            ) {
                //这个是删除功能
                if (this.ruleForm.freeArea[allIndex].divisionList.includes(this.options1[index].cityDivisionList[_chIndex].divisionId)) {
                    this.ruleForm.freeArea[allIndex].divisionList.map((item, _dataIndex) => {
                        if (item == this.options1[index].cityDivisionList[_chIndex].divisionId) {
                            this.ruleForm.freeArea[allIndex].divisionList.splice(_dataIndex, 1);
                        }
                    });
                }
                this.ruleForm.freeArea[allIndex].divisionList = [
                    ...new Set(this.ruleForm.freeArea[allIndex].divisionList.concat(this.options1[index].checkList)),
                ];
                //还差一个不选
                if (this.ruleForm.freeArea[allIndex].divisionList.includes(this.options1[index].divisionId)) {
                    this.ruleForm.freeArea[allIndex].divisionList.map((item, _dataIndex) => {
                        if (item == this.options1[index].divisionId) {
                            this.ruleForm.freeArea[allIndex].divisionList.splice(_dataIndex, 1);
                        }
                    });
                }
                // this.ruleForm.freeArea[allIndex].divisionList = this.options1[index].checkList;
                this.options1[index].checkAll = false;
                this.options1[index].isIndeterminate = true;
            } else {
                //这个是为了删除功能
                if (this.ruleForm.freeArea[allIndex].divisionList.includes(this.options1[index].cityDivisionList[_chIndex].divisionId)) {
                    this.ruleForm.freeArea[allIndex].divisionList.map((item, _dataIndex) => {
                        if (item == this.options1[index].cityDivisionList[_chIndex].divisionId) {
                            this.ruleForm.freeArea[allIndex].divisionList.splice(_dataIndex, 1);
                        }
                    });
                }
                if (this.ruleForm.freeArea[allIndex].divisionList.includes(this.options1[index].divisionId)) {
                    this.ruleForm.freeArea[allIndex].divisionList.map((item, _dataIndex) => {
                        if (item == this.options1[index].divisionId) {
                            this.ruleForm.freeArea[allIndex].divisionList.splice(_dataIndex, 1);
                        }
                    });
                }
                this.options1[index].checkAll = false;
                this.options1[index].isIndeterminate = false;
            }
        },
        ///////////////////
        /**
         * 分割符
         */
        //暂不发货地区不能选择处理
        changeOptionsUnavailableArea(event) {
            let e = event || window.event;
            e.stopPropagation();
            this.$refs['unavailableArea'].checked = !this.$refs['unavailableArea'].checked;
            if (this.$refs['unavailableArea'].checked) {
                let disDivisionList = [];
                this.options1 = JSON.parse(JSON.stringify(this.options2));
                this.ruleForm.freeArea.map((item, _index) => {
                    // this.ruleForm.freeArea[_index].divisionList
                    disDivisionList = disDivisionList.concat(this.ruleForm.freeArea[_index].divisionList);
                    if (this.$refs['freeArea' + _index]) {
                        this.$refs['freeArea' + _index].checked = false;
                    }
                });
                this.ruleForm.areaFee.map((item, index) => {
                    this.ruleForm.areaFee[index].divisionList;
                    disDivisionList = disDivisionList.concat(this.ruleForm.areaFee[index].divisionList);
                    if (this.$refs['areaFee' + index]) {
                        this.$refs['areaFee' + index].checked = false;
                    }
                });
                this.ruleForm.unavailableArea[0].divisionList.map((hasCheck, _hasCheckIndex) => {
                    this.options1.forEach((child, childIndex) => {
                        if (child.divisionId == hasCheck) {
                            child.checkAll = true;
                            child.isIndeterminate = false;
                            child.disabled = false;
                            child.cityDivisionList.forEach(cityChild => {
                                child.checkList.push(cityChild.divisionId);
                                cityChild.disabled = false;
                            });
                        } else {
                            child.checkAll = false;

                            child.cityDivisionList.forEach(cityChild => {
                                if (cityChild.divisionId == hasCheck) {
                                    child.checkList.push(cityChild.divisionId);
                                    cityChild.disabled = false;
                                }
                            });
                            if (child.checkList.length == child.cityDivisionList.length) {
                                child.checkAll = true;
                            } else if (child.checkList.length && child.checkList.length != child.cityDivisionList.length) {
                                child.isIndeterminate = true;
                                child.disabled = false;
                            } else {
                                child.isIndeterminate = false;
                            }
                            // console.log('选择的子项', child.checkList);
                        }
                    });
                });
                disDivisionList.map(item => {
                    this.options1.forEach(child => {
                        if (child.divisionId == item) {
                            child.checkAll = false;
                            child.isIndeterminate = false;
                            child.checkList = [];
                            child.disabled = true;
                            child.cityDivisionList.forEach(cityChild => {
                                cityChild.disabled = true;
                            });
                        } else {
                            child.checkAll = false;
                            child.cityDivisionList.forEach(cityChild => {
                                if (cityChild.divisionId == item) {
                                    cityChild.disabled = true;
                                }
                            });
                            let disabledItem = child.cityDivisionList.filter(item => {
                                return item.disabled;
                            });
                            if (disabledItem.length) {
                                child.isIndeterminate = true;
                                child.disabled = true;
                            } else {
                                child.disabled = false;
                                child.isIndeterminate = false;
                            }
                        }
                    });
                });
            }
        },
        //暂不发货地区全选操作
        changeUnavailableAreaAllIndex(data) {
            let { allIndex, index } = data;
            if (this.options1[index].checkAll) {
                let arr = [];
                this.options1[index].cityDivisionList.map(item => {
                    arr.push(item.divisionId);
                });
                this.options1[index].checkList = arr;
                this.ruleForm.unavailableArea[0].divisionList.push(this.options1[index].divisionId);
                this.options1[index].cityDivisionList.map(item => {
                    this.ruleForm.unavailableArea[0].divisionList = this.ruleForm.unavailableArea[0].divisionList.filter(data => {
                        return data != item.divisionId;
                    });
                });
            } else {
                this.ruleForm.unavailableArea[0].divisionList.map((item, _dataIndex) => {
                    if (item == this.options1[index].divisionId) {
                        this.ruleForm.unavailableArea[0].divisionList.splice(_dataIndex, 1);
                    }
                });
                this.options1[index].checkList = [];
            }
            this.options1[index].isIndeterminate = false;
        },
        //暂不发货地区选择
        closeUnavailableAreaItem(data) {
            let { allIndex, dataIndex, divisionId } = data;
            this.options1.map((item, index) => {
                if (item.divisionId == divisionId) {
                    this.options1[index].checkList = [];
                    this.options1[index].checkAll = false;
                    this.options1[index].isIndeterminate = false;
                } else {
                    item.checkList.map((child, _index) => {
                        if (child == divisionId) {
                            this.options1[index].checkList.splice(_index, 1);
                        }
                    });
                    if (item.checkList.length == 0) {
                        this.options1[index].checkAll = false;
                        this.options1[index].isIndeterminate = false;
                    }
                }
            });
            this.ruleForm.unavailableArea[0].divisionList.splice(dataIndex, 1);
        },
        //暂不选择地区单个选择
        handleUnavailableAreaCheckedCitiesChange(data) {
            let { allIndex, index, _chIndex } = data;
            if (this.options1[index].checkList.length == this.options1[index].cityDivisionList.length) {
                this.ruleForm.unavailableArea[0].divisionList.push(this.options1[index].divisionId);
                this.options1[index].cityDivisionList.map(item => {
                    this.ruleForm.unavailableArea[0].divisionList = this.ruleForm.unavailableArea[0].divisionList.filter(data => {
                        return data != item.divisionId;
                    });
                });
                this.options1[index].checkAll = true;
                this.options1[index].isIndeterminate = false;
            } else if (
                this.options1[index].checkList.length > 0 &&
                this.options1[index].checkList.length < this.options1[index].cityDivisionList.length
            ) {
                //这个是删除功能
                if (this.ruleForm.unavailableArea[0].divisionList.includes(this.options1[index].cityDivisionList[_chIndex].divisionId)) {
                    this.ruleForm.unavailableArea[0].divisionList.map((item, _dataIndex) => {
                        if (item == this.options1[index].cityDivisionList[_chIndex].divisionId) {
                            this.ruleForm.unavailableArea[0].divisionList.splice(_dataIndex, 1);
                        }
                    });
                }
                this.ruleForm.unavailableArea[0].divisionList = [
                    ...new Set(this.ruleForm.unavailableArea[0].divisionList.concat(this.options1[index].checkList)),
                ];
                if (this.ruleForm.unavailableArea[0].divisionList.includes(this.options1[index].divisionId)) {
                    this.ruleForm.unavailableArea[0].divisionList.map((item, _dataIndex) => {
                        if (item == this.options1[index].divisionId) {
                            this.ruleForm.unavailableArea[0].divisionList.splice(_dataIndex, 1);
                        }
                    });
                }
                // this.ruleForm.unavailableArea[0].divisionList = this.options1[index].checkList;
                this.options1[index].checkAll = false;
                this.options1[index].isIndeterminate = true;
            } else {
                //这个是为了删除功能
                if (this.ruleForm.unavailableArea[0].divisionList.includes(this.options1[index].cityDivisionList[_chIndex].divisionId)) {
                    this.ruleForm.unavailableArea[0].divisionList.map((item, _dataIndex) => {
                        if (item == this.options1[index].cityDivisionList[_chIndex].divisionId) {
                            this.ruleForm.unavailableArea[0].divisionList.splice(_dataIndex, 1);
                        }
                    });
                }
                if (this.ruleForm.unavailableArea[0].divisionList.includes(this.options1[index].divisionId)) {
                    this.ruleForm.unavailableArea[0].divisionList.map((item, _dataIndex) => {
                        if (item == this.options1[index].divisionId) {
                            this.ruleForm.unavailableArea[0].divisionList.splice(_dataIndex, 1);
                        }
                    });
                }
                this.options1[index].checkAll = false;
                this.options1[index].isIndeterminate = false;
            }
        },
        //提交操作
        confirmDistribution(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.ruleForm.freeArea.map(item => {
                        if (item.divisionList.length && !item.extraPcs && !item.extraPrice) {
                            this.showError = true;
                            return;
                        }
                    });

                    addOrUpdateModifyFreight(this.ruleForm)
                        .then(response => {
                            if (response) {
                                if (this.ruleForm.freightTemplateId) {
                                    this.$message.success(this.getLocalUseLangData('8000203'));
                                } else {
                                    this.$message.success(this.getLocalUseLangData('8000203'));
                                }

                                this.$emit('add-success');
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    return false;
                }
            });
        },
    },
});
</script>
<style lang="scss" scoped>
.add_distribution {
    width: 200px;
    .el-dialog {
        .el-dialog__body {
            .distribution_content {
                .el-form {
                    .label-line {
                        display: inline-block;
                        .el-form-item__content {
                            .el-input-number,
                            .el-input {
                                width: 100px;
                            }
                        }
                    }
                    .label-line-freeArea {
                        display: inline-block;
                        margin-left: 10px;
                    }
                }
                .label-tips {
                    padding-left: 120px;
                    margin-bottom: 10px;
                    color: #999;
                    font-size: 12px;
                }
                .label-error {
                    color: red;
                    margin-bottom: 10px;
                    padding-left: 120px;
                }
            }
        }
    }
    :deep().el-input-number__increase {
        display: none;
    }
    :deep() .el-input-number__decrease {
        display: none;
    }
    // :deep().freeArea-form-item {
    //     .el-form-item__content {
    //         display: flex;
    //         justify-content: center;
    //     }
    // }
}
</style>
