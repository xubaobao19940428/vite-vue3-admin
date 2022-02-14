import layOut from '@/view/layout/index.vue'

const order = {
    path: '/order',
    component: layOut,
    meta: { title: '订单管理', icon: '&#xe62b;', key: 'MENU_ORDER' },
    children: [{
            path: 'orderList',
            name: 'orderList',
            component: () =>
                import ('@/view/order/orderList.vue'),
            meta: {
                key: 'MENU_ORDER_LIST',
                title: '订单列表',
                icon: '',
            },
        },
        {
            path: 'orderDetail',
            name: 'orderDetail',
            component: () =>
                import ('@/view/order/orderDetail/index.vue'),
            hidden: true,
            meta: {
                key: 'MENU_ORDER_DETAILS',
                title: '订单详情',
                icon: '',
            },
        },
        {
            path: 'afterSale',
            name: 'afterSale',
            component: () =>
                import ('@/view/order/afterSale.vue'),
            meta: {
                key: 'MENU_ORDER_INTENTION',
                title: '售后订单',
                icon: '',
            },
        },
        {
            path: 'meimiaotuanOrder',
            name: 'meimiaotuanOrder',
            component: () =>
                import ('@/view/order/meimiaotuanOrder.vue'),
            meta: {
                key: 'MENU_ORDER_MEIMIAOTUAN_ORDER',
                title: '美妙团订单',
                icon: '',
            },
        },
        {
            path: 'batchShip',
            name: 'batchShip',
            component: () =>
                import ('@/view/order/batchShip.vue'),
            meta: {
                key: 'MENU_ORDER_BATCH_SHIP',
                title: '批量核销',
                icon: '',
            },
        },
    ],
}
export default order