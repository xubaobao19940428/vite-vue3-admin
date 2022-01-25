import request from '../request';
//修改或新增banner
export function modifyBanner(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.product.server.api.boss.BossBannerService',
        methodName: 'modifyBanner',
        data: data,
    });
}
//获取banner列表

export function bannerList(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.product.server.api.boss.BossBannerService',
        methodName: 'getBannerList',
        data: data,
    });
}
//删除banner

export function deleteBanner(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.product.server.api.boss.BossBannerService',
        methodName: 'deleteBanner',
        data: data,
    });
}
//新增或者修改一个首页商品分组
export function modifyGroup(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.product.server.api.boss.BossProductGroupService',
        methodName: 'modifyGroup',
        data: data,
    });
}
//获取商品分组列表
export function groupList(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.product.server.api.boss.BossProductGroupService',
        methodName: 'getGroupList',
        data: data,
    });
}
//删除商品分组列表
export function deleteGroup(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.product.server.api.boss.BossProductGroupService',
        methodName: 'deleteGroup',
        data: data,
    });
}
//获取一个商品分组类的商品
export function productsByGroup(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.product.server.api.boss.BossProductGroupService',
        methodName: 'getProductsByGroup',
        data: data,
    });
}
//给一个分组列表新增商品
export function BatchSave(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.product.server.api.boss.BossProductGroupService',
        methodName: 'getProductsByGroup',
        data: data,
    });
}
//编辑一个商品是否展示折扣和排序
export function modifyProductByGroup(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.product.server.api.boss.BossProductGroupService',
        methodName: 'modifyProductByGroup',
        data: data,
    });
}
//在商品分组里批量添加商品
export function addProductsByGroup(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.product.server.api.boss.BossProductGroupService',
        methodName: 'addProductsByGroup',
        data: data,
    });
}
//批量删除分组商品
export function deleteProductsByGroup(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.product.server.api.boss.BossProductGroupService',
        methodName: 'deleteProductsByGroup',
        data: data,
    });
}
/**
 * 会员权益页相关配置
 */

export function modifyComponent(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.product.server.api.boss.BossModuleService',
        methodName: 'modifyComponent',
        data: data,
    });
}
/**
 * 获取module列表
 */

export function modulesList(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.product.server.api.boss.BossModuleService',
        methodName: 'getModules',
        data: data,
    });
}
/**
 * 获取moduleID获取组件列表
 */

export function componentsByModuleId(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.product.server.api.boss.BossModuleService',
        methodName: 'getComponentsByModuleId',
        data: data,
    });
}
/**
 * 删除组件
 */
export function deleteComponent(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.product.server.api.boss.BossModuleService',
        methodName: 'deleteComponent',
        data: data,
    });
}
/**
 * 公共配置
 */
export function configList(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.order.server.service.boss.CommonConfigService',
        methodName: 'configList',
        data: data,
    });
}
/**
 * 新增or修改公共配置
 */
export function saveOrUpdateConfig(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.order.server.service.boss.CommonConfigService',
        methodName: 'saveOrUpdateConfig',
        data: data,
    });
}
/**
 * 公共配置详情
 */
export function configDetail(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.order.server.service.boss.CommonConfigService',
        methodName: 'configDetail',
        data: data,
    });
}
