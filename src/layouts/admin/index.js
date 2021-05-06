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
        roles: ["creator", "manager"],
        to: { name: "Dashboard" }
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
        name: "ListPosts",
        icon: "clipboard",
        pack: "fas",
        title: "Danh sách bài viết",
        roles: ["creator"],
        to: { name: "ListPosts" }
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
        name: "Q&A",
        icon: "question-circle",
        pack: "fas",
        title: "Q&A",
        roles: ["manager"],
        to: { name: "Q&A" }
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
        name: "CreatorManagement",
        icon: "user-edit",
        pack: "fas",
        title: "Quản lí người viết",
        roles: ["manager"],
        to: { name: "CreatorManagement" }
      }
    ]
  })
});
