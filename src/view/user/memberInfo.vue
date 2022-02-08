<template>
    <div class="app-container">
        <div class="filter-container">
            <el-tabs value="memberInfo" v-model="currentTab" @tab-click="handleTabClick">
                <el-tab-pane label="会员详情" name="memberInfo">
                    <basic-info :basicInfo="userInfo"></basic-info>
                    <member-active-info :memberActiveInfo="memberActiveInfo" class="active-info"></member-active-info>
                    <!-- <member-value-info></member-value-info> -->
                    <team-info :teamInfo="teamInfo" :chainList="chainList" class="active-info"></team-info>
                    <!-- <member-income-info></member-income-info> -->
                </el-tab-pane>
                <el-tab-pane label="团队成员列表" name="teamMemberList">
                    <team-member-list ref="teamMemberList"></team-member-list>
                </el-tab-pane>
                <el-tab-pane label="团队订单列表" name="teamOrderList">
                    <team-order-list ref="teamOrderList"></team-order-list>
                </el-tab-pane>
                <!-- <el-tab-pane label="收货地址列表" name="receivingAddressList">
                    <receiving-address-list ref="receivingAddressList"></receiving-address-list>
                </el-tab-pane> -->
                <el-tab-pane label="订单列表" name="orderList">
                    <order-list ref="orderList"></order-list>
                </el-tab-pane>
                <el-tab-pane label="近七天被分享记录" name="shareTable">
                    <share-table ref="shareTable"></share-table>
                </el-tab-pane>
                <!-- <el-tab-pane label="银行卡信息列表" name="bankCardList">
                    <bank-card-list ref="bankCardList"></bank-card-list>
                </el-tab-pane> -->
                <!--<el-tab-pane label="优惠券列表" name="couponList">
                    <coupon-list ref="couponList"></coupon-list>
                </el-tab-pane>
                <el-tab-pane label="收藏列表" name="favoriteList">
                    <favorite-list ref="favoriteList"></favorite-list>
                </el-tab-pane> -->
                <!-- <el-tab-pane label="会员跟踪" name="memberFollow">
                    <memberFollow ref="memberFollow" v-if="userMemberFollow"></memberFollow>
                </el-tab-pane> -->
                <!-- <el-tab-pane label="销售报表" name="saleReport">
                    <sale-report ref="saleReport"></sale-report>
                </el-tab-pane> -->
            </el-tabs>
        </div>
    </div>
</template>

<script>
import _ from 'lodash';
// import { getUserManageInfo, getFatherChain } from '@/request/user';
import { getUserDetailInfo } from '@/api/newJson/user';
import basicInfo from './components/basicInfo';
import memberActiveInfo from './components/memberActiveInfo';
// // import memberValueInfo from './components/memberValueInfo';
import teamInfo from './components/teamInfo';
// import memberIncomeInfo from './components/memberIncomeInfo';
import teamMemberList from './tables/teamMemberList';
import teamOrderList from './tables/teamOrderList';
// import receivingAddressList from './tables/receivingAddressList';
import orderList from './tables/orderList';
import bankCardList from './tables/bankCardList';
import shareTable from './tables/shareTable';
// import couponList from './tables/couponList';
// import favoriteList from './tables/favoriteList';
// // import memberFollow from './memberFollow'
// import saleReport from './tables/saleReport';
export default {
    name: 'memberInfo',
    components: {
        basicInfo,
        memberActiveInfo,
        // // memberValueInfo,
        teamInfo,
        shareTable,
        // memberIncomeInfo,
        teamMemberList,
        teamOrderList,
        // receivingAddressList,
        orderList,
        bankCardList,
        // couponList,
        // favoriteList,
        // // memberFollow,
        // saleReport,
    },
    data() {
        return {
            currentTab: 'memberInfo',
            userInfo: {},
            userId: null,
            memberActiveInfo: [
                {
                    loginTime: '-',
                    lastOrderTime: '-',
                    usedCoupon: '-',
                    hasCoupon: '-',
                    invalidCoupon: '-',
                },
            ],
            teamInfo: {},
            chainList: [],
            userMemberFollow: false,
        };
    },
    computed: {
        memberLevel() {
            return this.$store.state.dict.memberLevel;
        },
    },
    created() {
        if (this.$route.query.userId) {
            this.userId = Number(this.$route.query.userId);
            this.getUserDetail();
            // this.getFatherChainList();
        }
    },
    mounted() {
        if (this.$route.query.tabsName) {
            this.currentTab = this.$route.query.tabsName;
            if (this.currentTab == 'teamMemberList') {
                this.$refs['teamMemberList'].getTeamMemberList();
            } else if (this.currentTab == 'teamOrderList') {
            } else if (this.currentTab == 'memberFollow') {
                this.userMemberFollow = true;
            }
        }
    },
    methods: {
        handleTabClick(tab) {
            console.log(tab);
            switch (tab.props.name) {
                case 'teamMemberList':
                    this.$refs['teamMemberList'].getTeamMemberList();
                    break;
                case 'teamOrderList':
                    this.$refs['teamOrderList'].search(1);
                    break;
                case 'orderList':
                    this.$router.push({
                        name: 'orderList',
                        query: {
                            userId: this.userId,
                        },
                    });
                    break;
                case 'shareTable':
                    this.$refs['shareTable'].getLast7DaysShareRecords();
                    break;
                // case 'couponList':
                //     this.$refs['couponList'].getUserCouponList()
                //     break
                // case 'favoriteList':
                //     this.$refs['favoriteList'].getUserProductCollectList()
                //     break
                // case 'saleReport':
                //     this.$refs['saleReport'].getDataCrAndCb()
                // case 'memberFollow':
                //     this.userMemberFollow=true
                default:
                    break;
            }
        },
        // 获取用户信息
        getUserDetail() {
            let params = {
                userId: this.userId,
            };
            getUserDetailInfo(params)
                .then(response => {
                    let res = response;
                    this.userInfo = res.data;
                    this.memberActiveInfo[0].loginTime = res.data.loginTime;
                    this.memberActiveInfo[0].lastOrderTime = res.data.lastOrderTime;
                    this.chainList = res.data.parentList;
                })
                .catch(err => {
                    console.error(err);
                });
        },
        getFatherChainList() {
            let params = {
                userId: this.userId,
            };
            getFatherChain(params)
                .then(response => {
                    let res = response;
                    console.log(res);
                    this.chainList = res.userFatherPb;
                    _.forEach(this.chainList, item => {
                        item.memberLevel = this.memberLevel[item.memberLevel];
                    });
                })
                .catch(err => {
                    console.error(err);
                });
        },
    },
};
</script>

<style lang="scss">
.el-tab-pane {
    padding: 10px;
}
</style>

<style lang="scss" scoped>
.app-container {
    background: #fff !important;
}
.active-info {
    margin: 20px 0;
}
</style>
