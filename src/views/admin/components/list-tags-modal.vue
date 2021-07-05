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
            :tags="filteredTags"
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
                    v-model.lazy="searchTagValue"
                    placeholder="Tìm kiếm nhãn dán"
                    icon-right="search"
                  />
                </div>
                <hr class="is-hr" />
              </div>
            </template>
            <template #tags>
              <b-checkbox-button
                v-for="(tag, index) in filteredTagIds"
                :key="tag.id"
                class="checkbox-tag is-rounded is-primary-dark is-outlined"
                size="is-small"
                type="is-primary-dark"
                v-model="selectedTagIds"
                :native-value="tag"
                ref="checkbox-tag"
                >{{ filteredTags[index].tag_value }}</b-checkbox-button
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
import { FunctionDelayer } from "@/utils";

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
    filteredTags: [],
    selectedTagIds: [],
    searchTagValue: "",
    isSearching: false,
    searchTagsHandler: new FunctionDelayer(300)
  }),
  watch: {
    searchTagValue(val) {
      this.searchTagsHandler.execute(() => {
        this.filteredTags.length = 0;
        this.filteredTags = this.tags.filter(tag =>
          tag.tag_value.toLowerCase().includes(val)
        );
      });
    }
  },
  computed: {
    _open: {
      get() {
        return this.open;
      },
      set(val) {
        this.$emit("opened", val);
      }
    },
    filteredTagIds() {
      return this.filteredTags.map(tag => tag.tag_id);
    },
    selectedTags() {
      return this.tags.filter(
        tag => this.selectedTagIds.indexOf(tag.tag_id) !== -1
      );
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
        this.filteredTags = [...data];
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
