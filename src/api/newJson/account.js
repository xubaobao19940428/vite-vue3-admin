import request from '../request'

export function addAssistant(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.seller.server.biz.AssistantService',
        methodName: 'addAssistant',
        data: data,
    })
}
export function assistants(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.seller.server.biz.AssistantService',
        methodName: 'assistants',
        data: data,
    })
}
export function delAssistant(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.seller.server.biz.AssistantService',
        methodName: 'delAssistant',
        data: data,
    })
}
//结算信息已结算
export function clearsShop(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.seller.server.biz.boss.BossClearService',
        methodName: 'clears',
        data: data,
    })
}
//结算信息未结算
export function accountsShop(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.seller.server.biz.boss.BossClearService',
        methodName: 'accounts',
        data: data,
    })
}
//未结算结算

export function doClear(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.seller.server.biz.boss.BossClearService',
        methodName: 'doClear',
        data: data,
    })
}

//结算信息已结算
export function clearsShopOrder(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.seller.server.biz.boss.BossClearService',
        methodName: 'details',
        data: data,
    })
}