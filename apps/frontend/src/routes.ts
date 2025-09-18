import { type RouteConfig, layout, route } from "@react-router/dev/routes";

export default [
  layout("./pages/layout/MainLayout.tsx", [
    route("/", "./pages/home/Home.tsx"),
    layout("./pages/home/auth/layout/AurhLayout.tsx", [
      route("/login", "./pages/home/auth/components/FormLogin.tsx"),
      route("/register", "./pages/home/auth/components/FormRegister.tsx"),
    ]),
    route("/dashboard", "./pages/dashboard/DashboardPage.tsx"),
  ]),
] satisfies RouteConfig;
