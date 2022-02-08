import layOut from '../view/layout/index.vue';

const wxVideo = {
    path: '/wxVideo',
    component: layOut,
    meta: { title: '美妙团管理', icon: '&#xe62a;', key: 'MENU_WX_VIDEO' },
    children: [
        {
            path: 'wxProductList',
            name: 'wxProductList',
            component: () => import('../view/wxVideo/wxProductList.vue'),
            meta: {
                key: 'MENU_USERLIST',
                title: '微信商品列表',
                icon: '',
            },
        },
    ],
};
export default wxVideo;
