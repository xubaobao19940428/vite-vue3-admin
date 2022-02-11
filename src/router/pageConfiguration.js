import layOut from '../view/layout/index.vue'

const pageConfiguration = {
    path: '/page',
    component: layOut,
    meta: { title: '配置管理', icon: '&#xe62d;', key: 'MENU_DASHBOARD' },
    children: [{
            path: 'productAreaSet',
            name: 'productAreaSet',
            component: () =>
                import ('@/view/pageConfiguration/productAreaList.vue'),
            meta: {
                key: 'MENU_PRODUCT_AREA',
                title: '区域配置',
                icon: '',
            },
        },
        {
            path: 'productAreaEdit',
            name: 'productAreaEdit',
            component: () =>
                import ('@/view/pageConfiguration/productArea.vue'),
            hidden: true,
            meta: {
                key: 'MENU_PRODUCT_AREA_EDIT',
                title: '编辑配置',
                icon: '',
            },
        },
        {
            path: 'configuration',
            name: 'configuration',
            component: () =>
                import ('@/view/pageConfiguration/index.vue'),
            meta: {
                key: 'MENU_DASHBOARD',
                title: '页面配置',
                icon: '',
            },
        },
        {
            path: 'vipPage',
            name: 'vipPage',
            component: () =>
                import ('@/view/pageConfiguration/vipPage/index.vue'),
            meta: {
                key: 'MENU_VIP_PAGE',
                title: '会员权益页',
                icon: '',
            },
        },
        {
            path: 'couponList',
            name: 'couponList',
            component: () =>
                import ('@/view/pageConfiguration/coupon/couponList.vue'),
            meta: {
                key: 'MENU_COUPON_LIST',
                title: '优惠券',
                icon: '',
            },
        },
        {
            path: 'editCoupon',
            name: 'editCoupon',
            component: () =>
                import ('@/view/pageConfiguration/coupon/editCoupon.vue'),
            hidden: true,
            meta: {
                key: 'MENU_COUPON_EDIT',
                title: '优惠券编辑',
                icon: '',
            },
        },
        {
            path: 'couponDetail',
            name: 'couponDetail',
            component: () =>
                import ('@/view/pageConfiguration/coupon/couponDetail.vue'),
            hidden: true,
            meta: {
                key: 'MENU_COUPON_DETAIL',
                title: '优惠券详情',
                icon: '',
            },
        },
        {
            path: 'qyOptimizationProduct',
            name: 'qyOptimizationProduct',
            component: () =>
                import (
                    '@/view/pageConfiguration/qyOptimizationProduct/index.vue'
                ),
            hidden: true,
            meta: {
                key: 'MENU_QYOPTIMIZATION_PRODUCT',
                title: '首页商品',
                icon: '',
            },
        },
        {
            path: 'commonConfiguration',
            name: 'commonConfiguration',
            component: () =>
                import ('@/view/pageConfiguration/commonConfiguration.vue'),
            meta: {
                key: 'MENU_COMMON_SET',
                title: '公共配置',
                icon: '',
            },
        },
    ],
}
export default pageConfiguration