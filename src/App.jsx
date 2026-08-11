import { Routes, Route } from "react-router-dom";

import { useAppData } from "./context/AppDataContext";

import MainLayout from "./layouts/MainLayout";
import LoggedOut from "./components/LoggedOut";

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

export default function App() {
  const { isAuthenticated } = useAppData();

  if (!isAuthenticated) {
    return <LoggedOut />;
  }

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="explore" element={<Explore />} />
        <Route path="search" element={<Search />} />
        <Route path="bookmarks" element={<Bookmarks />} />
        <Route path="profile" element={<Profile />} />
        <Route path="create-post" element={<CreatePost />} />
        <Route path="messages" element={<Messages />} />
        <Route path="communities" element={<Communities />} />
        <Route path="trending" element={<Trending />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
