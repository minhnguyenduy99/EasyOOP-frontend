import UserViewLayoutConfig from "@/layouts/user-view";
import ErrorPages from "@/views/errors";

export default routerWrapper => {
  routerWrapper.addLayout(
    "/error",
    () =>
      UserViewLayoutConfig({
        name: "UserViewErrorLayout"
      }),
    ErrorPages
  );
};
