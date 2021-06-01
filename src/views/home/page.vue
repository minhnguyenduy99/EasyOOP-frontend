<template>
  <div id="home-page">
    <div class="hero is-primary-light is-fullheight-with-navbar">
      <div class="hero-body">
        <div class="container has-text-centered is-4">
          <p class="is-size-1 py-5">Bắt đầu học OOP nào</p>
          <b-button
            icon-right="chevron-down"
            type="is-primary-light"
            size="is-medium"
            inverted
            class="has-text-weight-bold"
            @click="$_scrollToFirstStep"
            >Xem lộ trình học</b-button
          >
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
                :to="{
                  name: 'PostView',
                  params: { post_id: step.first_post_id }
                }"
                >Bắt đầu học</b-button
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
export default {
  name: "Home",
  components: {
    "learning-step": () => import("./learning-step")
  },
  data: () => ({
    posts: [],
    topics: []
    // topics: [
    //   {
    //     image:
    //       "https://itviec.com/blog/wp-content/uploads/2020/09/oop-la-gi-fi.jpg",
    //     title: "Lorem Ipsuand t",
    //     subtitle:
    //       "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown prin"
    //   },
    //   {
    //     image:
    //       "https://itviec.com/blog/wp-content/uploads/2020/09/oop-la-gi-fi.jpg",
    //     title: "Lorem Ipsum is simply dummy text of the printing and t",
    //     subtitle:
    //       "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown prin"
    //   },
    //   {
    //     image:
    //       "https://itviec.com/blog/wp-content/uploads/2020/09/oop-la-gi-fi.jpg",
    //     title: "Lorem Ipsum is simply dummy text of the printing and t",
    //     subtitle:
    //       "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown prin"
    //   }
    // ]
  }),
  mounted: function() {
    this.$_getTopics();
  },
  methods: {
    ...mapActions("POST", ["getPosts", "searchTopics", "searchTopics"]),

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
      this.searchTopics().then(result => {
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
