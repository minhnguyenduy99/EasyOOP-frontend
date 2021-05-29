import UserViewLayoutConfig from "@/layouts/user-view";
import PersonalAccountLayoutConfig from "@/layouts/user-view/personal-layout";

import HomePageConfig from "@/views/home";
import PostViewPageConfig from "@/views/post-view";
import TestDetailPageConfig from "@/views/test-detail";

import PersonalPageConfigs from "@/views/personal";

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

  routerWrapper.addLayout(
    "/personal",
    PersonalAccountLayoutConfig,
    PersonalPageConfigs
  );
};
