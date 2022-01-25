import request from '../request';
//这个文件放的全局请求
export function allLanguageList(data) {
    return request({
        serverName: 'melf',
        interfaceName: 'shop.melf.common.server.api.SystemConfigService',
        methodName: 'getAllLangugaeList',
        data: data,
    });
}
export function systemConfig(data) {
    return request({
        serverName: 'melf',
        interfaceName: 'shop.melf.common.server.api.SystemConfigService',
        methodName: 'getSystemConfig',
        data: data,
    });
}
export function uploadApplets(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.user.biz.service.BossAssetsService',
        methodName: 'upload',
        data: data,
    });
}

export function queryAssetsList(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.user.biz.service.BossAssetsService',
        methodName: 'queryAssetsList',
        data: data,
    });
}
