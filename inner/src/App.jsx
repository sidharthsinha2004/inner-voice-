import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import { useAppData } from "./context/AppDataContext";



import MainLayout from "./layouts/MainLayout";



import Home from "./pages/home";
import Explore from "./pages/explore";
import Search from "./pages/search";
import Bookmarks from "./pages/bookmarks";
import Profile from "./pages/profile";
import CreatePost from "./pages/create-post";
import Messages from "./pages/messages";
import Communities from "./pages/communities";
import Trending from "./pages/trending";
import Settings from "./pages/settings";
import NotFound from "./pages/not-found";


import Welcome from "./pages/auth/welcome";
import Login from "./pages/auth/login";
import ForgetPassword from "./pages/auth/Forgetpassword";
import VerifyEmail from "./pages/auth/verfyemail";
import ResetPassword from "./pages/auth/Resetpassword";



import AdminIdentity from "./pages/auth/adminpage/admin.jsx";


function PublicOnly({ children }) {
  const { isAuthenticated } = useAppData();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}



function AdminRoute() {
  const { isAuthenticated } = useAppData();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/welcome"
        replace
        state={{ from: "/admin" }}
      />
    );
  }

  return <AdminIdentity />;
}


function ProtectedRoutes() {
  const { isAuthenticated } = useAppData();

  const location = useLocation();



  if (!isAuthenticated) {
    return (
      <Navigate
        to="/welcome"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  return (
    <Routes>

      <Route
        path="/"
        element={<MainLayout />}
      >


        <Route
          index
          element={<Home />}
        />



        <Route
          path="explore"
          element={<Explore />}
        />



        <Route
          path="search"
          element={<Search />}
        />



        <Route
          path="bookmarks"
          element={<Bookmarks />}
        />



        <Route
          path="profile"
          element={<Profile />}
        />



        <Route
          path="feed"
          element={<Home />}
        />



        <Route
          path="create-post"
          element={<CreatePost />}
        />



        <Route
          path="messages"
          element={<Messages />}
        />


        <Route
          path="communities"
          element={<Communities />}
        />



        <Route
          path="trending"
          element={<Trending />}
        />



        <Route
          path="settings"
          element={<Settings />}
        />

        {/* NOT FOUND */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Route>

    </Routes>
  );
}


export default function App() {
  return (
    <Routes>


      <Route
        path="/welcome"
        element={
          <PublicOnly>
            <Welcome />
          </PublicOnly>
        }
      />

      <Route
        path="/login"
        element={
          <PublicOnly>
            <Login />
          </PublicOnly>
        }
      />

      <Route
        path="/forget-password"
        element={
          <PublicOnly>
            <ForgetPassword />
          </PublicOnly>
        }
      />

      <Route
        path="/verify-mail"
        element={
          <PublicOnly>
            <VerifyEmail />
          </PublicOnly>
        }
      />

      <Route
        path="/reset-password"
        element={
          <PublicOnly>
            <ResetPassword />
          </PublicOnly>
        }
      />


      <Route
        path="/admin"
        element={<AdminRoute />}
      />


      <Route
        path="/*"
        element={<ProtectedRoutes />}
      />

    </Routes>
  );
}