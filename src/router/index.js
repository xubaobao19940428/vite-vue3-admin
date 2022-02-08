import { createRouter, createWebHashHistory } from 'vue-router';
// import store from '../store';
import { getToken } from '@/utils/auth';
import routes from './routes';

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
        }
    },
});
const whiteList = ['/login']; // no redirect whitelist
router.beforeEach((to, from, next) => {
    if (getToken()) {
        next();
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            // 在免登录白名单，直接进入
            next();
        } else {
            next('/login');
        }
    }
    next();
});
export default router;
