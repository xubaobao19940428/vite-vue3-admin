import request from '../request';

export function addSeller(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.seller.server.biz.SellerService',
        methodName: 'addSeller',
        data: data,
    });
}
export function getSeller(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.seller.server.biz.SellerService',
        methodName: 'getSeller',
        data: data,
    });
}
export function editorSeller(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.seller.server.biz.SellerService',
        methodName: 'editorSeller',
        data: data,
    });
}
//获取商家列表
export function getSellers(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.seller.server.biz.SellerService',
        methodName: 'getSellers',
        data: data,
    });
}
//获取店铺列表
export function getShops(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.seller.server.biz.ShopService',
        methodName: 'getShops',
        data: data,
    });
}
//获取省市区
export function divisionList(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.seller.server.biz.BizDivisionService',
        methodName: 'Division',
        data: data,
    });
}
//保存店铺
export function addShop(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.seller.server.biz.ShopService',
        methodName: 'addShop',
        data: data,
    });
}
//获取店铺详情
export function getShop(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.seller.server.biz.ShopService',
        methodName: 'getShop',
        data: data,
    });
}
//更新店铺
export function editorShop(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.seller.server.biz.ShopService',
        methodName: 'editorShop',
        data: data,
    });
}

//配置配送区域
export function addFencing(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.seller.server.biz.ShopFencingService',
        methodName: 'addFencing',
        data: data,
    });
}
//配置配送列表
export function fencingPage(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.seller.server.biz.ShopFencingService',
        methodName: 'getFencingPage',
        data: data,
    });
}
//得到配送地区详情

export function fencingDetail(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.seller.server.biz.ShopFencingService',
        methodName: 'getFencing',
        data: data,
    });
}