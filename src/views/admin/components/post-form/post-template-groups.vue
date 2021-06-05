<template>
  <div class="post-template-groups">
    <div>
      <div class="ha-vertical-layout-7">
        <h1 class="is-size-5 has-text-grey">Thêm template</h1>
        <div class="template-options-switch-group">
          <b-switch v-model="showTestTemplate" type="is-primary-light">
            <span
              :class="{
                'has-text-weight-bold': showTestTemplate,
                'has-text-primary-light': showTestTemplate
              }"
              >Test template</span
            >
          </b-switch>
        </div>
      </div>
      <hr class="is-hr my-2" />
      <div v-if="showTestTemplate" class="py-4">
        <test-template
          :template.sync="testTemplate"
          headerTitleLabel="Tiêu đề template"
          testTitleLabel="Tên bài test"
          testLinkLabel="Đường dẫn"
          saveButtonText="Lưu"
          addButtonText="Thêm bài test"
          testLinkPlaceholder="Link bài test"
          inputTitlePlaceHolder="Tên button"
          @deleted="$on_testDeleted"
        >
          <template #add="{ add }">
            <b-autocomplete
              class="mb-5"
              clear-on-select
              v-model="searchTests"
              :data="filteredTests"
              placeholder="Nhập tên bài test"
              icon="search"
              clearable
              field="id"
              @typing="$m_findTests"
              @select="$on_testSelected($event, add)"
            >
              <template #empty>Không tìm thấy kết quả</template>
              <template #default="{ option }">
                <div class="is-flex is-flex-direction-column">
                  <span class="has-text-weight-bold">{{ option.title }}</span>
                  <span class="is-size-7 has-text-grey"
                    >Số lượng câu hỏi:
                    {{ option.list_sentence_ids.length }}</span
                  >
                </div>
              </template>
            </b-autocomplete>
          </template>
        </test-template>
      </div>
    </div>
  </div>
</template>

<script>
import { FindTestsMixin } from "./mixins";
import { mapActions } from "vuex";
import { ToastNotifier } from "@/utils";

export default {
  name: "PostTemplateGroups",
  components: {
    "test-template": () =>
      import("@/components/post-preview/post-template/test-template.vue")
  },
  mixins: [FindTestsMixin],
  props: {
    templates: Array
  },
  provide() {
    return {
      $api_searchTests: this.viewer_searchTest.bind(this)
    };
  },
  data: () => ({
    showTestTemplate: false,
    searchTests: "",
    selectedTestIds: [],
    testTemplate: {
      type: "test",
      title: "",
      class: "",
      template_data: []
    }
  }),
  mounted: function() {
    this.templates?.length > 0 &&
      (this.testTemplate = this.templates.find(
        template => template.type === "test"
      ));
    this.showTestTemplate = !!(this.templates && this.templates?.length > 0);
  },
  watch: {
    showTestTemplate(val) {
      if (!val) {
        this.$_resetTestTemplate();
        this.$emit("update:templates", []);
        return;
      }
      const templates = [this.testTemplate];
      this.$emit("update:templates", templates);
    }
  },
  methods: {
    ...mapActions("VIEWER_TEST", ["viewer_searchTest"]),

    $on_testSelected(selectedTest, addHandler) {
      if (this.selectedTestIds.indexOf(selectedTest.test_id) !== -1) {
        ToastNotifier.error(this.$buefy.toast, "Bài test đã được chọn");
        return;
      }
      const { test_id, title } = selectedTest;
      const templateData = {
        data_title: title,
        data_link: `${this.$appConfig.HOST}/tests/${test_id}`
      };
      this.selectedTestIds.push(test_id);
      addHandler?.(templateData);
    },

    $on_testDeleted(test, index) {
      this.selectedTestIds.splice(index, 1);
    },

    $_resetTestTemplate() {
      delete this.testTemplate;
      this.testTemplate = {
        type: "test",
        title: "",
        class: "",
        template_data: []
      };
      this.selectedTestIds.length = 0;
    }
  }
};
</script>

<style scoped lang="scss">
.template-options-switch-group {
  display: flex;
  flex-wrap: wrap;
  > * {
    margin: 0 1rem 0.25rem 0;
  }
}
</style>
