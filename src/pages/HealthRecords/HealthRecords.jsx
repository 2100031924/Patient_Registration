import { useNavigate } from "react-router-dom";
import { useForm } from "../../context/FormContext";
import { useState, useRef, useEffect } from "react";
import {
  buildUploadItem,
  removeUploadItem,
  renameUploadItem,
  updateUploadItem,
} from "../../utils/fileUploadHelpers";
import { FaCloudUploadAlt, FaFilePdf } from "react-icons/fa";
import { FiCheckCircle, FiFileText, FiActivity, FiLayers, FiEdit2, FiTrash2, FiLoader } from "react-icons/fi";
import { MdOutlineMedicalServices } from "react-icons/md";
import "./HealthRecords.css";

export default function HealthRecords() {
  const navigate = useNavigate();
  const { formData, updateForm, markStepComplete } = useForm();
  const [dragOver, setDragOver] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [tempName, setTempName] = useState("");
  const fileInputRef = useRef(null);

  const handleFiles = (files) => {
    if (!files || files.length === 0) return;
    const fileList = Array.from(files);

    const updatedRecords = [...(formData.healthRecords || [])];

    fileList.forEach((file) => {
      const { item: newRecord, error } = buildUploadItem({
        file,
        prefix: "rec",
        maxSizeMB: 20,
      });

      if (error) {
        alert(error);
        return;
      }

      updatedRecords.push(newRecord);

      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 20) + 12;
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(interval);
          updateForm({
            healthRecords: updateUploadItem(updatedRecords, newRecord.id, () => ({
              progress: 100,
              status: "success",
            })),
          });
        } else {
          updateForm({
            healthRecords: updateUploadItem(updatedRecords, newRecord.id, () => ({
              progress: currentProgress,
            })),
          });
        }
      }, 250);
    });

    updateForm({ healthRecords: updatedRecords });
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const deleteRecord = (id) => {
    updateForm({ healthRecords: removeUploadItem(formData.healthRecords || [], id) });
  };

  const startRename = (id, name) => {
    setEditingId(id);
    setTempName(name);
  };

  const saveRename = (id) => {
    if (!tempName.trim()) return;
    updateForm({
      healthRecords: renameUploadItem(formData.healthRecords || [], id, tempName),
    });
    setEditingId(null);
  };

  useEffect(() => {
    markStepComplete("/register/health-records", true);
  }, [markStepComplete]);

  return (
    <div className="records-container">
      <div className="records-upload-panel">
        <label className="records-label">Upload your health records</label>

        <div
          className={`records-drag-box ${dragOver ? "dragover" : ""}`}
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
          <FaCloudUploadAlt className="cloud-upload-icon" />
          <div className="upload-prompt">
            <p>
              Drag and drop your health records here, or <span className="browse-link">browse</span>
            </p>
            <span className="upload-hint">JPG, PNG or PDF (Max. 20MB)</span>
          </div>
        </div>

        {formData.healthRecords && formData.healthRecords.length > 0 && (
          <div className="records-file-list-section">
            <h4 className="records-total-title">Uploaded Files ({formData.healthRecords.length})</h4>
            <div className="records-cards-view-grid">
              {formData.healthRecords.map((rec) => (
                <div key={rec.id} className="record-preview-card">
                  <div className="record-card-media-box">
                    {rec.preview ? (
                      <img src={rec.preview} alt={rec.name} className="record-preview-img" />
                    ) : (
                      <div className="record-pdf-fallback-box">
                        <FaFilePdf className="pdf-art-icon" />
                        <span className="pdf-badge">{rec.type}</span>
                      </div>
                    )}
                  </div>

                  <div className="record-card-meta-details">
                    <div className="record-title-line">
                      {editingId === rec.id ? (
                        <input
                          type="text"
                          value={tempName}
                          onChange={(e) => setTempName(e.target.value)}
                          onBlur={() => saveRename(rec.id)}
                          onKeyDown={(e) => e.key === "Enter" && saveRename(rec.id)}
                          className="rename-inline-input"
                          autoFocus
                        />
                      ) : (
                        <div className="rename-label-wrapper">
                          <span className="record-display-name" title={rec.name}>{rec.name}</span>
                          <button
                            type="button"
                            className="inline-rename-edit-btn"
                            onClick={(e) => { e.stopPropagation(); startRename(rec.id, rec.name); }}
                          >
                            <FiEdit2 />
                          </button>
                        </div>
                      )}
                    </div>
                    <span className="record-file-subtitle-specs">{rec.type} &bull; {rec.size}</span>

                    <div className="record-action-progress-footer-row">
                      {rec.status === "uploading" ? (
                        <div className="record-track-row">
                          <div className="record-track-specs">
                            <FiLoader className="spinning-loader" />
                            <span>{rec.progress}%</span>
                          </div>
                          <div className="record-bar-container">
                            <div className="record-bar-progress" style={{ width: `${rec.progress}%` }} />
                          </div>
                          <button
                            type="button"
                            className="inline-delete-bin-btn"
                            onClick={() => deleteRecord(rec.id)}
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      ) : (
                        <div className="record-success-row">
                          <div className="success-tag-indicator">
                            <FiCheckCircle className="green-checkmark-ico" />
                            <span>Upload Successful!</span>
                          </div>
                          <button
                            type="button"
                            className="inline-delete-bin-btn"
                            onClick={() => deleteRecord(rec.id)}
                          >
                            <FiTrash2 className="trash-bin-red" />
                            <span className="trash-label-txt">Delete</span>
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

        <div className="supported-section">
          <h5>Supported Documents</h5>
          <div className="supported-chips">
            <div className="chip">
              <MdOutlineMedicalServices className="chip-icon" />
              <span>Prescription</span>
            </div>
            <div className="chip">
              <FiActivity className="chip-icon" />
              <span>Lab reports</span>
            </div>
            <div className="chip">
              <FiLayers className="chip-icon" />
              <span>Scan</span>
            </div>
            <div className="chip">
              <FiFileText className="chip-icon" />
              <span>Discharge summary</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-actions">
        <button className="secondary-skip-btn" onClick={() => navigate("/register/review")}>
          Skip for now
        </button>
        <div className="right-group">
          <button className="plain-back-btn" onClick={() => navigate("/register/insurance")}>
            Go Back
          </button>
          <button className="primary-dark-btn" onClick={() => navigate("/register/review")}>
            Create Unique ID
          </button>
        </div>
      </div>
    </div>
  );
}
