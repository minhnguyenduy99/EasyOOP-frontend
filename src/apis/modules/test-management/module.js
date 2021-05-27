import { BaseAPIModule } from "../../base";
import { TestAPI } from "./tests.api";
import { TestViewerAPI } from "./tests.viewer.api";
import { TestResultAPI } from "./test-result.api";

export class TestAPIModule extends BaseAPIModule {
  _initModule() {
    this._apis = {};
    // global group
    this._useAPI(new TestAPI(), "exams");
    this._useAPI(new TestViewerAPI(), "viewer/tests", "viewer");
    this._useAPI(new TestResultAPI(), "test-results", "viewer");
  }
}
