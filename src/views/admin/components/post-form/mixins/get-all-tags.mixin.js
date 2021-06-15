export default ({ mapActions }) => ({
  data: () => ({
    listTags: []
  }),
  methods: {
    ...mapActions("POST", ["creator_getAllTags"]),

    async $m_getAllTags() {
      this.creator_getAllTags().then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.listTags = data;
      });
    }
  }
});
