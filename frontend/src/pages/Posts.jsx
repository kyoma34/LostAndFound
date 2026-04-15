import { useState, useRef } from "react";
import { createPost } from "../api/posts";
import { useNavigate } from "react-router-dom";
import "../index.css";
import Navbar from "../components/Navbar";

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="17" height="17">
        <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/>
        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
      </svg>
    ),
    title: "Easy Upload",
    desc: "Upload photos and details in just a few clicks",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="17" height="17">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Secure & Private",
    desc: "Your information is protected and secure",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="17" height="17">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    title: "Quick Match",
    desc: "Connect with owners faster through our platform",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="17" height="17">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: "Real-time Updates",
    desc: "Get notified when someone claims the item",
  },
];

const categories = [
  "Electronics", "Jewelry & Watches", "Bags & Wallets", "Keys",
  "Documents & IDs", "Clothing", "Toys & Games", "Books", "Other",
];

export default function Posts() {
  const [title, setTitle]           = useState("");
  const [category, setCategory]     = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation]     = useState("");
  const [photos, setPhotos]         = useState([]); // { file, preview }
  const [dragOver, setDragOver]     = useState(false);
  const [published, setPublished]   = useState(false);
  const fileInputRef = useRef(null);
  

  const handleFiles = (files) => {
    const validFiles = Array.from(files)
      .filter((f) => f.type === "image/png" || f.type === "image/jpeg")
      .slice(0, 5 - photos.length);

    const filesWithPreview = validFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setPhotos((p) => [...p, ...filesWithPreview].slice(0, 5));

    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const removePhoto = (i) => setPhotos((p) => p.filter((_, idx) => idx !== i));
  const handlePublish = async () => {
    if (!title || !category || !description || !location) return;

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("desc", description);
      formData.append("type", category);
      formData.append("date", new Date().toISOString());
      formData.append("location", location);

      // submit the currently selected preview image, not the raw file input list
      if (photos.length > 0 && photos[0].file) {
        formData.append("image", photos[0].file);
      }

      await createPost(formData);

      setPublished(true);
    } catch (err) {
      console.error(err);
      alert("Error while publishing");
    }
  };
const navigate = useNavigate();
  const handleReset = () => { setTitle(""); setCategory(""); setDescription(""); setLocation(""); setPhotos([]); setPublished(false); };

  return (

    

    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #2563eb 0%, #60a5fa 55%, #bfdbfe 100%)" }} className="mt-16">
      <Navbar />

      <div className="page">
        <button className="go-back" onClick={() => navigate("/home")}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
          Go Back
        </button>

        <div className="card-wrap">
          {/* Sidebar */}
          <aside className="sidebar">
            <h1 className="sidebar-title">Post a Found Item</h1>
            <p className="sidebar-sub">
              Help reunite lost items with their owners. Your contribution makes a difference in someone's day.
            </p>
            <div className="features">
              {features.map((f) => (
                <div className="feature" key={f.title}>
                  <div className="feature-icon">{f.icon}</div>
                  <div className="feature-text">
                    <h4>{f.title}</h4>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Form panel */}
          <div className="form-panel">
            {published ? (
              <div className="success">
                <div className="success-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="30" height="30">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3>Item Published!</h3>
                <p>Your found item has been posted. We'll notify you when someone claims it.</p>
                <button onClick={handleReset}>Post Another Item</button>
              </div>
            ) : (
              <>
                <div className="form-header">
                  <h2><span className="accent">Item</span> Details</h2>
                  <p>Fill in the information about the item you found</p>
                </div>

                <div className="form">
                  {/* Title */}
                  <div className="field">
                    <label className="label">Title <span className="req">*</span></label>
                    <input className="input" placeholder="e.g., iPhone 14 Pro" value={title} onChange={(e) => setTitle(e.target.value)} />
                  </div>

                  {/* Category */}
                  <div className="field">
                    <label className="label">Category <span className="req">*</span></label>
                    <select className={`select${category ? " has-value" : ""}`} value={category} onChange={(e) => setCategory(e.target.value)}>
                      <option value="">Select a category</option>
                      {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  {/* Description */}
                  <div className="field">
                    <label className="label">Description <span className="req">*</span></label>
                    <textarea className="textarea" placeholder="Provide detailed information..." value={description} onChange={(e) => setDescription(e.target.value)} />
                  </div>

                  {/* Location */}
                  <div className="field">
                    <label className="label">Location <span className="req">*</span></label>
                    <div className="loc-wrap">
                      <span className="loc-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                      </span>
                      <input className="input" placeholder="Where did you find this?" value={location} onChange={(e) => setLocation(e.target.value)} />
                    </div>
                  </div>

                  {/* Photos */}
                  <div className="field">
                    <label className="label">Photos</label>
                    <div
                      className={`dropzone${dragOver ? " over" : ""}`}
                      onClick={() => fileInputRef.current.click()}
                      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={handleDrop}
                    >
                      <div className="upload-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                          <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/>
                          <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
                        </svg>
                      </div>
                      <p>Click to upload</p>
                      <span>PNG, JPG (Max 5 photos)</span>
                      <input ref={fileInputRef} type="file" accept="image/png,image/jpeg" multiple style={{ display: "none" }} onChange={(e) => handleFiles(e.target.files)} />
                    </div>
                    {photos.length > 0 && (
                      <div className="photo-grid">
                        {photos.map((photo, i) => (
                          <div className="photo-thumb" key={i}>
                            <img src={photo.preview} alt={`upload-${i}`} />
                            <button className="photo-remove" onClick={() => removePhoto(i)}>✕</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="actions">
                    <button className="btn-publish" onClick={handlePublish}>Publish</button>
                    <button className="btn-cancel" onClick={() => navigate("/posts")}>Cancel</button>
                    <button className="btn-draft">Save Draft</button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}