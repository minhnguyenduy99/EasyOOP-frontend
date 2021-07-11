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
            <verification-table
              :searchOptions="searchOptions"
              @selected="$on_verificationSelected"
            />
          </section>
        </div>
        <section id="verification-detail-section" class="card">
          <div class="card-content p-0">
            <b-tabs
              v-if="selectedVerification"
              v-model="activeTab"
              id="post-detail-tabs"
              class="is-paddingless"
              type="is-toggle"
            >
              <b-tab-item label="Duyệt">
                <verification-detail
                  v-if="!loading"
                  actionHeaderText="Hành động khác"
                  :loading="verificationUpdating"
                  :verification="selectedVerification"
                  @update="$_updateVerification"
                >
                  <template #actions>
                    <div
                      v-if="
                        selectedVerification &&
                          selectedVerification.status === 2
                      "
                    >
                      <div class="verification-detail__header">
                        <span>Hủy duyệt</span>
                        <hr />
                      </div>
                      <div class="verification-detail__content">
                        <div
                          class="is-flex is-flex-direction-column ha-vertical-layout-7"
                        >
                          <b-button
                            type="is-danger"
                            outlined
                            @click="$on_cancelVerification"
                            >Hủy duyệt</b-button
                          >
                        </div>
                      </div>
                    </div>
                  </template>
                </verification-detail>
                <verification-detail-skeleton v-else />
              </b-tab-item>
              <b-tab-item label="Bài viết">
                <verification-post-skeleton v-if="loading" />
                <verification-post
                  v-else-if="selectedDetailedPost.post_id"
                  :post="selectedDetailedPost"
                  :editable="isPostEditable"
                  @preview="showPostModal = true"
                />
                <div v-else class="has-text-centered p-3">
                  <span class="has-text-grey is-size-5"
                    >Bài viết đã bị xóa</span
                  >
                </div>
              </b-tab-item>
              <b-tab-item label="Lịch sử duyệt">
                <verification-history-skeleton v-if="loading" :count="5" />
                <verification-history
                  v-else
                  :verifications="historyVerifications"
                />
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
          :useUrl="true"
          :contentUrl="selectedDetailedPost.content_file_url"
        />
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  VerificationHistorySkeleton,
  VerificationDetailSkeleton,
  VerificationPostSkeleton
} from "@/components/skeletons";
import { ToastNotifier } from "@/utils";

export default {
  name: "PendingPostsPage",
  components: {
    VerificationHistorySkeleton,
    VerificationDetailSkeleton,
    VerificationPostSkeleton,
    "admin-content": () =>
      import("../components/admin-content/admin-content.vue"),
    "verification-table": () => import("./verification-table.vue"),
    "verification-detail": () =>
      import("../components/verification/verification-detail.vue"),
    "verification-post": () =>
      import("../components/verification/verification-post.vue"),
    "verification-history": () =>
      import("../components/verification/verification-history.vue"),
    "post-search": () => import("./post-search"),
    "post-preview": () => import("@/components/post-preview/post-preview.vue")
  },
  metaInfo() {
    const title = `Bài viết chờ duyệt - ${this.$appConfig.VUE_APP_NAME}`;
    return {
      title
    };
  },
  data: () => ({
    activeTab: -1,
    searchOptions: null,
    selectedVerification: null,
    searchResult: null,
    isSearching: false,
    showPostModal: false,
    detailedPost: null,
    historyVerifications: [],
    loading: false,
    verificationUpdating: false
  }),
  computed: {
    ...mapGetters("AUTH", ["activeRole"]),

    selectedDetailedPost() {
      return this.selectedVerification?.post ?? {};
    },
    isPostEditable() {
      return this.selectedDetailedPost.post_status === 0;
    }
  },
  watch: {
    activeTab(val) {
      if (val !== 2) {
        return;
      }
      this.$_requestPostHistory();
    }
  },
  methods: {
    ...mapActions("POST", [
      "creator_getVerificationById",
      "creator_getHistoryOfPost",
      "creator_updateVerification",
      "creator_cancelVerification"
    ]),

    $on_verificationSelected(verification) {
      if (!verification) {
        this.selectedVerification = null;
        return;
      }
      this.selectedVerification = {};
      this.loading = true;
      const { verification_id } = verification;
      this.creator_getVerificationById({ verification_id }).then(result => {
        const { error, data } = result;
        if (error) {
          this.loading = false;
          return;
        }
        this.selectedVerification = data;
        if (this.activeTab !== 2) {
          this.loading = false;
          return;
        }
        this.$_requestPostHistory();
      });
    },
    $on_search(searchOptions) {
      this.searchOptions = searchOptions;
    },
    $on_cancelVerification() {
      if (!this.selectedVerification) {
        return;
      }
      this.$buefy.dialog.confirm({
        title: "Hủy bài duyệt",
        message:
          "Bạn chắc chắc muốn hủy bài duyệt này ?</br>Bài duyệt đã hủy sẽ không thể hồi phục",
        confirmText: "Đồng ý",
        cancelText: "Hủy bỏ",
        type: "is-danger",
        onConfirm: () => {
          const { verification_id } = this.selectedVerification;
          this.creator_cancelVerification({ verification_id }).then(result => {
            const { error } = result;
            if (error) {
              return;
            }
            ToastNotifier.success(this.$buefy.toast, "Hủy duyệt thành công");
            this.searchOptions = null;
            this.$_resetComponentData();
          });
        }
      });
    },
    $_updateVerification(data) {
      this.verificationUpdating = true;
      this.creator_updateVerification({
        verification_id: this.selectedVerification.verification_id,
        data
      }).then(result => {
        this.verificationUpdating = false;
        const { error } = result;
        if (error) {
          return;
        }
        ToastNotifier.success(this.$buefy.toast, "Cập nhật thành công");
      });
    },
    $_requestPostHistory() {
      const { post_id } = this.selectedVerification;
      if (!post_id) {
        return;
      }
      this.loading = true;
      this.historyVerifications.length = 0;
      this.creator_getHistoryOfPost({ post_id }).then(result => {
        this.loading = false;
        const { error, data } = result;
        if (error) {
          return;
        }
        this.historyVerifications = data;
      });
    },
    $_resetComponentData() {
      this.selectedVerification = null;
      this.historyVerifications.length = 0;
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

    #verification-detail-section {
      display: block;
      position: sticky;
      width: 330px;
      height: calc(100vh - 1rem);
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

#verification-detail-section {
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #dedede;
    &:hover {
      background-color: #ababab;
    }
  }
}
</style>
