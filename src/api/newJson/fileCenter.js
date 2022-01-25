import request from '../request';
/**
 * 文件导出列表
 *
 *
 */
export function exportTaskList(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.order.server.service.boss.FileTaskService',
        methodName: 'exportTaskList',
        data: data,
    });
}
