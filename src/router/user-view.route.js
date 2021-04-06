import UserViewLayoutConfig from "@/layouts/user-view";

import HomePageConfig from "@/views/home";
import PostViewPageConfig from "@/views/post-view";

export default routerWrapper => {
  routerWrapper.addLayout("/", UserViewLayoutConfig, [
    HomePageConfig,
    PostViewPageConfig
  ]);
};
