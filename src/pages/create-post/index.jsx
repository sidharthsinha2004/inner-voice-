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
} from "lucide-react";

import { useAppData } from "../../context/AppDataContext";

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

  // A post carries at most one attachment: media OR a poll.
  const [attachmentMode, setAttachmentMode] = useState("none"); // "none" | "media" | "poll"
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState(["", ""]);

  const tags = tagsInput
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const clearMedia = () => {
    mediaFiles.forEach((m) => URL.revokeObjectURL(m.url));
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

  const addPollOption = () => {
    if (pollOptions.length >= 4) return;
    setPollOptions((prev) => [...prev, ""]);
  };

  const removePollOption = (index) => {
    if (pollOptions.length <= 2) return;
    setPollOptions((prev) => prev.filter((_, i) => i !== index));
  };

  const updatePollOption = (index, value) => {
    setPollOptions((prev) => prev.map((o, i) => (i === index ? value : o)));
  };

  const handleFiles = (fileList) => {
    const files = Array.from(fileList || []);
    if (!files.length) return;

    if (mediaFiles.length + files.length > MAX_FILES) {
      showToast(`You can attach up to ${MAX_FILES} files`);
    }

    const room = Math.max(0, MAX_FILES - mediaFiles.length);
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
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        type,
        url: URL.createObjectURL(file),
        name: file.name,
      });
    });

    if (accepted.length) {
      setMediaFiles((prev) => [...prev, ...accepted]);
    }
    if (rejected.length) {
      showToast(`Unsupported file type: ${rejected.join(", ")}`);
    }
  };

  const removeMedia = (id) => {
    setMediaFiles((prev) => {
      const target = prev.find((m) => m.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((m) => m.id !== id);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nextErrors = {};
    if (!title.trim()) nextErrors.title = "Give your post a title.";
    if (!description.trim())
      nextErrors.description = "Share what's on your mind.";

    const filledOptions = pollOptions.map((o) => o.trim()).filter(Boolean);
    if (attachmentMode === "poll") {
      if (!pollQuestion.trim())
        nextErrors.poll = "Give your poll a question.";
      if (filledOptions.length < 2)
        nextErrors.pollOptions = "Add at least two options.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    addPost({
      title: title.trim(),
      description: description.trim(),
      media: attachmentMode === "media" ? mediaFiles : [],
      poll:
        attachmentMode === "poll"
          ? { question: pollQuestion.trim(), options: filledOptions }
          : null,
      category,
      tags,
    });
    navigate("/");
  };

  const mediaIcon = { image: ImageIcon, video: Video, audio: Music };

  return (
    <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-sm p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-1">
        <Sparkles className="text-[var(--accent)] dark:text-[var(--accent-text-dark)]" size={22} />
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-50">
          Create Post
        </h1>
      </div>
      <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">
        Share what's on your mind — it'll show up in the feed right away.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-stone-700 dark:text-stone-200 mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your thought a title..."
            className={`w-full bg-stone-100 dark:bg-stone-800 rounded-2xl px-4 py-3 text-sm outline-none text-stone-800 dark:text-stone-100 placeholder:text-stone-400 border ${
              errors.title
                ? "border-red-400"
                : "border-transparent focus:border-[var(--accent)]"
            } transition`}
          />
          {errors.title && (
            <p className="text-xs text-red-500 mt-1">{errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-stone-700 dark:text-stone-200 mb-2">
            What's on your mind?
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            placeholder="Express yourself freely..."
            className={`w-full bg-stone-100 dark:bg-stone-800 rounded-2xl px-4 py-3 text-sm outline-none text-stone-800 dark:text-stone-100 placeholder:text-stone-400 border resize-none ${
              errors.description
                ? "border-red-400"
                : "border-transparent focus:border-[var(--accent)]"
            } transition`}
          />
          {errors.description && (
            <p className="text-xs text-red-500 mt-1">{errors.description}</p>
          )}
        </div>

        {/* Attachment type toggle */}
        <div>
          <label className="block text-sm font-semibold text-stone-700 dark:text-stone-200 mb-2">
            Add to your post{" "}
            <span className="text-stone-400 font-normal">(optional)</span>
          </label>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={openMediaSection}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition ${
                attachmentMode === "media"
                  ? "bg-[var(--accent)] text-white"
                  : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700"
              }`}
            >
              <Film size={16} />
              Media
            </button>

            <button
              type="button"
              onClick={openPollSection}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition ${
                attachmentMode === "poll"
                  ? "bg-[var(--accent)] text-white"
                  : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700"
              }`}
            >
              <BarChart3 size={16} />
              Poll
            </button>
          </div>
        </div>

        {/* Media upload */}
        {attachmentMode === "media" && (
        <div>
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              handleFiles(e.dataTransfer.files);
            }}
            className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition ${
              dragOver
                ? "border-[var(--accent)] bg-[var(--accent-soft)] dark:bg-stone-800"
                : "border-stone-300 dark:border-stone-700 hover:border-[var(--accent)] hover:bg-stone-50 dark:hover:bg-stone-800/60"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*,audio/*"
              className="hidden"
              onChange={(e) => {
                handleFiles(e.target.files);
                e.target.value = "";
              }}
            />

            <Upload
              size={26}
              className="mx-auto text-stone-400 dark:text-stone-500 mb-3"
            />
            <p className="text-sm font-semibold text-stone-700 dark:text-stone-200">
              Drag & drop files, or click to upload
            </p>
            <p className="text-xs text-stone-400 mt-1">
              Images, video, or audio — up to {MAX_FILES} files
            </p>
          </div>

          {mediaFiles.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
              {mediaFiles.map((m) => {
                const Icon = mediaIcon[m.type];
                return (
                  <div
                    key={m.id}
                    className="relative rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800"
                  >
                    {m.type === "image" && (
                      <img
                        src={m.url}
                        alt={m.name}
                        className="w-full h-28 object-cover"
                      />
                    )}
                    {m.type === "video" && (
                      <video
                        src={m.url}
                        className="w-full h-28 object-cover bg-black"
                        muted
                      />
                    )}
                    {m.type === "audio" && (
                      <div className="h-28 flex flex-col items-center justify-center gap-2 px-2">
                        <Icon
                          size={22}
                          className="text-[var(--accent)] dark:text-[var(--accent-text-dark)]"
                        />
                        <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate w-full text-center px-1">
                          {m.name}
                        </p>
                      </div>
                    )}

                    <span className="absolute bottom-1.5 left-1.5 flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-stone-900/60 text-white uppercase">
                      <Icon size={10} />
                      {m.type}
                    </span>

                    <button
                      type="button"
                      onClick={() => removeMedia(m.id)}
                      className="absolute top-1.5 right-1.5 p-1 rounded-full bg-stone-900/60 text-white hover:bg-stone-900/80 transition"
                      aria-label={`Remove ${m.name}`}
                    >
                      <X size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        )}

        {/* Poll builder */}
        {attachmentMode === "poll" && (
          <div className="rounded-2xl border border-stone-200 dark:border-stone-800 p-5 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-stone-700 dark:text-stone-200 mb-2">
                Poll question
              </label>
              <input
                type="text"
                value={pollQuestion}
                onChange={(e) => setPollQuestion(e.target.value)}
                placeholder="Ask something..."
                className={`w-full bg-stone-100 dark:bg-stone-800 rounded-2xl px-4 py-3 text-sm outline-none text-stone-800 dark:text-stone-100 placeholder:text-stone-400 border ${
                  errors.poll
                    ? "border-red-400"
                    : "border-transparent focus:border-[var(--accent)]"
                } transition`}
              />
              {errors.poll && (
                <p className="text-xs text-red-500 mt-1">{errors.poll}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 dark:text-stone-200 mb-2">
                Options
              </label>

              <div className="space-y-2">
                {pollOptions.map((opt, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => updatePollOption(i, e.target.value)}
                      placeholder={`Option ${i + 1}`}
                      className="flex-1 bg-stone-100 dark:bg-stone-800 rounded-xl px-4 py-2.5 text-sm outline-none text-stone-800 dark:text-stone-100 placeholder:text-stone-400 border border-transparent focus:border-[var(--accent)] transition"
                    />
                    {pollOptions.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removePollOption(i)}
                        className="p-2 rounded-full text-stone-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition"
                        aria-label={`Remove option ${i + 1}`}
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {errors.pollOptions && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.pollOptions}
                </p>
              )}

              {pollOptions.length < 4 && (
                <button
                  type="button"
                  onClick={addPollOption}
                  className="flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] hover:underline mt-3"
                >
                  <Plus size={16} />
                  Add option
                </button>
              )}
            </div>
          </div>
        )}

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-stone-700 dark:text-stone-200 mb-2">
            Category
          </label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  category === c
                    ? "bg-[var(--accent)] text-white"
                    : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-semibold text-stone-700 dark:text-stone-200 mb-2">
            Tags <span className="text-stone-400 font-normal">(comma separated)</span>
          </label>
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="Mindfulness, Peace, Life"
            className="w-full bg-stone-100 dark:bg-stone-800 rounded-2xl px-4 py-3 text-sm outline-none text-stone-800 dark:text-stone-100 placeholder:text-stone-400 border border-transparent focus:border-[var(--accent)] transition"
          />

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-3 py-1.5 rounded-full bg-[var(--accent-soft)] dark:bg-stone-800 text-[var(--accent)] dark:text-[var(--accent-text-dark)]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-5 py-3 rounded-full text-sm font-semibold text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 rounded-full text-sm font-semibold bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition"
          >
            Share Post
          </button>
        </div>
      </form>
    </div>
  );
}
