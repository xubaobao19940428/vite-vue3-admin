import request from '../request';

//饿了么订单导入
export function eleExcel(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.mmdd.biz.service.UnionCbApiService',
        methodName: 'eleExcel',
        data: data,
    });
}
//订单明细
export function queryUnionCbList(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.mmdd.biz.service.UnionCbApiService',
        methodName: 'queryBossUnionCbList',
        data: data,
    });
}
