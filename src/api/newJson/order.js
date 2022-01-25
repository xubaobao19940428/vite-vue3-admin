import request from '../request'
//订单相关接口
/**
 * 订单详情
 *
 *
 */
export function orderDetail(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.order.server.service.boss.OrderBossService',
        methodName: 'orderDetail',
        data: data,
    })
}

/**
 * 获取订单列表
 *
 *
 */
export function orderList(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.order.server.service.boss.OrderBossService',
        methodName: 'orderList',
        data: data,
    })
}
/**
 * 取消订单
 */
export function cancelOrderDetail(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.order.server.service.boss.OrderBossService',
        methodName: 'cancelOrder',
        data: data,
    })
}
/**
 * 获取售后订单
 */
export function afterSaleOrder(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.order.server.service.boss.OrderBossService',
        methodName: 'refundList',
        data: data,
    })
}
/**
 * 订单导出
 */
export function downOrderInfo(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.order.server.service.boss.OrderBossService',
        methodName: 'downOrderInfo',
        data: data,
    })
}
/**
 * 售后订单拒绝退款
 */
export function refundAudit(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.order.server.service.boss.OrderBossService',
        methodName: 'refundAudit',
        data: data,
    })
}
//上传发货单
export function uploadShipOrder(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.order.server.service.boss.OrderBossService',
        methodName: 'uploadShipOrder',
        data: data,
    })
}
//确认发货
export function ackShipOrder(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.order.server.service.boss.OrderBossService',
        methodName: 'ackShipOrder',
        data: data,
    })
}
//导出未使用订单，按照支付时间排序
export function downOrderShipInfo(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.order.server.service.boss.OrderBossService',
        methodName: 'downOrderShipInfo',
        data: data,
    })
}
//根据city获取经纬度
export function getDivisionGps(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.common.server.api.LocationService',
        methodName: 'getDivisionGps',
        data: data,
    })
}
//下载美妙团全部推广员订单数据(异步)
export function downloadPromoterData(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.order.server.service.boss.WeixinShopPromoterReportService',
        methodName: 'downloadPromoterData',
        data: data,
    })
}