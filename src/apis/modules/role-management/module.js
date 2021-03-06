import { BaseAPIModule } from "../../base";
import { RoleAuthenticationAPI } from "./role-auth.api";
import { CreatorAPI } from "./creators.api";
import { ManagerAPI } from "./managers.api";
import { UserAPI } from "./users.api";

export class RoleManagementModule extends BaseAPIModule {
  _initModule() {
    this._apis = {};
    this._useAPI(new RoleAuthenticationAPI(), "");
    this._useAPI(new CreatorAPI(), "creators", "creatorRole");
    this._useAPI(new ManagerAPI(), "managers", "managerRole");
    this._useAPI(new UserAPI(), "users", "user");
  }
}
