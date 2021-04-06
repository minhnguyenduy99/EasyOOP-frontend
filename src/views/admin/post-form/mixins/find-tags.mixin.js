import { FunctionDelayer } from "@/utils";

export default {
  inject: ["$api_findTags"],
  data: () => ({
    tagSearcher: new FunctionDelayer(),
    filteredTags: []
  }),
  methods: {
    async $m_findTags(value) {
      this.tagSearcher.execute(() => {
        this.$api_findTags(value).then(result => {
          const { error, data } = result;
          this.filteredTags.length = 0;
          if (error) {
            return;
          }
          this.filteredTags.push(...data);
        });
      });
    }
  }
};
