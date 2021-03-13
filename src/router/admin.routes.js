import { AdminLayout, AdminSidebar } from "../layouts";
import { DashboardPage } from "../views";

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
      }
    ]
  }
];
