export default () => ({
  name: "PersonalAccountLayout",
  components: () => ({
    "personal-sidebar": () => import("../components/personal-sidebar.vue"),
    header: () => import("../user-view.header.vue")
  }),
  layout: () => import("./layout"),
  props: route => {
    const navigations = [
      {
        name: "PersonalAccountInfo",
        icon: "user",
        pack: "fas",
        title: "Thông tin cá nhân",
        roles: ["viewer", "creator", "manager"],
        to: { name: "PersonalAccountInfo" }
      },
      {
        name: "PersonalTestResults",
        icon: "spell-check",
        pack: "fas",
        title: "Thông tin bài test",
        roles: ["viewer", "creator", "manager"],
        to: { name: "PersonalTestResults" }
      }
    ];
    const currentNavIndex = navigations.findIndex(
      nav => nav.name === route.name
    );
    const { layout = {} } = route.meta;
    const { headerTransition } = layout;
    return {
      navigations,
      currentNavIndex,
      headerTransition
    };
  }
});
