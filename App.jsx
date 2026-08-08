import { Routes, Route } from "react-router-dom";
import AppShell from "./shell/AppShell";

import Feed from "./screens/Feed";
import Community from "./screens/Community";
import MindGuide from "./screens/MindGuide";
import Alerts from "./screens/Alerts";
import UserSpace from "./screens/UserSpace";
import Preferences from "./screens/Preferences";
import ControlCenter from "./screens/ControlCenter";

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Feed />} />
        <Route path="/community" element={<Community />} />
        <Route path="/mindguide" element={<MindGuide />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/profile" element={<UserSpace />} />
        <Route path="/settings" element={<Preferences />} />
        <Route path="/admin" element={<ControlCenter />} />
      </Route>
    </Routes>
  );
}