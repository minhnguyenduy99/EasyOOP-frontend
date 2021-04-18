<template>
  <div class="post-form">
    <ValidationObserver tag="form" ref="validator" class="ha-vertical-layout-5">
      <div id="form-first-row">
        <validated-form-element
          name="post title"
          rules="required|minmax:10,200"
          label="Tiêu đề bài viết"
          placeholder="Từ 10 đến 200 ký tự"
        >
          <b-input v-model="form.post_title" />
        </validated-form-element>
        <validated-form-element name="topic" rules="required" label="Chủ đề">
          <b-select placeholder="Chủ đề" v-model="form.topic_id">
            <option
              v-for="topic in topics"
              :value="topic.topic_id"
              :key="topic.id"
            >
              {{ topic.topic_title }}
            </option>
          </b-select>
        </validated-form-element>
        <validated-form-element name="tag" rules="required" label="Nhãn dán">
          <b-taginput
            icon="tag"
            :data="filteredTags"
            v-model="form.tags"
            autocomplete
            type="is-primary-light"
            field="tag_value"
            @typing="$on_tagInputTyping"
            :create-tag="tag => tag.tag_id"
            :allow-new="false"
            :allow-duplicates="false"
            :before-adding="$taginput_beforeAdding"
          />
        </validated-form-element>
      </div>
      <div id="form-second-row">
        <validated-form-element label="Chọn bài viết trước">
          <b-autocomplete
            rule="required"
            v-model="searchPostValue"
            :data="filteredPostList"
            field="post_title"
            placeholder="Nhập tên bài viết"
            icon="magnify"
            clearable
            @select="$on_postSelected"
            ref="post-selector"
          >
            <template #header>
              <b-button
                size="is-small"
                type="is-primary"
                rounded
                @click="$on_selectNoPreviousPost"
                >{{ DEFAULT_POST.post_title }}</b-button
              >
            </template>
            <template #empty>No results found</template>
          </b-autocomplete>
        </validated-form-element>
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
              <div
                v-if="!form.thumbnail_file"
                class="content has-text-centered"
              >
                <p>
                  <b-icon icon="upload" size="is-large" />
                </p>
                <p>Thả hoặc nhấn vào để tệp ảnh</p>
              </div>
              <div
                v-else
                class="is-flex is-justify-content-center is-align-items-center"
              >
                <b-image id="thumbnail-image-display" :src="thumbnailDataURL" />
              </div>
            </section>
          </b-upload>
        </validated-form-element>
      </div>
      <validated-form-element name="general">
        <b-input type="hidden" />
      </validated-form-element>
      <hr class="is-hr" />
      <slot name="submit" v-bind="{ form, validator }" />
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
    ValidatedFormElement
  },
  mixins: [FindPostsMixin, FindTagsMixin, FindTopicsMixin],
  data: () => ({
    form: {
      post_title: "",
      topic_id: null,
      thumbnail_file: null,
      tags: [],
      previous_post_id: null
    },
    selectedPost: null,
    validator: null,
    thumbnailDataURL: null
  }),
  watch: {
    "form.topic_id": function() {
      this.$on_postSelected(this.DEFAULT_POST);
      this.searchPostValue = "";
    },
    selectedPost: function(val) {
      this.form.previous_post_id = val?.post_id;
    }
  },
  mounted: function() {
    this.$m_findTopics();
    this.validator = this.$refs.validator;
  },
  methods: {
    $taginput_beforeAdding(tag) {
      const isAdded = this.form.tags.includes(tag.tag_value);
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
    }
  }
};
</script>

<style scoped lang="scss">
#form-first-row {
  > * {
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }

  @include tablet {
    display: flex;

    > * {
      &:not(:last-child) {
        margin-bottom: 0;
        margin-right: 1rem;
      }
    }
  }
}
#form-second-row {
  > * {
    &:first-child {
      margin-bottom: 1rem;
    }
  }

  @include tablet {
    display: flex;

    > * {
      &:first-child {
        margin-bottom: 0;
        margin-right: 1rem;
      }
    }
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
