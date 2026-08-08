import { BrowserRouter, Routes, Route } from "react-router-dom";

import Welcome from "./pages/auth/welcome";
import Login from "./pages/auth/login";
import VerifyEmail from "./pages/auth/verfyemail";
import ResetPassword from "./pages/auth/Resetpassword";
import Profile from "./pages/profile/profile";
import ForgetPassword from "./pages/auth/Forgetpassword";
function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/verify-mail" element={<VerifyEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;