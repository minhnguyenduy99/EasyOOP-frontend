<template>
  <div id="manager-list-page">
    <admin-content title="Danh sách quản lí" icon="clipboard" iconPack="fas">
      <template #action>
        <b-button type="is-primary" outlined @click="$_openFormModal">
          Tạo quản lí mới
        </b-button>
      </template>
      <admin-detail-sidebar :sidebar-card="false">
        <div class="py-3">
          <div class="admin-content-container">
            <manager-search @search="$on_search" />
            <manager-table
              :search-options="searchOptions"
              @selected="$on_managerSelected"
            />
          </div>
        </div>
        <template #detail-content>
          <div class="card">
            <div class="card-content py-3 px-0">
              <manager-info v-if="selectedManager" :manager="selectedManager" />
            </div>
          </div>
        </template>
      </admin-detail-sidebar>
    </admin-content>
    <b-modal v-model="showFormModal" has-modal-card>
      <create-manager-form @submitted="$on_managerCreated" />
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
    "manager-table": () => import("./manager-table"),
    "manager-search": () => import("./manager-search"),
    "manager-info": () => import("./manager-info"),
    "create-manager-form": () => import("./create-manager-form")
  },
  provide() {
    return {
      $api_findManagers: this.managerRole_findManagers
    };
  },
  data: () => ({
    selectedManager: null,
    showFormModal: false,
    searchOptions: null
  }),
  methods: {
    ...mapActions("MANAGER", [
      "managerRole_findManagers",
      "managerRole_findById"
    ]),
    $on_search(searchOptions) {
      this.searchOptions = { ...searchOptions };
    },
    $_openFormModal() {
      this.showFormModal = true;
    },
    $on_managerCreated() {
      this.showFormModal = false;
    },
    $on_managerSelected(manager) {
      if (!manager) {
        this.selectedManager = null;
        return;
      }
      this.managerRole_findById({
        manager_id: manager.manager_id
      }).then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.selectedManager = data.data;
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
