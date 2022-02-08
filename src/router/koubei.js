import layOut from '../view/layout/index.vue';

const koubei = {
    path: '/koubei',
    component: layOut,
    meta: { title: '本地生活', icon: '&#xe7d9;', key: 'MENU_KOUBEI_PRODUCT' },
    children: [
        {
            path: 'koubeiProduct',
            name: 'koubeiProduct',
            component: () => import('../view/koubeiProduct/index.vue'),
            meta: {
                key: 'MENU_PRODUCT_KOUBEI',
                title: '本地生活',
                icon: '',
            },
        },
        {
            path: 'koubeiProductEdit',
            name: 'koubeiProductEdit',
            component: () => import('../view/koubeiProduct/productEdit.vue'),
            hidden: true,
            meta: {
                key: 'MENU_PRODUCT_EDIT_KOUBEI',
                title: '商品编辑',
                icon: '',
            },
        },
    ],
};
export default koubei;
