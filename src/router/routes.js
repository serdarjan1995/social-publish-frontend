import LazyLoad from "@/utils/AsyncRouteHelper"
import SocialRoutes from "./routes/social"
import AppRoutes from "./routes/apps"
import VuseRoutes from "./routes/vuse"
import GlobalRoutes from "./routes/global"
import AnalyticalRouter from "./routes/analytical"
const AppSidebar = () => import("@/layouts/App/Sidebar")
const AppToolbar = () => import("@/layouts/App/Toolbar")
const AppFooter = () => import("@/layouts/App/Footer")

const AllRoutes = [...SocialRoutes,...AppRoutes,...VuseRoutes,...AnalyticalRouter,...GlobalRoutes];
const routes = AllRoutes.map((route) => {
  const { params, defaultComponentPath, navs } = route;
  const componentObj = navs ? {
        components: {
          default: LazyLoad(defaultComponentPath),
          sidebar: AppSidebar,
          header: AppToolbar,
          footer: AppFooter,
        },
      } : {
        component: LazyLoad(defaultComponentPath),
      };
  return {
    ...params,
    ...componentObj,
  };

});

export default [{ path: "/", redirect: "/dashboard/operational" }, ...routes];
