<template>
  <div id="user-view-sidebar-content">
    <div v-if="topics.length > 0">
      <topic-list :topics="topics" :to="$_nagivateToPost" />
    </div>
  </div>
</template>

<script>
const data = [
  {
    list_posts: [
      {
        post_title: "OOP Encapsulation",
        post_id: "60477bbae82d0302c40ddc05"
      },
      {
        post_title: "OOP Inheritance",
        post_id: "60477c9d7647730ea40b84ae"
      },
      {
        post_title: "OOP Abstraction",
        post_id: "604781164c042cba7f794e17"
      },
      {
        post_title: "OOP Polymorphism",
        post_id: "604781ccdef30ea638338b7c"
      }
    ],
    topic_title: "CONCEPT",
    topic_id: "60477dbeb8229be06bbc061f"
  },
  {
    list_posts: [
      {
        post_title: "OOP Encapsulation",
        post_id: "60477bbae82d0302c40ddc05"
      },
      {
        post_title: "OOP Inheritance",
        post_id: "60477c9d7647730ea40b84ae"
      },
      {
        post_title: "OOP Abstraction",
        post_id: "604781164c042cba7f794e17"
      },
      {
        post_title: "OOP Polymorphism",
        post_id: "604781ccdef30ea638338b7c"
      }
    ],
    topic_title: "CONCEPT",
    topic_id: "60477dbeb8229be06bbc061f"
  },
  {
    list_posts: [
      {
        post_title: "OOP Encapsulation",
        post_id: "60477bbae82d0302c40ddc05"
      },
      {
        post_title: "OOP Inheritance",
        post_id: "60477c9d7647730ea40b84ae"
      },
      {
        post_title: "OOP Abstraction",
        post_id: "604781164c042cba7f794e17"
      },
      {
        post_title: "OOP Polymorphism",
        post_id: "604781ccdef30ea638338b7c"
      }
    ],
    topic_title: "CONCEPT",
    topic_id: "60477dbeb8229be06bbc061f"
  }
];

export default {
  components: {
    "topic-list": async () => (await import("../../components"))["TopicList"]
  },
  inject: ["getPostByTopic"],
  data: () => ({
    topics: []
  }),
  mounted: function() {
    const fetchData = this.getPostByTopic?.() ?? Promise.resolve({ data });
    fetchData.then(({ data }) => {
      this.topics = data;
    });
  },
  methods: {
    $_nagivateToPost(post) {
      return {
        name: "PostDetail",
        params: {
          post_id: post.post_id
        }
      };
    }
  }
};
</script>
