<template>
  <div class="learning-step">
    <slot name="header">
      <div class="step-label" data-aos="flip-down" data-aos-duration="1000">
        <div class="is-flex is-align-items-center">
          <b-tag
            type="is-primary-light"
            size="is-large"
            class="has-text-weight-bold is-size-3 is-radiusless"
            >{{ order }}</b-tag
          >
        </div>
        <hr />
      </div>
    </slot>
    <div class="learning-step-body">
      <div
        class="learning-step-image-container"
        data-aos="fade-right"
        data-aos-duration="1000"
        data-aos-offset="200"
      >
        <img :src="image" />
      </div>
      <div
        class="learning-step-content"
        data-aos="fade-left"
        data-aos-duration="1000"
        data-aos-offset="400"
      >
        <slot>
          <div class="ha-vertical-layout-5">
            <p class="is-size-2">{{ title }}</p>
            <p class="is-size-5 has-text-grey has-text-justified">
              {{ subtitle }}
            </p>
          </div>
        </slot>
        <slot name="action" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LearningStep",
  props: {
    image: String,
    title: String,
    subtitle: String,
    order: Number
  }
};
</script>

<style scoped lang="scss">
.learning-step {
  &-body {
    display: grid;
    row-gap: 1rem;

    @include tablet {
      display: grid;
      grid-template-columns: auto 1fr;
      justify-content: space-between;
      column-gap: 1rem;
    }
  }

  &-image-container {
    display: flex;
    > img {
      height: 100%;
      width: auto;
      max-width: 400px;
    }
  }

  &-content {
    @include tablet {
      justify-self: flex-end;
      min-width: 500px;
    }
  }
}

.step-label {
  margin-bottom: 2.5rem;

  hr {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 5px;
    background-color: $primary-light;
  }
}
</style>
