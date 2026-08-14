import { createContext, useContext, useMemo, useState, useCallback } from "react";

import initialPosts from "../data/posts.mock";
import initialCommunities from "../data/communities.mock";
import initialConversations from "../data/conversations.mock";
import initialNotifications from "../data/notifications.mock";

const AppDataContext = createContext(null);

const CURRENT_USER = {
  name: "Sam Rivera",
  initial: "S",
  bio: "Sharing thoughts, one voice at a time 🌿",
  location: "Pune, India",
  joined: "Jan 2025",
};

let toastIdCounter = 1;
let conversationMsgIdCounter = 1000;

export function AppDataProvider({ children }) {
  const [posts, setPosts] = useState(initialPosts);
  const [communities, setCommunities] = useState(initialCommunities);
  const [conversations, setConversations] = useState(initialConversations);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [currentUser, setCurrentUser] = useState(CURRENT_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(() => sessionStorage.getItem("innervoice_authenticated") === "true");
  const [toasts, setToasts] = useState([]);

  // ---------- Toasts ----------
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message, tone = "default") => {
      const id = toastIdCounter++;
      setToasts((prev) => [...prev, { id, message, tone }]);
      setTimeout(() => removeToast(id), 3200);
    },
    [removeToast]
  );

  // ---------- Posts ----------
  const toggleLike = useCallback((postId) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              liked: !p.liked,
              likes: p.liked ? p.likes - 1 : p.likes + 1,
            }
          : p
      )
    );
  }, []);

  const toggleBookmark = useCallback(
    (postId) => {
      let nowBookmarked = false;
      setPosts((prev) =>
        prev.map((p) => {
          if (p.id !== postId) return p;
          nowBookmarked = !p.bookmarked;
          return {
            ...p,
            bookmarked: !p.bookmarked,
            bookmarks: p.bookmarked ? p.bookmarks - 1 : p.bookmarks + 1,
          };
        })
      );
      setTimeout(() => {
        showToast(nowBookmarked ? "Saved to bookmarks" : "Removed from bookmarks");
      }, 0);
    },
    [showToast]
  );

  const toggleRepost = useCallback(
    (postId) => {
      let nowReposted = false;
      setPosts((prev) =>
        prev.map((p) => {
          if (p.id !== postId) return p;
          nowReposted = !p.reposted;
          return {
            ...p,
            reposted: !p.reposted,
            reposts: p.reposted ? p.reposts - 1 : p.reposts + 1,
          };
        })
      );
      setTimeout(() => {
        showToast(nowReposted ? "Reposted to your voice" : "Repost removed");
      }, 0);
    },
    [showToast]
  );

  const addComment = useCallback((postId, text) => {
    if (!text?.trim()) return;

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const newComment = {
          id: (p.commentsList?.length || 0) + 1 + Math.random(),
          user: CURRENT_USER.name,
          text: text.trim(),
          time: "just now",
        };
        return {
          ...p,
          comments: p.comments + 1,
          commentsList: [...(p.commentsList || []), newComment],
        };
      })
    );
  }, []);

  const addPost = useCallback(
    ({ title, description, media, poll, category, tags }) => {
      setPosts((prev) => {
        const newPost = {
          id: Date.now(),
          username: CURRENT_USER.name,
          time: "Just now",
          createdAt: Date.now(),
          isFollowing: true,
          title,
          description,
          // Legacy single-image field, kept for thumbnails on Explore/Search
          image: media?.find((m) => m.type === "image")?.url || "",
          // Full set of uploaded images/video/audio for this post
          media: media || [],
          // Optional poll attached to this post
          poll: poll
            ? {
                question: poll.question,
                options: poll.options.map((text, i) => ({
                  id: i + 1,
                  text,
                  votes: 0,
                })),
                totalVotes: 0,
                votedOptionId: null,
              }
            : null,
          likes: 0,
          comments: 0,
          reposts: 0,
          bookmarks: 0,
          category: category || "General",
          tags: tags?.length ? tags : ["Thoughts"],
          liked: false,
          bookmarked: false,
          reposted: false,
          commentsList: [],
        };
        return [newPost, ...prev];
      });
      showToast("Your voice has been shared 🌿", "success");
    },
    [showToast]
  );

  const votePoll = useCallback((postId, optionId) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId || !p.poll) return p;

        const previousVote = p.poll.votedOptionId;
        if (previousVote === optionId) return p; // already voted this option

        const options = p.poll.options.map((o) => {
          if (o.id === optionId) return { ...o, votes: o.votes + 1 };
          if (o.id === previousVote) return { ...o, votes: Math.max(0, o.votes - 1) };
          return o;
        });

        const totalVotes = previousVote
          ? p.poll.totalVotes
          : p.poll.totalVotes + 1;

        return {
          ...p,
          poll: { ...p.poll, options, totalVotes, votedOptionId: optionId },
        };
      })
    );
  }, []);

  // ---------- Communities ----------
  const toggleJoinCommunity = useCallback(
    (communityId) => {
      let joinedNow = false;
      let communityName = "";
      setCommunities((prev) =>
        prev.map((c) => {
          if (c.id !== communityId) return c;
          joinedNow = !c.joined;
          communityName = c.name;
          return {
            ...c,
            joined: !c.joined,
            members: c.joined ? c.members - 1 : c.members + 1,
          };
        })
      );
      setTimeout(() => {
        showToast(
          joinedNow ? `Joined ${communityName}` : `Left ${communityName}`
        );
      }, 0);
    },
    [showToast]
  );

  const addCommunity = useCallback(
    ({ name, description, category }) => {
      setCommunities((prev) => [
        {
          id: Date.now(),
          name,
          description: description || "A new community on InnerVoice.",
          category: category || "General",
          members: 1,
          joined: true,
        },
        ...prev,
      ]);
      showToast(`${name} community created`, "success");
    },
    [showToast]
  );

  // ---------- Messages ----------
  const sendMessage = useCallback((conversationId, text) => {
    if (!text?.trim()) return;

    const myMessage = {
      id: conversationMsgIdCounter++,
      sender: "me",
      text: text.trim(),
      time: "Just now",
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId
          ? { ...c, messages: [...c.messages, myMessage], unread: 0 }
          : c
      )
    );

    // Simulate a reply so messaging feels alive in this demo
    setTimeout(() => {
      setConversations((prev) =>
        prev.map((c) => {
          if (c.id !== conversationId) return c;
          const reply = {
            id: conversationMsgIdCounter++,
            sender: "them",
            text: pickAutoReply(),
            time: "Just now",
          };
          return { ...c, messages: [...c.messages, reply] };
        })
      );
    }, 1400);
  }, []);

  const markConversationRead = useCallback((conversationId) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === conversationId ? { ...c, unread: 0 } : c))
    );
  }, []);

  // ---------- Notifications ----------
  const markNotificationRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  // ---------- Profile / Auth ----------
  const updateProfile = useCallback(
    (partial) => {
      setCurrentUser((prev) => ({ ...prev, ...partial }));
      showToast("Profile updated", "success");
    },
    [showToast]
  );

  const logout = useCallback(() => {
    sessionStorage.removeItem("innervoice_authenticated");
    setIsAuthenticated(false);
    showToast("You've been logged out");
  }, [showToast]);

  const login = useCallback(() => {
    sessionStorage.setItem("innervoice_authenticated", "true");
    setIsAuthenticated(true);
    showToast("Welcome back 🌿", "success");
  }, [showToast]);

  const unreadNotifications = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const unreadMessages = useMemo(
    () => conversations.reduce((sum, c) => sum + c.unread, 0),
    [conversations]
  );

  const value = {
    posts,
    toggleLike,
    toggleBookmark,
    toggleRepost,
    addComment,
    addPost,
    votePoll,

    communities,
    toggleJoinCommunity,
    addCommunity,

    conversations,
    sendMessage,
    markConversationRead,
    unreadMessages,

    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    unreadNotifications,

    currentUser,
    updateProfile,

    isAuthenticated,
    login,
    logout,

    toasts,
    showToast,
    removeToast,
  };

  return (
    <AppDataContext.Provider value={value}>
      {children}
    </AppDataContext.Provider>
  );
}

function pickAutoReply() {
  const replies = [
    "That means a lot, thank you 🌿",
    "Haha true, I felt that too.",
    "Totally get you.",
    "Let's talk more about this later?",
    "Appreciate you sharing that with me.",
  ];
  return replies[Math.floor(Math.random() * replies.length)];
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error("useAppData must be used within an AppDataProvider");
  return ctx;
}
