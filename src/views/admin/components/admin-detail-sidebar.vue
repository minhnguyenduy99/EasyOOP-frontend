<template>
  <div :class="['detail-sidebar', sidebarPositionClass]">
    <div :class="['general-content', generalContentClass]">
      <slot></slot>
    </div>
    <section
      :class="['detail-content', detailContentClass, sidebarCard ? 'card' : '']"
      :style="{ top: sidebarTop }"
    >
      <div v-if="sidebarCard" class="card-content">
        <slot name="detail-content"></slot>
      </div>
      <slot v-else name="detail-content"></slot>
    </section>
  </div>
</template>

<script>
export default {
  name: "DetailSidebar",
  props: {
    hideSidebarOnMobile: {
      type: Boolean,
      default: () => true
    },
    sidebarTop: {
      type: String,
      default: () => "10px"
    },
    sidebarPosition: {
      type: String,
      default: () => "right",
      validator: val => ["left", "right"].indexOf(val) !== -1
    },
    sidebarCard: {
      type: Boolean,
      default: () => true
    },
    generalContentClass: String,
    detailContentClass: String
  },
  computed: {
    sidebarPositionClass() {
      switch (this.sidebarPosition) {
        case "left":
          return "is-left";
        case "right":
          return "is-right";
      }
      return "";
    }
  }
};
</script>

<style lang="scss">
$admin-sidebar-detail-content-width: 300px;

.detail-sidebar {
  display: grid;
  row-gap: 1rem;

  .detail-content {
    width: 100%;
    > *:first-child {
      height: 100%;
    }
  }

  @include tablet {
    grid-template-columns: 1fr auto;
    column-gap: 1rem;

    .detail-content {
      display: block;
      position: sticky;
      height: calc(100vh - 5rem);
      width: $admin-sidebar-detail-content-width;
      overflow: auto;
      right: 0;
    }

    &.is-left {
      .detail-content {
        left: 0;
      }
    }

    &.is-right {
      .detail-content {
        right: 0;
      }
    }
  }
}
</style>
