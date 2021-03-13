import {
  UserViewLayout,
  UserViewHeader,
  UserViewSidebar,
  UserViewFooter
} from "../layouts";
import { HomePage } from "../views";

export default [
  {
    name: "UserView",
    path: "/",
    component: UserViewLayout,
    children: [
      {
        name: "Home",
        path: "/",
        components: {
          header: UserViewHeader,
          default: HomePage,
          sidebar: UserViewSidebar,
          footer: UserViewFooter
        }
      }
    ]
  }
];
