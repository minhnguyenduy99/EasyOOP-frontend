export default refName => ({
  methods: {
    $_scrollToSentence(index) {
      // const index = order - 1 - (this.currentPage - 1) * this.sentencesPerGroup;
      const sentence = this.$refs[refName][index].$el;
      sentence.scrollIntoView({
        behavior: "smooth"
      });
    }
  }
});
