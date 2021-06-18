export default refName => ({
  methods: {
    $_scrollToSentence(index) {
      const sentence = this.$refs[refName][index].$el;
      const y = sentence.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }
});
