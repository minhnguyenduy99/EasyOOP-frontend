import { BaseAPIModule } from "../../base";
import { CreatorPostAPI } from "./creator/creator.post.api";
import { CreatorVerificationAPI } from "./creator/creator.verification.api";
import { CreatorTopicAPI } from "./creator/creator.topic.api";
import { PostAPI } from "./posts.api";
import { TagAPI } from "./tag.api";
import { TopicAPI } from "./topic.api";
import { ManagerVerificationAPI } from "./manager/verification.api";

export class PostAPIModule extends BaseAPIModule {
  _initModule() {
    this._apis = {};
    // global group
    this._useAPI(new PostAPI(), "posts");
    this._useAPI(new TagAPI(), "tags");
    this._useAPI(new TopicAPI(), "topics");
    // creator group
    this._useAPI(new CreatorPostAPI(), "creator/posts", "creator");
    this._useAPI(new CreatorTopicAPI(), "creator/topics", "creator");
    this._useAPI(
      new CreatorVerificationAPI(),
      "creator/verifications",
      "creator"
    );
    // manager group
    this._useAPI(
      new ManagerVerificationAPI(),
      "manage/verifications",
      "manager"
    );
  }
}
