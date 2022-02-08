<!--  -->
<template>
    <div class="distribution-management">
        <div class="express_delivery">
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span>{{ getLocalUseLangData('8000085') }}</span>
                        <!-- <el-switch
                            v-model="value"
                            size="small"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            active-value="100"
                            inactive-value="0"
                        /> -->
                    </div>
                </template>
                <!-- @click="addDistribution" -->
                <div class="add_express" @click="addDistribution">
                    <i class="el-icon-plus"></i>
                </div>
                <div v-for="(item, index) in freightData" :key="index" class="item">
                    <p class="freight-title">{{ item.templateName }}</p>
                    <!--运费包邮以及发货时间-->
                    <div class="freight-detail" v-if="item.deliverTime">
                        <span class="freight-left">{{ getLocalUseLangData('8000101') }}</span>
                        <span class="freight-right">{{ returndeliveryTime(item.deliverTime) }}</span>
                    </div>
                    <div class="freight-detail" v-if="item.freeShip">
                        <span class="freight-left">{{ getLocalUseLangData('8000133') }}</span>
                        <span class="freight-right">
                            {{ getLocalUseLangData('8000130') }}
                        </span>
                    </div>
                    <!---默认运费-->
                    <div class="freight-detail" v-if="item.defaultFee && !item.freeShip">
                        <span class="freight-left">{{ getLocalUseLangData('8000133') }}</span>
                        <span class="freight-right">
                            {{
                                item.defaultFee[0].pcs +
                                    getLocalUseLangData('8000134') +
                                    item.defaultFee[0].price +
                                    getLocalUseLangData('8000135') +
                                    ',' +
                                    getLocalUseLangData('8000136') +
                                    item.defaultFee[0].extraPcs +
                                    getLocalUseLangData('8000067') +
                                    ',' +
                                    '增加' +
                                    item.defaultFee[0].extraPrice +
                                    getLocalUseLangData('8000135')
                            }}
                        </span>
                    </div>
                    <!--指定地区运费-->
                    <div class="freight-detail" v-if="item.areaFee && !item.freeShip">
                        <span class="freight-left">{{ getLocalUseLangData('8000137') }}</span>
                        <span class="freight-right">
                            <span v-for="(items, index) in item.areaFee" :key="index">
                                <span v-for="(area, _index) in items.areas" :key="index + '_' + _index">
                                    {{ area.divisionName + '   ' }}
                                </span>
                                <!-- {{ items.pcs + ' 件内' + items.price + ' 元, 每增加 ' + items.extraPcs + ' 件, 增加' + items.extraPrice + ' 元' }} -->
                                {{
                                    items.pcs +
                                        getLocalUseLangData('8000134') +
                                        items.price +
                                        getLocalUseLangData('8000135') +
                                        ',' +
                                        getLocalUseLangData('8000136') +
                                        items.extraPcs +
                                        getLocalUseLangData('8000067') +
                                        ',' +
                                        getLocalUseLangData('8000218') +
                                        items.extraPrice +
                                        getLocalUseLangData('8000135')
                                }}
                            </span>
                        </span>
                    </div>
                    <!--暂不发货地区-->
                    <div class="freight-detail" v-if="item.unavailableArea && item.unavailableArea.length">
                        <span class="freight-left">{{ getLocalUseLangData('8000132') }}</span>
                        <span class="freight-right">
                            <span v-for="(unArea, index) in item.unavailableArea" :key="index">
                                <span v-for="(area, index) in unArea.areas" :key="index + '_'">
                                    {{ area.divisionName + '   ' }}
                                </span>
                            </span>
                        </span>
                    </div>
                    <div class="card_footer_out">
                        <div class="default-freight">
                            <div class="is-default" v-if="item.isDefault == 1">
                                <div class="default"></div>
                                <span class="default-text">{{ getLocalUseLangData('8000144') }}</span>
                            </div>
                            <div class="no-default" v-else>
                                <div class="default" @click="setDefault(item.freightTemplateId)"></div>
                                <span class="default-text">{{ getLocalUseLangData('8000144') }}</span>
                            </div>
                        </div>
                        <div class="freight-edit" @click="editFreight(item.freightTemplateId)">
                            <i class="el-icon-edit"></i>
                        </div>
                    </div>
                </div>
            </el-card>
        </div>
        <!--自提-->
        <div class="slef_delivery">
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span>{{ getLocalUseLangData('8000145') }}</span>
                        <el-switch
                            v-if="hasSelfDelivery"
                            v-model="selfDeliveryInfo.status"
                            size="small"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            :active-value="1"
                            :inactive-value="2"
                            @change="changeSelfStatus"
                        />
                    </div>
                </template>
                <!--自提详细信息-->
                <div class="no-self_delivery" v-if="!hasSelfDelivery">
                    <el-button class="goSetting" type="warning" @click="addSelfDeliveryAddress('add')">
                        {{ getLocalUseLangData('8000146') }}
                    </el-button>
                </div>
                <div class="has-self_delivery" v-else>
                    <div class="has-self-delivery-left">
                        <div class="version-detail-now">
                            <span class="version-detail-now-left">{{ getLocalUseLangData('8000148') }}：</span>
                            <span class="version-detail-now-right">
                                {{ selfDeliveryInfo.attention }}
                            </span>
                        </div>
                        <div class="version-detail-now">
                            <span class="version-detail-now-left">{{ getLocalUseLangData('8000109') }}：</span>
                            <span class="version-detail-now-right">
                                {{ selfDeliveryInfo.mobile }}
                            </span>
                        </div>
                        <div class="version-detail-now">
                            <span class="version-detail-now-left">{{ getLocalUseLangData('8000149') }}：</span>
                            <span class="version-detail-now-right">
                                {{ selfDeliveryInfo.address }}
                            </span>
                        </div>
                        <div class="version-detail-now">
                            <span class="version-detail-now-left">{{ getLocalUseLangData('8000150') }}：</span>
                            <span class="version-detail-now-right">
                                {{ selfDeliveryInfo.serviceStartTime + ' - ' + selfDeliveryInfo.serviceEndTime }}
                            </span>
                        </div>
                    </div>
                    <div class="has-self-delivery-right">
                        <el-button @click="addSelfDeliveryAddress('edit')">{{ getLocalUseLangData('8000147') }}</el-button>
                    </div>
                </div>
            </el-card>
        </div>
        <distribution :dialogForm="dialogForm" @handle-close="handleClose" @add-success="addSuccess" ref="distribution"></distribution>
        <!--自提点弹窗-->
        <addSelfDelivery
            ref="addSelfDelivery"
            :selfDeliveryVisible="selfDeliveryVisible"
            :selfDeliveryForm="selfDeliveryForm"
            :type="selfDeliveryType"
            @close-dialog="closeDialog"
            @self-success="selfSuccess"
        ></addSelfDelivery>
    </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';
