export default () => ({
  name: "Home",
  path: "",
  page: () => import("./page"),
  meta: {
    layout: {
      paddingless: true
    }
  }
});
