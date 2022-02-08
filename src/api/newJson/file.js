// import axios from 'axios'
import request from '../request'
import { ElMessage } from 'element-plus'
// 统一请求路径前缀
let base =
    import.meta.env.VUE_APP_FILE_URL
    // 超时设定
axios.defaults.timeout = 45000

axios.interceptors.request.use(
    (config) => {
        return config
    },
    (err) => {
        ElMessage.error('请求超时')
        return Promise.resolve(err)
    }
)

/**
 * 上传文件(图片视频)
 */
export const uploadFileRequest = (reqInfo, successCallback, errorCallback) => {
    request({
            serverName: 'mmxx',
            interfaceName: 'mm.mmxx.common.server.api.OssUploadService',
            methodName: 'getWebUploadPolicy',
            data: {
                fileName: reqInfo.file.file.name,
            },
        })
        .then((result) => {
            if (result.resultCode.code == 200) {
                console.log(reqInfo)
                let formData = new FormData()
                formData.append('policy', result.data.policy)
                formData.append('OSSAccessKeyId', result.data.accessKeyId)
                formData.append('signature', result.data.signature)
                formData.append('key', result.data.objectKey)
                formData.append('success_action_status', '200')
                formData.append('file', reqInfo.file.file)
                axios({
                        url: result.data.host,
                        method: 'POST',
                        data: formData,
                        headers: {
                            ...reqInfo.file.headers,
                            'Content-Type': 'multipart/form-data',
                        },
                    })
                    .then((res) => {
                        successCallback &&
                            successCallback(result.data.objectKey, result)
                    })
                    .catch((err) => {
                        errorCallback && errorCallback(err)
                    })
            } else {
                errorCallback && errorCallback(result)
            }
        })
        .catch((err) => {
            errorCallback && errorCallback(err)
        })
}
export const uploadFileRequestByUrl = (url, params) => {
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }
    return axios.post(`${base}${url}`, params, config).then((res) => res.data)
}