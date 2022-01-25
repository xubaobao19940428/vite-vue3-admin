import layOut from '../view/layout/index.vue'

const product = {
    path: '/product',
    component: layOut,
    meta: { title: '商品中心', icon: '&#xe602;' },
    children: [{
        path: 'productList',
        name: 'productList',
        component: () =>
            import ('@/view/product/productList.vue'),
        meta: {
            title: '商品列表',
            icon: '',
        },
    }, ],
}
export default product