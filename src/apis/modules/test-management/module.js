import { BaseAPIModule } from "../../base";
import { TestAPI } from "./tests.api";

export class TestAPIModule extends BaseAPIModule {
  _initModule() {
    this._apis = {};
    // global group
    this._useAPI(new TestAPI(), "exams");
  }
}
