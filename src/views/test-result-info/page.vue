<template>
  <div v-if="testResult" id="test-result-detail-page">
    <div class="pt-5 pb-6">
      <breadcrumb :titles="breadCrumbs" :active="1" itemClass="is-size-5">
        <template #item="{ title, active }">
          <a v-if="active">
            <b-tag size="is-medium">
              Result ID:
              <span class="has-text-weight-bold">{{ title.value }}</span>
            </b-tag>
          </a>
          <router-link v-else :to="title.to">
            {{ title.value }}
          </router-link>
        </template>
      </breadcrumb>
    </div>
    <div class="test-detail-container">
      <div class="ha-vertical-layout-7">
        <test-detail :testResult="testResult" />
        <div class="card">
          <div class="card-content">
            <sentence-panel
              :sentences="sentences"
              :selectedOrder="selectedOrder"
              :showAnswer="true"
              :sentencesPerGroup="SENTENCES_PER_PAGE"
              :currentPage="page"
              :pageCount="pageCount"
            />
          </div>
        </div>
      </div>
      <div>
        <div id="sticky-test-info" class="ha-vertical-layout-7">
          <test-result-info
            v-if="testResult"
            :testResult="testResult"
            @order-selected="$on_selectedOrderChanged"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "TestResultDetailPage",
  components: {
    breadcrumb: () => import("@/components/base/breadcrumb"),
    "test-detail": () => import("./test-detail-card"),
    "test-result-info": () => import("./test-result-info"),
    "sentence-panel": () => import("@/components/sentence-panel/sentence-panel")
  },
  inject: ["$p_loadPage"],
  metaInfo() {
    const title = `${this.testResult?.title} | Kết quả bài test - ${this.$appConfig.VUE_APP_NAME}`;
    return {
      title,
      meta: [
        {
          property: "og:title",
          content: title
        },
        {
          property: "og:image",
          content:
            "https://res.cloudinary.com/dml8e1w0z/image/upload/v1625112588/oop-learning-helper/white_3_vwauzw.png"
        }
      ]
    };
  },
  props: {
    resultId: String
  },
  provide() {
    return {
      $_navigateToPage: this.$_navigatePage.bind(this),
      SENTENCES_PER_PAGE: this.SENTENCES_PER_PAGE
    };
  },
  data() {
    return {
      SENTENCES_PER_PAGE: 10,
      testResult: null,
      sentences: [],
      selectedOrder: null,
      page: 0,
      pageCount: 0,
      breadCrumbs: [
        {
          value: "Danh sách kết quả",
          to: {
            name: "PersonalTestResults"
          }
        },
        {
          value: this.resultId
        }
      ]
    };
  },
  mounted: function() {
    this.$_updateTestResult();
    this.$_navigatePage(1);
  },
  methods: {
    ...mapActions("VIEWER_TEST", [
      "viewer_getTestResultById",
      "viewer_getDetailOfTestResult"
    ]),

    $on_selectedOrderChanged(order) {
      const page = Math.ceil(order / this.SENTENCES_PER_PAGE);
      if (page === this.page) {
        this.selectedOrder = order;
        return;
      }
      this.$_navigatePage(page).then(() => {
        this.selectedOrder = order;
      });
    },

    $_updateTestResult() {
      this.viewer_getTestResultById({ result_id: this.resultId }).then(
        result => {
          const { error, data } = result;
          if (error) {
            this.$router.push({ name: "PageNotFound" });
            return;
          }
          this.testResult = data;
        }
      );
    },
    $_navigatePage(page) {
      this.$p_loadPage(true);
      return this.viewer_getDetailOfTestResult({
        result_id: this.resultId,
        page
      }).then(result => {
        this.$p_loadPage(false);
        const { error, data } = result;
        if (error) {
          return;
        }
        const { results, page, page_count } = data;
        this.sentences.length = 0;
        this.sentences = results;
        this.page = page;
        this.pageCount = page_count;
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "./style.scss";

#test-result-detail-page {
  scroll-behavior: smooth;
}

.test-detail-container {
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 1rem;
  @include tablet {
    grid-template-columns: 1fr auto;
    column-gap: 1rem;
  }
}

#sticky-test-info {
  position: sticky;
  top: 80px;
}
</style>
