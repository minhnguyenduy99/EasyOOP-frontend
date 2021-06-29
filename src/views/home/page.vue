<template>
  <div id="home-page">
    <home-hero />
    <div
      v-for="(step, index) in topics"
      :key="step.id"
      :class="['step-' + index, 'hero is-fullheight-with-navbar is-large']"
      ref="steps"
    >
      <div class="hero-body">
        <learning-step
          :image="step.thumbnail_url"
          :title="step.topic_title"
          :subtitle="step.topic_description"
          :order="index"
          :reverse="index % 2 === 1"
          style="width: 100%"
        >
          <template #trigger>
            <div
              :class="[
                'mt-4 is-flex',
                index % 2 === 1 ? 'is-justify-content-flex-end' : ''
              ]"
            >
              <!-- <button
                class="btn-grad"
                type="is-primary"
                size="is-medium"
                :disabled="!step.first_post_id"
                @click="
                  $router.push({
                    name: 'PostView',
                    params: { post_id: step.first_post_id }
                  })
                "
              >
                {{ step.first_post_id ? "Bắt đầu học" : "Sắp ra mắt" }}
              </button> -->
              <button
                class="btn-grad has-text-weight-bold is-rounded"
                rounded
                type="is-primary"
                size="is-medium"
                icon-right="angle-double-right"
                tag="router-link"
                :disabled="!step.first_post_id"
                @click="
                  $router.push({
                    name: 'PostView',
                    params: { post_id: step.first_post_id }
                  })
                "
              >
                {{ step.first_post_id ? "Bắt đầu học" : "Sắp ra mắt" }}
              </button>
            </div>
          </template>
        </learning-step>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { ClassDiagram } from "@/components";

export default {
  name: "Home",
  components: {
    "learning-step": () => import("./learning-step"),
    "home-hero": () => import("./home-hero.vue"),
    ClassDiagram
  },
  data: () => ({
    posts: [],
    topics: []
  }),
  mounted: function() {
    this.$_getTopics();
  },
  methods: {
    ...mapActions("POST", ["getPosts", "getAllTopics"]),

    $_navigateToPostView(post) {
      this.$router.push({
        name: "PostView",
        params: {
          post_id: post.post_id
        }
      });
    },
    $_scrollToFirstStep() {
      const firstStep = this.$refs.steps[0];
      firstStep.scrollIntoView({
        behavior: "smooth"
      });
    },

    $_getTopics() {
      this.getAllTopics().then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.topics.length = 0;
        this.topics.push(...data);
      });
    }
  }
};
</script>

<style scoped lang="scss">
// #home-page {
//   position: relative;
//   display: flex;
//   justify-content: space-between;

//   #latest-posts-section {
//     flex-basis: 25%;
//     position: sticky;
//     top: 100px;
//     left: 0;
//   }

//   #right-section {
//     flex-basis: 72%;
//   }
// }

.step {
  &-group {
    display: block;

    @include tablet {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      column-gap: 1rem;
    }
  }

  &-item {
    display: flex;
    flex-direction: column;
    align-items: center;

    @include tablet {
      flex-direction: row;
    }
  }

  &-icon {
    padding: 2rem 0;
    @include tablet {
      transform: rotate(-90deg);
      padding: 0 2rem;
    }
  }
}

.btn-grad {
  background-image: linear-gradient(
    to right,
    $primary 0%,
    #12d0f1 51%,
    $primary-light 100%
  );
  height: auto;
  padding: 15px 45px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;
  border-radius: 1000px;
  border: none;
  cursor: pointer;
  font-size: 20px;
}

.btn-grad:hover {
  background-position: right center; /* change the direction of the change here */
  color: #fff;
  text-decoration: none;
}
</style>
