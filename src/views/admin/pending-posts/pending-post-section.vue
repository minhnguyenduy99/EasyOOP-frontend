<template>
  <div id="pending-post-section">
    <div v-if="!isEmpty" class="ha-vertical-layout-6-mobile">
      <div class="pending-posts-layout">
        <pending-post
          v-for="(post, index) in verifications"
          :key="post.id"
          :post="post"
          :selected="index === selectedIndex"
          @select="$on_postSelected(index, $event)"
          @cancelled="$on_postCancelled"
        />
      </div>

      <div class="my-5">
        <b-pagination
          :total="totalCount"
          v-model="page"
          :range-before="2"
          :range-after="1"
          order="is-centered"
          :simple="false"
          :rounded="true"
          :per-page="DEFAULT_ITEM_COUNT"
        >
        </b-pagination>
      </div>
    </div>
    <div v-else>
      <empty-state
        image-src="https://res.cloudinary.com/dml8e1w0z/image/upload/v1618931250/oop-learning-helper/post_empty_state_xcrbog.png"
        text="Bạn không có bài duyệt nào"
      />
    </div>
  </div>
</template>

<script>
export default {
  components: {
    "empty-state": () => import("@/components/empty-state.vue"),
    "pending-post": () => import("./pending-post")
  },
  inject: ["creator_findVerifications", "$p_loadPage"],
  props: {
    verificationStatus: Number,
    searchOptions: {
      type: Object,
      default: () => null
    },
    active: Boolean
  },
  data: () => ({
    DEFAULT_ITEM_COUNT: 6,
    verifications: [],
    page: 1,
    pageCount: 0,
    totalCount: 0,
    selectedIndex: -1
  }),
  watch: {
    active(val) {
      if (!val) {
        return;
      }
      this.$_loadData();
    },
    searchOptions() {
      this.selectedIndex = -1;
      this.$_reloadData();
    },
    page() {
      this.$_loadData();
    },
    selectedIndex(val) {
      this.$emit("selected-changed", this.verifications[val]);
    }
  },
  computed: {
    isEmpty() {
      return this.verifications.length === 0;
    }
  },
  methods: {
    $on_postSelected(index, selected) {
      this.selectedIndex = selected ? index : -1;
    },
    $on_loadButtonClicked() {
      this.$_loadData();
    },
    $on_postCancelled(post) {
      this.$_loadData();
    },
    $_loadData() {
      this.$p_loadPage(true);
      const options = {
        ...this.searchOptions,
        page: this.page,
        status: this.verificationStatus
      };
      this.creator_findVerifications(options).then(result => {
        this.$p_loadPage(false);
        const { error, data } = result;
        if (error) {
          return;
        }
        this.$_updataTabData(data);
      });
    },
    $_reloadData() {
      this.$p_loadPage(true);
      this.page = 1;
      const options = {
        ...this.searchOptions,
        page: this.page,
        status: this.verificationStatus
      };
      this.creator_findVerifications(options).then(result => {
        this.$p_loadPage(false);
        const { error, data } = result;
        if (error) {
          return;
        }
        this.$_updataTabData(data);
      });
    },
    $_updataTabData(data) {
      const { page_count, page, results, total_count } = data;
      this.verifications.length = 0;
      this.verifications.push(...results);
      this.pageCount = page_count;
      this.page = page;
      this.totalCount = total_count;
      this.$emit("count-changed", this.totalCount);
    }
  }
};
</script>

<style scoped lang="scss">
.pending-posts-layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  gap: 1rem;
  justify-content: center;

  @include tablet {
    display: grid;
    grid-template-columns: repeat(auto-fill, 150px);
    gap: 1rem;
  }

  @include desktop {
    grid-template-columns: repeat(auto-fill, 200px);
  }
}
</style>
