<template>
  <div id="personal-test-result-page" class="panel is-primary-light">
    <p class="panel-heading is-uppercase">Kết quả bài test</p>
    <div class="panel-block">
      <div class="panel-container">
        <test-result-table />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonalTestResultsPage",
  components: {
    "test-result-table": () => import("./test-result-table")
  }
};
</script>

<style scoped lang="scss">
.panel-container {
  width: 100%;
  padding: 1rem 0;
}
</style>
