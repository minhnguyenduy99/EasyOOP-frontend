<template>
  <div id="creator-section" class="role-section ha-vertical-layout-5">
    <form-group title="THÔNG TIN CHUNG">
      <manager-info-form :data="managerInfo" @submitted="$_submitRoleForm" />
    </form-group>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { ToastNotifier } from "@/utils";

export default {
  name: "ManagerSection",
  components: {
    "manager-info-form": () => import("./manager-info.form"),
    "form-group": () => import("../form-group/form-group.vue")
  },
  data: () => ({
    managerInfo: {
      alias: ""
    }
  }),
  computed: {
    ...mapGetters("AUTH", ["user"])
  },
  mounted: function() {
    this.managerRole_findById({ manager_id: this.user.role_id }).then(
      result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.managerInfo = data.data;
      }
    );
  },
  methods: {
    ...mapActions("MANAGER", [
      "managerRole_updateManager",
      "managerRole_findById"
    ]),

    $_submitRoleForm(data) {
      const { validator, form } = data;
      this.managerRole_updateManager({
        form,
        manager_id: this.user.role_id
      }).then(result => {
        const { error, data } = result;
        if (error) {
          validator.setErrors({
            general: [error.message]
          });
          return;
        }
        ToastNotifier.success(this.$buefy.toast, "Cập nhật thành công");
      });
    }
  }
};
</script>
