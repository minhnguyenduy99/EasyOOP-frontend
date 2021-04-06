import AdminLayoutConfig from "@/layouts/admin";
import AdminPageConfigs from "@/views/admin";

export default routerWrapper => {
  routerWrapper.addLayout("/admin", AdminLayoutConfig, AdminPageConfigs);
};
