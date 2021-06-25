import { APIPack } from "./base";
import { PostAPIModule } from "./modules/posts/module";
import { AuthAPIModule } from "./modules/auth/module";
import { RoleManagementModule } from "./modules/role-management/module";
import { TagAPIModule } from "./modules/tags/module";
import { Q8AAPIModule } from "./modules/qanda/module";
import { TestAPIModule } from "./modules/test-management/module";
import {
  authHeaderInterceptor,
  redirectOnErrorInterceptor
} from "./interceptors";

let apiPack = null;

export default opts => {
  if (apiPack) {
    return apiPack;
  }
  apiPack = new APIPack();

  const { baseURL } = opts;

  apiPack.register(new PostAPIModule({ baseURL, name: "posts" }));
  apiPack.register(new AuthAPIModule({ baseURL, name: "auth" }));
  apiPack.register(new TagAPIModule({ baseURL, name: "tags" }));
  apiPack.register(new Q8AAPIModule({ baseURL, name: "qanda" }));
  apiPack.register(
    new RoleManagementModule({ baseURL, name: "role_management" })
  );
  apiPack.register(new TestAPIModule({ baseURL, name: "tests" }));

  // setup interceptors
  apiPack.useInterceptors(authHeaderInterceptor);
  apiPack.useInterceptors(redirectOnErrorInterceptor, {
    errorCodes: [403],
    redirectHandler: () => location.reload()
  });

  return apiPack;
};
