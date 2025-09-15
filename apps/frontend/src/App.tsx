import { Route, Routes } from "react-router";
import { MainLayout } from "./pages/home/layout/MainLayout";
import { Home } from "./pages/home/Home";
import { AuthLayout } from "./pages/home/auth/layout/AurhLayout";
import { FormLogin } from "./pages/home/auth/components/FormLogin";
import { FormRegister } from "./pages/home/auth/components/FormRegister";


function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route element={<AuthLayout />}>
            <Route path="login" element={<FormLogin />} />
            <Route path="register" element={<FormRegister />} />
          </Route>{" "}
        </Route>
      </Routes>
    </>
  );
}

export default App;
