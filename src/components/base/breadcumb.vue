<template>
  <nav class="breadcrumb">
    <ul>
      <li
        v-for="title in titles"
        :key="title.id"
        :class="[active.value === title.value ? 'is-active' : '']"
      >
        {{ title.value }}
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "BreadCumb",
  props: {
    titles: {
      type: Array,
      required: false,
      default: () => []
    },
    active: Object
  },
  model: {
    prop: "value",
    event: "active-changed"
  },
  computed: {
    _active: {
      get() {
        return this.active;
      },
      set(val) {
        this.$emit("active-changed", val);
      }
    }
  }
};
</script>
