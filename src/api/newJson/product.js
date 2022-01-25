import request from '../request'
//新增商品
export function addProduct(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.product.server.api.boss.BossProductService',
        methodName: 'addProduct',
        data: data,
    })
}
//获取商品列表
export function productList(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.product.server.api.boss.BossProductService',
        methodName: 'productList',
        data: data,
    })
}
//获取商品详情

export function productDetailInfo(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.product.server.api.boss.BossProductService',
        methodName: 'productDetail',
        data: data,
    })
}
//更新商品
export function updateProduct(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.product.server.api.boss.BossProductService',
        methodName: 'updateProduct',
        data: data,
    })
}
//删除商品
export function deleteProduct(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.product.server.api.boss.BossProductService',
        methodName: 'deleteProduct',
        data: data,
    })
}
//商品上下架
export function batchModifyShelve(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.product.server.api.boss.BossProductService',
        methodName: 'batchModifyShelve',
        data: data,
    })
}
//获取第三方商品列表
export function thirdProductList(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.product.server.api.boss.BossProductService',
        methodName: 'getThirdProductList',
        data: data,
    });
}
//获取第三方商品精选列表
export function collectThirdProductList(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.product.server.api.boss.BossProductService',
        methodName: 'getCollectThirdProductList',
        data: data,
    });
}
//获取第三方商品详情
export function thirdDetail(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.product.server.api.boss.BossProductService',
        methodName: 'getCollectThirdProduct',
        data: data,
    });
}
//获取第三方商品移到精选
export function collectThirdProduct(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.product.server.api.boss.BossProductService',
        methodName: 'collectThirdProduct',
        data: data,
    });
}
//保存一个第三方商品为草稿
export function draftThirdProduct(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.product.server.api.boss.BossProductService',
        methodName: 'draftThirdProduct',
        data: data,
    });
}
//商品销量修改
export function updateShowSoldCount(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.product.server.api.boss.BossProductService',
        methodName: 'updateShowSoldCount',
        data: data,
    })
}
//根据商品ID获取某一个商品近期的被访问数
export function productViewListByTime(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.product.server.api.boss.BossProductService',
        methodName: 'productViewListByTime',
        data: data,
    })
}
//根据商品ID%20获取某个商品近期在不同平台被访问数
export function productViewByMiniApp(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.product.server.api.boss.BossProductService',
        methodName: 'productViewByMiniApp',
        data: data,
    })
}
//获取商品的分享用户与触达用户数据
export function getShareTouchUserList(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.user.biz.service.BossUserStatisticsService',
        methodName: 'getShareTouchUserList',
        data: data,
    })
}
//获取商品分享的明细数据
export function downloadShareDetail(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.user.biz.service.BossUserStatisticsService',
        methodName: 'downloadShareDetail',
        data: data,
    })
}