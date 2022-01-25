import request from '../request';

export function codeLogin(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.seller.server.biz.AssistantService',
        methodName: 'login',
        data: data,
    });
}
//获取验证码
export function sendSmsCode(data) {
    return request({
        serverName: 'mmxx',
        interfaceName: 'mm.mmxx.seller.server.biz.AssistantService',
        methodName: 'sms',
        data: data,
    });
}
