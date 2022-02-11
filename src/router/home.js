import layOut from '../view/layout/index.vue'

const home = {
    path: '/dashboard',
    component: layOut,
    redirect: '/dashboard/welcome',
    meta: { title: '首页', icon: '&#xe62d;', key: 'MENU_DASHBOARD' },
    children: [{
        path: 'welcome',
        name: 'dashboard',
        component: () =>
            import ('@/view/dashboard/index.vue'),
        meta: {
            key: 'MENU_DASHBOARD',
            title: '首页',
            icon: '',
            noPermission: true,
        },
    }, ],
}
export default home