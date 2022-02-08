import layOut from '../view/layout/index.vue';

const fileCenter = {
    path: '/fileCenter',
    component: layOut,
    meta: { title: '文件中心', icon: '&#xe607;', key: 'MENU_DUODUO' },
    children: [
        {
            path: 'fileList',
            name: 'fileList',
            component: () => import('../view/fileCenter/index.vue'),
            meta: {
                key: 'MENU_FILE_CENTER',
                title: '文件列表',
                icon: '',
            },
        },
    ],
};
export default fileCenter;
