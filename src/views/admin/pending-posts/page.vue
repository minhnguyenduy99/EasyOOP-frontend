<template>
  <div id="pending-posts-page">
    <admin-content
      title="Bài viết chờ duyệt"
      icon="clipboard-check"
      iconPack="fas"
      content-class="p-0"
    >
      <div id="page-main-content">
        <div id="list-pending-post-container">
          <div class="px-3 pt-5 pb-3">
            <post-search @search="$on_search" />
          </div>
          <section class="px-3 py-5">
            <b-tabs
              id="pending-post-tabs"
              class="is-no-vertical-padding"
              position="is-centered"
              :animated="false"
              v-model="activeTab"
            >
              <b-tab-item>
                <template #header>
                  <div class="tab-header">
                    <b-icon icon="check" type="is-success"></b-icon>
                    <span class="tab-header-title">
                      {{ TAB_STATUS_MAPS[0].text }}
                      <b-tag rounded> {{ TAB_STATUS_MAPS[0].count }} </b-tag>
                    </span>
                  </div>
                </template>

                <template>
                  <pending-post-section
                    :search-result="searchResult"
                    @selected-changed="$on_selectedPostChanged"
                    @load="$on_loadMorePosts(0)"
                  />
                </template>
              </b-tab-item>

              <b-tab-item>
                <template #header>
                  <div class="tab-header">
                    <b-icon icon="spinner"></b-icon>
                    <span class="tab-header-title">
                      {{ TAB_STATUS_MAPS[1].text }}
                      <b-tag type="is-light" rounded>
                        {{ TAB_STATUS_MAPS[1].count }}
                      </b-tag>
                    </span>
                  </div>
                </template>

                <template>
                  <pending-post-section
                    :search-result="searchResult"
                    @selected-changed="$on_selectedPostChanged"
                    @load="$on_loadMorePosts(1)"
                  />
                </template>
              </b-tab-item>

              <b-tab-item>
                <template #header>
                  <div class="tab-header">
                    <b-icon icon="minus" type="is-danger"></b-icon>
                    <span class="tab-header-title">
                      {{ TAB_STATUS_MAPS[2].text }}
                      <b-tag rounded> {{ TAB_STATUS_MAPS[2].count }} </b-tag>
                    </span>
                  </div>
                </template>

                <template>
                  <pending-post-section
                    :search-result="searchResult"
                    @selected-changed="$on_selectedPostChanged"
                    @load="$on_loadMorePosts(2)"
                  />
                </template>
              </b-tab-item>
            </b-tabs>
            <b-loading v-model="isSearching" :is-full-page="false"></b-loading>
          </section>
        </div>
        <section id="pending-post-detail-section" class="card">
          <div class="card-content p-0">
            <b-tabs
              v-if="selectedPost"
              id="post-detail-tabs"
              class="is-paddingless"
              type="is-toggle"
            >
              <b-tab-item label="Bài viết">
                <pending-post-detail :post="selectedPost" />
              </b-tab-item>
              <b-tab-item label="Duyệt">
                <verification-info-tab :post="selectedPost" />
              </b-tab-item>
            </b-tabs>
            <div v-else class="p-3 is-flex is-justify-content-center">
              <span class="is-size-4 has-text-grey-light has-text-weight-medium"
                >Bạn chưa chọn bài viết</span
              >
            </div>
          </div>
        </section>
      </div>
    </admin-content>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "PendingPostsPage",
  components: {
    "admin-content": () =>
      import("../components/admin-content/admin-content.vue"),
    "pending-post-section": () => import("./pending-post-section"),
    "pending-post-detail": () =>
      import("./pending-post-detail/pending-post-detail"),
    "verification-info-tab": () =>
      import("./pending-post-detail/verification-info-tab"),
    "post-search": () => import("./post-search")
  },
  provide() {
    return {
      findPendingPosts: this.creator_findPendingPosts,
      reloadTab: this.$_reloadTab
    };
  },
  data: () => ({
    TAB_STATUS_MAPS: [
      {
        status: 1,
        text: "Đã duyệt ",
        count: 0
      },
      {
        status: 2,
        text: "Chờ duyệt ",
        count: 0
      },
      {
        status: 0,
        text: "Không được duyệt ",
        count: 0
      }
    ],
    searchOptions: null,
    selectedPost: null,
    searchResult: null,
    activeTab: -1,
    isSearching: false
  }),
  watch: {
    activeTab(val) {
      this.$_reloadTab();
    }
  },
  methods: {
    ...mapActions("POST", ["creator_findPendingPosts"]),
    $on_selectedPostChanged(post) {
      this.selectedPost = post;
    },
    $on_search(searchOptions) {
      this.$_updatePendingPosts({
        status: this.TAB_STATUS_MAPS[this.activeTab].status,
        ...searchOptions
      });
    },
    $_updatePendingPosts(options) {
      this.isSearching = true;
      this.creator_findPendingPosts(options).then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.isSearching = false;
        const { groups, ...searchResult } = data;
        this.searchResult = searchResult;
        if (!groups) {
          return;
        }
        this.$_updateTabInfo(groups);
      });
    },
    $_updateTabInfo(groups) {
      this.TAB_STATUS_MAPS.forEach(tab => {
        tab.count = groups[tab.status.toString()]?.count ?? 0;
      });
    },
    $on_loadMorePosts(tabIndex) {
      fetch(this.searchResult.next)
        .then(res => res.json())
        .then(result => {
          this.searchResult = {
            ...result,
            results: this.searchResult.results.push(...result.results)
          };
        });
    },
    $_reloadTab() {
      this.isSearching = true;
      this.searchResult = null;
      this.selectedPost = null;
      this.$_updatePendingPosts({
        status: this.TAB_STATUS_MAPS[this.activeTab].status,
        group: true
      });
    }
  }
};
</script>

<style scoped lang="scss">
#page-main-content {
  @include tablet {
    display: flex;

    #list-pending-post-container {
      flex-grow: 1;
    }

    #pending-post-detail-section {
      display: block;
      position: sticky;
      width: 300px;
      height: calc(100vh - 5rem);
      overflow: auto;
      top: 1rem;
      right: 0;
    }
  }
}

.tab-header {
  display: flex;
  align-items: center;
}
</style>
