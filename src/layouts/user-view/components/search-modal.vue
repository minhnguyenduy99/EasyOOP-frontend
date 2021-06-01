<template>
  <div class="search-modal-content">
    <div
      class="is-flex is-flex-direction-column is-align-self-flex-start is-align-items-stretch"
    >
      <b-input
        class="search-modal-input"
        type="is-primary"
        size="is-large"
        icon-right="search"
        placeholder="Tìm kiếm bài viết, câu hỏi, ..."
        v-model="search"
      />
      <transition
        name="search-panel"
        enter-active-class="animate__animated animate__fadeInUp"
        leave-active-class="animate__animated animate__fadeOutDown"
      >
        <div class="search-modal-panel card mt-3" v-show="search !== ''">
          <div class="search-modal-panel-container card-content">
            <search-panel panel-title="Bài viết" :items="listPosts">
              <template #item="{ item }">
                <search-post-view :post="item" @click="$_navigateToPostView" />
              </template>
            </search-panel>
            <!-- <search-panel panel-title="Q & A" :items="listQuestions">
              <template #item="{ item }">
                <qanda-card :qanda="item" :open="false" />
              </template>
            </search-panel> -->
            <search-panel panel-title="Bài test" :items="listTests">
              <template #item="{ item }">
                <test-detail :test="item" @click="$_navigateToTestDetail" />
              </template>
            </search-panel>
          </div>
        </div>
      </transition>
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
    "search-post-view": () => import("./search-post-view")
  },
  inject: ["$toggleSearchModal"],
  data: () => ({
    search: "",
    listQuestions: [],
    listPosts: [],
    listTests: [],
    handler: new FunctionDelayer(),
    testHandler: new FunctionDelayer()
  }),
  watch: {
    search(val) {
      if (!val) {
        this.handler.reset();
        this.testHandler.reset();
        return;
      }
      this.handler.execute(() => this.$_updateFilteredPosts(val));
      this.testHandler.execute(() => this.$_updateListTests(val));
      this.$_updateFilteredQuestions();
    }
  },
  methods: {
    ...mapActions("POST", ["getPosts"]),
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
    async $_updateFilteredPosts(search) {
      return this.getPosts({
        searchOptions: {
          search
        }
      }).then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.listPosts.length = 0;
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
    async $_updateListTests(search) {
      return this.viewer_searchTest({ title: search }).then(result => {
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
.search-modal-panel-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @include tablet {
    grid-template-columns: 1fr 1fr;
  }
}

.search-modal {
  &-input {
    width: 100%;
  }

  .modal-content {
    overflow-y: hidden;
    scroll-behavior: auto;
  }
}
</style>
