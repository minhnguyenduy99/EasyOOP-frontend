<template>
  <div id="tag-form">
    <ValidationObserver tag="form" ref="validator" class="ha-vertical-layout-5">
      <validated-form-element
        name="question"
        rules="required"
        label="Loại nhãn dán"
      >
        <b-select class="is-fullwidth" v-model="form.type">
          <option v-for="type in TAG_TYPES" :key="type" :value="type">{{
            type
          }}</option>
        </b-select>
      </validated-form-element>
      <div class="card">
        <ValidationObserver
          tag="div"
          ref="tag-validator"
          class="card-content py-2 ha-vertical-layout-7 is-flex is-flex-direction-column"
          v-slot="{ failed: tagFormFailed }"
        >
          <validated-form-element
            label-position="inside"
            name="tag_id"
            :rules="{
              required: true,
              'tag-unique': { tags: form.tags },
              regex: /^\w+$/
            }"
            label="ID nhãn dán (Chỉ bao gồm ký tự thường)"
          >
            <b-input
              class="is-fullwidth"
              v-model.lazy="currentTag.tag_id"
              :disabled="!form.type"
            />
          </validated-form-element>
          <validated-form-element
            name="tag_value"
            label-position="inside"
            rules="required"
            label="Tên nhãn dán"
          >
            <b-input
              class="is-fullwidth"
              v-model="currentTag.tag_value"
              :disabled="!form.type"
            />
          </validated-form-element>
          <b-button
            class="is-align-self-flex-end"
            native-type="button"
            :disabled="!form.type || tagFormFailed"
            type="is-primary"
            @click="$_addCurrentTag"
            >Thêm</b-button
          >
          <hr v-if="form.tags.length > 0" class="has-background-grey" />
          <b-taglist class="pt-3">
            <b-tag
              v-for="(tag, index) in form.tags"
              :key="tag.tag_id"
              type="is-primary-light"
              closable
              size="is-medium"
              aria-close-label="Close tag"
              @close="form.tags.splice(index, 1)"
            >
              {{ tag.tag_value }}
            </b-tag>
          </b-taglist>
        </ValidationObserver>
      </div>
      <validated-form-element
        name="general"
        type="hidden"
        :rules="{ 'tags-not-empty': { tags: form.tags } }"
      >
        <input type="hidden" />
      </validated-form-element>
      <hr class="is-hr" />
      <b-button
        type="is-primary is-dark"
        class="is-fullwidth"
        :disabled="!form.type"
        @click="$on_createTags"
        >TẠO</b-button
      >
    </ValidationObserver>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { ValidationObserver } from "vee-validate";
import { ValidatedFormElement } from "@/components";
import { CreateTagsMixin } from "./mixins";

export default {
  name: "TagForm",
  components: {
    ValidationObserver,
    ValidatedFormElement
  },
  mixins: [CreateTagsMixin({ mapActions })],
  data: () => ({
    TAG_TYPES: ["question", "post"],
    form: {
      type: null,
      tags: []
    },
    currentTag: {
      tag_id: "",
      tag_value: ""
    }
  }),
  computed: {
    validator() {
      return this.$refs.validator;
    },
    tagValidator() {
      return this.$refs["tag-validator"];
    },
    isListTagsEmpty() {
      return this.form.tags.length === 0;
    }
  },
  methods: {
    $on_createTags() {
      if (this.isListTagsEmpty) {
        this.validator.setErrors({
          general: ["* Danh sách nhãn dán đang trống"]
        });
        return;
      }
      this.$m_createTags(this.form).then(result => {
        if (result.error) {
          return;
        }
        this.$emit("tags-created", result.data);
      });
    },
    $_tagExist(tag_id) {
      return this.form.tags.findIndex(tag => tag.tag_id === tag_id) >= 0;
    },
    async $_addCurrentTag() {
      const isValid = await this.tagValidator.validate();
      if (!isValid) {
        return;
      }
      this.form.tags.push(this.currentTag);
      this.currentTag = {
        tag_id: "",
        tag_value: ""
      };
      this.validator.reset();
    }
  }
};
</script>
