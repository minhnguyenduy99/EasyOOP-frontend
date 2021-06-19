<template>
  <div :class="['class-diagram', size]">
    <div class="class-header">
      <div class="class-type">
        <span class="class-type-symbol">&lt;&lt; </span>
        <span class="px-2">{{ typeTitle }}</span>
        <span class="class-type-symbol"> &gt;&gt;</span>
      </div>
      <h1 class="class-header-title">{{ title }}</h1>
    </div>
    <hr class="class-divider" />
    <div class="class-diagram-body">
      <slot name="field" v-bind="{ symbol: '#' }"></slot>
      <hr class="class-divider" />
      <slot name="method" v-bind="{ symbol: '#' }"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClassDiagram",
  props: {
    title: String,
    typeTitle: String,
    hasType: {
      type: Boolean,
      default: () => false
    },
    size: {
      type: String,
      default: () => "",
      validator: val => ["", "is-large"].includes(val)
    },
    fieldItems: Array,
    fieldItemField: String,
    methodItems: Array,
    methodItemField: String
  }
};
</script>

<style lang="scss">
$class-diagram-border: 1px solid $grey-light;
$class-diagram-box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
$class-diagram-box-shadow-hover: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
  rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
  rgba(255, 255, 255, 0.08) 0px 1px 0px inset;

$header-padding: 1rem;
$header-type-font-size: $size-5;
$header-type-font-size-lg: $size-5;

$header-title-font-size: $size-4;
$header-title-font-size-lg: $size-3;

$class-field-font-size: $size-6;
$class-field-font-size-lg: $size-5;

$class-body-symbol-size: $size-5;
$class-body-symbol-size-lg: $size-4;

.class-diagram {
  border-radius: 10px;
  box-shadow: $class-diagram-box-shadow;
}

.class-header {
  text-align: center;
  padding: $header-padding;

  &-title {
    color: $primary;
    font-size: $header-title-font-size;
    font-weight: bold;
  }
}

.class-type {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: $header-type-font-size;
  color: $primary-light;

  > .class-type-symbol {
    font-weight: bold;
    display: block;
  }
}

.class-divider {
  padding: 0;
  margin: 0;
  background: $grey;
  height: 1px;
}

.class-body-item {
  display: flex;
  align-items: center;
  opacity: 0.6;
  padding: 0.15rem 1rem;
  transition: $easing;
  font-size: $class-field-font-size;

  &:hover {
    opacity: 1;
  }

  > .class-body-symbol {
    margin-right: 10px;
    font-size: $class-body-symbol-size;
    color: $primary;
  }

  > .class-body-text {
    color: inherit;
    width: 100%;
  }
}

.class-diagram.is-large {
  .class-header {
    &-title {
      font-size: $header-title-font-size-lg;
    }
  }

  .class-body-item {
    font-size: $class-field-font-size-lg;

    > .class-body-symbol {
      font-size: $class-body-symbol-size-lg;
    }
  }
}
</style>
