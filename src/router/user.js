import layOut from '../view/layout/index.vue'

const user = {
    path: '/user',
    component: layOut,
    meta: { title: '用户管理', icon: '&#xe612;', key: 'MENU_DASHBOARD' },
    children: [{
            path: 'userList',
            name: 'userList',
            component: () =>
                import ('@/view/user/userManage.vue'),
            meta: {
                key: 'MENU_USERLIST',
                title: '用户列表',
                icon: '',
            },
        },
        {
            path: 'memberInfo',
            name: 'memberInfo',
            component: () =>
                import ('@/view/user/memberInfo.vue'),
            hidden: true,
            meta: {
                key: 'MENU_MEMBERINFO',
                title: '用户信息',
                icon: '',
            },
        },
        {
            path: 'handSet',
            name: 'handSet',
            component: () =>
                import ('@/view/pageConfiguration/handSet.vue'),
            meta: {
                key: 'MENU_QYOPTIMIZATION_PRODUCT',
                title: '身份设置',
                icon: '',
            },
        },
        // {
        //     path: 'withdraw',
        //     name: 'withdraw',
        //     component: () =>
        //         import ('@/view/user/withdraw'),
        //     meta: {
        //         key: 'MENU_QYOPTIMIZATION_PRODUCT',
        //         title: '提现管理',
        //         icon: '',
        //     },
        // },
    ],
}
export default user