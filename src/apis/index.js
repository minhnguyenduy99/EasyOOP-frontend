import { APIPack } from "./base";
import { PostAPIModule } from "./modules/posts/module";

let apiPack = null;

export default opts => {
  if (apiPack) {
    return apiPack;
  }
  apiPack = new APIPack();

  const { baseURL } = opts;

  apiPack.register(new PostAPIModule({ baseURL, name: "posts" }));

  return apiPack;
};
