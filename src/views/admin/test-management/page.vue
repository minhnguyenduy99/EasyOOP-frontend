<template>
  <div id="test-management-page">
    <admin-content title="Quản lí bài test" icon="spell-check" iconPack="fas">
      <template #action>
        <b-button
          type="is-primary"
          outlined
          icon-left="pen"
          @click="$_navigateCreateTestPage"
        >
          Tạo bài test
        </b-button>
      </template>
      <div>
        <section>
          <list-test-search class="py-3" @search="$on_search" />
        </section>
        <section>
          <list-test-table :searchOptions="searchOptions" />
        </section>
      </div>
    </admin-content>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "TestManagementPage",
  components: {
    "admin-content": () =>
      import("../components/admin-content/admin-content.vue"),
    "list-test-table": () => import("./list-test-table.vue"),
    "list-test-search": () => import("./list-test-search.vue")
  },
  metaInfo() {
    const title = `Quản lí bài test - ${this.$appConfig.VUE_APP_NAME}`;
    return {
      title
    };
  },
  provide() {
    return {
      $api_searchTests: this.searchTest.bind(this)
    };
  },
  data: () => ({
    searchOptions: {}
  }),
  methods: {
    ...mapActions("TEST", ["searchTest"]),

    $on_search(search) {
      this.searchOptions = { ...search };
    },

    $_navigateCreateTestPage() {
      this.$router.push({ name: "CreateTest" });
    }
  }
};
</script>
