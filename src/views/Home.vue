<template>
  <div class="home">
    <div v-if="topics.length > 0" class="ha-vertical-layout-3">
      <topic-detail
        v-for="topic in topics"
        :key="topic.id"
        :topic="topic"
        startButtonLabel="Start to learn"
      />
      <div id="common-question-section" class="card">
        <div class="card-content">
          <h1 class="has-text-weight-bold is-size-3">CÁC CÂU HỎI THƯỜNG GẶP</h1>
          <div class="mt-5 ha-vertical-layout-5">
            <div
              v-for="question in questions"
              :key="question.id"
              class="is-size-4"
            >
              <router-link to="/">{{ question.question }}</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const data = [
  {
    topic_title: "CONCEPT",
    topic_id: "60477dbeb8229be06bbc061f",
    topic_description: "Start to learn basic concepts of OOP"
  },
  {
    topic_title: "CONCEPT",
    topic_id: "60477dbeb8229be06bbc061f",
    topic_description: "Start to learn basic concepts of OOP"
  },
  {
    topic_title: "CONCEPT",
    topic_id: "60477dbeb8229be06bbc061f",
    topic_description: "Start to learn basic concepts of OOP"
  }
];
const questions = [
  {
    question: "Câu hỏi 1",
    anwser: "Câu trả lời 1"
  },
  {
    question: "Câu hỏi 1",
    anwser: "Câu trả lời 1"
  },
  {
    question: "Câu hỏi 1",
    anwser: "Câu trả lời 1"
  }
];

export default {
  components: {
    "topic-detail": async () => (await import("../components"))["TopicDetail"]
  },
  name: "Home",
  data: () => ({
    topics: [],
    questions: []
  }),
  mounted: function() {
    this.$_requestTopics().then(result => {
      const { data } = result;
      this.topics.push(...data);
    });
    this.$_requestCommonQuestions().then(result => {
      const { data } = result;
      this.questions.push(...data);
    });
  },
  methods: {
    async $_requestTopics() {
      return {
        data
      };
    },
    async $_requestCommonQuestions() {
      return {
        data: questions
      };
    }
  }
};
</script>
