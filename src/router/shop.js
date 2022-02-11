import layOut from '../view/layout/index.vue'

const shop = {
    path: '/shop',
    component: layOut,
    meta: { title: '商家管理', icon: '&#xe602;', key: 'MENU_PRODUCT' },
    children: [{
            path: 'supplierManage',
            name: 'supplierManage',
            component: () =>
                import ('@/view/shop/supplierManage.vue'),
            meta: {
                keepAlive: false,
                key: 'MENU_PRODUCT_LIST',
                title: '商家管理',
                icon: '',
            },
        },
        {
            path: 'supplierShop',
            name: 'supplierShop',
            component: () =>
                import ('@/view/shop/supplierShop/index.vue'),
            meta: {
                key: 'MENU_SUPPLIER_SHOP',
                title: '店铺管理',
                icon: '',
            },
        },
        {
            path: 'editSupplierShop',
            name: 'editSupplierShop',
            component: () =>
                import ('@/view/shop/supplierShop/editSupplierShop.vue'),
            hidden: true,
            meta: {
                key: 'MENU_EDIT_SUPPLIER_SHOP',
                title: '新增店铺',
                icon: '',
            },
        },
        {
            path: 'editSupplier',
            name: 'editSupplier',
            component: () =>
                import ('@/view/shop/editSupplier.vue'),
            hidden: true,
            meta: {
                key: 'MENU_PRODUCT_LIST',
                title: '商家编辑',
                icon: '',
            },
        },
        {
            path: 'productList',
            name: 'productList',
            component: () =>
                import ('@/view/product/productList.vue'),
            meta: {
                keepAlive: false,
                key: 'MENU_PRODUCT_LIST',
                title: '商品列表',
                icon: '',
            },
        },
        {
            path: 'product360',
            name: 'product360',
            component: () =>
                import ('@/view/product/product360.vue'),
            meta: {
                keepAlive: false,
                key: 'MENU_PRODUCT_360',
                title: '商品360',
                icon: '',
            },
        },
        {
            path: 'productShelveStatusList',
            name: 'productShelveStatusList',
            component: () =>
                import ('@/view/product/productShelveStatus/index.vue'),
            meta: {
                keepAlive: false,
                key: 'MENU_PRODUCT_SHELVESTATUS',
                title: '商品上下架',
                icon: '',
            },
        },
        {
            path: 'settleShop',
            name: 'settleShop',
            component: () =>
                import ('@/view/shop/settleShop/index.vue'),
            meta: {
                keepAlive: false,
                key: 'MENU_SETTLE_SHOP',
                title: '商家结算',
                icon: '',
            },
        },
        {
            path: 'shopAccount',
            name: 'shopAccount',
            component: () =>
                import ('@/view/shop/shopAccount.vue'),
            meta: {
                keepAlive: false,
                key: 'MENU_SETTLE_SHOP',
                title: '账号管理',
                icon: '',
            },
        },
        {
            path: 'settleShopOrder',
            name: 'settleShopOrder',
            component: () =>
                import ('@/view/shop/settleShopOrder'),
            hidden: true,
            meta: {
                keepAlive: false,
                key: 'MENU_SETTLE_SHOP',
                title: '订单列表',
                icon: '',
            },
        },
        {
            path: 'productCategory',
            name: 'productCategory',
            component: () =>
                import ('@/view/product/productCategory.vue'),
            hidden: true,
            meta: {
                key: 'MENU_PRODUCT_CHECK',
                title: '商品类目',
                icon: '',
            },
        },

        {
            path: 'addProduct',
            name: 'addProduct',
            component: () =>
                import ('@/view/product/addProduct.vue'),
            hidden: true,
            meta: {
                key: 'MENU_PRODUCT_ADD',
                title: '新增商品',
                icon: '',
            },
        },
    ],
}
export default shop