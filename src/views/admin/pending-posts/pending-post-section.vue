<template>
  <div id="pending-post-section">
    <post-search class="mb-5" @search="$on_search" />
    <div>
      <div
        v-if="!isSearching"
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
        />
      </div>
      <div class="my-5 is-flex is-justify-content-center">
        <b-button type="is-primary" outlined>Xem thêm</b-button>
      </div>
      <b-loading
        :is-full-page="false"
        v-model="isSearching"
        :can-cancel="false"
      ></b-loading>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    "pending-post": () => import("./pending-post"),
    "post-search": () => import("./post-search")
  },
  inject: ["findPendingPosts"],
  data: () => ({
    pendingPosts: [],
    isSearching: true,
    pagination: {
      total: 6,
      perPage: 6,
      current: 1
    },
    checkedIndex: new Set(),
    selectedIndex: -1,
    isCheckMode: false
  }),
  mounted: function() {
    this.$_updatePendingPosts();
  },
  watch: {
    selectedIndex(val) {
      this.$emit("selected-changed", this.pendingPosts[val]);
    }
  },
  methods: {
    $on_search(options) {
      this.pendingPosts.length = 0;
      this.isSearching = true;
      setTimeout(() => {
        this.$_updatePendingPosts();
      }, 2000);
    },
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
    $_updatePendingPosts() {
      this.findPendingPosts().then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.pendingPosts.push(...data);
        this.isSearching = false;
      });
    }
  }
};
</script>

<style scoped lang="scss">
.pending-posts-layout {
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
