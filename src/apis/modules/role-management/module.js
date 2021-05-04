import { BaseAPIModule } from "../../base";
import { RoleAuthenticationAPI } from "./role-auth.api";

export class RoleManagementModule extends BaseAPIModule {
  _initModule() {
    this._apis = {};
    this._useAPI(new RoleAuthenticationAPI(), "");
  }
}
