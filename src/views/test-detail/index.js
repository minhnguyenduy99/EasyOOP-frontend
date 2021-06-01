export default () => ({
  name: "TestDetailPage",
  path: "tests/:test_id",
  page: () => import("./page"),
  props: {
    default: route => ({
      testId: route.params.test_id,
      sessionId: route.query.sid
    })
  }
});
