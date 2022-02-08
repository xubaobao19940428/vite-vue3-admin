import layOut from '@/view/layout/index.vue';

const capital = {
    path: '/capital',
    component: layOut,
    meta: { title: '8000175', icon: '&#xe88f;', key: 'MENU_CAPITAL' },
    children: [
        {
            path: 'capital',
            name: 'capital',
            component: () => import('@/view/capital/index.vue'),
            meta: {
                key: 'MENU_CAPITAL',
                title: '8000176',
                icon: '',
            },
        },
    ],
};
export default capital;
