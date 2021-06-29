<template>
  <div
    :class="['backtop', backtopClass]"
    :style="{
      display: isDisplayed ? 'block' : 'none'
    }"
  >
    <slot>
      <b-button
        class="is-icon-button"
        :icon-right="icon"
        :icon-pack="iconPack"
        :type="type"
        :size="size"
        :outlined="outlined"
        :rounded="rounded"
        @click="$scrollToTop"
      />
    </slot>
  </div>
</template>

<script>
export default {
  name: "Backtop",
  props: {
    position: {
      type: String,
      default: () => "left",
      validator: val => ["left", "right"].indexOf(val) !== -1
    },
    type: String,
    size: {
      type: String,
      default: () => "is-medium"
    },
    outlined: Boolean,
    rounded: {
      type: Boolean,
      default: () => true
    },
    icon: {
      type: String,
      default: () => "arrow-up"
    },
    iconPack: {
      type: String,
      default: () => "fas"
    }
  },
  data: () => ({
    DEFAULT_THROTTLE: 500,
    BACKTOP_CLASSES: {
      left: "is-left",
      right: "is-right"
    },
    time: 0,
    scrollPosition: 0
  }),
  mounted: function() {
    window.addEventListener("scroll", this.$_scrollHandler);
  },
  beforeDestroy() {
    console.log("destroyed");
    window.removeEventListener("scroll", this.$_scrollHandler);
  },
  computed: {
    backtopClass() {
      return this.BACKTOP_CLASSES[this.position];
    },
    isDisplayed() {
      return this.scrollPosition > 50;
    }
  },
  methods: {
    $_scrollHandler() {
      if (window.scrollY === 0) {
        this.scrollPosition = 0;
        return;
      }
      this.$_throttle();
    },
    $_throttle() {
      if (this.time + this.DEFAULT_THROTTLE - Date.now() >= 0) {
        return;
      }
      this.scrollPosition = window.scrollY;
      this.time = Date.now();
    },
    $scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
};
</script>

<style lang="scss">
$backtop-horizontal-offset: 1rem;
$backtop-vertical-offset: 1rem;

.backtop {
  position: fixed;
  z-index: 99;
  bottom: $backtop-vertical-offset;

  &.is-left {
    left: $backtop-horizontal-offset;
  }

  &.is-right {
    right: $backtop-horizontal-offset;
  }
}
</style>
