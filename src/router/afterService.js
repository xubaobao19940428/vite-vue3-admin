import layOut from '@/view/layout/index.vue'

const afterService = {
    path: '/after',
    component: layOut,
    meta: { title: '8000169', icon: '&#xe65d;', key: 'MENU_AFTER' },
    children: [{
        path: 'afterService',
        name: 'afterService',
        component: () =>
            import ('@/view/afterService/index.vue'),
        meta: {
            key: 'MENU_AFTER_SERVICE',
            title: '8000170',
            icon: '',
        },
    }, ],
}
export default afterService