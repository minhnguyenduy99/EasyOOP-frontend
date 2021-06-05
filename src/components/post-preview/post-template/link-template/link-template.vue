<template>
  <div class="link-template">
    <div v-if="editable">
      <h1>{{ template.title }}</h1>
      <component
        v-for="data in template.template_data"
        :key="data.id"
        :is="tag"
        :href="data.data_link"
        :class="template.class"
        >{{ data.data_title }}</component
      >
    </div>
  </div>
</template>

<script>
import Template from "./template.mixin";

export default {
  name: "LinkTemplate",
  mixins: [Template("link")],
  computed: {
    tag() {
      return this.template.tag ?? "a";
    }
  }
};
</script>
