import request from '../request';
// 客服信息
export function getShopStaffList(data) {
    return request({
        serverName: 'melf',
        interfaceName: 'shop.melf.shop.server.api.ShopAdminService',
        methodName: 'getShopStaffList',
        data: data,
    });
}
// 新增客服信息
export function saveOrUpdateShopStaff(data) {
    return request({
        serverName: 'melf',
        interfaceName: 'shop.melf.shop.server.api.ShopAdminService',
        methodName: 'saveOrUpdateShopStaff',
        data: data,
    });
}
// 编辑客服信息
// export function saveOrUpdateShopStaff(data) {
//     return request({
//         serverName: 'melf',
//         interfaceName: 'shop.melf.shop.server.api.ShopAdminService',
//         methodName: 'saveOrUpdateShopStaff',
//         data: data,
//     });
// }
// 删除客服信息
export function deleteShopStaff(data) {
    return request({
        serverName: 'melf',
        interfaceName: 'shop.melf.shop.server.api.ShopAdminService',
        methodName: 'deleteShopStaff',
        data: data,
    });
}

// 主页列表
export function pages(data) {
    return request({
        serverName: 'melf',
        interfaceName: 'shop.melf.social.client.IPageService',
        methodName: 'pages',
        data: data,
    });
}
// 查看店铺收款账户
export function getShopBankVO(data) {
    return request({
        serverName: 'melf',
        interfaceName: 'shop.melf.shop.server.api.ShopAdminService',
        methodName: 'getShopBankVO',
        data: data,
    });
}
// 编辑店铺收款账户
export function saveOrUpdateShopBank(data) {
    return request({
        serverName: 'melf',
        interfaceName: 'shop.melf.shop.server.api.ShopAdminService',
        methodName: 'saveOrUpdateShopBank',
        data: data,
    });
}
// 查看店铺绑定的公共主页
export function getShopPageInfo(data) {
    return request({
        serverName: 'melf',
        interfaceName: 'shop.melf.shop.server.api.ShopAdminService',
        methodName: 'getShopPageInfo',
        data: data,
    });
}
// 编辑店铺绑定的公共主页
export function editShopPage(data) {
    return request({
        serverName: 'melf',
        interfaceName: 'shop.melf.shop.server.api.ShopAdminService',
        methodName: 'editShopPage',
        data: data,
    });
}
// 获取直播间列表
export function getLiveList(data) {
    return request({
        serverName: 'melf',
        interfaceName: 'shop.melf.live.api.boss.LiveBossService',
        methodName: 'getLiveList',
        data: data,
    });
}
// 刷新Fb授权信息
export function refreshFbToken(data) {
    return request({
        serverName: 'melf',
        interfaceName: 'shop.melf.social.client.IAuthApiService',
        methodName: 'refreshFbToken',
        data: data,
    });
}
// 获取商品列表
export function getProductList(data) {
    return request({
        serverName: 'melf',
        interfaceName: 'shop.melf.product.api.boss.BossProductService',
        methodName: 'getProductList',
        data: data,
    });
}
// 导入商品
export function importLiveProduct(data) {
    return request({
        serverName: 'melf',
        interfaceName: 'shop.melf.live.api.boss.LiveBossService',
        methodName: 'importLiveProduct',
        data: data,
    });
}
// 获取直播间商品列表
export function getLiveProductList(data) {
    return request({
        serverName: 'melf',
        interfaceName: 'shop.melf.live.api.boss.LiveBossService',
        methodName: 'getLiveProductList',
        data: data,
    });
}
// 直播间详情
export function getLiveDetail(data) {
    return request({
        serverName: 'melf',
        interfaceName: 'shop.melf.live.api.boss.LiveBossService',
        methodName: 'getLiveDetail',
        data: data,
    });
}
// 直播商品删除
export function deleteLiveProduct(data) {
    return request({
        serverName: 'melf',
        interfaceName: 'shop.melf.live.api.boss.LiveBossService',
        methodName: 'deleteLiveProduct',
        data: data,
    });
}
// 直播商品删除
export function updateLiveProductOrderKey(data) {
    return request({
        serverName: 'melf',
        interfaceName: 'shop.melf.live.api.boss.LiveBossService',
        methodName: 'updateLiveProductOrderKey',
        data: data,
    });
}
