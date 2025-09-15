import { Route, Routes } from "react-router";
import { AuthLayout } from "./pages/auth/layout/AurhLayout";
import { FormRegister } from "./pages/auth/components/FormRegister";
import { FormLogin } from "./pages/auth/components/FormLogin";
import { Home } from "./pages/Home";
import { MainLayout } from "./pages/layout/MainLayout";

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
