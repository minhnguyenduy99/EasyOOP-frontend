<template>
  <div class="post-form">
    <ValidationObserver tag="form" ref="validator" class="ha-vertical-layout-6">
      <div class="form-group-container ha-vertical-layout-5">
        <validated-form-element
          class="form-input --title"
          name="post_title"
          rules="required|minmax:10,200"
          label="Tiêu đề bài viết"
          placeholder="Từ 10 đến 200 ký tự"
          label-position="inside"
        >
          <b-input v-model="form.post_title" size="is-large" />
        </validated-form-element>
        <div class="form-group--column">
          <validated-form-element
            name="topic"
            :rules="{
              required: true,
              'topic-available': { topic: selectedTopic }
            }"
            label="Chủ đề"
            class="form-input"
          >
            <b-select placeholder="Chủ đề" v-model="selectedTopicIndex">
              <option
                v-for="(topic, index) in topics"
                :value="index"
                :key="topic.id"
              >
                {{ topic.topic_title }}
              </option>
            </b-select>
          </validated-form-element>
          <validated-form-element
            name="tag"
            rules="required"
            label="Nhãn dán"
            class="form-input"
          >
            <b-taginput
              icon="tags"
              :data="filteredTags"
              v-model="selectedTags"
              autocomplete
              type="is-primary-light"
              @typing="$on_tagInputTyping"
              field="tag_value"
              :allow-new="false"
              :allow-duplicates="false"
              :before-adding="$taginput_beforeAdding"
              @add="$on_tagAdded"
              @removed="$on_tagRemoved"
            >
              <template #empty>
                Không tìm thấy nhãn dán
              </template>
              <template #default="{ option }">
                <p class="has-text-grey">
                  ID:
                  <span class=" has-text-black has-text-weight-bold">{{
                    option.tag_id
                  }}</span>
                </p>
                <p class="has-text-primary has-text-weight-bold is-size-6">
                  {{ option.tag_value }}
                </p>
              </template>
            </b-taginput>
          </validated-form-element>
          <validated-form-element label="Chọn bài viết trước">
            <b-autocomplete
              rule="required"
              v-model="searchPostValue"
              :data="filteredPostList"
              field="post_title"
              placeholder="Nhập tên bài viết"
              icon="book-open"
              clearable
              @select="$on_postSelected"
              :disabled="!isTopicSelected"
              ref="post-selector"
            >
              <template #header>
                <b-button
                  size="is-small"
                  type="is-primary"
                  @click="$on_selectNoPreviousPost"
                  >{{ DEFAULT_POST.post_title }}</b-button
                >
              </template>
              <template #footer>
                <p>
                  Số lượng bài viết của chủ đề:
                  <span class="has-text-weight-bold">{{ totalPostCount }}</span>
                </p>
              </template>
              <template #empty>Không tìm thấy bài viết</template>
            </b-autocomplete>
          </validated-form-element>
        </div>
        <div class="form-group--column">
          <validated-form-element
            name="thumbnail"
            rules="required"
            label="Chọn ảnh đại diện"
          >
            <b-upload
              v-model="form.thumbnail_file"
              drag-drop
              @input="$on_SelectedThumbnailChanged"
            >
              <section class="section">
                <div v-if="!thumbnailDataURL" class="content has-text-centered">
                  <p>
                    <b-icon icon="upload" size="is-large" />
                  </p>
                  <p>Thả hoặc nhấn vào để tệp ảnh</p>
                </div>
                <div
                  v-else
                  class="is-flex is-justify-content-center is-align-items-center"
                >
                  <b-image
                    id="thumbnail-image-display"
                    :src="thumbnailDataURL"
                  />
                </div>
              </section>
            </b-upload>
          </validated-form-element>
        </div>
      </div>
      <div>
        <post-template-groups :templates.sync="form.templates" />
      </div>
      <hr />
      <validated-form-element name="general">
        <b-input type="hidden" />
      </validated-form-element>
      <slot name="submit" v-bind="{ form, detailedForm, validator }" />
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { ValidatedFormElement } from "@/components";
import { FindPostsMixin, FindTagsMixin, FindTopicsMixin } from "./mixins";

export default {
  name: "PostForm",
  components: {
    ValidationObserver,
    ValidatedFormElement,
    "post-template-groups": () => import("./post-template-groups")
  },
  mixins: [FindPostsMixin, FindTagsMixin, FindTopicsMixin],
  data: () => ({
    form: {
      post_title: "",
      topic_id: null,
      thumbnail_file: null,
      tags: [],
      previous_post_id: null,
      templates: []
    },
    selectedTags: [],
    selectedTopicIndex: -1,
    selectedPost: null,
    validator: null,
    thumbnailDataURL: null
  }),
  watch: {
    selectedTopicIndex: function(val, oldVal) {
      oldVal !== -1 && this.$on_postSelected(this.DEFAULT_POST);
      this.form.topic_id = this.selectedTopic?.topic_id;
      oldVal !== -1 && (this.searchPostValue = "");
    },
    selectedPost: function(val) {
      this.form.previous_post_id = val?.post_id;
    }
  },
  computed: {
    selectedTopic() {
      return this.topics[this.selectedTopicIndex] ?? {};
    },
    isTopicSelected() {
      return this.selectedTopic && this.selectedTopic?.is_available;
    },
    detailedForm() {
      return {
        ...this.form,
        topic_title: this.selectedTopic?.topic_title,
        tags: this.selectedTags
      };
    }
  },
  mounted: function() {
    this.$m_findTopics();
    this.validator = this.$refs.validator;
  },
  methods: {
    $taginput_beforeAdding(tag) {
      const isAdded = this.form.tags.includes(tag.tag_id);
      return !isAdded;
    },
    $on_postSelected(post) {
      this.selectedPost = post;
    },
    $on_SelectedThumbnailChanged() {
      const thumbnail = this.form.thumbnail_file;
      if (!thumbnail) {
        return;
      }

      let reader = new FileReader();
      reader.onload = function(e) {
        this.thumbnailDataURL = e.target.result;
      }.bind(this);

      reader.readAsDataURL(thumbnail);
    },
    $on_selectNoPreviousPost() {
      this.$refs["post-selector"].setSelected(this.DEFAULT_POST);
    },
    $on_tagInputTyping(value) {
      this.$m_findTags(value);
    },
    $on_tagAdded(tag) {
      this.form.tags.push(tag.tag_id);
    },
    $on_tagRemoved(tag) {
      const tagIndex = this.form.tags.findIndex(tagId => tagId === tag.tag_id);
      this.form.tags.splice(tagIndex, 1);
    }
  }
};
</script>

<style scoped lang="scss">
.form-group {
  &-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 2rem;
  }

  &--column {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 1rem;
    align-content: flex-start;
  }
}

.form-input {
  &.--title {
    grid-column: 1 / span 2;
  }
}

#thumbnail-image-display {
  max-width: 100%;
  height: 100%;

  @include tablet {
    max-width: 300px;
  }
}
</style>
