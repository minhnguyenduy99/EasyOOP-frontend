<template>
  <div id="home-page">
    <div class="hero is-fullheight-with-navbar">
      <div class="hero-body">
        <div class="container columns is-centered">
          <div class="column">
            <class-diagram
              data-aos="fade-right"
              data-aos-duration="1000"
              size="is-large"
              title="Học OOP"
              typeTitle="GIỚI THIỆU"
              :hasType="true"
            >
              <template #field>
                <div class="class-body-item">
                  <p class="class-body-symbol">#</p>
                  <p class="class-body-text">
                    Đối_tượng
                  </p>
                </div>
                <div class="class-body-item">
                  <p class="class-body-symbol">#</p>
                  <p class="class-body-text">
                    Bài_học
                  </p>
                </div>
                <div class="class-body-item">
                  <p class="class-body-symbol">#</p>
                  <p class="class-body-text">
                    Chủ_đề
                  </p>
                </div>
              </template>
              <template #method>
                <div class="class-body-item">
                  <p class="class-body-symbol">+</p>
                  <p
                    class="class-body-text is-clickable"
                    @click="$_scrollToFirstStep"
                  >
                    Xem_lộ_trình_học()
                  </p>
                </div>
                <div class="class-body-item">
                  <p class="class-body-symbol">+</p>
                  <p class="class-body-text is-clickable">
                    Xem_bài_viết()
                  </p>
                </div>
                <div class="class-body-item">
                  <p class="class-body-symbol">+</p>
                  <p class="class-body-text is-clickable">
                    Làm_trắc_nghiệm()
                  </p>
                </div>
              </template>
            </class-diagram>
          </div>
          <div class="column">
            <b-image
              data-aos="fade-left"
              data-aos-duration="1000"
              src="https://res.cloudinary.com/dml8e1w0z/image/upload/v1624101709/oop-learning-helper/10-applications-of-object-oriented-programming_ftirco.jpg"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      v-for="(step, index) in topics"
      :key="step.id"
      class="hero is-fullheight-with-navbar"
      ref="steps"
    >
      <div class="hero-body">
        <learning-step
          :image="step.thumbnail_url"
          :title="step.topic_title"
          :subtitle="step.topic_description"
          :order="index + 1"
          style="width: 100%"
        >
          <template #action>
            <div class="mt-6">
              <b-button
                type="is-primary"
                size="is-medium"
                icon-right="angle-double-right"
                tag="router-link"
                :disabled="!step.first_post_id"
                :to="{
                  name: 'PostView',
                  params: { post_id: step.first_post_id }
                }"
                >{{
                  step.first_post_id ? "Bắt đầu học" : "Sắp ra mắt"
                }}</b-button
              >
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
</style>
