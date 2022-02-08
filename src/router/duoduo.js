import layOut from '../view/layout/index.vue';

const duoduo = {
    path: '/duoduo',
    component: layOut,
    meta: { title: '美妙多多', icon: '&#xe69d;', key: 'MENU_DUODUO' },
    children: [
        {
            path: 'duoduoOrderList',
            name: 'duoduoOrderList',
            component: () => import('../view/meimiaoduoduo/orderList.vue'),
            meta: {
                key: 'MENU_MEIMIAODUODUO',
                title: '订单明细',
                icon: '',
            },
        },
    ],
};
export default duoduo;
