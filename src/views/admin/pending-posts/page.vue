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
                    :active="activeTab === 0"
                    :verificationStatus="TAB_STATUS_MAPS[0].status"
                    :searchOptions="searchOptions"
                    @selected-changed="$on_selectedPostChanged"
                    @count-changed="$on_itemCountChanged(0, $event)"
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
                    :active="activeTab === 1"
                    :verificationStatus="TAB_STATUS_MAPS[1].status"
                    :searchOptions="searchOptions"
                    @selected-changed="$on_selectedPostChanged"
                    @count-changed="$on_itemCountChanged(1, $event)"
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
                    :active="activeTab === 2"
                    :verificationStatus="TAB_STATUS_MAPS[2].status"
                    :searchOptions="searchOptions"
                    @selected-changed="$on_selectedPostChanged"
                    @count-changed="$on_itemCountChanged(2, $event)"
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
              <b-tab-item label="Duyệt">
                <verification-info-tab :post="selectedPost" />
              </b-tab-item>
              <b-tab-item label="Bài viết" v-if="activeTab !== 2">
                <pending-post-detail :post="selectedDetailedPost" />
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
    <b-modal v-model="showPostModal" scroll="keep">
      <div class="card is-page-responsive py-6">
        <post-preview
          v-if="detailedPost"
          :useUrl="true"
          :contentUrl="detailedPost.content_file_url"
        />
      </div>
    </b-modal>
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
    "post-search": () => import("./post-search"),
    "post-preview": () => import("@/components/post-preview/post-preview.vue")
  },
  provide() {
    return {
      creator_findVerifications: this.creator_findVerifications,
      showPostPreview: this.$_showPostPreview
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
    isSearching: false,
    showPostModal: false,
    detailedPost: null
  }),
  mounted: function() {
    this.$_loadVerificationGroupInfo();
  },
  computed: {
    selectedDetailedPost() {
      return this.selectedPost?.post ?? {};
    }
  },
  watch: {
    activeTab(val, oldVal) {
      if (oldVal === -1) {
        return;
      }
      this.selectedPost = null;
    }
  },
  methods: {
    ...mapActions("POST", [
      "creator_findVerifications",
      "creator_getGroupInfo"
    ]),
    $on_selectedPostChanged(post) {
      this.selectedPost = post;
    },
    $on_search(searchOptions) {
      this.searchOptions = searchOptions;
    },
    $on_itemCountChanged(tabIndex, count) {
      this.TAB_STATUS_MAPS[tabIndex].count = count;
    },
    $_loadVerificationGroupInfo() {
      this.creator_getGroupInfo().then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.$_updateGroupInfo(data);
      });
    },
    $_showPostPreview(post) {
      this.showPostModal = true;
      this.detailedPost = post;
    },
    $_updateGroupInfo(data) {
      this.TAB_STATUS_MAPS.forEach(tab => {
        tab.count = data[tab.status]?.count ?? 0;
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
