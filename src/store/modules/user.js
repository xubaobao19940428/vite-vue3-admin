import {
    getToken,
    setToken,
    removeToken,
    setUserInfo,
    removeUserInfo,
} from '@/utils/auth'
import { codeLogin } from '@/api/newJson/login.js'
import { getUserInfo } from '@/utils/auth'
import router from '@/router'
const user = {
    state: {
        token: getToken(),
        uid: 1,
        roles: [],
        avatar: '',
        portrait: '',
        name: '',
        expireTime: 0,
        userLevel: {
            2: '新用户',
            3: '粉丝',
            4: '达人',
            // 5: '(AT)'
        },
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_USERINFO: (state, userinfo) => {
            state.uid = userinfo.userId
            state.groupId = userinfo.groupId
            state.name = userinfo.name
            state.portrait = userinfo.portrait
                // state.avatar = userInfo.avatar;
        },
        SET_VERSION_TYPE: (state, versionType) => {
            state.versionType = versionType
        },
        SET_EXPIRETIME: (state, expireTime) => {
            state.expireTime = expireTime
        },
    },

    actions: {
        // 登录
        Login({ commit, state }, userInfo) {
            return new Promise((resolve, reject) => {
                codeLogin(Object.assign(userInfo))
                    .then((response) => {
                        console.log(response)
                        if (response.resultCode.code == 200) {
                            commit('SET_TOKEN', response.data.token)
                            commit('SET_USERINFO', response.data)
                            setToken(response.data.token)
                            setUserInfo(response.data)

                            resolve(response)
                        } else {
                            reject(new Error(response.message))
                        }
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        //获得店铺信息需要传的参数
        updateRequiredFileds({ commit }, requiredFileds) {
            commit('SET_REQUIRE_FILEDS', requiredFileds)
        },
        // 获取用户信息
        GetUserInfo({ commit, state }) {
            const userInfo = getUserInfo()
            if (userInfo) {
                if (!userInfo.roles) {
                    userInfo['roles'] = []
                }
                commit('SET_USERINFO', userInfo)
            }
            return userInfo
        },

        // 登出
        LogOut({ commit, state }) {
            console.log(1111)
            commit('SET_TOKEN', '')
            commit('SET_USERINFO', {})
            removeToken()
            removeUserInfo()
            router.push({
                name: 'login',
            })
        },
    },
}

export default user