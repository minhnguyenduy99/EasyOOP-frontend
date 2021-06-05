<template>
  <div class="test-template">
    <div v-if="!editable">
      <h1 class="mb-3 is-size-5 has-text-grey">
        {{ currentTemplate.title }}
      </h1>
      <div class="test-template-data-container">
        <b-button
          v-for="data in currentTemplate.template_data"
          :key="data.id"
          :class="template.class"
          tag="a"
          type="is-primary-light"
          :href="data.data_link"
        >
          {{ data.data_title }}
        </b-button>
      </div>
    </div>
    <div v-else>
      <div class="ha-vertical-layout-7">
        <slot name="add" v-bind="{ add: $addNewData }">
          <b-button
            type="is-primary"
            icon-right="plus"
            @click="$addNewData"
            inverted
            >{{ addButtonText }}</b-button
          >
        </slot>
        <b-field :label="headerTitleLabel" label-position="inside">
          <b-input v-model.lazy="currentTemplate.title" />
        </b-field>
        <div class="test-template-data-container">
          <div
            v-for="(data, index) in currentTemplate.template_data"
            :key="data.id"
            class="is-flex is-align-items-center"
          >
            <b-dropdown v-model="toggles[index]">
              <template #trigger>
                <b-button
                  type="is-primary-light"
                  @click="toggles[index] = true"
                >
                  {{ data.data_title || "Tên bài test" }}
                </b-button>
              </template>
              <b-dropdown-item custom paddingless>
                <div class="test-template-edit ha-vertical-layout-7 p-3">
                  <b-field
                    type="is-primary"
                    :label="testTitleLabel"
                    label-position="inside"
                  >
                    <b-input v-model="data.data_title" />
                  </b-field>
                  <div class="block px-2">
                    <p class="has-text-grey">{{ testLinkLabel }}</p>
                    <p class="is-size-6">
                      <a :href="data.data_link">{{ data.data_link }}</a>
                    </p>
                  </div>
                </div>
              </b-dropdown-item>
            </b-dropdown>
            <b-button
              class="is-icon-button ml-1"
              size="is-small"
              inverted
              type="is-danger"
              icon-right="trash"
              @click="$deleteData(index)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Template from "./template.mixin";

export default {
  name: "TestTemplate",
  mixins: [Template("test")],
  props: {
    editable: {
      type: Boolean,
      default: () => true
    },
    headerTitleLabel: String,
    testTitleLabel: String,
    testLinkLabel: String,
    saveButtonText: String,
    addButtonText: String
  },
  data: () => ({
    currentTemplate: {
      title: "",
      class: "",
      template_data: []
    },
    toggles: []
  }),
  mounted: function() {
    if (!this.template) {
      this.$emit("update:template", this.currentTemplate);
      return;
    }
    this.currentTemplate = this.template;
  },
  watch: {
    currentTemplate(val) {
      this.$emit("update:template", val);
    }
  },
  methods: {
    $addNewData(data) {
      this.currentTemplate.template_data.push(data);
      this.$set(this.toggles, this.toggles.length, false);
    },
    $deleteData(index) {
      const deletedTest = this.currentTemplate.template_data[index];
      this.currentTemplate.template_data.splice(index, 1);
      this.$emit("deleted", deletedTest, index);
    },
    $toggleDropdown(data) {
      data.config.showEditDropdown = !data.config.showEditDropdown;
    }
  }
};
</script>

<style scoped lang="scss">
.test-template {
  display: flex;
  flex-wrap: wrap;

  > *:not(:last-child) {
    margin-right: 0.5rem;
  }
}

.test-template-edit {
  @include desktop {
    > .field {
      min-width: 400px;
    }
  }
}

.test-template-data-container {
  display: flex;
  flex-wrap: wrap;

  > * {
    margin: 0 1rem 1rem 0;
  }
}
</style>
