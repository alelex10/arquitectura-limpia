import { Route, Routes } from "react-router";
import { Home } from "./pages/home";
import { NavBar } from "./components/navbar/NavBar";
import { AuthLayout } from "./pages/auth/auth-layout";
import { FormRegister } from "./pages/auth/components/FormRegister";
import { FormLogin } from "./pages/auth/components/FormLogin";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route index element={<Home />} />

        <Route element={<AuthLayout />}>
          <Route path="login" element={<FormLogin />} />
          <Route path="register" element={<FormRegister />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
