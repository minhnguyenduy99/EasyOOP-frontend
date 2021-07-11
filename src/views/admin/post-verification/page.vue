<template>
  <div>
    <admin-content
      title="Duyệt bài viết"
      icon="file-signature"
      iconPack="fas"
      content-class="p-0"
    >
      <div id="page-main-content">
        <div id="list-pending-post-container">
          <div class="px-3 pt-5 pb-3">
            <verification-search @search="$on_search" />
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
                  :verification="selectedVerification"
                >
                  <template #custom-info="{ data }">
                    <div class="px-3">
                      <b-field label="Tin nhắn" label-position="inside">
                        <b-input
                          :value="data.message"
                          placeholder="Lời nhắn"
                          type="textarea"
                          :disabled="true"
                        />
                      </b-field>
                    </div>
                  </template>
                  <template #actions>
                    <div
                      v-if="
                        selectedVerification &&
                          selectedVerification.status === 2
                      "
                    >
                      <div class="verification-detail__header">
                        <span>Duyệt bài viết</span>
                        <hr />
                      </div>
                      <div class="verification-detail__content">
                        <div
                          class="is-flex is-flex-direction-column ha-vertical-layout-7"
                        >
                          <b-button
                            type="is-primary"
                            @click="$on_verifyPost"
                            :loading="verificationActionLoadings[0]"
                            >Duyệt bài viết</b-button
                          >
                          <b-button
                            type="is-danger"
                            outlined
                            :loading="verificationActionLoadings[1]"
                            @click="$on_unverifyPost"
                            >Không duyệt</b-button
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
                  :editable="false"
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
import { mapActions } from "vuex";
import {
  VerificationHistorySkeleton,
  VerificationDetailSkeleton,
  VerificationPostSkeleton
} from "@/components/skeletons";
import { ToastNotifier } from "@/utils";

export default {
  name: "PostVerificationPage",
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
    "verification-search": () => import("./verification-search"),
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
    showPostModal: false,
    historyVerifications: [],
    loading: false,
    verificationActionLoadings: [false, false]
  }),
  computed: {
    selectedDetailedPost() {
      return this.selectedVerification?.post ?? {};
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
      "manager_getVerificationById",
      "manager_getHistoryOfPost",
      "manager_verify",
      "manager_unverify"
    ]),

    $on_verificationSelected(verification) {
      if (!verification) {
        this.selectedVerification = null;
        return;
      }
      this.selectedVerification = {};
      this.loading = true;
      const { verification_id } = verification;
      this.manager_getVerificationById({ verification_id }).then(result => {
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
    $on_verifyPost() {
      if (!this.selectedVerification) {
        return;
      }
      this.$buefy.dialog.confirm({
        title: "Duyệt bài viết",
        message: "Bạn chắc chắc muốn duyệt bài viết ?",
        confirmText: "Đồng ý",
        cancelText: "Hủy bỏ",
        type: "is-primary",
        onConfirm: () => {
          this.verificationActionLoadings[0] = true;
          const { verification_id } = this.selectedVerification;
          this.manager_verify({ verification_id }).then(result => {
            this.verificationActionLoadings[0] = false;
            const { error } = result;
            if (error) {
              return;
            }
            ToastNotifier.success(this.$buefy.toast, "Bài viết đã được duyệt");
            this.$_resetComponentData();
          });
        }
      });
    },
    $on_unverifyPost() {
      if (!this.selectedVerification) {
        return;
      }
      this.$buefy.dialog.confirm({
        title: "Không duyệt bài viết",
        message:
          "Bạn chắc chắc muốn từ chối duyệt bài viết ?</br>Bài viết sau khi bị hủy duyệt sẽ <strong class='has-text-danger'>MẤT HOÀN TOÀN</strong>",
        confirmText: "Đồng ý",
        cancelText: "Hủy bỏ",
        type: "is-danger",
        onConfirm: () => {
          this.verificationActionLoadings[1] = true;
          const { verification_id } = this.selectedVerification;
          this.manager_unverify({ verification_id }).then(result => {
            this.verificationActionLoadings[1] = false;
            const { error } = result;
            if (error) {
              return;
            }
            ToastNotifier.success(
              this.$buefy.toast,
              "Hủy duyệt bài viết thành công"
            );
            this.$_resetComponentData();
          });
        }
      });
    },
    $_requestPostHistory() {
      const { post_id } = this.selectedVerification;
      if (!post_id) {
        return;
      }
      this.loading = true;
      this.historyVerifications.length = 0;
      this.manager_getHistoryOfPost({ post_id }).then(result => {
        this.loading = false;
        const { error, data } = result;
        if (error) {
          return;
        }
        this.historyVerifications = data;
      });
    },
    $_resetComponentData() {
      this.searchOptions = {};
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
