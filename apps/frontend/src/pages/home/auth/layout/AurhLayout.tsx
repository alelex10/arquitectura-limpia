import { Outlet } from "react-router";

export const AuthLayout = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-500 to-blue-500">
      <Outlet />
    </div>
  );
};
export default AuthLayout;
