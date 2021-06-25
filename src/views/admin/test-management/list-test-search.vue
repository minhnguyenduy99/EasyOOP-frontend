<template>
  <div id="mock-test-search" class="ha-vertical-layout-7">
    <div class="input-group">
      <b-input
        class="is-flex-grow-1"
        placeholder="Tìm kiếm bài test"
        type="is-primary"
        icon="search"
        v-model="searchOptions.title"
        @keyup.enter.native="$on_search"
      />
      <b-select
        class="is-fullwidth"
        placeholder="Tình trạng"
        v-model="searchOptions.available_status"
      >
        <option
          v-for="status in TEST_STATUSES"
          :key="status.id"
          :value="status.code"
        >
          {{ status.text }}
        </option>
      </b-select>
      <b-select
        class="is-fullwidth"
        placeholder="Loại bài test"
        v-model="searchOptions.type"
      >
        <option v-for="type in TEST_TYPES" :key="type.id" :value="type.code">
          {{ type.text }}
        </option>
      </b-select>
      <b-select
        class="is-fullwidth"
        placeholder="Chủ đề"
        v-model="searchOptions.topic_id"
      >
        <option v-for="topic in topics" :key="topic.id" :value="topic.topic_id">
          {{ topic.topic_title }}
        </option>
      </b-select>
    </div>
    <div class="buttons">
      <b-button class="button--search" type="is-primary" @click="$on_search"
        >Tìm kiếm</b-button
      >
      <b-tooltip label="Reset bộ lọc" type="is-dark">
        <b-button
          class="is-icon-button"
          type="is-primary"
          icon-right="sync-alt"
          size="is-medium"
          rounded
          inverted
          @click="$on_resetSearch"
        />
      </b-tooltip>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

const DEFAULT_SEARCH_OPTIONS = {
  title: null,
  available_status: null,
  type: null
};

export default {
  name: "ListTestSearch",
  data: () => ({
    TEST_STATUSES: [
      {
        code: null,
        text: "Chọn tất cả"
      },
      {
        code: 1,
        text: "Có sẵn"
      },
      {
        code: 2,
        text: "Đã xóa"
      }
    ],
    TEST_TYPES: [
      {
        code: 1,
        text: "Giới hạn thời gian"
      },
      {
        code: 2,
        text: "Không giới hạn thời gian"
      },
      {
        code: null,
        text: "Chọn tất cả"
      }
    ],
    topics: [],
    searchOptions: { ...DEFAULT_SEARCH_OPTIONS }
  }),
  mounted: function() {
    this.$_requestTopics();
  },
  methods: {
    ...mapActions("TEST", ["getAllTopics"]),

    $_requestTopics() {
      this.getAllTopics().then(result => {
        const { error, data } = result;
        if (error) {
          return;
        }
        this.topics.length = 0;
        this.topics.push(...data, {
          topic_id: null,
          topic_title: "Chọn tất cả"
        });
      });
    },
    $on_search() {
      this.$emit("search", this.searchOptions);
    },
    $on_resetSearch() {
      this.searchOptions = { ...DEFAULT_SEARCH_OPTIONS };
      this.$on_search();
    }
  }
};
</script>

<style scoped lang="scss">
// #mock-test-search {
//   > *:not(:last-child) {
//     margin-right: 1rem;
//   }
// }

.input-group {
  @extend .ha-vertical-layout-7;

  display: flex;
  flex-direction: column;

  @include tablet {
    flex-direction: row;

    > *:not(:last-child) {
      margin-right: 1rem;
    }
  }
}

.button {
  &--search {
    flex-grow: 1;

    @include tablet {
      flex-grow: 0;
    }
  }
}
</style>
