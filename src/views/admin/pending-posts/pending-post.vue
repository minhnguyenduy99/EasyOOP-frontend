<template>
  <div
    :class="{
      'pending-post': true,
      card: true,
      'is-selected': selected
    }"
    @click="$on_postClicked"
  >
    <div class="card-image" style="z-index: 20">
      <b-image
        ratio="16by9"
        class="pending-post-thumbnail"
        :src="thumbnailUrl"
      />
      <div
        :class="{
          'pending-post-actions': true,
          'is-check-mode': selected || checkMode
        }"
      >
        <div class="is-flex is-justify-content-space-between">
          <b-button
            @click.stop="isChecked = !isChecked"
            :class="{
              'is-icon-button': true,
              'is-outlined': !isChecked
            }"
            type="is-primary-light"
            icon-right="check"
            rounded
            selected
            size="is-small"
            ref="selectButton"
          />
          <div class="pending-post-actions-group">
            <b-button
              v-if="viewable"
              class="is-icon-button"
              type="is-primary-light"
              icon-right="eye"
              size="is-small"
              rounded
              @click.stop="showPost = true"
            />
            <b-button
              v-if="deletable"
              class="is-icon-button"
              type="is-danger"
              icon-right="trash"
              size="is-small"
              rounded
              @click.stop="$on_deleteButtonClicked"
            />
            <b-button
              v-if="cancellable"
              class="is-icon-button"
              type="is-danger"
              icon-right="window-close"
              size="is-small"
              rounded
              @click.stop="$on_cancelButtonClicked"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="card-content">
      <span class="is-size-6 has-text-weight-bold has-text-primary">{{
        post.post_title
      }}</span>
      <!-- <div class="pending-post-detail">
        <div class="pending-post-field">
          <span class="pending-post-field--label">Loại bài viết </span>
          <span class="pending-post-field--value">{{ post.post_type }}</span>
        </div>
        <div class="pending-post-field">
          <span class="pending-post-field--label">Chủ đề </span>
          <span class="pending-post-field--value">{{ post.topic_title }}</span>
        </div>
      </div> -->
    </div>
    <div class="card-footer">
      <span class="is-size-7 is-italic">{{ createdDateInStr }}</span>
      <span
        :class="['is-size-7', 'has-text-weight-bold', 'mt-2', postStatus.color]"
        >{{ postStatus.text }}</span
      >
    </div>
    <b-modal v-model="showPost" scroll="keep">
      <div class="card is-page-responsive py-6">
        <post-preview :post="detailedPost" :trigger="false" />
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { ToastNotifier } from "../../../utils";
import VerificationMixin from "./mixins/verification.mixin";

export default {
  name: "PendingPost",
  components: {
    "post-preview": () => import("@/components/post-preview/post-preview.vue")
  },
  mixins: [VerificationMixin],
  props: {
    checkMode: {
      type: Boolean,
      required: false,
      default: () => false
    },
    selected: Boolean
  },
  data: () => ({
    ACTIONS: [
      {
        icon: "pen",
        text: "Chỉnh sửa bài viết",
        to: { name: "EditPost" }
      }
    ],
    actionGroupActive: false,
    isChecked: false,
    showPost: false
  }),
  watch: {
    isChecked(val) {
      this.$emit("check", val);
    }
  },
  methods: {
    ...mapActions("POST", [
      "creator_cancelVerification",
      "creator_deleteVerifications"
    ]),
    $on_postClicked() {
      this.$emit("select", !this.selected);
    },
    $on_actionTriggerClicked() {
      this.$refs["action-dropdown"].toggle();
    },
    $on_cancelButtonClicked() {
      this.$buefy.dialog.confirm({
        title: "Hủy bài duyệt",
        message: "Bạn chắc chắc muốn hủy bài duyệt này ?",
        confirmText: "Đồng ý",
        cancelText: "Hủy bỏ",
        type: "is-danger",
        onConfirm: () => {
          this.creator_cancelVerification({
            verification_id: this.post.verification_id
          }).then(result => {
            const { data, error } = result;
            if (error) {
              ToastNotifier.error(this.$buefy.toast, error);
              return;
            }
            ToastNotifier.success(
              this.$buefy.toast,
              "Hủy bài duyệt thành công"
            );
            this.$emit("cancelled", this.post);
          });
        }
      });
    },
    $on_deleteButtonClicked() {
      this.creator_deleteVerifications({
        verifications: [this.post.verification_id]
      }).then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.$emit("deleted", this.post);
      });
    }
  }
};
</script>

<style scoped lang="scss">
$card-content-padding: 0.5rem;
$card-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
  rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;

.pending-post {
  border: 2px solid transparent;
  position: relative;
  &:hover {
    .pending-post-actions {
      opacity: 1;
    }
  }

  &.is-selected {
    box-shadow: $card-shadow;
    border-color: $primary-dark;
  }
}

.pending-post-detail {
  display: flex;
  flex-direction: column;
  box-shadow: none;

  > .pending-post-field {
    padding: 0.25rem 0;
  }
}

.pending-post-actions-group {
  z-index: 12;
  > * {
    &:not(:last-child) {
      margin-right: 0.25rem;
    }
  }
}

.pending-post-actions {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: fit-content;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.8);
  transition: 0.1s ease;
  opacity: 0;

  &.is-check-mode {
    opacity: 1;
  }
}

.pending-post-field {
  display: flex;
  justify-content: space-between;
  font-size: $size-7;

  & > &--value {
    color: $grey;
  }
}

.card {
  box-shadow: none;
  transition: 0.1s ease-in;
  cursor: pointer;

  &:hover {
    box-shadow: $card-shadow;
  }

  & > &-content {
    padding: $card-content-padding;
  }

  & > &-footer {
    flex-direction: column;
    padding: $card-content-padding;
  }
}
</style>
