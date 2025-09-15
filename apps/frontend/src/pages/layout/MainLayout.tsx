import { Outlet } from "react-router";
import { NavBarHome } from "../../components/navbar/NavBarHome";

export const MainLayout = () => {
  return (
    <>
      <NavBarHome />
      <Outlet />
    </>
  );
};
