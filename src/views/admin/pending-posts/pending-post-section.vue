<template>
  <div id="pending-post-section">
    <div
      v-if="!isEmpty"
      class="pending-posts-layout ha-vertical-layout-6-mobile"
    >
      <pending-post
        v-for="(post, index) in pendingPosts"
        :key="post.id"
        :post="post"
        :selected="index === selectedIndex"
        :checkMode="isCheckMode"
        @check="$on_postChecked(index, $event)"
        @select="$on_postSelected(index, $event)"
        @deleted="$on_postDeleted"
      />
    </div>
    <div v-else>
      <empty-state
        image-src="https://res.cloudinary.com/dml8e1w0z/image/upload/v1618931250/oop-learning-helper/post_empty_state_xcrbog.png"
        text="Bạn không có bài duyệt nào"
      />
    </div>
    <div class="my-5 is-flex is-justify-content-center">
      <b-button
        v-show="canLoadMore"
        type="is-primary"
        outlined
        @click="$on_loadButtonClicked"
        >Xem thêm</b-button
      >
    </div>
  </div>
</template>

<script>
export default {
  components: {
    "empty-state": () => import("@/components/empty-state.vue"),
    "pending-post": () => import("./pending-post")
  },
  props: {
    searchResult: Object
  },
  inject: ["findPendingPosts", "reloadTab"],
  data: () => ({
    pendingPosts: [],
    queriedResults: {
      remain_item_count: 0,
      total_count: 0
    },
    checkedIndex: new Set(),
    selectedIndex: -1,
    isCheckMode: false
  }),
  watch: {
    searchResult: {
      handler(val) {
        this.selectedIndex = -1;
        if (!val) {
          return;
        }
        this.pendingPosts.length = 0;
        const { results, ...queriedResults } = val;
        this.queriedResults = queriedResults;
        this.pendingPosts.push(...results);
      },
      deep: true
    },
    selectedIndex(val) {
      this.$emit("selected-changed", this.pendingPosts[val]);
    }
  },
  computed: {
    canLoadMore() {
      return this.queriedResults.remain_item_count > 0;
    },
    isEmpty() {
      return this.pendingPosts.length === 0;
    }
  },
  methods: {
    $on_postChecked(index, checked) {
      if (checked) {
        this.checkedIndex.add(index);
        this.isCheckMode = true;
        return;
      }
      this.checkedIndex.delete(index);
      if (this.checkedIndex.size > 0) {
        return;
      }
      this.isCheckMode = false;
    },
    $on_postSelected(index, selected) {
      this.selectedIndex = selected ? index : -1;
    },
    $on_loadButtonClicked() {
      this.$emit("load");
    },
    $on_postDeleted() {
      this.reloadTab();
    }
  }
};
</script>

<style scoped lang="scss">
.pending-posts-layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  gap: 1rem;

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