import distribution from './components/addDistribution';
import addSelfDelivery from './components/addSelfDelivery';
import { freightList, modifySelfPickStation, selfPickStation, getFreightDetail, modifyDefault } from '@/api/newJson/order';
import { deliveryTimeList } from './components/deliveryList';
export default defineComponent({
    setup(props) {
        const selfDeliveryVisible = ref(false);
        return {
            selfDeliveryVisible,
        };
    },
    data() {
        return {
            value: false,
            deliveryTimeList: deliveryTimeList,
            dialogForm: {
                show: false,
            },
            freightData: [],
            // selfDeliveryVisible: false,
            selfDeliveryType: 'add',
            selfDeliveryForm: {
                attention: '',
                mobile: '',
                address: '',
                serviceStartTime: '',
                serviceEndTime: '',
                stationName: '',
                status: 2,
            },
            selfDeliveryInfo: {
                attention: '',
                mobile: '',
                address: '',
                serviceStartTime: '',
                serviceEndTime: '',
                stationName: '',
                status: 2,
            },
            hasSelfDelivery: false,
        };
    },

    components: {
        distribution,
        addSelfDelivery,
    },

    computed: {},

    mounted() {
        this.getFreightList();
        this.getSelfPickStation();
    },

    methods: {
        returndeliveryTime(deliverTime) {
            let str = '';
            this.deliveryTimeList.map(item => {
                if (item.value == deliverTime) {
                    str = this.getLocalUseLangData('8000219').replace('{}', item.label);
                    return str;
                }
            });
            return str;
        },
        //设置默认运费
        setDefault(freightTemplateId) {
            modifyDefault({
                templateId: freightTemplateId,
                isDefault: 1,
            })
                .then(response => {
                    if (response) {
                        // this.$message.success('设置成功');
                        this.getFreightList();
                    }
                })
                .catch(error => {});
        },
        addDistribution() {
            this.dialogForm.show = true;
            this.$nextTick(() => {
                this.$refs['distribution'].ruleForm.freightTemplateId = '';

                this.$refs['distribution'].ruleForm.defaultFee = [
                    {
                        divisionList: [],
                        pcs: 1, //初件数
                        extraPcs: '1', //额外件数
                        price: '0', //初件数邮费
                        extraPrice: '0', //每额外件数邮费
                    },
                ];
                this.$refs['distribution'].ruleForm.areaFee = [
                    {
                        divisionList: [],
                        pcs: 1, //初件数
                        extraPcs: '1', //额外件数
                        price: '0', //初件数邮费
                        extraPrice: '0', //每额外件数邮费
                    },
                ];
                this.$refs['distribution'].ruleForm.freeArea = [
                    {
                        divisionList: [],
                        extraPcs: '',
                        extraPrice: '',
                    },
                ];
                this.$refs['distribution'].ruleForm.unavailableArea = [
                    {
                        divisionList: [],
                    },
                ];
            });
        },
        editFreight(templateId) {
            getFreightDetail({
                templateId,
            })
                .then(response => {
                    if (response) {
                        this.dialogForm.show = true;

                        this.$nextTick(() => {
                            this.$refs['distribution'].ruleForm.templateName = response.data.templateName;
                            this.$refs['distribution'].ruleForm.freightTemplateId = response.data.freightTemplateId;
                            this.$refs['distribution'].ruleForm.deliverTime = response.data.deliverTime || ''; //发货时间
                            this.$refs['distribution'].ruleForm.freeShip = response.data.freeShip || false;
                            this.$refs['distribution'].ruleForm.unavailableArea = response.data.unavailableArea || [
                                {
                                    divisionList: [],
                                },
                            ];
                            if (!response.data.freeShip) {
                                this.$refs['distribution'].ruleForm.defaultFee = response.data.defaultFee || [];
                                this.$refs['distribution'].ruleForm.areaFee = response.data.areaFee || [];
                                this.$refs['distribution'].ruleForm.freeArea = response.data.freeArea || [];
                            }
                        });
                    }
                })
                .catch(error => {});
        },
        handleClose() {
            this.dialogForm.show = false;
        },
        getFreightList() {
            freightList({})
                .then(response => {
                    console.log(response);
                    this.freightData = response.data;
                })
                .catch(error => {});
        },
        addSuccess() {
            this.dialogForm.show = false;
            this.getFreightList();
        },
        //获取自提点
        getSelfPickStation() {
            selfPickStation({})
                .then(response => {
                    if (response.data) {
                        this.hasSelfDelivery = true;
                        this.selfDeliveryInfo = response.data;
                    }
                })
                .catch(error => {});
        },
        addSelfDeliveryAddress(type) {
            this.selfDeliveryType = type;

            if (type == 'add') {
                this.selfDeliveryVisible = true;
            } else {
                this.selfDeliveryVisible = true;
                this.$nextTick(() => {
                    this.selfDeliveryForm.attention = this.selfDeliveryInfo.attention;
                    this.selfDeliveryForm.mobile = Number(this.selfDeliveryInfo.mobile);
                    this.selfDeliveryForm.address = this.selfDeliveryInfo.address;
                    this.selfDeliveryForm.serviceStartTime = this.selfDeliveryInfo.serviceStartTime;
                    this.selfDeliveryForm.serviceEndTime = this.selfDeliveryInfo.serviceEndTime;
                    this.selfDeliveryForm.status = this.selfDeliveryInfo.status;
                });
            }
        },
        changeSelfStatus(status) {
            modifySelfPickStation(this.selfDeliveryInfo)
                .then(response => {
                    if (response) {
                        this.$message.success(this.getLocalUseLangData('8000203'));
                    }
                })
                .catch(error => {
                    this.selfDeliveryInfo.status = !status;
                });
        },
        selfSuccess() {
            this.selfDeliveryForm.mobile = String(this.selfDeliveryForm.mobile);
            modifySelfPickStation(this.selfDeliveryForm)
                .then(response => {
                    if (response) {
                        if (this.selfDeliveryType == 'add') {
                            this.$message.success(this.getLocalUseLangData('8000203'));
                        } else {
                            this.$message.success(this.getLocalUseLangData('8000203'));
                        }
                        this.selfDeliveryVisible = false;
                        this.getSelfPickStation();
                    }
                })
                .catch(error => {});
        },
        closeDialog() {
            this.selfDeliveryVisible = false;
        },
    },
});
</script>
<style lang="scss" scoped>
.distribution-management {
    width: 100%;
    height: auto;
    overflow: scroll;
    :deep() .card-header {
        display: flex;
        justify-content: space-between;
    }
    .express_delivery {
        .box-card {
            box-shadow: none;
            :deep() .el-card__body {
                display: flex;
                flex-wrap: wrap;
                .add_express {
                    width: 250px;
                    height: 300px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #ccc;
                    border-radius: 10px;
                    margin-right: 20px;
                    margin-top: 10px;
                    cursor: pointer;
                    i {
                        font-size: 40px;
                    }
                }
                .item {
                    width: 250px;
                    height: 300px;
                    display: flex;
                    flex-direction: column;
                    border: 1px solid #00000026;
                    border-radius: 12px;
                    background-color: #fff;
                    margin-right: 20px;
                    margin-top: 10px;
                    padding: 20px;
                    box-sizing: border-box;
                    position: relative;
                    .freight-title {
                        font-weight: 500;
                    }
                    .freight-detail {
                        margin-top: 20px;
                        font-size: 14px;
                        display: flex;
                        .freight-left {
                            margin-right: 20px;
                            display: inline-block;
                            color: #7e8081;
                            // width: 100px;
                        }
                        .freight-right {
                            flex: 1;
                            // height: 40px;
                            line-height: 20px;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                        }
                    }
                    .card_footer_out {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        /* flex-direction: inherit; */
                        width: 100%;
                        left: 0;
                        position: absolute;
                        bottom: 10px;
                        padding: 0 20px;
                        box-sizing: border-box;
                        .default-freight {
                            .no-default {
                                display: flex;
                                align-items: center;
                                .default {
                                    width: 20px;
                                    height: 20px;
                                    box-sizing: border-box;
                                    border-radius: 50%;
                                    border: 1px solid #0000004d;
                                    position: relative;
                                    cursor: pointer;
                                    margin-right: 10px;
                                }
                                .default-text {
                                    font-size: 14px;
                                }
                            }
                            .is-default {
                                display: flex;
                                align-items: center;
                                .default {
                                    width: 20px;
                                    height: 20px;
                                    box-sizing: border-box;
                                    border-radius: 50%;
                                    border: 1px solid #ff6146;
                                    position: relative;
                                    cursor: pointer;
                                    margin-right: 10px;
                                    &::before {
                                        content: '';
                                        width: 10px;
                                        height: 10px;
                                        border-radius: 50%;
                                        background-color: #ff6146;
                                        position: absolute;
                                        left: 50%;
                                        top: 50%;
                                        transform: translate(-50%, -50%);
                                    }
                                }
                                .default-text {
                                    font-size: 14px;
                                }
                            }
                        }
                        .freight-edit {
                            cursor: pointer;
                            i {
                                font-size: 20px;
                            }
                        }
                    }
                }
            }
        }
    }
    .slef_delivery {
        margin-top: 10px;
        .el-card {
            :deep().el-card__body {
                height: 200px;
                .no-self_delivery {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .goSetting {
                        width: 200px;
                    }
                }
                .has-self_delivery {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .has-self-delivery-left {
                        .version-detail-now {
                            font-size: 14px;
                            margin-top: 20px;
                            .version-detail-now-left {
                                display: inline-block;
                                width: 150px;
                            }
                            .version-detail-now-right-red {
                                color: #f56c6c;
                            }
                        }
                    }
                }
            }
        }
    }
    .el-card {
        box-shadow: none;
    }
    :deep().el-card__header {
        height: 53px;
        line-height: 33px;
    }
}
</style>
