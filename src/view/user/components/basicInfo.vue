<template>
    <div>
        <el-card class="basic-info-card">
            <div slot="header" class="clearfix">
                <span>基本信息</span>
            </div>
            <el-row>
                <el-col :span="4">
                    <div class="user-base-info">
                        <div class="user-avatar-box">
                            <img v-if="basicInfo.avatar" :src="dealShowFileSrc(basicInfo.avatar)" />
                            <img v-else src="../../../assets/user-header.png" />
                        </div>
                        <div class="user-name">{{ basicInfo.nickName }}</div>
                    </div>
                </el-col>
                <el-col :span="20">
                    <table class="user-info-table">
                        <tr>
                            <td>用户ID</td>
                            <td>
                                {{ basicInfo.userId || '-' }}
                            </td>
                            <td>用户昵称</td>
                            <td>
                                {{ basicInfo.nickname || '-' }}
                            </td>

                            <td>注册时间</td>
                            <td>{{ timestampToTime(basicInfo.createTime) }}</td>
                        </tr>
                        <tr>
                            <!-- <td>性别</td>
                            <td>{{ basicInfo.gender || '-' }}</td> -->
                            <td>是否签署达人协议</td>
                            <td>{{ basicInfo.signAgreement ? '已签署' : '未签署' }}</td>
                            <td>是否是Vip</td>
                            <td>{{ basicInfo.vip ? '是' : '不是' }}</td>
                            <td>绑定时间</td>
                            <td>{{ basicInfo.inviteTime }}</td>
                        </tr>
                        <!-- <tr>
                            <td>出生日期</td>
                            <td>{{ basicInfo.birthday || '-' }}</td>
                            <td>上级ID</td>
                            <td>{{ basicInfo.parentId || '-' }}</td>
                            <td>收货地址个数</td>
                            <td>{{ basicInfo.address || '-' }}</td>
                        </tr> -->
                        <tr>
                            <td>国家</td>
                            <td>中国</td>
                            <td>上级等级</td>
                            <td>{{ basicInfo.parentLevel || '-' }}</td>
                            <td>电话</td>
                            <td>{{ basicInfo.mobile || '-' }}</td>
                        </tr>

                        <tr>
                            <td>邮箱</td>
                            <td>{{ basicInfo.mail || '-' }}</td>
                            <!-- <td>{{ basicInfo.appType ? '成为金卡时间' : '成为AM时间' }}</td> -->
                            <td>成为达人时间</td>
                            <td>{{ basicInfo.memberTime ? timestampToTime(basicInfo.memberTime) : '-' }}</td>
                            <td>微信号</td>
                            <td>{{ basicInfo.weixinAccount || '-' }}</td>
                        </tr>
                        <tr>
                            <td>邀请码</td>
                            <td>{{ basicInfo.inviteCode || '-' }}</td>
                            <td>微信二维码</td>
                            <td v-if="basicInfo.wechat_qr"><span @click="showQrCode(basicInfo.wechat_qr)" class="link">查看二维码</span></td>
                            <td v-else>无</td>
                            <td>会员签约时间</td>
                            <td v-if="basicInfo.signAgreementTime">{{ timestampToTime(basicInfo.signAgreementTime) }}</td>
                            <td v-else>未签约</td>
                        </tr>
                        <tr>
                            <td>是否有CR权限</td>
                            <td v-if="basicInfo.crOwner">有</td>
                            <td v-else>无</td>
                            <td>获得cr资格的时间</td>
                            <td>{{ basicInfo.crDateTime ? timestampToTime(basicInfo.crDateTime) : '-' }}</td>
                        </tr>
                    </table>
                </el-col>
            </el-row>
        </el-card>
        <image-preview v-show="image.show" :close="closePreview" :index="image.index" :list="image.list"></image-preview>
    </div>
</template>

<script>
// import imagePreview from '@/components/imagePreview'
import { mapState } from 'vuex';
export default {
    name: 'basicInfo',
    props: {
        basicInfo: {
            type: Object,
            default: function() {},
        },
    },
    components: {
        // imagePreview
    },
    data() {
        return {
            image: {
                show: false,
                index: 0,
                list: [],
            },
            memberType: {
                0: '普通会员',
                1: '小礼包会员',
                2: '大礼包会员',
                5: '直播会员',
                7: '断绑跃迁会员',
            },
        };
    },
    computed: {
        // ...mapState({
        //     memberLevel: state => state.dict.memberLevel,
        //     MeOneMemberLevel: state => state.dict.MeOneMemberLevel,
        // }),
    },
    methods: {
        showQrCode(imgUrl) {
            this.image.list.push(imgUrl);
            this.image.show = true;
        },
        closePreview() {
            this.image.index = 0;
            this.image.show = false;
            this.image.list = [];
        },
    },
};
</script>

<style lang="scss" scoped>
.user-base-info {
    width: 100%;
    margin-top: 80px;
    .user-avatar-box {
        width: 100px;
        height: 100px;
        border-radius: 100%;
        overflow: hidden;
        text-align: center;
        margin: 0 auto;
        img {
            width: 100px;
        }
    }
    .user-name {
        text-align: center;
        padding: 10px 0;
    }
}

.user-info-table {
    width: 100%;
    min-width: 850px;
    border-left: 1px solid #ebeef5;
    border-top: 1px solid #ebeef5;
    color: #444;
    font-size: 14px;
    border-spacing: 0;
    overflow: auto;
    td {
        border-right: 1px solid #ebeef5;
        border-bottom: 1px solid #ebeef5;
        box-sizing: border-box;
        padding: 14px;
    }
    td:nth-child(2n + 1) {
        background: #f5f7fa;
    }
    i {
        cursor: pointer;
    }
}
</style>
