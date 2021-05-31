export default () => ({
  name: "TestResultInfoPage",
  path: "test-results/:result_id",
  page: () => import("./page"),
  props: {
    default: route => ({
      resultId: route.params.result_id
    })
  }
});
