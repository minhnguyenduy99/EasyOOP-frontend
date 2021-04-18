<template>
  <nav class="breadcrumb">
    <ul>
      <li
        v-for="(title, index) in titles"
        :key="title.id"
        :class="[_active === index ? 'is-active' : '']"
      >
        <router-link v-if="title.to" :to="title.to">
          {{ title.value }}
        </router-link>
        <a v-else>{{ title.value }}</a>
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
    active: Number
  },
  model: {
    prop: "active",
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
