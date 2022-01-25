import request from '../request'

export function queryBossUserList(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.user.biz.service.UserBossApiService',
        methodName: 'queryBossUserList',
        data: data,
    })
}

//获取用户信息
export function getUserDetailInfo(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.user.biz.service.UserBossApiService',
        methodName: 'getUserDetailInfo',
        data: data,
    })
}
//获得我的下集列表
export function queryMyChildList(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.user.biz.service.UserBossApiService',
        methodName: 'queryMyChildList',
        data: data,
    })
}
//团队订单列表
export function queryTeamOrderList(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.user.biz.service.UserBossApiService',
        methodName: 'queryTeamOrderList',
        data: data,
    })
}
//获取最近7天被分享的记录
export function queryLast7DaysShareRecords(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.user.biz.service.UserBossApiService',
        methodName: 'queryLast7DaysShareRecords',
        data: data,
    })
}
//把一个用户设置为达人（会员）
export function setAsVip(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.user.biz.service.BossUserOperationService',
        methodName: 'setAsVip',
        data: data,
    })
}
//将一个用户设置为可以获得CR奖励资格
export function setAsCrOwner(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.user.biz.service.BossUserOperationService',
        methodName: 'setAsCrOwner',
        data: data,
    })
}
//手动打款
export function manualAmount(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.user.biz.service.BossUserOperationService',
        methodName: 'manualAmount',
        data: data,
    })
}