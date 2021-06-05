<template>
  <div class="link-template-editable">
    <ValidationObserver tag="form">
      <validated-form-element>
        <b-input v-model="temp.title" />
      </validated-form-element>
      <b-button native-type="button">{{ addText }}</b-button>
      <div>
        <div>
          <ul>
            <li v-for="(data, index) in temp.template_datas" :key="data.id">
              <a :href="data.data_link">{{ data.data_title }}</a>
              <div>
                <b-button
                  native-type="button"
                  class="is-icon-button"
                  size="is-small"
                  icon-right="minus"
                  type="is-danger"
                  @click="$removeData(index)"
                />
                >
              </div>
            </li>
          </ul>
        </div>
        <div>
          <validated-form-element>
            <b-input v-model="currentData.title" />
          </validated-form-element>
          <validated-form-element>
            <b-input v-model="currentData.link" />
          </validated-form-element>
          <div class="buttons">
            <b-button
              native-type="button"
              class="is-icon-button"
              size="is-small"
              @click="$addCurrentData"
              >{{ addDataText }}</b-button
            >
          </div>
        </div>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { ValidatedFormElement } from "@/components";
import TemplateMixin from "../template.mixin";

export default {
  name: "LinkTemplateEditable",
  mixins: [TemplateMixin("link")],
  props: {
    addText: String
  },
  components: {
    ValidationObserver,
    ValidatedFormElement
  },
  data: () => ({
    temp: {
      title: "",
      tag: "a",
      class: "",
      template_datas: []
    },
    currentData: {
      title: "",
      link: ""
    }
  }),
  methods: {
    $addCurrentData() {
      this.temp.template_datas.push({ ...this.currentData });
      this.currentData = {};
    },
    $removeData(index) {
      this.temp.template_datas.splice(index, 1);
    }
  }
};
</script>
