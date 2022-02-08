import { createStore } from 'vuex'
import nav from './modules/nav'
import user from './modules/user'
import globalNum from './modules/globalNum'
// 创建一个新的 store 实例
const store = createStore({
    modules: {
        nav,
        user,
        globalNum,
    },
})
export default store