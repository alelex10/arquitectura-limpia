import { Route, Routes } from "react-router";
import { MainLayout } from "./pages/layout/MainLayout";
import { Home } from "./pages/home/Home";
import { AuthLayout } from "./pages/home/auth/layout/AurhLayout";
import { FormLogin } from "./pages/home/auth/components/FormLogin";
import { FormRegister } from "./pages/home/auth/components/FormRegister";
import { Dashboard } from "./pages/dashboard/DashboardPage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route element={<AuthLayout />}>
            <Route path="login" element={<FormLogin />} />
            <Route path="register" element={<FormRegister />} />
          </Route>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
