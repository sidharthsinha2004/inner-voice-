import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  Image as ImageIcon,
  Video,
  Music,
  Sparkles,
  X,
  Film,
  Plus,
  BarChart3,
  ArrowLeft,
  Hash,
  FileText,
  Send,
  Check,
} from "lucide-react";

import { useAppData } from "../../context/AppDataContext";
import "./createpost.css"

const CATEGORIES = [
  "Mental Health",
  "Technology",
  "Nature",
  "Kindness",
  "Motivation",
  "Relationships",
  "Career",
  "Confessions",
  "General",
];

const MAX_FILES = 6;

function detectMediaType(file) {
  if (file.type.startsWith("image/")) return "image";
  if (file.type.startsWith("video/")) return "video";
  if (file.type.startsWith("audio/")) return "audio";
  return null;
}

export default function CreatePost() {
  const navigate = useNavigate();
  const { addPost, showToast } = useAppData();

  const fileInputRef = useRef(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [tagsInput, setTagsInput] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [errors, setErrors] = useState({});

  const [attachmentMode, setAttachmentMode] =
    useState("none");

  const [pollQuestion, setPollQuestion] =
    useState("");

  const [pollOptions, setPollOptions] =
    useState(["", ""]);


  const tags = tagsInput
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);


  /* =====================================================
     MEDIA
  ===================================================== */

  const clearMedia = () => {
    mediaFiles.forEach((m) =>
      URL.revokeObjectURL(m.url)
    );

    setMediaFiles([]);
  };


  const clearPoll = () => {
    setPollQuestion("");
    setPollOptions(["", ""]);
  };


  const openMediaSection = () => {
    setAttachmentMode((prev) => {
      if (prev === "media") return "none";

      clearPoll();

      return "media";
    });
  };


  const openPollSection = () => {
    setAttachmentMode((prev) => {
      if (prev === "poll") return "none";

      clearMedia();

      return "poll";
    });
  };


  const handleFiles = (fileList) => {
    const files = Array.from(fileList || []);

    if (!files.length) return;

    if (
      mediaFiles.length + files.length >
      MAX_FILES
    ) {
      showToast(
        `You can attach up to ${MAX_FILES} files`
      );
    }

    const room = Math.max(
      0,
      MAX_FILES - mediaFiles.length
    );

    const toProcess = files.slice(0, room);

    const accepted = [];
    const rejected = [];

    toProcess.forEach((file) => {
      const type = detectMediaType(file);

      if (!type) {
        rejected.push(file.name);
        return;
      }

      accepted.push({
        id: `${Date.now()}-${Math.random()
          .toString(36)
          .slice(2)}`,
        type,
        url: URL.createObjectURL(file),
        name: file.name,
      });
    });

    if (accepted.length) {
      setMediaFiles((prev) => [
        ...prev,
        ...accepted,
      ]);
    }

    if (rejected.length) {
      showToast(
        `Unsupported file type: ${rejected.join(
          ", "
        )}`
      );
    }
  };


  const removeMedia = (id) => {
    setMediaFiles((prev) => {
      const target = prev.find(
        (m) => m.id === id
      );

      if (target) {
        URL.revokeObjectURL(target.url);
      }

      return prev.filter(
        (m) => m.id !== id
      );
    });
  };


  /* =====================================================
     POLL
  ===================================================== */

  const addPollOption = () => {
    if (pollOptions.length >= 4) return;

    setPollOptions((prev) => [
      ...prev,
      "",
    ]);
  };


  const removePollOption = (index) => {
    if (pollOptions.length <= 2) return;

    setPollOptions((prev) =>
      prev.filter(
        (_, i) => i !== index
      )
    );
  };


  const updatePollOption = (
    index,
    value
  ) => {
    setPollOptions((prev) =>
      prev.map((option, i) =>
        i === index
          ? value
          : option
      )
    );
  };


  /* =====================================================
     SUBMIT
  ===================================================== */

  const handleSubmit = (e) => {
    e.preventDefault();

    const nextErrors = {};

    if (!title.trim()) {
      nextErrors.title =
        "Give your post a title.";
    }

    if (!description.trim()) {
      nextErrors.description =
        "Share what's on your mind.";
    }

    const filledOptions =
      pollOptions
        .map((o) => o.trim())
        .filter(Boolean);

    if (attachmentMode === "poll") {

      if (!pollQuestion.trim()) {
        nextErrors.poll =
          "Give your poll a question.";
      }

      if (filledOptions.length < 2) {
        nextErrors.pollOptions =
          "Add at least two options.";
      }
    }

    setErrors(nextErrors);

    if (
      Object.keys(nextErrors).length > 0
    ) {
      return;
    }


    addPost({
      title: title.trim(),

      description:
        description.trim(),

      media:
        attachmentMode === "media"
          ? mediaFiles
          : [],

      poll:
        attachmentMode === "poll"
          ? {
              question:
                pollQuestion.trim(),

              options:
                filledOptions,
            }
          : null,

      category,

      tags,
    });


    navigate("/");
  };


  const mediaIcon = {
    image: ImageIcon,
    video: Video,
    audio: Music,
  };


  return (
    <div className="create-post-page">

      {/* =================================================
          TOP BAR
      ================================================= */}

      <header className="create-post-header">

        <div className="create-post-header-left">

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="create-back-button"
          >
            <ArrowLeft size={18} />
          </button>


          <div className="create-title-icon">
            <Sparkles size={19} />
          </div>


          <div>

            <div className="create-eyebrow">
              INNERVOICE · CREATE
            </div>

            <h1>
              Create something meaningful
            </h1>

          </div>

        </div>


        <div className="create-draft-status">

          <span />

          Draft

        </div>

      </header>


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <form
        onSubmit={handleSubmit}
        className="create-post-layout"
      >

        {/* =================================================
            LEFT — EDITOR
        ================================================= */}

        <section className="create-editor-card">

          <div className="create-card-heading">

            <div>
              <span className="create-section-label">
                YOUR THOUGHT
              </span>

              <h2>
                Express yourself
              </h2>

              <p>
                Share an idea, feeling,
                experience or question.
              </p>
            </div>

            <FileText
              size={21}
              className="create-heading-icon"
            />

          </div>


          {/* TITLE */}

          <div className="create-field">

            <label>
              Title
            </label>

            <div
              className={`create-input-wrapper ${
                errors.title
                  ? "has-error"
                  : ""
              }`}
            >

              <input
                type="text"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                placeholder="Give your thought a title..."
              />

              <span className="character-count">
                {title.length}/100
              </span>

            </div>

            {errors.title && (
              <p className="create-error">
                {errors.title}
              </p>
            )}

          </div>


          {/* DESCRIPTION */}

          <div className="create-field">

            <div className="create-label-row">

              <label>
                What's on your mind?
              </label>

              <span>
                {description.length}/1000
              </span>

            </div>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              maxLength={1000}
              rows={7}
              placeholder="Express yourself freely..."
              className={
                errors.description
                  ? "has-error"
                  : ""
              }
            />

            {errors.description && (
              <p className="create-error">
                {errors.description}
              </p>
            )}

          </div>


          {/* ATTACHMENTS */}

          <div className="create-field">

            <div className="create-label-row">

              <label>
                Add to your post
              </label>

              <span>
                Optional
              </span>

            </div>


            <div className="attachment-selector">

              <button
                type="button"
                onClick={openMediaSection}
                className={`attachment-option ${
                  attachmentMode === "media"
                    ? "active"
                    : ""
                }`}
              >

                <span className="attachment-option-icon">
                  <Film size={17} />
                </span>

                <span>
                  <strong>
                    Media
                  </strong>

                  <small>
                    Photo, video or audio
                  </small>
                </span>

                {attachmentMode ===
                  "media" && (
                  <Check size={15} />
                )}

              </button>


              <button
                type="button"
                onClick={openPollSection}
                className={`attachment-option ${
                  attachmentMode === "poll"
                    ? "active"
                    : ""
                }`}
              >

                <span className="attachment-option-icon">
                  <BarChart3 size={17} />
                </span>

                <span>
                  <strong>
                    Poll
                  </strong>

                  <small>
                    Ask your community
                  </small>
                </span>

                {attachmentMode ===
                  "poll" && (
                  <Check size={15} />
                )}

              </button>

            </div>

          </div>


          {/* =================================================
              MEDIA UPLOAD
          ================================================= */}

          {attachmentMode === "media" && (

            <div className="attachment-panel">

              <div
                className={`media-dropzone ${
                  dragOver
                    ? "drag-active"
                    : ""
                }`}
                onClick={() =>
                  fileInputRef.current?.click()
                }
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() =>
                  setDragOver(false)
                }
                onDrop={(e) => {
                  e.preventDefault();

                  setDragOver(false);

                  handleFiles(
                    e.dataTransfer.files
                  );
                }}
              >

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,video/*,audio/*"
                  className="hidden"
                  onChange={(e) => {
                    handleFiles(
                      e.target.files
                    );

                    e.target.value = "";
                  }}
                />


                <div className="upload-icon">
                  <Upload size={22} />
                </div>


                <h3>
                  Drop your files here
                </h3>

                <p>
                  or click to browse
                </p>

                <span>
                  Images · Video · Audio
                  <br />
                  Maximum {MAX_FILES} files
                </span>

              </div>


              {/* MEDIA PREVIEW */}

              {mediaFiles.length > 0 && (

                <div className="media-preview-grid">

                  {mediaFiles.map((m) => {

                    const Icon =
                      mediaIcon[m.type];

                    return (

                      <div
                        key={m.id}
                        className="media-preview"
                      >

                        {m.type ===
                          "image" && (
                          <img
                            src={m.url}
                            alt={m.name}
                          />
                        )}


                        {m.type ===
                          "video" && (
                          <video
                            src={m.url}
                            muted
                          />
                        )}


                        {m.type ===
                          "audio" && (

                          <div className="audio-preview">

                            <Music size={24} />

                            <span>
                              Audio
                            </span>

                          </div>

                        )}


                        <div className="media-preview-overlay">

                          <span>
                            <Icon size={11} />
                            {m.type}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              removeMedia(
                                m.id
                              )
                            }
                          >
                            <X size={13} />
                          </button>

                        </div>

                      </div>

                    );
                  })}

                </div>

              )}

            </div>
          )}


          {/* =================================================
              POLL
          ================================================= */}

          {attachmentMode === "poll" && (

            <div className="poll-builder">

              <div className="poll-builder-header">

                <div className="poll-builder-icon">
                  <BarChart3 size={18} />
                </div>

                <div>

                  <strong>
                    Build your poll
                  </strong>

                  <span>
                    Ask your community a question
                  </span>

                </div>

              </div>


              <div className="poll-question-field">

                <label>
                  Question
                </label>

                <input
                  type="text"
                  value={pollQuestion}
                  onChange={(e) =>
                    setPollQuestion(
                      e.target.value
                    )
                  }
                  placeholder="What do you think?"
                  className={
                    errors.poll
                      ? "has-error"
                      : ""
                  }
                />

                {errors.poll && (
                  <p className="create-error">
                    {errors.poll}
                  </p>
                )}

              </div>


              <div className="poll-options-field">

                <label>
                  Options
                </label>


                {pollOptions.map(
                  (option, index) => (

                    <div
                      key={index}
                      className="poll-option-row"
                    >

                      <span>
                        {index + 1}
                      </span>

                      <input
                        type="text"
                        value={option}
                        onChange={(e) =>
                          updatePollOption(
                            index,
                            e.target.value
                          )
                        }
                        placeholder={`Option ${
                          index + 1
                        }`}
                      />


                      {pollOptions.length >
                        2 && (

                        <button
                          type="button"
                          onClick={() =>
                            removePollOption(
                              index
                            )
                          }
                        >
                          <X size={15} />
                        </button>

                      )}

                    </div>

                  )
                )}


                {errors.pollOptions && (
                  <p className="create-error">
                    {errors.pollOptions}
                  </p>
                )}


                {pollOptions.length < 4 && (

                  <button
                    type="button"
                    onClick={addPollOption}
                    className="add-poll-option"
                  >
                    <Plus size={15} />
                    Add another option
                  </button>

                )}

              </div>

            </div>
          )}

        </section>


        {/* =================================================
            RIGHT — SETTINGS
        ================================================= */}

        <aside className="create-settings">

          {/* CATEGORY */}

          <div className="settings-card">

            <div className="settings-card-heading">

              <div>
                <span>
                  01
                </span>

                <h3>
                  Category
                </h3>
              </div>

            </div>


            <p className="settings-description">
              Help people discover your
              post.
            </p>


            <div className="category-list">

              {CATEGORIES.map((c) => (

                <button
                  type="button"
                  key={c}
                  onClick={() =>
                    setCategory(c)
                  }
                  className={`category-option ${
                    category === c
                      ? "selected"
                      : ""
                  }`}
                >

                  <span>
                    {c}
                  </span>

                  {category === c && (
                    <Check size={14} />
                  )}

                </button>

              ))}

            </div>

          </div>


          {/* TAGS */}

          <div className="settings-card">

            <div className="settings-card-heading">

              <div>
                <span>
                  02
                </span>

                <h3>
                  Tags
                </h3>
              </div>

              <Hash
                size={18}
                className="settings-icon"
              />

            </div>


            <p className="settings-description">
              Add keywords to make your
              thought easier to find.
            </p>


            <input
              type="text"
              value={tagsInput}
              onChange={(e) =>
                setTagsInput(
                  e.target.value
                )
              }
              placeholder="mindfulness, life, peace"
              className="settings-input"
            />


            {tags.length > 0 && (

              <div className="selected-tags">

                {tags.map((tag) => (

                  <span key={tag}>
                    #{tag}
                  </span>

                ))}

              </div>

            )}

          </div>


          {/* PREVIEW */}

          <div className="create-preview-card">

            <div className="preview-top">

              <Sparkles size={14} />

              <span>
                READY TO SHARE
              </span>

            </div>


            <h3>
              Your voice matters.
            </h3>

            <p>
              Your post will appear in
              the community feed once
              published.
            </p>


            <div className="preview-info">

              <span>
                <Check size={12} />
                {category}
              </span>

              {tags.length > 0 && (
                <span>
                  <Hash size={11} />
                  {tags.length} tags
                </span>
              )}

            </div>

          </div>

        </aside>

      </form>


      {/* =================================================
          BOTTOM ACTION BAR
      ================================================= */}

      <div className="create-action-bar">

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="create-cancel-button"
        >
          Cancel
        </button>


        <button
          type="button"
          onClick={handleSubmit}
          className="create-publish-button"
        >
          <Send size={16} />
          Publish Post
        </button>

      </div>

    </div>
  );
}