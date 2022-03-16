import home from './home'
import shop from './shop.js'
import order from './order.js'
// import afterService from './afterService';
// import user from './user.js'
// import pageConfiguration from './pageConfiguration.js'
// import applets from './applets.js'
// import duoduo from './duoduo.js'
// import fileCenter from './fileCenter.js'
// import koubei from './koubei.js'
// import wxVideo from './wxVideo.js'
// import capital from './capital';
const routes = [{
        path: '/',
        redirect: '/dashboard',
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('@/view/login/login.vue'),
        meta: {
            key: 'MENU_LOGIN',
            title: '登录页',
            noPermission: true,
        },
    },
    // {
    //     path: '/upgrade',
    //     name: 'upgrade',
    //     component: () => import('@/view/upgrade.vue'),
    //     meta: {
    //         key: 'MENU_UPGRADE',
    //         title: '404',
    //         noPermission: true,
    //     },
    // },
    home,
    // shop,
    // user,
    // order,
    // // afterService,
    // duoduo,
    // wxVideo,
    // applets,
    // koubei,
    // fileCenter,
    // pageConfiguration,
    // capital,
    // {
    //     path: '/:pathMatch(.*)*',
    //     redirect: '/403',
    //     hidden: true,
    // },
]
export default routes