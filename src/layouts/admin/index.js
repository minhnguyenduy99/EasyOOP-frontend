export default () => ({
  name: "AdminLayout",
  components: () => ({
    sidebar: () => import("./admin-sidebar/admin-sidebar.vue")
  }),
  layout: () => import("./layout"),
  props: () => ({
    navigations: [
      {
        name: "Dashboard",
        icon: "th-large",
        pack: "fas",
        title: "Dashboard",
        roles: [],
        to: { name: "Dashboard" }
      },
      {
        name: "ListPosts",
        icon: "clipboard",
        pack: "fas",
        title: "Danh sách bài viết",
        roles: ["creator"],
        to: { name: "ListPosts" }
      },
      {
        name: "CreatePost",
        icon: "pencil-alt",
        pack: "fas",
        title: "Tạo bài viết",
        roles: ["creator"],
        to: { name: "CreatePost" }
      },
      {
        name: "PendingPosts",
        icon: "clipboard-check",
        pack: "fas",
        title: "Bài viết chờ duyệt",
        roles: ["creator"],
        to: { name: "PendingPosts" }
      },
      {
        name: "PostVerification",
        icon: "file-signature",
        pack: "fas",
        title: "Duyệt bài viết",
        roles: ["manager"],
        to: { name: "PostVerification" }
      },
      {
        name: "Q&A",
        icon: "question-circle",
        pack: "fas",
        title: "Q&A",
        roles: ["manager", "creator", "admin"],
        to: { name: "Q&A" }
      },
      {
        name: "CreatorManagement",
        icon: "user-edit",
        pack: "fas",
        title: "Quản lí người viết",
        roles: ["manager", "admin"],
        to: { name: "CreatorManagement" }
      },
      {
        name: "ListManagerPage",
        icon: "user-cog",
        pack: "fas",
        title: "Danh sách quản lí",
        roles: ["admin"],
        to: { name: "ListManagerPage" }
      },
      {
        name: "TestManagement",
        icon: "spell-check",
        pack: "fas",
        title: "Quản lí bài test",
        roles: ["creator", "manager"],
        to: { name: "TestManagement" }
      }
    ]
  })
});
