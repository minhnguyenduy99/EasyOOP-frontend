<template>
  <div>
    <b-field grouped group-multiline>
      <b-input
        class="is-flex-grow-1"
        placeholder="Nhập tên bài viết"
        type="is-primary"
        icon="search"
        v-model="searchOptions.search"
        @keyup.enter.native="$on_applySearch"
      />
    </b-field>
    <b-field grouped group-multiline>
      <b-autocomplete
        v-model="searchOptions.creator_id"
        :data="searchCreators"
        icon="user"
        placeholder="Tìm kiếm tác giả"
        clearable
        field="creator_id"
        @typing="$_searchCreators"
        @select="$on_creatorSelected"
      >
        <template #empty>Không tìm thấy tác giả</template>
        <template #default="{ option }">
          <div>
            <p class="is-size-7">ID: {{ option.creator_id }}</p>
            <p class="is-size-6 has-text-weight-bold">{{ option.alias }}</p>
          </div>
          <!-- <div class="media">
            <div class="media-left">
              <img class="search-user-avatar" :src="option.profile_pic" />
            </div>
            <div class="media-content is-flex is-flex-direction-column">
              <span class="mb-2 is-size-7">{{ option.user_id }}</span>
              <span class="has-text-weight-bold">{{
                option.display_name
              }}</span>
            </div>
          </div> -->
        </template>
      </b-autocomplete>
      <b-select v-model="searchOptions.status" class="is-fullwidth">
        <option
          v-for="status in VERIFICATION_STATUSES"
          :value="status.value"
          :key="status.id"
        >
          {{ status.text }}
        </option>
      </b-select>
    </b-field>
    <b-field grouped group-multiline>
      <p class="control">
        <b-button type="is-primary" @click="$on_applySearch">Tìm kiếm</b-button>
      </p>
      <p class="control">
        <b-button
          class="is-icon-button"
          type="is-primary"
          icon-right="sync-alt"
          size="is-medium"
          rounded
          inverted
          @click="$on_reloadButtonClicked"
        />
      </p>
    </b-field>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { FunctionDelayer } from "../../../utils";
export default {
  name: "VerificationSearch",
  components: {
    "modal-form": () => import("@/components/modal-form")
  },
  data: () => ({
    DEFAULT_SEARCH_OPTIONS: {
      search: null,
      sort_by: "last_edited_date",
      sort_order: "desc",
      status: null,
      creator_id: null
    },
    VERIFICATION_STATUSES: [
      {
        value: 2,
        text: "Chờ duyệt"
      },
      {
        value: 0,
        text: "Không được duyệt"
      },
      {
        value: 3,
        text: "Hủy duyệt"
      },
      {
        value: null,
        text: "Tất cả"
      }
    ],
    showModal: false,
    searchOptions: {
      search: null,
      sort_by: "last_edited_date",
      sort_order: "desc",
      status: null,
      creator_id: null
    },
    searchCreatorHandler: new FunctionDelayer(500),
    searchCreators: [],
    creatorSelected: false
  }),
  computed: {
    selectedSortOrderOption() {
      return this.sortOrderOptions[this.searchOptions.sort_by];
    }
  },
  methods: {
    ...mapActions("CREATOR", ["creatorRole_findCreators"]),

    $on_applySearch() {
      this.$emit("search", { ...this.searchOptions });
    },
    $on_reloadButtonClicked() {
      this.searchOptions = {};
      this.$nextTick(() => {
        this.$emit("search", { ...this.searchOptions });
      });
    },
    $_searchCreators() {
      this.searchCreatorHandler.execute(() => {
        this.searchCreators.length = 0;
        const search = {
          page: 1,
          alias: this.searchOptions.creator_id
        };
        this.creatorRole_findCreators(search).then(result => {
          const { error, data } = result;
          if (error) {
            this.searchCreators = [];
            return;
          }
          const { results } = data;
          this.searchCreators = results;
        });
      });
    },
    $on_creatorSelected(option) {
      this.creatorSelected = option ? true : false;
    }
  }
};
</script>
