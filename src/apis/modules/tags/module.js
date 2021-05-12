import { BaseAPIModule } from "../../base";
import { TagAPI } from "./tag.api";

export class TagAPIModule extends BaseAPIModule {
  _initModule() {
    this._apis = {};
    // global group
    this._useAPI(new TagAPI(), "tags");
  }
}
