<template>
  <b-modal
    class="tags-modal"
    v-bind="$attrs"
    v-on="$listeners"
    v-model="_open"
    has-modal-card
  >
    <div class="card">
      <div class="tags-modal__content card-content">
        <div>
          <tag-list
            :tags="tags"
            emptyText="Không có nhãn nào"
            :displayTagId="false"
            :rounded="true"
            searchable
          >
            <template #header>
              <div class="tag-list__header">
                <div
                  class="is-flex is-justify-content-space-between is-align-items-flex-end mb-3"
                >
                  <p class="is-size-5 is-uppercase has-text-weight-bold">
                    Danh sách nhãn
                  </p>
                  <b-input
                    v-model="searchTagValue"
                    placeholder="Tìm kiếm nhãn dán"
                    icon-right="search"
                    @keyup.enter.native="$on_searchTags"
                  />
                </div>
                <hr class="is-hr" />
              </div>
            </template>
            <template #tags>
              <b-checkbox-button
                v-for="tag in tags"
                :key="tag.id"
                class="checkbox-tag is-rounded is-primary-dark is-outlined"
                size="is-small"
                type="is-primary-dark"
                v-model="selectedTags"
                :native-value="tag"
                ref="checkbox-tag"
                >{{ tag.tag_value }}</b-checkbox-button
              >
            </template>
          </tag-list>
          <b-loading v-model="isSearching" :is-full-page="false" />
        </div>
        <hr />
        <div class="is-flex is-justify-content-flex-end">
          <b-button
            class="mr-2"
            @click="$emit('apply', selectedTags)"
            type="is-primary"
            >Áp dụng</b-button
          >
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ListTagsModal",
  components: {
    "tag-list": () => import("@/components/tag-list.vue")
  },
  props: {
    open: {
      type: Boolean,
      default: () => false
    }
  },
  model: {
    prop: "open",
    event: "opened"
  },
  data: () => ({
    tags: [],
    selectedTags: [],
    searchTagValue: "",
    isSearching: false
  }),
  computed: {
    _open: {
      get() {
        return this.open;
      },
      set(val) {
        this.$emit("opened", val);
      }
    }
  },
  mounted: function() {
    this.$on_searchTags();
  },
  methods: {
    ...mapActions("POST", ["searchPostTags"]),
    $on_searchTags() {
      this.isSearching = true;
      this.searchPostTags(this.searchTagValue).then(result => {
        this.isSearching = false;
        const { error, data } = result;
        if (error) {
          return;
        }
        this.tags.length = 0;
        this.tags = data;
      });
    }
  }
};
</script>

<style scoped lang="scss">
.tags-modal {
  &__content {
    @include desktop {
      width: 960px;
    }
  }
}
</style>
