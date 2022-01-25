import request from '../request'

//获取优惠券列表
export function getCoupons(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.promotion.server.api.boss.BossCouponService',
        methodName: 'getCoupons',
        data: data,
    })
}
//新增优惠券
export function addCoupon(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.promotion.server.api.boss.BossCouponService',
        methodName: 'addCoupon',
        data: data,
    })
}
//获取优惠券详情
export function couponDetail(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.promotion.server.api.boss.BossCouponService',
        methodName: 'couponDetail',
        data: data,
    })
}
//获取优惠券详情
export function modifyCoupon(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.promotion.server.api.boss.BossCouponService',
        methodName: 'modifyCoupon',
        data: data,
    })
}
//发放优惠券
export function addOldUserCoupon(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.promotion.server.api.boss.BossCouponService',
        methodName: 'sendCoupon',
        data: data,
    })
}
//新增优惠券券包
export function addOrEditCouponPack(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.promotion.server.api.boss.BossCouponPackService',
        methodName: 'modifyPack',
        data: data,
    })
}
//获取券包列表
export function couponPackList(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.promotion.server.api.boss.BossCouponPackService',
        methodName: 'getPackList',
        data: data,
    })
}

//获取券包详情
export function getPack(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.promotion.server.api.boss.BossCouponPackService',
        methodName: 'getPack',
        data: data,
    })
}
//获取券包详情
export function disablePack(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.promotion.server.api.boss.BossCouponPackService',
        methodName: 'disablePack',
        data: data,
    })
}
//发放券包
export function sendCouponPack(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.promotion.server.api.boss.BossCouponPackService',
        methodName: 'sendCouponPack',
        data: data,
    })
}
//得到券包剩余库存
export function packStock(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.promotion.server.api.boss.BossCouponPackService',
        methodName: 'getPackStock',
        data: data,
    })
}