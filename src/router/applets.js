import layOut from '../view/layout/index.vue';

const applets = {
    path: '/applets',
    component: layOut,
    meta: { title: '图片配置', icon: '&#xe63e;', key: 'MENU_DASHBOARD' },
    children: [
        {
            path: 'uploadImg',
            name: 'uploadImg',
            component: () => import('../view/uploadApplets/index.vue'),
            meta: {
                key: 'MENU_DASHBOARD',
                title: '小程序图片',
                icon: '',
                noPermission: true,
            },
        },
    ],
};
export default applets;
