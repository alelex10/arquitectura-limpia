import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./pages/layout/MainLayout.tsx", [
    index("./pages/home/Home.tsx"),
    layout("./pages/home/auth/layout/AurhLayout.tsx", [
      route("register", "./pages/home/auth/components/FormRegister.tsx"),
      route("login", "./pages/home/auth/components/FormLogin.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
