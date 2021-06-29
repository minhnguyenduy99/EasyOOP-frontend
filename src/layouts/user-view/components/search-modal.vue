<template>
  <div class="search-modal-content">
    <div class="columns">
      <div
        class="column is-flex is-flex-direction-column is-align-self-flex-start is-align-items-stretch"
      >
        <div class="search-modal__sticky">
          <b-input
            class="search-modal-input"
            type="is-primary"
            size="is-large"
            icon-right="search"
            placeholder="Tìm kiếm bài viết, bài test"
            v-model="search"
          />
        </div>

        <transition
          name="search-panel"
          enter-active-class="animate__animated animate__fadeInUp"
          leave-active-class="animate__animated animate__fadeOutDown"
        >
          <div class="ha-vertical-layout-6" v-show="canSearch">
            <search-panel
              panel-title="Bài viết"
              :items="listPosts"
              emptyText="Không tìm thấy bài viết"
            >
              <template #item="{ item }">
                <search-post-view :post="item" @click="$_navigateToPostView" />
              </template>
            </search-panel>
            <search-panel
              panel-title="Bài test"
              :items="listTests"
              emptyText="Không tìm thấy bài test"
            >
              <template #item="{ item }">
                <test-detail :test="item" @click="$_navigateToTestDetail" />
              </template>
            </search-panel>
          </div>
        </transition>
      </div>
      <div class="column">
        <div id="search-tag-list" class="card">
          <div class="card-content">
            <b-field label="Loại tìm kiếm">
              <b-switch
                v-model="tagSearchType"
                :true-value="1"
                :false-value="0"
                type="is-primary"
              >
                <span class="has-text-weight-bold">{{
                  TAG_SEARCH_TYPES[tagSearchType]
                }}</span>
              </b-switch>
            </b-field>
            <hr />
            <tag-list
              :tags="tags"
              headerless
              emptyText="Không có nhãn nào"
              :displayTagId="false"
              :rounded="true"
            >
              <template #tags>
                <b-checkbox-button
                  v-for="tag in tags"
                  :key="tag.id"
                  class="checkbox-tag is-rounded is-primary-dark is-outlined"
                  size="is-small"
                  type="is-primary-dark"
                  v-model="selectedTags"
                  :native-value="tag.tag_id"
                  ref="checkbox-tag"
                  >{{ tag.tag_value }}</b-checkbox-button
                >
              </template>
            </tag-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { FunctionDelayer } from "@/utils";

export default {
  name: "GlobalSearchModal",
  components: {
    "search-panel": () => import("./search-panel"),
    // "qanda-card": async () => (await import("@/components")).QandACard,
    "test-detail": () => import("@/components/test-detail/test-detail.vue"),
    "search-post-view": () => import("./search-post-view"),
    "tag-list": () => import("@/components/tag-list.vue")
  },
  inject: ["$toggleSearchModal"],
  data: () => ({
    TAG_SEARCH_TYPES: ["GIAO", "KẾT HỢP"],
    search: "",
    listQuestions: [],
    listPosts: [],
    listTests: [],
    tags: [],
    handler: new FunctionDelayer(),
    testHandler: new FunctionDelayer(),
    selectedTags: [],
    tagSearchType: 0
  }),
  watch: {
    search(val) {
      if (!val) {
        this.handler.reset();
        this.testHandler.reset();
        return;
      }
      this.handler.execute(() => this.$_updateFilteredPosts());
      this.testHandler.execute(() => this.$_updateListTests());
    },
    "selectedTags.length"(val) {
      if (!this.canSearch) {
        return;
      }
      this.$_updateFilteredPosts();
    },
    tagSearchType() {
      if (!this.canSearch) {
        return;
      }
      this.$_updateFilteredPosts();
    }
  },
  mounted: function() {
    this.$_requestSearchTags();
  },
  computed: {
    canSearch() {
      return this.search !== "" || this.selectedTags.length > 0;
    }
  },
  methods: {
    ...mapActions("POST", ["getPosts"]),
    ...mapActions("TAG", ["searchTag"]),
    ...mapActions("VIEWER_TEST", ["viewer_searchTest"]),

    $_navigateToPostView(post) {
      this.search = "";
      this.$toggleSearchModal(false);
      this.$nextTick(() => {
        this.$router.push({
          name: "PostView",
          params: { post_id: post.post_id }
        });
      });
    },
    $_navigateToTestDetail(test) {
      this.search = "";
      this.$toggleSearchModal(false);
      this.$nextTick(() => {
        this.$router.push({
          name: "TestDetailPage",
          params: { test_id: test.test_id }
        });
      });
    },
    $_requestSearchTags() {
      this.searchTag({
        type: "post"
      }).then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.tags.length = 0;
        this.tags = data;
      });
    },
    async $_updateFilteredPosts() {
      return this.getPosts({
        searchOptions: {
          search: this.search,
          tags: this.selectedTags,
          tagSearchType: this.tagSearchType
        }
      }).then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.listPosts.length = 0;
        this.listPosts = [];
        this.listPosts.push(...data.results);
      });
    },
    async $_updateFilteredQuestions(search) {
      return this.$api.qanda.searchQuestions(search).then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.listQuestions.length = 0;
        this.listQuestions.push(...data.results);
      });
    },
    async $_updateListTests() {
      return this.viewer_searchTest({ title: this.search }).then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.listTests.length = 0;
        this.listTests.push(...data.results);
      });
    }
  }
};
</script>

<style scoped lang="scss">
.search-modal-content {
  padding: 1rem;
}

.search-modal__sticky {
  border: none;
  position: sticky;
  padding-top: 1rem;
  padding-bottom: 1rem;
  top: 1rem;
  z-index: 4;
  background: whitesmoke;
  transform: translateY(-1rem);
}

#search-tag-list {
  position: sticky;
  top: 1rem;
}
</style>
