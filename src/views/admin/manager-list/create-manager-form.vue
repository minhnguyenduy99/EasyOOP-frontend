<template>
  <modal-form
    id="create-manager-form"
    title="Tạo quản lí"
    :has-card="true"
    headerClass="has-background-primary-light has-text-white"
  >
    <ValidationObserver
      tag="form"
      ref="validator"
      class="form is-flex is-flex-direction-column"
    >
      <div class="ha-vertical-layout-7 pb-5">
        <validated-form-element
          label="ID người dùng"
          name="userid"
          :rules="{
            required: true,
            roleAssignable: { params: { user: searchUser[0], role: 'manager' } }
          }"
        >
          <b-autocomplete
            v-model="userId"
            :data="searchUser"
            icon="magnify"
            clearable
            field="user_id"
            @select="$on_userSelected"
          >
            <template #empty>Không tìm thấy người dùng</template>
            <template #default="{ option }">
              <div class="media">
                <div class="media-left">
                  <p class="image is-coverable is-64x64 is-rounded">
                    <img class="is-rounded" :src="option.profile_pic" />
                  </p>
                </div>
                <div class="media-content is-flex is-flex-direction-column">
                  <span class="mb-2 is-size-7">{{ option.user_id }}</span>
                  <span class="has-text-weight-bold">{{
                    option.display_name
                  }}</span>
                </div>
              </div>
            </template>
          </b-autocomplete>
        </validated-form-element>
        <validated-form-element name="alias" rules="required" label="Biệt danh">
          <b-input v-model="form.alias" />
        </validated-form-element>
        <validated-form-element name="general">
          <b-input type="hidden" />
        </validated-form-element>
      </div>
      <b-button
        type="is-primary"
        @click="$on_submittedForm"
        :disabled="!selected"
      >
        <span class="has-text-weight-bold">Tạo</span>
      </b-button>
    </ValidationObserver>
  </modal-form>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import { ValidatedFormElement, ModalForm } from "@/components";
import { mapActions } from "vuex";
import { FunctionDelayer } from "@/utils";

export default {
  name: "CreateManagerForm",
  components: {
    ValidationObserver,
    ValidatedFormElement,
    ModalForm
  },
  data: () => ({
    userId: "",
    selectedUser: null,
    form: {
      alias: ""
    },
    selected: false,
    searchUser: [],
    handler: new FunctionDelayer(500)
  }),
  computed: {
    validator() {
      return this.$refs.validator;
    },
    search() {
      return this.userId !== "";
    }
  },
  watch: {
    userId(val) {
      this.selected = false;
      if (!val) {
        this.handler.reset();
        return;
      }
      this.handler.execute(this.$_searchUser.bind(this));
    }
  },
  methods: {
    ...mapActions("MANAGER", ["managerRole_assignManager"]),
    ...mapActions("USER", ["user_searchById"]),

    async $on_submittedForm() {
      const isValid = await this.validator.validate();
      if (!isValid || !this.selected) {
        return;
      }
      this.managerrRole_assignManager({
        user_id: this.userId,
        form: this.form
      }).then(result => {
        const { error } = result;
        if (error) {
          this.validator.setErrors({
            general: [this.$serverLocaler.getMessage(error.errorType)]
          });
          return;
        }
        this.$emit("submitted");
      });
    },
    $_searchUser() {
      this.searchUser.length = 0;
      this.user_searchById({ user_id: this.userId }).then(result => {
        const { error, data } = result;
        if (error) {
          this.searchUser = [];
          return;
        }
        this.searchUser = [data];
      });
    },
    $on_userSelected(user) {
      if (!user) {
        this.selected = false;
        return;
      }
      const { roles } = user;
      if (roles?.indexOf("manager") > -1) {
        this.validator.setErrors({
          userid: ["Người dùng đã có vai trò này"]
        });
        this.selected = false;
        return;
      }
      this.selected = user ? true : false;
    }
  }
};
</script>

<style scoped lang="scss">
#create-manager-form {
  min-width: 300px;
}

.search-user {
  &-avatar {
    width: 48px;
    height: 100%;
    border-radius: 50%;
  }
}
</style>
