<template>
  <div :class="[reverse ? 'learning-step--reverse' : 'learning-step']">
    <div class="learning-step-container">
      <div class="learning-step-image">
        <b-image
          class="learning-step-image"
          :src="image"
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-offset="200"
          :data-aos-anchor="anchor"
        />
      </div>
      <section class="learning-step-content">
        <div
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-offset="400"
          :data-aos-anchor="anchor"
        >
          <h1 class="is-size-2 has-text-weight-bold mb-3">{{ title }}</h1>
          <p class="is-size-4">{{ subtitle }}</p>
        </div>

        <div
          class="learning-step-trigger"
          data-aos="flip-left"
          data-aos-duration="1000"
          data-aos-offset="400"
          :data-aos-anchor="anchor"
        >
          <slot name="trigger" />
        </div>
      </section>
    </div>
    <hr v-if="hasDivider" class="learning-step-divider" />
  </div>
</template>

<script>
export default {
  name: "LearningStep",
  props: {
    image: String,
    title: String,
    subtitle: String,
    order: Number,
    reverse: {
      type: Boolean,
      default: () => false
    },
    hasDivider: {
      type: Boolean,
      default: () => false
    }
  },
  computed: {
    anchor() {
      return ".step-" + this.order;
    }
  }
};
</script>

<style scoped lang="scss">
// .learning-step {
//   &-body {
//     display: grid;
//     row-gap: 1rem;

//     @include tablet {
//       display: grid;
//       grid-template-columns: auto 1fr;
//       justify-content: space-between;
//       column-gap: 1rem;
//     }
//   }

//   &-image-container {
//     display: flex;
//     > img {
//       height: 100%;
//       width: auto;
//       max-width: 400px;
//     }
//   }

//   &-content {
//     @include tablet {
//       justify-self: flex-end;
//       min-width: 500px;
//     }
//   }
// }

// .step-label {
//   margin-bottom: 2.5rem;

//   hr {
//     padding: 0;
//     margin: 0;
//     width: 100%;
//     height: 5px;
//     background-color: $primary-light;
//   }
// }

[class^="learning-step-container"] {
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-content: space-between;

  @include tablet {
    grid-template-columns: 1fr 1fr;
    grid-template-areas: "image content";
  }
}

.learning-step {
  text-align: center;

  &-image {
    grid-area: image;
    max-width: 300px;
  }

  &-content {
    grid-area: content;
    text-align: justify;

    h1 {
      text-align: left;
    }
  }
}

.learning-step--reverse {
  .learning-step-container {
    grid-template-areas: "content image";
    justify-items: end;
  }
}
</style>
