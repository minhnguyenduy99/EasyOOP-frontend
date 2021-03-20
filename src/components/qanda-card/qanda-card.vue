<template>
  <div class="qand-card">
    <router-link v-if="canRedirect" :to="qanda.redirect_to">
      <span class="is-size-5">{{ qanda.question }}</span>
    </router-link>
    <b-collapse
      v-else
      aria-id="contentIdForA11y2"
      animation="slide"
      :open.sync="$attrs.open"
    >
      <template #trigger="{ open }">
        <div
          class="is-flex is-justify-content-space-between is-align-items-center"
        >
          <span
            :class="{
              'is-size-5': true,
              'has-text-primary': open,
              'has-text-weight-bold': open
            }"
            >{{ qanda.question }}</span
          >
          <b-icon
            :icon="open ? 'chevron-down' : 'chevron-left'"
            :type="open ? 'is-primary' : 'is-dark'"
          />
        </div>
      </template>
      <div class="card mt-5">
        <div class="card-content">
          <span class="is-size-4">{{ qanda.answer }}</span>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
import QandAMixin from "./qanda.mixin";

export default {
  mixins: [QandAMixin],
  computed: {
    canRedirect() {
      return this.qanda.redirect_to !== null;
    }
  }
};
</script>
