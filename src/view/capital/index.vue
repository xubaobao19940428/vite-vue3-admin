<!-- 组件说明 -->
<template>
    <div class="capital">
        <div class="capital-top">
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span>{{ getLocalUseLangData('8000176') }}</span>
                        <el-button
                            v-if="(JSON.stringify(banlData) == '{}') != true"
                            @click="centerDialogVisible = true"
                            type="primary"
                            size="small"
                            round
                        >
                            {{ getLocalUseLangData('8000168') }}
                        </el-button>
                    </div>
                </template>
                <el-descriptions column="1" v-if="(JSON.stringify(banlData) == '{}') != true">
                    <el-descriptions-item :label="getLocalUseLangData('8000178') + ':'">{{ banlData.cardNumber }}</el-descriptions-item>
                    <el-descriptions-item :label="getLocalUseLangData('8000179') + ':'">{{ banlData.bankName }}</el-descriptions-item>
                    <el-descriptions-item :label="getLocalUseLangData('8000180') + ':'">{{ banlData.cardHolderName }}</el-descriptions-item>
                </el-descriptions>
                <el-button v-else @click="centerDialogVisible = true" class="goSetting" type="warning">
                    {{ getLocalUseLangData('8000177') }}
                </el-button>
            </el-card>
            <el-dialog v-model="centerDialogVisible" width="700px" :title="getLocalUseLangData('8000177')">
                <el-form :rules="rules" :model="queryData" class="demo-form-inline" label-width="120px">
                    <el-form-item prop="account" :label="getLocalUseLangData('8000178')">
                        <el-input style="width: 300px" v-model="queryData.account" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item prop="bank" :label="getLocalUseLangData('8000179')">
                        <el-input style="width: 300px" v-model="queryData.bank" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item prop="name" :label="getLocalUseLangData('8000180')">
                        <el-input style="width: 300px" v-model="queryData.name" placeholder=""></el-input>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="centerDialogVisible = false">{{ getLocalUseLangData('8000152') }}</el-button>
                        <el-button type="primary" @click="preserve">{{ getLocalUseLangData('8000151') }}</el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { getShopBankVO, saveOrUpdateShopBank } from '@/api/newJson/service.js';
import { defineComponent, ref } from 'vue';
export default {
    name: 'capital',
    setup() {
        return {
            centerDialogVisible: ref(false),
        };
    },
    components: {},
    data() {
        return {
            queryData: {
                account: '',
                bank: '',
                name: '',
            },
            rules: {
                name: [
                    {
                        required: true,
                        // message: '请输入开户人姓名',
                        // trigger: "blur",
                    },
                    // {
                    //     min: 3,
                    //     max: 5,
                    //     message: 'Length should be 3 to 5',
                    //     trigger: 'blur',
                    // },
                ],
                account: [
                    {
                        required: true,
                        // message: '请输入开户行账号',
                        // trigger: "change",
                    },
                ],
                bank: [
                    {
                        required: true,
                        // message: '请输入开户行名称',
                        // trigger: "change",
                    },
                ],
            },
            banlData: {},
        };
    },
    computed: {},
    methods: {
        preserve() {
            saveOrUpdateShopBank({
                bankName: this.queryData.bank,
                cardNumber: this.queryData.account,
                cardHolderName: this.queryData.name,
            }).then(res => {
                getShopBankVO().then(res => {
                    this.banlData = res.data;
                });
                this.centerDialogVisible = false;
            });
        },
    },
    mounted() {
        getShopBankVO().then(res => {
            this.banlData = res.data;
        });
    },
};
</script>

<style lang="scss" scoped>
.capital {
    width: 100%;
    height: 100%;
    .capital-top {
        .box-card {
            .card-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .goSetting {
                width: 200px;
                margin: 100px 44%;
            }
        }
    }
}
</style>
