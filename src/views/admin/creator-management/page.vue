<template>
  <div id="creator-management-page">
    <admin-content title="Danh sách tác giả" icon="clipboard" iconPack="fas">
      <template #action>
        <b-button type="is-primary" outlined @click="$_openFormModal">
          Tạo tác giả mới
        </b-button>
      </template>
      <admin-detail-sidebar :sidebar-card="false">
        <div class="py-3">
          <div class="admin-content-container">
            <creator-search @search="$on_search" />
            <creator-table
              :search-options="searchOptions"
              @selected="$on_creatorSelected"
            />
          </div>
        </div>
        <template #detail-content>
          <div class="card">
            <div class="card-content py-3 px-0">
              <creator-info v-if="selectedCreator" :creator="selectedCreator" />
            </div>
          </div>
        </template>
      </admin-detail-sidebar>
    </admin-content>
    <b-modal v-model="showFormModal" has-modal-card>
      <creator-form @submitted="$on_creatorCreated" />
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "CreatorManagementPage",
  components: {
    "admin-content": () =>
      import("../components/admin-content/admin-content.vue"),
    "admin-detail-sidebar": () => import("../components/admin-detail-sidebar"),
    "creator-table": () => import("./creator-table"),
    "creator-search": () => import("./creator-search"),
    "creator-info": () => import("./creator-info"),
    "creator-form": () => import("./creator-form")
  },
  metaInfo() {
    const title = `Quản lí tác giả - ${this.$appConfig.VUE_APP_NAME}`;
    return {
      title
    };
  },
  provide() {
    return {
      $api_findCreators: this.creatorRole_findCreators
    };
  },
  data: () => ({
    selectedCreator: null,
    showFormModal: false,
    searchOptions: null
  }),
  methods: {
    ...mapActions("CREATOR", [
      "creatorRole_findCreators",
      "creatorRole_getCreatorById"
    ]),
    $on_search(searchOptions) {
      this.searchOptions = { ...searchOptions };
    },
    $_openFormModal() {
      this.showFormModal = true;
    },
    $on_creatorCreated() {
      this.showFormModal = false;
    },
    $on_creatorSelected(creator) {
      if (!creator) {
        this.selectedCreator = null;
        return;
      }
      this.creatorRole_getCreatorById({
        creator_id: creator.creator_id
      }).then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.selectedCreator = data.data;
      });
    }
  }
};
</script>

<style scoped lang="scss">
.admin-content-container {
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 2rem;
}
</style>
