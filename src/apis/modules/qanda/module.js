import { BaseAPIModule } from "../../base";
import { QandAAPI } from "./qanda.api";

export class Q8AAPIModule extends BaseAPIModule {
  _initModule() {
    this._apis = {};
    // global group
    this._useAPI(new QandAAPI(), "q8a");
  }
}
