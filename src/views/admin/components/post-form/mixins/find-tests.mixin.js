import { FunctionDelayer } from "@/utils";
import { mapActions } from "vuex";

export default {
  data: () => ({
    testSearcher: new FunctionDelayer(),
    filteredTests: []
  }),
  methods: {
    ...mapActions("VIEWER_TEST", ["viewer_searchTest"]),

    async $m_findTests(value) {
      this.testSearcher.execute(() => {
        this.viewer_searchTest({
          title: value,
          page: 1
        }).then(result => {
          const { error, data } = result;
          this.filteredTests.length = 0;
          if (error) {
            return;
          }
          this.filteredTests.push(...data.results);
        });
      });
    }
  }
};
