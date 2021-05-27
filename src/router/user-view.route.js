import UserViewLayoutConfig from "@/layouts/user-view";

import HomePageConfig from "@/views/home";
import PostViewPageConfig from "@/views/post-view";
import TestDetailPageConfig from "@/views/test-detail";

export default routerWrapper => {
  routerWrapper.addLayout("/", UserViewLayoutConfig, [
    HomePageConfig,
    PostViewPageConfig
  ]);

  routerWrapper.addLayout(
    "/",
    () =>
      UserViewLayoutConfig({
        name: "TestViewLayout",
        includeHero: false,
        menuBar: false,
        footer: false
      }),
    [TestDetailPageConfig]
  );
};
