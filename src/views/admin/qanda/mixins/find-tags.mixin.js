import { FunctionDelayer } from "@/utils";

export default ({ mapActions }) => ({
  data: () => ({
    findTagsHandler: new FunctionDelayer(500),
    searchTags: []
  }),
  methods: {
    ...mapActions("QANDA", ["getUnusedQuestionTags"]),

    $_requestUnusedTags(value) {
      this.findTagsHandler.execute(() =>
        this.getUnusedQuestionTags({ search: value }).then(result => {
          const { error, data } = result;
          this.searchTags.length = 0;
          if (error) {
            return;
          }
          const { results } = data;
          this.searchTags.push(...results);
        })
      );
    }
  }
});
