import { BaseAPIModule } from "../../base";
import { AuthAPI } from "./auth.api";

export class AuthAPIModule extends BaseAPIModule {
  _initModule() {
    this._apis = {};
    // global group
    this._useAPI(new AuthAPI(), "auth");
  }
}
