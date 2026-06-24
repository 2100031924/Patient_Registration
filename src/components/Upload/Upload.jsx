import { useState, useRef } from "react";
import "./Upload.css";
import { FaCloudUploadAlt, FaFileAlt, FaTimes } from "react-icons/fa";

const Upload = ({ label, accept = ".pdf,.jpg,.jpeg,.png", maxSize = 5, onFileSelect }) => {
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    const sizeMB = selectedFile.size / (1024 * 1024);
    if (sizeMB > maxSize) {
      alert(`File size must be less than ${maxSize}MB`);
      return;
    }

    setFile(selectedFile);
    if (onFileSelect) onFileSelect(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (onFileSelect) onFileSelect(null);
  };

  return (
    <div className="upload-field">
      {label && <label className="upload-label">{label}</label>}

      <div
        className={`upload-area ${dragOver ? "drag-over" : ""} ${file ? "has-file" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => !file && fileInputRef.current?.click()}
      >
        {file ? (
          <div className="file-preview">
            <FaFileAlt className="file-icon" />
            <div className="file-info">
              <span className="file-name">{file.name}</span>
              <span className="file-size">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
            </div>
            <button className="file-remove" onClick={(e) => { e.stopPropagation(); removeFile(); }}>
              <FaTimes />
            </button>
          </div>
        ) : (
          <div className="upload-placeholder">
            <FaCloudUploadAlt className="upload-icon" />
            <p>Drag & drop or <span className="browse">browse</span> to upload</p>
            <span className="upload-hint">Supported: {accept.replace(/\./g, "").toUpperCase()}</span>
          </div>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        accept={accept}
        onChange={handleChange}
        hidden
      />
    </div>
  );
};

export default Upload;
