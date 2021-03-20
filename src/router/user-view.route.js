import {
  UserViewLayout,
  UserViewHeader,
  UserViewSidebar,
  UserViewFooter,
  UserViewMenuNavbar
} from "../layouts";
import { HomePage, PostDetailPage } from "../views";

export default [
  {
    name: "UserView",
    path: "/",
    component: UserViewLayout,
    props: {
      includeHero: true
    },
    children: [
      {
        name: "Home",
        path: "/",
        components: {
          header: UserViewHeader,
          default: HomePage,
          sidebar: UserViewSidebar,
          "menu-navbar": UserViewMenuNavbar,
          footer: UserViewFooter
        }
      }
    ]
  },
  {
    name: "UserViewWithoutHero",
    path: "/",
    component: UserViewLayout,
    props: {
      includeHero: false
    },
    children: [
      {
        name: "PostDetail",
        path: "/posts/:post_id",
        components: {
          header: UserViewHeader,
          default: PostDetailPage,
          sidebar: UserViewSidebar,
          "menu-navbar": UserViewMenuNavbar,
          footer: UserViewFooter
        },
        props: {
          default: route => ({
            postId: route.params.post_id
          }),
          sidebar: route => ({
            currentPostId: route.params.post_id
          })
        }
      }
    ]
  }
];
