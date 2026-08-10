const conversations = [
  {
    id: 1,
    name: "Silent Soul",
    lastSeen: "Online",
    unread: 2,
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Hey! Loved your post about disconnecting from social media.",
        time: "10:02 AM",
      },
      {
        id: 2,
        sender: "them",
        text: "How long did you manage to stay off it?",
        time: "10:03 AM",
      },
    ],
  },
  {
    id: 2,
    name: "Night Owl",
    lastSeen: "Active 5m ago",
    unread: 0,
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Debugging war stories at 2am, always a mood.",
        time: "Yesterday",
      },
      {
        id: 2,
        sender: "me",
        text: "Haha exactly, coffee has nothing on that feeling.",
        time: "Yesterday",
      },
    ],
  },
  {
    id: 3,
    name: "Dream Chaser",
    lastSeen: "Active 2h ago",
    unread: 0,
    messages: [
      {
        id: 1,
        sender: "them",
        text: "Your post about chapter one vs chapter twenty stuck with me.",
        time: "Mon",
      },
    ],
  },
  {
    id: 4,
    name: "Hidden Voice",
    lastSeen: "Offline",
    unread: 1,
    messages: [
      {
        id: 1,
        sender: "them",
        text: "That kindness story made my whole week honestly.",
        time: "Sun",
      },
    ],
  },
];

export default conversations;
