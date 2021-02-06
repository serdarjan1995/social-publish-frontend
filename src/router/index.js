import Vue from "vue"
import VueRouter from "vue-router"
import routes from "./routes"


const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const router = new VueRouter({
    routes,
    mode: "history",
    scrollBehviour(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        if (to.hash) {
            return {
                selector: to.hash,
            };
        }
    },
});

router.beforeEach((to, from, next) => {

    const publicPages = ['/auth/login','/auth/signup','/auth/forgot'];

    if((to.path.match(('/verify.*'))) || ((to.path.match(('/restore.*')))) ){
        publicPages.push(to.path)
    }
    const authRequired = !publicPages.includes(to.path);
    const isLogined = localStorage.getItem('access-token');

    if (authRequired && !isLogined) {
        return next('/auth/login');
    }else{
        return next()
    }
})

router.afterEach(() => {
    window.scrollTo(0, 0);
});

export default router;
