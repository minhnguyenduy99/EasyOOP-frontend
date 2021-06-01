<template>
  <div class="test-detail card" @click="$emit('click', test)">
    <div class="card-content p-3">
      <div class="mb-3">
        <span class="test-detail-title">{{ test.title }}</span>
      </div>
      <div class="test-detail-footer">
        <div class="test-detail-group">
          <span class="has-text-grey">Số lượng câu hỏi: </span>
          <span class="has-text-weight-bold">{{ numberOfSentences }}</span>
        </div>
        <div class="test-detail-group">
          <b-icon icon="hourglass-start" type="is-primary-light" />
          <span class="has-text-weight-bold">{{
            isTimeLimited ? limitedTimeInMinutes + " phút" : "Không giới hạn"
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TestMixin } from "@/mixins";

export default {
  name: "TestDetail",
  mixins: [TestMixin]
};
</script>

<style scoped lang="scss">
$test-detail-box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
$test-detail-hover-box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 3px 3px;

.test-detail {
  box-shadow: $test-detail-box-shadow;
  transition: 0.05s ease-in;
  cursor: pointer;
  border-radius: 0;
  padding: 0;

  &:hover {
    border-left: 3px solid $primary-light;
    box-shadow: $test-detail-hover-box-shadow;
  }

  &-title {
    color: $primary;
    font-weight: bold;
    font-size: $size-5;
  }

  &-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
