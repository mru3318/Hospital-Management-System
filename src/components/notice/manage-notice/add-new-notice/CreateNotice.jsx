import React, { useState } from "react";

const CreateNotice = () => {
  const [filePreview, setFilePreview] = useState(null);
  const [fileName, setFileName] = useState("");

  const previewNewFile = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreview({ type: "image", src: e.target.result });
        setFileName("");
      };
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
      setFileName(file.name);
    }
  };

  return (
    <div className="container-fluid px-4 py-4">
      <div className="card shadow border-0 w-100">
        {/* Header */}
        <div
          className="card-header text-white text-center py-3"
          style={{ backgroundColor: "#01C0C8" }}
        >
          <h4 className="mb-0">
            <i className="fa-solid fa-bullhorn me-2"></i>
            Create New Notice
          </h4>
        </div>

        {/* Body */}
        <div className="card-body p-4">
          <form className="w-100">
            {/* Title and Start Date */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="title" className="form-label fw-semibold">
                  Notice Title <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="noticeTitle"
                  className="form-control"
                  placeholder="Enter notice title"
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="startDate" className="form-label fw-semibold">
                  Start Date <span className="text-danger">*</span>
                </label>
                <input
                  type="datetime-local"
                  id="startDate"
                  name="noticeStartDate"
                  className="form-control"
                  required
                />
              </div>
            </div>

            {/* End Date and Audience */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="endDate" className="form-label fw-semibold">
                  End Date <span className="text-danger">*</span>
                </label>
                <input
                  type="datetime-local"
                  id="endDate"
                  name="noticeEndDate"
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="target" className="form-label fw-semibold">
                  Target Audience <span className="text-danger">*</span>
                </label>
                <select id="target" className="form-select" required>
                  <option value="">Select Audience</option>
                  <option>All Staff</option>
                  <option>Teachers</option>
                  <option>Students</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="mb-3">
              <label htmlFor="description" className="form-label fw-semibold">
                Description <span className="text-danger">*</span>
              </label>
              <textarea
                id="description"
                name="noticeDescription"
                className="form-control"
                rows="6"
                placeholder="Write notice details here..."
                required
              ></textarea>
            </div>

            {/* File Upload */}
            <div className="mb-4">
              <label htmlFor="attachment" className="form-label fw-semibold">
                Attachment
              </label>
              <input
                type="file"
                id="attachment"
                className="form-control"
                accept="image/*,.pdf,.doc,.docx,.txt,.xls,.xlsx"
                onChange={previewNewFile}
              />

              {/* File Preview */}
              {(filePreview || fileName) && (
                <div id="newFilePreview" className="mt-3">
                  <p className="text-muted mb-2">
                    <strong>File Preview:</strong>
                  </p>
                  {filePreview?.type === "image" ? (
                    <img
                      src={filePreview.src}
                      alt="Preview"
                      className="img-thumbnail"
                      style={{ maxWidth: "300px", maxHeight: "200px" }}
                    />
                  ) : (
                    <div className="p-2 bg-light rounded">
                      <i className="fa-regular fa-file-lines me-2"></i>
                      {fileName}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Buttons Centered */}
            <div className="text-center mt-4">
              <button
                type="submit"
                className="btn text-white px-4 me-2"
                style={{ backgroundColor: "#01C0C8" }}
              >
                <i className="fa-solid fa-floppy-disk me-2"></i>
                Save Notice
              </button>
              <a href="/notice-list" className="btn btn-danger px-4">
                Cancel
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNotice;
