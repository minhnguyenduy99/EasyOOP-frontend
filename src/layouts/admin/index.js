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
        to: { name: "Dashboard" }
      },
      {
        name: "CreatePost",
        icon: "pencil-alt",
        pack: "fas",
        title: "Tạo bài viết",
        to: { name: "CreatePost" }
      },
      {
        name: "ListPosts",
        icon: "clipboard",
        pack: "fas",
        title: "Danh sách bài viết",
        to: { name: "ListPosts" }
      },
      {
        name: "PendingPosts",
        icon: "clipboard-check",
        pack: "fas",
        title: "Bài viết chờ duyệt",
        to: { name: "PendingPosts" }
      },
      {
        name: "Q&A",
        icon: "question-circle",
        pack: "fas",
        title: "Q&A",
        to: { name: "Q&A" }
      },
      {
        name: "PostVerification",
        icon: "file-signature",
        pack: "fas",
        title: "Duyệt bài viết",
        to: { name: "PostVerification" }
      }
    ]
  })
});
