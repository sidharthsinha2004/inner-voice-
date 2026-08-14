import {
  House,
  Compass,
  SquarePen,
  MessageCircle,
  Bookmark,
  TrendingUp,
  Users,
  User,
  Settings,
} from "lucide-react";

const navItems = [
  { title: "Home", icon: House, path: "/" },
  { title: "Explore", icon: Compass, path: "/explore" },
  { title: "Create Post", icon: SquarePen, path: "/create-post" },
  { title: "Messages", icon: MessageCircle, path: "/messages" },
  { title: "Bookmarks", icon: Bookmark, path: "/bookmarks" },
  { title: "Trending", icon: TrendingUp, path: "/trending" },
  { title: "Communities", icon: Users, path: "/communities" },
  { title: "Profile", icon: User, path: "/profile" },
  { title: "Settings", icon: Settings, path: "/settings" },
];

export default navItems;
