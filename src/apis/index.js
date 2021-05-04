import { APIPack } from "./base";
import { PostAPIModule } from "./modules/posts/module";
import { AuthAPIModule } from "./modules/auth/module";
import { RoleManagementModule } from "./modules/role-management/module";
import { authHeaderInterceptor } from "./interceptors";

let apiPack = null;

export default opts => {
  if (apiPack) {
    return apiPack;
  }
  apiPack = new APIPack();

  const { baseURL } = opts;

  apiPack.register(new PostAPIModule({ baseURL, name: "posts" }));
  apiPack.register(new AuthAPIModule({ baseURL, name: "auth" }));
  apiPack.register(
    new RoleManagementModule({ baseURL, name: "role_management" })
  );

  // setup interceptors
  apiPack.useInterceptors(authHeaderInterceptor);

  return apiPack;
};
