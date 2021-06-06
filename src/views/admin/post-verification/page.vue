<template>
  <div id="post-verification-page">
    <admin-content
      title="Duyệt bài viết"
      icon="file-signature"
      iconPack="fas"
      content-class="p-0"
    >
      <div id="page-main-content">
        <div id="detailted-verification-container">
          <div class="px-3 pt-5">
            <verification-search @search="$on_search" />
          </div>
          <section class="px-3 py-5">
            <b-tabs
              id="pending-post-tabs"
              class="is-paddingless"
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
                <div></div>
                <template>
                  <verification-table
                    :active="activeTab === 0"
                    :type="2"
                    :search-options="searchOptions"
                    @selected="$on_verificationSelected"
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
                  <verification-table
                    :active="activeTab === 1"
                    :type="1"
                    :search-options="searchOptions"
                    @selected="$on_verificationSelected"
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
                  <verification-table
                    :active="activeTab === 2"
                    :type="0"
                    :search-options="searchOptions"
                    @selected="$on_verificationSelected"
                  />
                </template>
              </b-tab-item>
            </b-tabs>
            <b-loading v-model="isSearching" :is-full-page="false"></b-loading>
          </section>
        </div>
        <section id="latest-submitted-section" class="card">
          <div class="card-content p-0">
            <b-tabs
              v-if="selectedVerification"
              id="post-detail-tabs"
              class="is-paddingless"
              type="is-toggle"
            >
              <b-tab-item label="Duyệt">
                <verification-info :verification="selectedVerification" />
              </b-tab-item>
              <b-tab-item v-if="selectedPost" label="Bài viết">
                <post-info :post="selectedPost" />
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
    <b-modal v-model="showModal" scroll="keep">
      <div class="card is-page-responsive py-6">
        <post-preview :post="selectedPost" :trigger="false" />
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "PostVerificationPage",
  components: {
    "admin-content": () =>
      import("../components/admin-content/admin-content.vue"),
    "verification-search": () => import("./verification-search"),
    "verification-table": () => import("./verification-table"),
    "post-info": () => import("./verification-detail/post-info"),
    "verification-info": () =>
      import("./verification-detail/verification-info"),
    "post-preview": async () => (await import("@/components")).PostPreview
  },
  provide() {
    return {
      manager_getPendingVerifications: this.manager_getPendingVerifications,
      manager_findVerifications: this.manager_findVerifications,
      getPostById: this.getPostById,
      manager_verify: this.manager_verify,
      manager_unverify: this.manager_unverify,
      previewSelectedPost: this.$_previewSelectedPost
    };
  },
  data: () => ({
    VERIFICATION_STATUSES: {
      UNVERIFIED: 0,
      VERIFIED: 1,
      PENDING: 2,
      CANCEL: 3
    },
    TAB_STATUS_MAPS: [
      {
        status: 2,
        text: "Chờ duyệt ",
        count: 0
      },
      {
        status: 1,
        text: "Đã duyệt",
        count: 0
      },
      {
        status: 0,
        text: "Không được duyệt ",
        count: 0
      }
    ],
    activeTab: -1,
    searchOptions: {},
    isSearching: false,
    selectedVerification: null,
    selectedPost: null,
    showModal: false
  }),
  watch: {
    activeTab(val) {
      this.$_updateTabInfo();
    }
  },
  methods: {
    ...mapActions("POST", [
      "manager_getPendingVerifications",
      "manager_findVerifications",
      "manager_getGroupSummary",
      "manager_verify",
      "manager_unverify",
      "getPostById"
    ]),

    $on_search(searchOptions) {
      this.searchOptions = searchOptions;
    },
    $on_verificationSelected(verification) {
      this.selectedVerification = verification;
      if (
        !verification ||
        verification.status === this.VERIFICATION_STATUSES.UNVERIFIED
      ) {
        this.selectedPost = null;
        return;
      }
      this.getPostById(verification.post_id).then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.selectedPost = data;
      });
    },
    $_reloadTab() {
      this.isSearching = true;
    },
    $_updateTabInfo() {
      this.$on_verificationSelected(null);
      this.manager_getGroupSummary().then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.TAB_STATUS_MAPS.forEach(tab => {
          const info = data[tab.status];
          tab.count = info?.count ?? 0;
        });
      });
    },
    $_previewSelectedPost() {
      this.showModal = true;
    }
  }
};
</script>

<style scoped lang="scss">
#page-main-content {
  #latest-submitted-section {
    display: none;
  }

  @include tablet {
    display: flex;

    #detailted-verification-container {
      flex-grow: 1;
    }

    #latest-submitted-section {
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
</style>
