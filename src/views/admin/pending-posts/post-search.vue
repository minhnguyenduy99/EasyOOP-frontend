<template>
  <div id="pending-post-search">
    <b-input
      id="search-input"
      placeholder="Nhập tên bài viết"
      type="is-primary"
      icon="search"
      v-model="searchOptions.search"
      @keyup.enter.native="$on_applySearch"
    />
    <b-button
      class="ml-3"
      type="is-primary"
      icon-right="filter"
      @click="showModal = true"
      >Bộ lọc</b-button
    >
    <b-button
      class="ml-3 is-icon-button"
      type="is-primary"
      icon-right="sync-alt"
      size="is-medium"
      rounded
      inverted
      @click="$on_reloadButtonClicked"
    />
    <b-modal v-model="showModal">
      <template>
        <modal-form
          class="edit-tag-form"
          width="450px"
          :has-card="true"
          rounded
          title="LỌC NÂNG CAO"
          type="is-primary-light"
        >
          <div id="advanced-search-container" class="card-content">
            <div class="search-group">
              <div class="search-group-header">
                <span class="search-group-header-title">Bộ lọc</span>
                <b-icon type="is-primary" icon="filter"></b-icon>
              </div>
              <div class="search-group-content">
                <b-select v-model="searchOptions.type">
                  <option
                    v-for="type in verificationTypes"
                    :value="type.value"
                    :key="type.id"
                  >
                    {{ type.text }}
                  </option>
                </b-select>
              </div>
            </div>
            <div class="search-group">
              <div class="search-group-header">
                <span class="search-group-header-title">Sắp xếp</span>
                <b-icon type="is-primary" icon="sort"></b-icon>
              </div>
              <div class="search-group-content">
                <b-select placeholder="Sắp xếp" v-model="searchOptions.sort_by">
                  <option
                    v-for="sort in sortOptions"
                    :value="sort.value"
                    :key="sort.id"
                  >
                    {{ sort.text }}
                  </option>
                </b-select>
                <b-select
                  v-show="selectedSortOrderOption"
                  v-model="sortOptions.sort_order"
                  placeholder="Thứ tự sắp xếp"
                >
                  <option
                    v-for="order in selectedSortOrderOption"
                    :value="order.value"
                    :key="order.id"
                  >
                    {{ order.text }}
                  </option>
                </b-select>
              </div>
            </div>
          </div>
          <hr />
          <div class="is-flex is-justify-content-center">
            <b-button type="is-primary" outlined @click="$on_applySearch"
              >Áp dụng</b-button
            >
          </div>
        </modal-form>
        <!-- <div class="card">
          <div class="card-header has-background-primary-light">
            <div class="card-header-title">
              <span class="is-size-5 has-text-light">Lọc nâng cao</span>
            </div>
          </div>
          <div id="advanced-search-container" class="card-content">
            <div class="search-group">
              <div class="search-group-header">
                <span class="search-group-header-title">Bộ lọc</span>
                <b-icon type="is-primary" icon="filter"></b-icon>
              </div>
              <div class="search-group-content">
                <b-select v-model="searchOptions.type">
                  <option
                    v-for="type in verificationTypes"
                    :value="type.value"
                    :key="type.id"
                  >
                    {{ type.text }}
                  </option>
                </b-select>
              </div>
            </div>
            <div class="search-group">
              <div class="search-group-header">
                <span class="search-group-header-title">Sắp xếp</span>
                <b-icon type="is-primary" icon="sort"></b-icon>
              </div>
              <div class="search-group-content">
                <b-select placeholder="Sắp xếp" v-model="searchOptions.sort_by">
                  <option
                    v-for="sort in sortOptions"
                    :value="sort.value"
                    :key="sort.id"
                  >
                    {{ sort.text }}
                  </option>
                </b-select>
                <b-select
                  v-show="selectedSortOrderOption"
                  v-model="searchOptions.sort_order"
                  placeholder="Thứ tự sắp xếp"
                >
                  <option
                    v-for="order in selectedSortOrderOption"
                    :value="order.value"
                    :key="order.id"
                  >
                    {{ order.text }}
                  </option>
                </b-select>
              </div>
            </div>
          </div>
          <div class="card-footer p-5">
            <b-button type="is-primary" outlined @click="$on_applySearch"
              >Áp dụng</b-button
            >
          </div>
        </div> -->
      </template>
    </b-modal>
  </div>
</template>

<script>
import { POST_STATUSES, VERIFICATION_TYPES } from "./consts";

export default {
  name: "PostSearch",
  components: {
    "modal-form": () => import("@/components/modal-form")
  },
  data: () => ({
    DEFAULT_SEARCH_OPTIONS: {
      search: null,
      sort_by: "created_date",
      sort_order: "desc",
      type: null
    },
    showModal: false,
    searchOptions: {
      search: null,
      sort_by: "created_date",
      sort_order: "desc",
      type: null
    },
    sortOptions: [
      {
        text: "Sắp xếp",
        value: null
      },
      {
        text: "Theo thời gian",
        value: "created_date"
      }
    ],
    sortOrderOptions: {
      created_date: [
        {
          text: "Mới nhất",
          value: "desc"
        },
        {
          text: "Cũ nhất",
          value: "asc"
        }
      ]
    },
    postStatuses: [],
    verificationTypes: []
  }),
  created: function() {
    this.postStatuses = POST_STATUSES;
    this.verificationTypes = VERIFICATION_TYPES;
  },
  computed: {
    selectedSortOrderOption() {
      return this.sortOrderOptions[this.searchOptions.sort_by];
    }
  },
  methods: {
    $on_applySearch() {
      this.showModal = false;
      this.$nextTick(() => {
        this.$emit("search", { ...this.searchOptions });
      });
    },
    $on_reloadButtonClicked() {
      this.searchOptions = {};
      this.$nextTick(() => {
        this.$emit("search", { ...this.searchOptions });
      });
    }
  }
};
</script>

<style scoped lang="scss">
#pending-post-search {
  display: grid;
  grid-template-columns: 1fr auto auto;
  width: 100%;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  @include tablet {
    width: 70%;
  }
}

#advanced-search-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;
}

.search-group {
  &-header {
    margin-bottom: 1rem;

    &-title {
      color: $grey;
      font-weight: bold;
    }
  }

  &-content {
    @extend .ha-vertical-layout-6;
  }
}
</style>
