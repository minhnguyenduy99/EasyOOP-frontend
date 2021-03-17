import { AdminLayout, AdminSidebar } from "../layouts";
import {
  CreatePostPage,
  DashboardPage,
  CommonQuestionPage,
  EditPostPage
} from "../views";

export default [
  {
    name: "Admin",
    path: "/admin",
    component: AdminLayout,
    children: [
      {
        name: "Dashboard",
        path: "dashboard",
        components: {
          sidebar: AdminSidebar,
          default: DashboardPage
        }
      },
      {
        name: "CreatePost",
        path: "create-post",
        components: {
          sidebar: AdminSidebar,
          default: CreatePostPage
        }
      },
      {
        name: "EditPost",
        path: "edit-post/:post_id",
        components: {
          sidebar: AdminSidebar,
          default: EditPostPage
        },
        props: {
          default: route => ({ postId: route.params.post_id })
        }
      },
      {
        name: "Q&A",
        path: "qanda",
        components: {
          sidebar: AdminSidebar,
          default: CommonQuestionPage
        }
      }
    ]
  }
];
