<template>
  <div v-if="testResult" class="test-detail card">
    <div class="card-content">
      <div class="test-detail-info">
        <div class="ha-vertical-layout-7">
          <div class="test-field">
            <span
              class="is-size-4 has-text-weight-bold has-text-primary-dark"
              >{{ testResult.title }}</span
            >
          </div>
        </div>
        <hr />
        <div>
          <div class="test-field">
            <span class="test-field-label">Số lượng câu hỏi: </span>
            <span class="test-field-value">{{
              testResult.total_sentence_count
            }}</span>
          </div>
          <div class="test-field">
            <span class="test-field-label">Thời gian</span>
            <span class="test-field-value">{{
              isTimeLimited
                ? limitedTimeInMinutes + " phút"
                : "Không giới hạn thời gian"
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TestResultMixin } from "@/mixins";

export default {
  name: "TestDetailCard",
  mixins: [TestResultMixin],
  data: () => ({})
};
</script>

<style scoped lang="scss">
@import "./style.scss";

.test-detail {
  &-info {
    display: grid;
    row-gap: 1rem;
    grid-template-columns: 1fr;

    @include tablet {
      grid-template-columns: auto auto min(200px);
      column-gap: 1rem;
      justify-content: flex-start;

      hr {
        height: 100%;
      }
    }

    hr {
      margin: 0;
      padding: 0;
      border: 1px solid rgb(200, 200, 200);
      width: 1px;
    }

    .button {
      justify-self: stretch;

      @include tablet {
        justify-self: flex-end;
      }
    }
  }
}

.notation-container {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
}

.notation {
  display: flex;
  align-items: center;
  padding: 10px;
  &-icon {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    margin-right: 5px;
  }
}
</style>
