import { BaseAPIModule } from "../../base";
import { RoleAuthenticationAPI } from "./role-auth.api";
import { CreatorAPI } from "./creators.api";

export class RoleManagementModule extends BaseAPIModule {
  _initModule() {
    this._apis = {};
    this._useAPI(new RoleAuthenticationAPI(), "");
    this._useAPI(new CreatorAPI(), "creators", "creatorRole");
  }
}
