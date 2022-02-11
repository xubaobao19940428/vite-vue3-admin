import router from '@/router'
import { ElMessage } from 'element-plus'
import { param } from '@/utils'
import md5 from 'js-md5'
import axios from 'axios'

const BASE =
    import.meta.env.VITE_APP_NEW_JSON_API + 'mmxx_front/'
const httpService = axios.create({
    timeout: 45000,
})

function getMd5(headers_config, url_config, secret) {
    let signData = {}
    Object.assign(signData, headers_config, url_config)
    const _url_ =
        param(
            Object.keys(signData)
            .sort()
            .reduce((a, v) => {
                a[v] = signData[v]
                return a
            }, {})
        ) + `&appsecret=${secret}`

    return md5(_url_)
}

function randomString(code) {
    let len = code
    let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789'
    let maxLen = $chars.length
    let pwd = ''
    for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxLen))
    }
    return pwd
}
/**
 * @param {*} method get post
 * @param {*} serverName 服务名称
 * @param {*} interfaceName 接口名称
 * @param {*} data 入参
 * @param {*} $header 额外请求头
 * @param {*} baseUrl 请求地址
 * @param {*} versionCode api版本
 * @param {*} group 用户群组
 */
function request({
    method,
    serverName,
    methodName,
    interfaceName,
    data,
    $header,
    baseUrl,
    group,
}) {
    let secret = '0ENhlF51s2s5B3dm'
    const headersConfig = {
        'X-Version-Code': localStorage.getItem('versionCode') ||
            (process.env.NODE_ENV == 'pre' ? '1.0.0.pre' : '1.0.0'),
        'X-Device-Info': randomString(32),
        'X-Device-Id': new DeviceUUID().get(),
        'X-Auth-Token': localStorage.getItem('adminToken') || '',
        'X-Timestamp': new Date().getTime(),
        'X-Appkey': '1007',
    }
    if (!headersConfig['X-Auth-Token']) {
        delete headersConfig['X-Auth-Token']
    }
    const urlConfig = {
        api: interfaceName,
        method: methodName,
        version: localStorage.getItem('versionCode') ||
            (process.env.NODE_ENV == 'pre' ? '1.0.0.pre' : '1.0.0'),
        group: group || 'memall',
    }
    headersConfig['X-sign'] = getMd5(headersConfig, urlConfig, secret)
    return new Promise((resolve, reject) => {
        httpService({
                baseURL: baseUrl ?
                    baseUrl :
                    `${BASE}${serverName}?${param(urlConfig)}`,
                method: method || 'post',
                data: data,
                headers: Object.assign(headersConfig, $header),
            })
            .then((res) => {
                console.log(methodName, res.data)
                if (res.status !== 200) {
                    const err = new Error('服务器异常')
                    throw err
                }
                let result = res.data
                if (
                    result.resultCode.code == '200' ||
                    result.resultCode.code == '201'
                ) {
                    resolve(result)
                } else {
                    if (result.resultCode.code == '401') {
                        if (localStorage.getItem('adminToken')) {
                            ElMessage.warning(
                                `ErrorMsg: ${result.resultCode.message}, ErrorCode: ${result.resultCode.code}`
                            )
                        }
                        localStorage.clear()
                        router.push({
                            name: 'login',
                        })
                    } else {
                        ElMessage.error(
                            `ErrorMsg: ${result.resultCode.message}, ErrorCode: ${result.resultCode.code}`
                        )
                        reject(result)
                    }
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export default request