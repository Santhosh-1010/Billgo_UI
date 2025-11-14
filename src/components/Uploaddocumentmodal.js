import React, { useRef, useState, useEffect } from "react";
import {useSelector } from "react-redux";
const UploadDocumentModal = ({
  open,
  from,
  onClose,
  onSubmit,
  closeOnBackdropClick = false,
}) => {
  const [partitionData, setPartitionData] = useState([]);
  const [fileError, setFileError] = useState("");
  let users = useSelector((state) => state.partitionList?.partitionList);
  const [formData, setFormData] = useState({
    file: null,
    filePath: "",
    description: "",
    partition: "",
    metadata: "",
    isPrivate: false,
    documenttype: "",
    isChecked: false,
  });
  const fileInputRef = useRef();  
  useEffect(() => {
    if (users && users.length > 0) {
      setPartitionData(users);
    }
  }, [users]);  
  if (!open) return null;
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const validExtensions = ["pdf", "csv"];
      const fileExtension = file.name.split(".").pop().toLowerCase();

      if (!validExtensions.includes(fileExtension)) {
        setFileError("PDF or CSV files are allowed.");
        setFormData((prev) => ({ ...prev, file: null, filePath: "" }));
        return;
      }

      setFileError("");
      setFormData((prev) => ({
        ...prev,
        file,
        filePath: file.name,
      }));
    }
  };

  const handleLinkChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      file: value,
      filePath: value,
    }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "partition") {
      setFormData((prev) => ({
        ...prev,
        partition: value,
        metadata: "",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handlePrivacyChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      isPrivate: e.target.checked,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append("description", formData.description);
    formPayload.append("partition_name", formData.partition);
    formPayload.append("partition_metadata", formData.metadata);
    formPayload.append("document_type", formData.documenttype);
    formPayload.append("user_id", sessionStorage.getItem("user_id"));
    formPayload.append("user_role", sessionStorage.getItem("role"));
    formPayload.append("private", formData.isPrivate ? "true" : "false");
    formPayload.append("table", formData.isChecked ? "true" : "false");

    if (from === "document") {
      formPayload.append("file", formData.file);
    } else if (from === "link") {
      const urls = formData.filePath
        .split(",")
        .map((link) => link.trim())
        .filter((link) => link !== "");
      urls.forEach((url) => {
        formPayload.append("urls", url);
      });
    }

    onSubmit(formPayload);
    setFormData({
      file: null,
      filePath: "",
      description: "",
      partition: "",
      metadata: "",
      isPrivate: false,
      documenttype: "",
      isChecked: false,
    });
  };
  const metadataOptions = formData.partition
    ? partitionData.find((item) => item.Partition === formData.partition)
        ?.Partition_value || []
    : [];
  return (
    <div
      className="modal-overlay" 
      onClick={closeOnBackdropClick ? onClose : undefined}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Upload Document</h2>
        <form onSubmit={handleSubmit}>

           {from === "document" && (
          <div className="mb-3 w-50">
            <label className="form-label">
              Upload Type <span className="text-danger">*</span>
            </label>
            <select
              className="form-select"
              name="uploadType"
              value={formData.isChecked ? "table" : "document"}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  isChecked: e.target.value === "table",
                }))
              }
              required
            >
              <option value="document">Document</option>
              <option value="table">Table</option>
            </select>
          </div> )}

          {from === "document" && (
            <div>
              <input
                type="file"
                accept=".pdf,.csv"
                onChange={handleFileChange}
                ref={fileInputRef}
                required
              />
              {fileError && (
                <p style={{ color: "red", marginTop: "4px" }}>{fileError}</p>
              )}
            </div>
          )}

          {from === "link" && (
            <div>
              <label style={labelStyle}>
                Link(s) <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                placeholder="Enter one or more links, separated by commas"
                onChange={handleLinkChange}
                ref={fileInputRef}
                required
                style={inputStyle}
                value={formData.filePath}
              />
            </div>
          )}

          <div>
            <textarea
              name="description"
              placeholder="Description (optional)"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              style={inputStyle}
            />
          </div>

          <div
            style={{ marginTop: "12px", marginBottom: "12px", gap: "10%" }}
            className="d-flex"
          >
            {!formData.isChecked && (
              <label>
                <input
                  type="checkbox"
                  name="isPrivate"
                  checked={formData.isPrivate}
                  onChange={handlePrivacyChange}
                />
                Private
              </label>
            )}
          </div>

          {!formData.isChecked && !formData.isPrivate && (
            <>
              <div>
                <label style={labelStyle}>
                  Partition <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  name="partition"
                  value={formData.partition}
                  onChange={handleInputChange}
                  required
                  style={inputStyle}
                >
                  <option value="">-- Select Partition --</option>
                  {partitionData
                    ?.filter((partition) => {
                      const name = partition.Partition?.trim().toLowerCase();
                      return name !== "chat_history" && name !== "private";
                    })
                    .map((partition) => (
                      <option
                        key={partition.Partition}
                        value={partition.Partition}
                      >
                        {partition.Partition}
                      </option>
                    ))}
                </select>
              </div>
              {formData.partition &&
                (() => {
                  const selectedPartition = partitionData?.find(
                    (p) => p.Partition === formData.partition
                  );
                  return selectedPartition?.Partition_value?.length > 0;
                })() && (
                  <div>
                    <label
                      htmlFor="metadataSelect"
                      className="fw-medium"
                      style={{
                        width: "70px",
                        fontSize: "0.9rem",
                        color: "#333",
                      }}
                    >
                      Metadata
                    </label>
                    <select
                      id="metadataSelect"
                      name="metadata"
                      value={formData.metadata}
                      onChange={handleInputChange}
                      // required
                      style={inputStyle}
                    >
                      <option value="">-- Select --</option>
                      {metadataOptions.map((meta) => (
                        <option key={meta} value={meta}>
                          {meta}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              <div>
                <label>
                  Document Type <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="documenttype"
                  value={formData.documenttype}
                  onChange={handleInputChange}
                  required
                  style={inputStyle}
                />
              </div>
            </>
          )}

          <div className="modal-actions">
            <button
              type="submit"
              disabled={!formData.filePath}
              style={{ backgroundColor: "#135ae8", color: "#fff" }}
            >
              Submit
            </button>
            <button
              type="button"
              style={{ backgroundColor: "#135ae8", color: "#fff" }}
              onClick={() => {
                setFileError("");
                setFormData({
                  file: null,
                  filePath: "",
                  description: "",
                  partition: "",
                  metadata: "",
                  isPrivate: false,
                  documenttype: "",
                  isChecked: false,
                });
                onClose();
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default UploadDocumentModal;
const labelStyle = {
  display: "block",
  marginBottom: "4px",
  fontWeight: "bold",
};
const inputStyle = {
  width: "100%",
  padding: "4px",
  marginBottom: "8px",
  resize: "none",
};
