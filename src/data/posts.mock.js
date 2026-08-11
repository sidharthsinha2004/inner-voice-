const posts = [
  {
    id: 1,
    username: "Anonymous Fox",
    time: "2 min ago",
    createdAt: Date.now() - 1000 * 60 * 2,
    isFollowing: true,

    title: "Sometimes Silence Speaks Louder Than Words",

    description:
      "Today I decided to disconnect from social media for a few hours. Surprisingly, I felt calmer, more focused, and realized how much peace exists outside constant notifications.",

    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900",

    likes: 245,
    comments: 37,
    reposts: 18,
    bookmarks: 15,
    category: "Mental Health",
    tags: ["Mindfulness", "Peace", "Life"],

    liked: false,
    bookmarked: false,
    reposted: false,
    commentsList: [
      {
        id: 1,
        user: "Silent Soul",
        text: "Needed to read this today. Thank you.",
        time: "1 min ago",
      },
      {
        id: 2,
        user: "Night Owl",
        text: "Digital detox really does wonders 🌿",
        time: "just now",
      },
    ],
  },

  {
    id: 2,
    username: "Night Owl",
    time: "15 min ago",
    createdAt: Date.now() - 1000 * 60 * 15,
    isFollowing: false,

    title: "Late Night Coding Session",

    description:
      "Finally fixed a bug that took me three hours to solve. The feeling after debugging successfully is better than drinking coffee.",

    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=900",

    likes: 410,
    comments: 62,
    reposts: 24,
    bookmarks: 39,
    category: "Technology",
    tags: ["Coding", "React", "Developer"],

    liked: false,
    bookmarked: false,
    reposted: false,
    commentsList: [
      {
        id: 1,
        user: "Dream Chaser",
        text: "That feeling is unmatched, congrats!",
        time: "10 min ago",
      },
      {
        id: 2,
        user: "Hidden Voice",
        text: "The three hours of pain make the fix taste so much sweeter.",
        time: "6 min ago",
      },
    ],
  },

  {
    id: 7,
    username: "Dream Chaser",
    time: "45 min ago",
    createdAt: Date.now() - 1000 * 60 * 45,
    isFollowing: true,

    title: "Quick Poll: What Helps You Reset?",

    description:
      "Curious what this community leans on most when things feel heavy. Vote below 👇",

    image: "",

    likes: 89,
    comments: 12,
    reposts: 6,
    bookmarks: 4,
    category: "Mental Health",
    tags: ["Wellness", "Community"],

    liked: false,
    bookmarked: false,
    reposted: false,
    commentsList: [
      {
        id: 1,
        user: "Inner Mind",
        text: "Journaling every time, no contest.",
        time: "30 min ago",
      },
    ],

    poll: {
      question: "What helps you reset the most?",
      options: [
        { id: 1, text: "Journaling", votes: 34 },
        { id: 2, text: "Exercise", votes: 27 },
        { id: 3, text: "Talking to a friend", votes: 19 },
        { id: 4, text: "Time outdoors", votes: 9 },
      ],
      totalVotes: 89,
      votedOptionId: null,
    },
  },

  {
    id: 3,
    username: "Silent Soul",
    time: "1 hr ago",
    createdAt: Date.now() - 1000 * 60 * 60,
    isFollowing: true,

    title: "Nature Heals Everything",

    description:
      "Spent my morning walking through a quiet forest trail. Sometimes the best therapy isn't talking—it's simply listening to the wind and birds.",

    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900",

    likes: 612,
    comments: 91,
    reposts: 54,
    bookmarks: 103,
    category: "Nature",
    tags: ["Forest", "Travel", "Peace"],

    liked: false,
    bookmarked: false,
    reposted: false,
    commentsList: [
      {
        id: 1,
        user: "Inner Mind",
        text: "This is exactly what I needed to read before my hike this weekend.",
        time: "40 min ago",
      },
      {
        id: 2,
        user: "Anonymous Fox",
        text: "Forest bathing is criminally underrated honestly.",
        time: "22 min ago",
      },
    ],
  },

  {
    id: 4,
    username: "Hidden Voice",
    time: "3 hrs ago",
    createdAt: Date.now() - 1000 * 60 * 60 * 3,
    isFollowing: false,

    title: "A Small Act of Kindness",

    description:
      "Today I bought lunch for a stranger who looked upset. I don't know their story, but I hope it made their day a little brighter.",

    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900",

    likes: 720,
    comments: 143,
    reposts: 87,
    bookmarks: 65,
    category: "Kindness",
    tags: ["Humanity", "Hope", "Love"],

    liked: false,
    bookmarked: false,
    reposted: false,
    commentsList: [
      {
        id: 1,
        user: "Dream Chaser",
        text: "This made my whole week honestly, thank you for sharing.",
        time: "2 hrs ago",
      },
      {
        id: 2,
        user: "Night Owl",
        text: "Small moments like this restore my faith in people.",
        time: "1 hr ago",
      },
      {
        id: 3,
        user: "Silent Soul",
        text: "Doing this more often myself starting today.",
        time: "45 min ago",
      },
    ],
  },

  {
    id: 5,
    username: "Dream Chaser",
    time: "Yesterday",
    createdAt: Date.now() - 1000 * 60 * 60 * 26,
    isFollowing: true,

    title: "Never Stop Learning",

    description:
      "Every expert was once a beginner. Don't compare your chapter one with someone else's chapter twenty.",

    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=900",

    likes: 935,
    comments: 164,
    reposts: 122,
    bookmarks: 201,
    category: "Motivation",
    tags: ["Growth", "Success", "Learning"],

    liked: false,
    bookmarked: false,
    reposted: false,
    commentsList: [
      {
        id: 1,
        user: "Hidden Voice",
        text: "Saving this one for the days I need it most.",
        time: "20 hrs ago",
      },
      {
        id: 2,
        user: "Inner Mind",
        text: "Chapter one vs chapter twenty is such a good way to put it.",
        time: "18 hrs ago",
      },
    ],
  },

  {
    id: 6,
    username: "Inner Mind",
    time: "2 days ago",
    createdAt: Date.now() - 1000 * 60 * 60 * 48,
    isFollowing: false,

    title: "The Best Conversations Are Honest",

    description:
      "People don't always need advice. Sometimes they just need someone who listens without judging.",

    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900",

    likes: 540,
    comments: 76,
    reposts: 35,
    bookmarks: 58,
    category: "Relationships",
    tags: ["Friends", "Trust", "Life"],

    liked: false,
    bookmarked: false,
    reposted: false,
    commentsList: [
      {
        id: 1,
        user: "Anonymous Fox",
        text: "Being listened to without judgment is such a rare gift.",
        time: "1 day ago",
      },
      {
        id: 2,
        user: "Silent Soul",
        text: "This is why I trust so few people with the real stuff.",
        time: "20 hrs ago",
      },
    ],
  },
];

export default posts;
