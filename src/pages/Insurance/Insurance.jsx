import { useNavigate } from "react-router-dom";
import { useForm } from "../../context/FormContext";
import { useState, useRef, useEffect } from "react";
import {
  FiChevronDown,
  FiAlertCircle,
  FiInbox,
  FiCreditCard,
  FiEdit2,
  FiTrash2,
  FiLoader,
  FiSearch,
  FiCheck
} from "react-icons/fi";
import { FaCloudUploadAlt, FaFilePdf } from "react-icons/fa";
import "./Insurance.css";

const INSURANCE_PROVIDERS = [
  "Star Health Insurance",
  "HDFC Ergo Health",
  "Care Health Insurance",
  "Niva Bupa Health Insurance",
  "ICICI Lombard General Insurance",
  "Bajaj Allianz General Insurance",
  "Tata AIG General Insurance",
  "Aditya Birla Health Insurance"
];

export default function Insurance() {
  const navigate = useNavigate();
  const { formData, updateForm, markStepComplete } = useForm();
  const [dragOver, setDragOver] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [tempName, setTempName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredProviders = INSURANCE_PROVIDERS.filter((p) =>
    p.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFiles = (files) => {
    if (!files || files.length === 0) return;
    const fileList = Array.from(files);

    const updatedFiles = [...(formData.insuranceFiles || [])];

    fileList.forEach((file) => {
      const sizeMB = file.size / (1024 * 1024);
      if (sizeMB > 5) {
        alert(`File "${file.name}" exceeds the 5MB size limit.`);
        return;
      }

      const fileId = "ins_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
      const isImg = file.type.startsWith("image/");
      const previewUrl = isImg ? URL.createObjectURL(file) : "";

      const fileExtension = file.name.substring(file.name.lastIndexOf(".") + 1).toUpperCase();

      const newRecord = {
        id: fileId,
        file: file,
        name: file.name.substring(0, file.name.lastIndexOf(".")) || file.name,
        size: formatFileSize(file.size),
        type: fileExtension,
        preview: previewUrl,
        progress: 0,
        status: "uploading",
      };

      updatedFiles.push(newRecord);

      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 25) + 10;
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(interval);
          updateForm({
            insuranceFiles: updatedFiles.map((f) =>
              f.id === fileId ? { ...f, progress: 100, status: "success" } : f
            ),
          });
        } else {
          updateForm({
            insuranceFiles: updatedFiles.map((f) =>
              f.id === fileId ? { ...f, progress: currentProgress } : f
            ),
          });
        }
      }, 300);
    });

    updateForm({ insuranceFiles: updatedFiles });
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeFile = (id) => {
    const filtered = (formData.insuranceFiles || []).filter((f) => f.id !== id);
    updateForm({ insuranceFiles: filtered });
  };

  const startRename = (id, currentName) => {
    setEditingId(id);
    setTempName(currentName);
  };

  const saveRename = (id) => {
    if (!tempName.trim()) return;
    const updated = (formData.insuranceFiles || []).map((f) =>
      f.id === id ? { ...f, name: tempName } : f
    );
    updateForm({ insuranceFiles: updated });
    setEditingId(null);
  };

  useEffect(() => {
    markStepComplete("/insurance", true);
  }, [markStepComplete]);

  return (
    <div className="insurance-container">
      <div className="insurance-form-stack">
        <div className="field">
          <label>Insurance Provider</label>
          <div className="custom-select-container" ref={dropdownRef}>
            <div
              className={`dropdown-trigger-box ${isOpen ? "open" : ""}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <FiInbox className="input-icon" />
              <span className={`trigger-label ${!formData.provider ? "placeholder" : ""}`}>
                {formData.provider || "Select insurance provider (Optional)"}
              </span>
              <FiChevronDown className={`dropdown-chevron-icon ${isOpen ? "rotated" : ""}`} />
            </div>

            {isOpen && (
              <div className="dropdown-panel-flyout">
                <div className="dropdown-search-wrapper">
                  <FiSearch className="dropdown-search-icon" />
                  <input
                    type="text"
                    placeholder="Search insurance provider..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    autoFocus
                  />
                </div>
                <ul className="dropdown-list-container">
                  {filteredProviders.length > 0 ? (
                    filteredProviders.map((provider) => {
                      const isSelected = formData.provider === provider;
                      return (
                        <li
                          key={provider}
                          className={`dropdown-item-option ${isSelected ? "selected" : ""}`}
                          onClick={() => {
                            updateForm({ provider });
                            setIsOpen(false);
                            setSearchTerm("");
                          }}
                        >
                          <span>{provider}</span>
                          {isSelected && <FiCheck className="check-mark-icon" />}
                        </li>
                      );
                    })
                  ) : (
                    <li className="dropdown-no-results-found">No providers found</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="field">
          <label>Customer ID / Policy Number</label>
          <div className="input-wrap">
            <FiCreditCard className="input-icon" />
            <input
              type="text"
              name="policyNumber"
              placeholder="Enter Customer ID or Policy Number (Optional)"
              value={formData.policyNumber}
              onChange={(e) => updateForm({ policyNumber: e.target.value })}
            />
          </div>
        </div>

        <div className="field">
          <label>Upload Insurance Card (Optional)</label>
          <div
            className={`drag-upload-box ${dragOver ? "dragover" : ""}`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              multiple
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={(e) => handleFiles(e.target.files)}
              hidden
            />
            <FaCloudUploadAlt className="cloud-icon" />
            <div className="upload-prompt">
              <p>
                Drag and drop your health records here, or <span className="browse-link">browse</span>
              </p>
              <span className="upload-constraints">JPG, PNG or PDF (Max. 5MB)</span>
            </div>
          </div>
        </div>

        {formData.insuranceFiles && formData.insuranceFiles.length > 0 && (
          <div className="insurance-preview-section">
            <h4 className="preview-heading">Uploaded Cards ({formData.insuranceFiles.length})</h4>
            <div className="insurance-preview-grid">
              {formData.insuranceFiles.map((file) => (
                <div className="insurance-preview-card" key={file.id}>
                  <div className="card-thumbnail-container">
                    {file.preview ? (
                      <img src={file.preview} alt={file.name} className="card-thumbnail-image" />
                    ) : (
                      <div className="card-thumbnail-pdf-fallback">
                        <FaFilePdf className="pdf-type-icon" />
                        <span className="fallback-ext">{file.type}</span>
                      </div>
                    )}
                  </div>

                  <div className="card-details-footer">
                    <div className="card-meta-title-row">
                      {editingId === file.id ? (
                        <div className="rename-input-wrapper">
                          <input
                            type="text"
                            value={tempName}
                            onChange={(e) => setTempName(e.target.value)}
                            onBlur={() => saveRename(file.id)}
                            onKeyDown={(e) => e.key === "Enter" && saveRename(file.id)}
                            autoFocus
                            className="rename-inline-input"
                          />
                        </div>
                      ) : (
                        <div className="rename-label-wrapper">
                          <span className="card-lbl-name" title={file.name}>{file.name}</span>
                          <button
                            type="button"
                            className="inline-edit-btn"
                            onClick={(e) => { e.stopPropagation(); startRename(file.id, file.name); }}
                          >
                            <FiEdit2 />
                          </button>
                        </div>
                      )}
                    </div>
                    <span className="card-lbl-size">{file.type} &bull; {file.size}</span>

                    <div className="card-upload-progress-row">
                      {file.status === "uploading" ? (
                        <div className="upload-progress-track">
                          <span className="progress-text-pct">
                            <FiLoader className="spinning-loader" /> {file.progress}%
                          </span>
                          <div className="progress-bar-bg">
                            <div className="progress-bar-fill" style={{ width: `${file.progress}%` }} />
                          </div>
                          <button
                            type="button"
                            className="cancel-btn-card"
                            onClick={(e) => { e.stopPropagation(); removeFile(file.id); }}
                          >
                            &times; Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="upload-success-state">
                          <span className="upload-success-label">Queued</span>
                          <button
                            type="button"
                            className="delete-card-btn"
                            onClick={(e) => { e.stopPropagation(); removeFile(file.id); }}
                          >
                            <FiTrash2 /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="clarity-banner">
          <FiAlertCircle className="banner-alert-icon" />
          <span>Make sure the card is clear and all details are visible</span>
        </div>
      </div>

      <div className="footer-actions">
        <button className="secondary-skip-btn" onClick={() => navigate("/health-records")}>
          Skip for now
        </button>
        <div className="right-group">
          <button className="plain-back-btn" onClick={() => navigate("/medical-history")}>
            Go Back
          </button>
          <button className="primary-dark-btn" onClick={() => navigate("/health-records")}>
            Upload Health Records
          </button>
        </div>
      </div>
    </div>
  );
}
