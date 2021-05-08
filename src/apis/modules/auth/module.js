import { BaseAPIModule } from "../../base";
import { AuthAPI } from "./auth.api";
import { AuthUserAPI } from "./user.api";

export class AuthAPIModule extends BaseAPIModule {
  _initModule() {
    this._apis = {};
    // global group
    this._useAPI(new AuthAPI(), "auth");
    this._useAPI(new AuthUserAPI(), "user");
  }
}
