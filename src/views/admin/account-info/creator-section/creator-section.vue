<template>
  <div
    id="creator-section"
    class="ha-vertical-layout-7-desktop ha-vertical-layout-5-mobile"
  >
    <form-group title="THÔNG TIN CHUNG">
      <creator-info-form :data="creatorInfo" @submitted="$_submitRoleForm" />
    </form-group>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { ToastNotifier } from "@/utils";

export default {
  name: "CreatorSection",
  components: {
    "creator-info-form": () => import("./creator-info.form"),
    "form-group": () => import("../form-group/form-group.vue")
  },
  data: () => ({
    creatorInfo: {
      alias: ""
    }
  }),
  computed: {
    ...mapGetters("AUTH", ["user"])
  },
  mounted: function() {
    this.creatorRole_getCreatorById({ creator_id: this.user.role_id }).then(
      result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.creatorInfo = data.data;
      }
    );
  },
  methods: {
    ...mapActions("CREATOR", [
      "creatorRole_updateCreator",
      "creatorRole_getCreatorById"
    ]),

    $_submitRoleForm(data) {
      const { validator, form } = data;
      this.creatorRole_updateCreator({
        form,
        creator_id: this.user.role_id
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
