<template>
  <div id="create-test-page">
    <admin-content title="Tạo bài test mới" icon="spell-check" iconPack="fas">
      <div>
        <div id="form-group">
          <create-test-form
            :formValid="areSentencesValid"
            :sentences="sentences"
            submitButtonTitle="Tạo"
            @submitted="$on_formSubmitted"
          />
        </div>
        <div class="py-5">
          <sentence-panel
            @added="$on_sentenceChanged"
            @removed="$on_sentenceChanged"
            @validated="$on_validated"
          />
        </div>
      </div>
    </admin-content>
  </div>
</template>

<script>
export default {
  name: "TestManagementPage",
  components: {
    "admin-content": () =>
      import("../components/admin-content/admin-content.vue"),
    "sentence-panel": () =>
      import("../components/sentence-panel/sentence-panel"),
    "create-test-form": () => import("./create-test-form")
  },
  data: () => ({
    areSentencesValid: false,
    sentences: []
  }),
  methods: {
    $on_sentenceChanged({ sentences }) {
      this.sentences = sentences;
    },

    $on_validated(valid) {
      this.areSentencesValid = valid;
    },

    $on_formSubmitted() {
      this.$router.push({ name: "TestManagement" });
    }
  }
};
</script>
