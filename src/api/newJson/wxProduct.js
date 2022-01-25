import request from '../request';

//商品同步至微信
export function getDownstreamProducts(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.product.server.api.boss.BossWxProductService',
        methodName: 'getDownstreamProducts',
        data: data,
    });
}
//商品同步至微信
export function add2Downstream(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.product.server.api.boss.BossWxProductService',
        methodName: 'add2Downstream',
        data: data,
    });
}
//快速更新只能同步价格库存
export function fastUpdate(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.product.server.api.boss.BossWxProductService',
        methodName: 'fastUpdate',
        data: data,
    });
}
//推送商品至wx
export function pushProduct(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.product.server.api.boss.BossWxProductService',
        methodName: 'pushProduct',
        data: data,
    });
}
//全量更新 能更新图片说明标题及价格
export function updateMmxxToWxProductList(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.product.server.api.boss.BossWxProductService',
        methodName: 'updateDownstream',
        data: data,
    });
}
//微信商品上下架
export function modifyShelveStatus(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.product.server.api.boss.BossWxProductService',
        methodName: 'modifyShelveStatus',
        data: data,
    });
}
//modifyDownstreamPriceStock更新一个下游商品的额外属性
export function modifyDownstreamPriceStock(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.product.server.api.boss.BossWxProductService',
        methodName: 'modifyDownstreamPriceStock',
        data: data,
    });
}
//主动刷新微信的审核状态
export function refreshAll(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.product.server.api.boss.BossWxProductService',
        methodName: 'refreshAll',
        data: data,
    });
}
