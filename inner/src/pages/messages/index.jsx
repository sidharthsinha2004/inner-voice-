import { useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  Send,
  ArrowLeft,
  Search,
  MoreHorizontal,
  Phone,
  Video,
  Smile,
  Paperclip,
  CheckCheck,
  Sparkles,
} from "lucide-react";

import { useAppData } from "../../context/AppDataContext";
import "./message.css";

export default function Messages() {
  const {
    conversations,
    sendMessage,
    markConversationRead,
  } = useAppData();

  const [activeId, setActiveId] = useState(
    conversations[0]?.id ?? null
  );

  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");

  /*
   * IMPORTANT
   * Use the chat body itself for scrolling.
   * Do NOT use scrollIntoView() because it can
   * scroll the whole Messages page.
   */
  const chatBodyRef = useRef(null);

  const active = conversations.find(
    (c) => c.id === activeId
  );

  /* =====================================================
     SCROLL CHAT ONLY
  ===================================================== */

  useEffect(() => {
    const chatBody = chatBodyRef.current;

    if (!chatBody) return;

    /*
     * Wait until the messages have rendered,
     * then move ONLY the chat container to bottom.
     */
    requestAnimationFrame(() => {
      chatBody.scrollTop = chatBody.scrollHeight;
    });
  }, [activeId, active?.messages.length]);


  /* =====================================================
     OPEN CONVERSATION
  ===================================================== */

  const openConversation = (id) => {
    setActiveId(id);
    markConversationRead(id);
  };


  /* =====================================================
     SEND MESSAGE
  ===================================================== */

  const handleSend = (e) => {
    e.preventDefault();

    if (!input.trim() || !activeId) return;

    sendMessage(activeId, input);

    setInput("");
  };


  /* =====================================================
     FILTER CONVERSATIONS
  ===================================================== */

  const filteredConversations =
    conversations.filter((c) =>
      c.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );


  return (
    <div className="messages-page">

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside
        className={`messages-sidebar ${
          active ? "mobile-hidden" : ""
        }`}
      >

        {/* Sidebar Header */}

        <div className="messages-sidebar-header">

          <div className="messages-title-wrapper">

            <div className="messages-title-icon">
              <MessageCircle size={18} />
            </div>

            <div>
              <span className="messages-eyebrow">
                INBOX
              </span>

              <h1>
                Messages
              </h1>
            </div>

          </div>


          <button
            type="button"
            className="messages-header-menu"
            aria-label="Messages options"
          >
            <MoreHorizontal size={18} />
          </button>

        </div>


        {/* Search */}

        <div className="messages-search">

          <Search size={16} />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search conversations..."
          />

        </div>


        {/* Conversation Count */}

        <div className="messages-list-heading">

          <span>
            Conversations
          </span>

          <span className="messages-count">
            {conversations.length}
          </span>

        </div>


        {/* Conversation List */}

        <div className="messages-conversation-list">

          {filteredConversations.length > 0 ? (

            filteredConversations.map((c) => {

              const lastMessage =
                c.messages[
                  c.messages.length - 1
                ];

              const isActive =
                activeId === c.id;

              return (

                <button
                  key={c.id}
                  type="button"
                  onClick={() =>
                    openConversation(c.id)
                  }
                  className={`conversation-item ${
                    isActive
                      ? "active"
                      : ""
                  }`}
                >

                  {/* Avatar */}

                  <div className="conversation-avatar-wrapper">

                    <div className="conversation-avatar">

                      {c.name
                        .charAt(0)
                        .toUpperCase()}

                    </div>

                    {c.lastSeen === "Online" && (
                      <span className="conversation-online" />
                    )}

                  </div>


                  {/* Content */}

                  <div className="conversation-content">

                    <div className="conversation-top">

                      <p>
                        {c.name}
                      </p>

                      {lastMessage && (
                        <span>
                          {lastMessage.time}
                        </span>
                      )}

                    </div>


                    <div className="conversation-bottom">

                      <p>
                        {lastMessage
                          ? lastMessage.text
                          : "Say hello 👋"}
                      </p>


                      {c.unread > 0 && (

                        <span className="unread-count">
                          {c.unread}
                        </span>

                      )}

                    </div>

                  </div>

                </button>

              );
            })

          ) : (

            <div className="messages-no-results">

              <Search size={22} />

              <p>
                No conversations found
              </p>

              <span>
                Try another name
              </span>

            </div>

          )}

        </div>


        {/* Sidebar Footer */}

        <div className="messages-sidebar-footer">

          <div className="messages-secure-icon">
            <Sparkles size={13} />
          </div>

          <div>
            <strong>
              Private conversations
            </strong>

            <span>
              Your messages stay personal
            </span>
          </div>

        </div>

      </aside>


      {/* =================================================
          CHAT AREA
      ================================================= */}

      <main
        className={`messages-chat ${
          active
            ? "mobile-visible"
            : ""
        }`}
      >

        {active ? (

          <>

            {/* =========================================
                CHAT HEADER
            ========================================= */}

            <header className="chat-header">

              <div className="chat-user">

                <button
                  type="button"
                  onClick={() =>
                    setActiveId(null)
                  }
                  className="chat-back-button"
                  aria-label="Back"
                >
                  <ArrowLeft size={19} />
                </button>


                <div className="chat-avatar-wrapper">

                  <div className="chat-avatar">
                    {active.name
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  {active.lastSeen ===
                    "Online" && (
                    <span className="chat-online" />
                  )}

                </div>


                <div className="chat-user-info">

                  <div className="chat-name-row">

                    <h2>
                      {active.name}
                    </h2>

                    {active.lastSeen ===
                      "Online" && (
                      <span className="chat-online-label">
                        Online
                      </span>
                    )}

                  </div>

                  <p>
                    {active.lastSeen}
                  </p>

                </div>

              </div>


              {/* Header Actions */}

              <div className="chat-header-actions">

                <button
                  type="button"
                  aria-label="Call"
                >
                  <Phone size={17} />
                </button>

                <button
                  type="button"
                  aria-label="Video call"
                >
                  <Video size={18} />
                </button>

                <button
                  type="button"
                  aria-label="More"
                >
                  <MoreHorizontal size={18} />
                </button>

              </div>

            </header>


            {/* =========================================
                CHAT BODY
            ========================================= */}

            <div
              className="chat-body"
              ref={chatBodyRef}
            >

              <div className="chat-intro">

                <div className="chat-intro-avatar">
                  {active.name
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <h3>
                  {active.name}
                </h3>

                <p>
                  This is the beginning of your
                  conversation.
                </p>

              </div>


              <div className="chat-messages">

                {active.messages.map((m) => {

                  const mine =
                    m.sender === "me";

                  return (

                    <div
                      key={m.id}
                      className={`message-row ${
                        mine
                          ? "mine"
                          : "theirs"
                      }`}
                    >

                      <div
                        className={`message-bubble ${
                          mine
                            ? "mine"
                            : "theirs"
                        }`}
                      >

                        <p>
                          {m.text}
                        </p>


                        <div className="message-meta">

                          <span>
                            {m.time}
                          </span>

                          {mine && (
                            <CheckCheck
                              size={13}
                            />
                          )}

                        </div>

                      </div>

                    </div>

                  );
                })}

              </div>

            </div>


            {/* =========================================
                COMPOSER
            ========================================= */}

            <div className="chat-composer-area">

              <form
                onSubmit={handleSend}
                className="chat-composer"
              >

                <button
                  type="button"
                  aria-label="Attach file"
                  className="composer-icon"
                >
                  <Paperclip size={18} />
                </button>


                <input
                  type="text"
                  value={input}
                  onChange={(e) =>
                    setInput(e.target.value)
                  }
                  placeholder="Write a message..."
                />


                <button
                  type="button"
                  aria-label="Emoji"
                  className="composer-icon"
                >
                  <Smile size={18} />
                </button>


                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="composer-send"
                  aria-label="Send message"
                >
                  <Send size={17} />
                </button>

              </form>


              <p className="composer-hint">
                Press Enter to send
              </p>

            </div>

          </>

        ) : (

          /* ===========================================
             EMPTY STATE
          =========================================== */

          <div className="messages-empty-state">

            <div className="messages-empty-icon">
              <MessageCircle size={30} />
            </div>

            <h2>
              Your conversations
            </h2>

            <p>
              Select a conversation to start
              connecting with someone.
            </p>

          </div>

        )}

      </main>

    </div>
  );
}