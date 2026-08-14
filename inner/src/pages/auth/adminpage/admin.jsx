import { useEffect, useState } from "react";
import "./admin.css";

import {
  ShieldCheck,
  Search,
  Clock3,
  CheckCircle2,
  XCircle,
  Eye,
  Trash2,
  EyeOff,
  UserRound,
  CalendarDays,
  MessageSquareText,
  ArrowLeft,
  X,
  AlertTriangle,
  Inbox,
} from "lucide-react";

export default function AdminIdentity() {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [adminNote, setAdminNote] = useState("");
  const [toast, setToast] = useState("");

  /* ========================================
     LOAD REQUESTS
  ======================================== */

  useEffect(() => {
    loadRequests();
  }, []);

  function loadRequests() {
    /*
      Current prototype:
      IdentityRequest.jsx saves one request as
      "identityRequest".

      Later MongoDB/API can replace this function.
    */

    const savedRequest = JSON.parse(
      localStorage.getItem("identityRequest") || "null"
    );

    if (!savedRequest) {
      setRequests([]);
      return;
    }

    const request = {
      id: savedRequest.id || "IV-1001",

      privateUsername:
        localStorage.getItem("privateUsername") ||
        "sidharth_sinha",

      currentIdentity:
        savedRequest.currentIdentity ||
        localStorage.getItem("publicIdentity") ||
        "quiet_river_4821",

      reason:
        savedRequest.reason ||
        "No reason provided.",

      activityAction:
        savedRequest.activityAction || "hide",

      status:
        savedRequest.status || "pending",

      submittedAt:
        savedRequest.submittedAt ||
        new Date().toISOString(),

      adminNote:
        savedRequest.adminNote || "",
    };

    setRequests([request]);
  }

  /* ========================================
     GENERATE NEW IDENTITY
  ======================================== */

  function generatePublicIdentity() {
    const adjectives = [
      "quiet",
      "silent",
      "hidden",
      "soft",
      "calm",
      "gentle",
      "distant",
      "wandering",
      "little",
      "unknown",
      "silver",
      "midnight",
      "still",
      "lonely",
      "fading",
    ];

    const nouns = [
      "river",
      "moon",
      "echo",
      "forest",
      "cloud",
      "orbit",
      "wave",
      "star",
      "comet",
      "sky",
      "meadow",
      "rain",
      "ocean",
      "light",
      "mist",
    ];

    const adjective =
      adjectives[
        Math.floor(Math.random() * adjectives.length)
      ];

    const noun =
      nouns[
        Math.floor(Math.random() * nouns.length)
      ];

    const number =
      Math.floor(1000 + Math.random() * 9000);

    return `${adjective}_${noun}_${number}`;
  }

  /* ========================================
     APPROVE
  ======================================== */

  function approveRequest(request) {
    const newIdentity = generatePublicIdentity();

    const updatedRequest = {
      ...request,

      status: "approved",

      oldIdentity: request.currentIdentity,

      newIdentity,

      adminNote: adminNote.trim(),

      reviewedAt: new Date().toISOString(),
    };

    /*
      Change the user's public identity.
    */

    localStorage.setItem(
      "publicIdentity",
      newIdentity
    );

    /*
      Save request status.
    */

    localStorage.setItem(
      "identityRequest",
      JSON.stringify(updatedRequest)
    );

    /*
      DEMO ACTIVITY HANDLING

      In your real backend these operations should
      happen on the server/database.
    */

    if (request.activityAction === "delete") {
      localStorage.removeItem("posts");
      localStorage.removeItem("comments");
      localStorage.removeItem("likes");
    }

    if (request.activityAction === "hide") {
      localStorage.setItem(
        "previousActivityHidden",
        "true"
      );
    }

    setRequests((current) =>
      current.map((item) =>
        item.id === request.id
          ? updatedRequest
          : item
      )
    );

    setSelectedRequest(updatedRequest);

    closeActionModal();

    showToast(
      `Identity approved — @${newIdentity}`
    );
  }

  /* ========================================
     REJECT
  ======================================== */

  function rejectRequest(request) {
    const updatedRequest = {
      ...request,

      status: "rejected",

      adminNote:
        adminNote.trim() ||
        "Identity change request rejected.",

      reviewedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "identityRequest",
      JSON.stringify(updatedRequest)
    );

    setRequests((current) =>
      current.map((item) =>
        item.id === request.id
          ? updatedRequest
          : item
      )
    );

    setSelectedRequest(updatedRequest);

    closeActionModal();

    showToast("Identity request rejected");
  }

  /* ========================================
     HELPERS
  ======================================== */

  function closeActionModal() {
    setActionType(null);
    setAdminNote("");
  }

  function showToast(message) {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  }

  function formatDate(date) {
    if (!date) return "Unknown";

    return new Date(date).toLocaleString();
  }

  /* ========================================
     FILTER
  ======================================== */

  const filteredRequests = requests.filter(
    (request) => {
      const matchesFilter =
        filter === "all" ||
        request.status === filter;

      const query =
        search.trim().toLowerCase();

      const matchesSearch =
        !query ||
        request.currentIdentity
          .toLowerCase()
          .includes(query) ||
        request.privateUsername
          .toLowerCase()
          .includes(query) ||
        request.reason
          .toLowerCase()
          .includes(query);

      return matchesFilter && matchesSearch;
    }
  );

  const pendingCount = requests.filter(
    (request) => request.status === "pending"
  ).length;

  const approvedCount = requests.filter(
    (request) => request.status === "approved"
  ).length;

  const rejectedCount = requests.filter(
    (request) => request.status === "rejected"
  ).length;

  return (
    <div className="admin-page">

      {/* ================= SIDEBAR ================= */}

      <aside className="admin-sidebar">

        <div className="admin-logo">
          inner<span>voice</span>
        </div>

        <div className="admin-label">
          ADMINISTRATION
        </div>

        <nav className="admin-nav">

          <button type="button">
            <ShieldCheck size={17} />
            Overview
          </button>

          <button
            type="button"
            className="active"
          >
            <UserRound size={17} />

            Identity Requests

            {pendingCount > 0 && (
              <span className="nav-count">
                {pendingCount}
              </span>
            )}
          </button>

        </nav>

        <div className="admin-sidebar-bottom">
          <div className="admin-avatar">
            AD
          </div>

          <div>
            <strong>Administrator</strong>
            <span>InnerVoice Admin</span>
          </div>
        </div>

      </aside>


      {/* ================= MAIN ================= */}

      <main className="admin-main">

        {/* HEADER */}

        <header className="admin-header">

          <div>
            <span className="admin-eyebrow">
              <ShieldCheck size={13} />
              IDENTITY MANAGEMENT
            </span>

            <h1>Identity Requests</h1>

            <p>
              Review requests from users who want
              to change their public InnerVoice
              identity.
            </p>
          </div>

          <div className="admin-header-badge">
            <Clock3 size={15} />

            {pendingCount} pending
          </div>

        </header>


        {/* ================= STATS ================= */}

        <section className="admin-stats">

          <div className="admin-stat-card">

            <div className="stat-icon pending">
              <Clock3 size={19} />
            </div>

            <div>
              <span>Pending</span>
              <strong>{pendingCount}</strong>
            </div>

          </div>


          <div className="admin-stat-card">

            <div className="stat-icon approved">
              <CheckCircle2 size={19} />
            </div>

            <div>
              <span>Approved</span>
              <strong>{approvedCount}</strong>
            </div>

          </div>


          <div className="admin-stat-card">

            <div className="stat-icon rejected">
              <XCircle size={19} />
            </div>

            <div>
              <span>Rejected</span>
              <strong>{rejectedCount}</strong>
            </div>

          </div>


          <div className="admin-stat-card">

            <div className="stat-icon total">
              <Inbox size={19} />
            </div>

            <div>
              <span>Total requests</span>
              <strong>{requests.length}</strong>
            </div>

          </div>

        </section>


        {/* ================= TOOLBAR ================= */}

        <section className="admin-toolbar">

          <div className="admin-search">
            <Search size={16} />

            <input
              type="text"
              placeholder="Search identity requests..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>


          <div className="admin-filters">

            {[
              ["all", "All"],
              ["pending", "Pending"],
              ["approved", "Approved"],
              ["rejected", "Rejected"],
            ].map(([value, label]) => (
              <button
                type="button"
                key={value}
                className={
                  filter === value
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setFilter(value)
                }
              >
                {label}
              </button>
            ))}

          </div>

        </section>


        {/* ================= REQUESTS ================= */}

        <section className="requests-panel">

          <div className="requests-panel-header">

            <div>
              <h2>Requests</h2>

              <p>
                {filteredRequests.length} request
                {filteredRequests.length !== 1
                  ? "s"
                  : ""}
              </p>
            </div>

          </div>


          {filteredRequests.length === 0 ? (

            <div className="admin-empty">

              <div>
                <Inbox size={26} />
              </div>

              <h3>No identity requests</h3>

              <p>
                New identity change requests will
                appear here.
              </p>

            </div>

          ) : (

            <div className="request-table">

              <div className="request-table-head">

                <span>User</span>
                <span>Current identity</span>
                <span>Activity</span>
                <span>Status</span>
                <span>Submitted</span>
                <span></span>

              </div>


              {filteredRequests.map((request) => (

                <div
                  className="request-table-row"
                  key={request.id}
                >

                  <div className="request-user">

                    <div className="request-avatar">
                      {request.privateUsername
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>

                    <div>
                      <strong>
                        @{request.privateUsername}
                      </strong>

                      <span>{request.id}</span>
                    </div>

                  </div>


                  <div className="table-identity">
                    @{request.currentIdentity}
                  </div>


                  <div>

                    <span
                      className={`activity-pill ${
                        request.activityAction
                      }`}
                    >

                      {request.activityAction ===
                      "delete" ? (
                        <>
                          <Trash2 size={12} />
                          Delete
                        </>
                      ) : (
                        <>
                          <EyeOff size={12} />
                          Hide
                        </>
                      )}

                    </span>

                  </div>


                  <div>

                    <span
                      className={`status-pill ${
                        request.status
                      }`}
                    >
                      {request.status ===
                        "pending" && (
                        <Clock3 size={12} />
                      )}

                      {request.status ===
                        "approved" && (
                        <CheckCircle2
                          size={12}
                        />
                      )}

                      {request.status ===
                        "rejected" && (
                        <XCircle size={12} />
                      )}

                      {request.status}
                    </span>

                  </div>


                  <div className="table-date">
                    {new Date(
                      request.submittedAt
                    ).toLocaleDateString()}
                  </div>


                  <button
                    type="button"
                    className="review-button"
                    onClick={() =>
                      setSelectedRequest(request)
                    }
                  >
                    <Eye size={15} />
                    Review
                  </button>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>


      {/* =========================================
          REQUEST DETAILS DRAWER
      ========================================= */}

      {selectedRequest && (

        <div
          className="admin-overlay"
          onClick={() =>
            setSelectedRequest(null)
          }
        >

          <aside
            className="request-drawer"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="drawer-header">

              <div>
                <span>IDENTITY REQUEST</span>

                <h2>
                  Review request
                </h2>
              </div>

              <button
                type="button"
                aria-label="Close request"
                onClick={() =>
                  setSelectedRequest(null)
                }
              >
                <X size={19} />
              </button>

            </div>


            {/* USER */}

            <div className="drawer-section">

              <span className="drawer-label">
                ACCOUNT
              </span>

              <div className="drawer-user">

                <div className="drawer-avatar">
                  {selectedRequest
                    .privateUsername
                    .slice(0, 2)
                    .toUpperCase()}
                </div>

                <div>
                  <strong>
                    @{selectedRequest.privateUsername}
                  </strong>

                  <span>
                    Private account identity
                  </span>
                </div>

              </div>

            </div>


            {/* IDENTITY */}

            <div className="drawer-section">

              <span className="drawer-label">
                CURRENT PUBLIC IDENTITY
              </span>

              <div className="drawer-identity">

                <ShieldCheck size={18} />

                <strong>
                  @{selectedRequest.currentIdentity}
                </strong>

              </div>

            </div>


            {/* REASON */}

            <div className="drawer-section">

              <span className="drawer-label">
                REASON FOR CHANGE
              </span>

              <div className="reason-content">

                <MessageSquareText size={17} />

                <p>
                  {selectedRequest.reason}
                </p>

              </div>

            </div>


            {/* ACTIVITY */}

            <div className="drawer-section">

              <span className="drawer-label">
                REQUESTED ACTIVITY ACTION
              </span>

              <div
                className={`drawer-action ${
                  selectedRequest.activityAction
                }`}
              >

                {selectedRequest.activityAction ===
                "delete" ? (
                  <Trash2 size={19} />
                ) : (
                  <EyeOff size={19} />
                )}

                <div>

                  <strong>
                    {selectedRequest.activityAction ===
                    "delete"
                      ? "Start with a fresh identity"
                      : "Preserve and hide activity"}
                  </strong>

                  <p>
                    {selectedRequest.activityAction ===
                    "delete"
                      ? "Posts, comments and likes will be permanently removed."
                      : "Previous activity will be preserved but hidden from the new identity."}
                  </p>

                </div>

              </div>

            </div>


            {/* SUBMITTED */}

            <div className="drawer-section">

              <span className="drawer-label">
                SUBMITTED
              </span>

              <div className="drawer-date">

                <CalendarDays size={16} />

                {formatDate(
                  selectedRequest.submittedAt
                )}

              </div>

            </div>


            {/* EXISTING ADMIN NOTE */}

            {selectedRequest.adminNote && (

              <div className="drawer-section">

                <span className="drawer-label">
                  ADMIN NOTE
                </span>

                <p className="existing-note">
                  {selectedRequest.adminNote}
                </p>

              </div>

            )}


            {/* ACTIONS */}

            {selectedRequest.status ===
              "pending" && (

              <div className="drawer-actions">

                <button
                  type="button"
                  className="reject-request"
                  onClick={() =>
                    setActionType("reject")
                  }
                >
                  <XCircle size={16} />

                  Reject
                </button>

                <button
                  type="button"
                  className="approve-request"
                  onClick={() =>
                    setActionType("approve")
                  }
                >
                  <CheckCircle2 size={16} />

                  Approve Request
                </button>

              </div>

            )}


            {selectedRequest.status !==
              "pending" && (

              <div
                className={`reviewed-message ${
                  selectedRequest.status
                }`}
              >

                {selectedRequest.status ===
                "approved" ? (
                  <CheckCircle2 size={18} />
                ) : (
                  <XCircle size={18} />
                )}

                Request {selectedRequest.status}

              </div>

            )}

          </aside>

        </div>

      )}


      {/* =========================================
          APPROVE / REJECT MODAL
      ========================================= */}

      {actionType && selectedRequest && (

        <div
          className="action-modal-overlay"
          onClick={closeActionModal}
        >

          <div
            className="action-modal"
            role="dialog"
            aria-modal="true"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div
              className={`action-modal-icon ${
                actionType
              }`}
            >

              {actionType === "approve" ? (
                <CheckCircle2 size={25} />
              ) : (
                <AlertTriangle size={25} />
              )}

            </div>


            <h2>
              {actionType === "approve"
                ? "Approve identity change?"
                : "Reject identity change?"}
            </h2>


            <p>
              {actionType === "approve"
                ? `A new anonymous public identity will be generated for @${selectedRequest.currentIdentity}.`
                : `The current identity @${selectedRequest.currentIdentity} will remain unchanged.`}
            </p>


            {actionType === "approve" && (

              <div className="approval-warning">

                {selectedRequest.activityAction ===
                "delete" ? (
                  <>
                    <Trash2 size={16} />

                    The user's posts, comments and
                    likes will be permanently
                    removed.
                  </>
                ) : (
                  <>
                    <EyeOff size={16} />

                    The user's previous activity
                    will be preserved and hidden.
                  </>
                )}

              </div>

            )}


            <label className="admin-note">

              Admin note
              <span>Optional</span>

              <textarea
                value={adminNote}
                onChange={(event) =>
                  setAdminNote(
                    event.target.value
                  )
                }
                placeholder={
                  actionType === "approve"
                    ? "Add a note about this decision..."
                    : "Explain why the request was rejected..."
                }
                maxLength={300}
              />

              <small>
                {adminNote.length} / 300
              </small>

            </label>


            <div className="action-modal-buttons">

              <button
                type="button"
                onClick={closeActionModal}
              >
                Cancel
              </button>

              <button
                type="button"
                className={
                  actionType === "approve"
                    ? "modal-approve"
                    : "modal-reject"
                }
                onClick={() => {
                  if (
                    actionType === "approve"
                  ) {
                    approveRequest(
                      selectedRequest
                    );
                  } else {
                    rejectRequest(
                      selectedRequest
                    );
                  }
                }}
              >

                {actionType === "approve"
                  ? "Approve & Change Identity"
                  : "Reject Request"}

              </button>

            </div>

          </div>

        </div>

      )}


      {/* TOAST */}

      {toast && (
        <div className="admin-toast">
          <CheckCircle2 size={16} />
          {toast}
        </div>
      )}

    </div>
  );
}