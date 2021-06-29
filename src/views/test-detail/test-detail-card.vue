<template>
  <div v-if="test" class="test-detail card">
    <div class="card-content">
      <div class="test-detail-info">
        <div class="ha-vertical-layout-7">
          <div class="test-field">
            <span
              class="is-size-4 has-text-weight-bold has-text-primary-dark"
              >{{ test.title }}</span
            >
          </div>
          <div>
            <div class="test-field">
              <span class="test-field-label">Số lượng câu hỏi: </span>
              <span class="test-field-value">{{ numberOfSentences }}</span>
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
        <hr />
        <div class="notation-container">
          <div
            v-for="notation in COLOR_NOTATIONS"
            :key="notation.id"
            class="notation"
          >
            <div
              :class="['notation-icon', 'has-background-' + notation.color]"
            ></div>
            <span>{{ notation.text }}</span>
          </div>
        </div>
        <b-button
          name="start-button"
          v-if="isOnInit"
          type="is-primary"
          class="has-text-weight-bold"
          @click="$emit('start')"
          >Làm bài</b-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { TestMixin } from "@/mixins";
import { sessionStateInjector } from "./mixins/session-state.mixin";

export default {
  name: "TestDetailCard",
  mixins: [TestMixin, sessionStateInjector()],
  data: () => ({
    COLOR_NOTATIONS: [
      {
        color: "light",
        text: "Chưa chọn"
      },
      {
        color: "dark",
        text: "Đã chọn"
      },
      {
        color: "success",
        text: "Đáp án đúng"
      },
      {
        color: "danger",
        text: "Đáp án sai"
      }
    ]
  }),
  methods: {
    $on_startTestClick() {
      this.$emit("start");
    }
  }
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
      grid-template-columns: auto auto auto auto;
      column-gap: 1rem;

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
