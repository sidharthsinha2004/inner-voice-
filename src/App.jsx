import { BrowserRouter, Routes, Route } from "react-router-dom";

import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/edit-profile/EditProfile";
import Followers from "./pages/profile/followers/followers";
import Following from "./pages/profile/following/Following";

import Communities from "./pages/communities/Communities";
import CommunityDetails from "./pages/community-details/CommunityDetails";
import MyCommunities from "./pages/my-communities/MyCommunities";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Profile */}

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/edit-profile"
          element={<EditProfile />}
        />

        <Route
          path="/followers"
          element={<Followers />}
        />

        <Route
          path="/following"
          element={<Following />}
        />

        {/* Communities */}

        <Route
          path="/communities"
          element={<Communities />}
        />

        <Route
          path="/community-details/:id"
          element={<CommunityDetails />}
        />

        <Route
          path="/my-communities"
          element={<MyCommunities />}
        />

        {/* Default */}

        <Route
          path="*"
          element={<Profile />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;