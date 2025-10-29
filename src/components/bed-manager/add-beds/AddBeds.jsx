import React, { useState } from "react";
import "./AddBeds.css";

const AddBeds = () => {
  const [bedNumber, setBedNumber] = useState("");
  const [roomType, setRoomType] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (bedNumber.trim() === "" || roomType === "") {
      setError(true);
      setSuccess(false);
      return;
    }

    // Simulate a successful submission
    setSuccess(true);
    setError(false);

    // Reset form
    setBedNumber("");
    setRoomType("");
  };

  return (
    <div className="container my-4 p-0 m-0">
      <div className="card-border shadow-sm border rounded">
        {/* Header */}
        <div className="card-header bg-light d-flex justify-content-center align-items-center">
          <i className="fa-solid fa-file-medical fa-lg me-2 "></i>
          <h3 className="mb-0">Add Beds</h3>
        </div>

        {/* Success / Error Messages */}
        {success && (
          <div
            className="alert alert-success alert-dismissible fade show mt-3"
            role="alert"
          >
            <i className="fa-solid fa-circle-check me-1"></i>
            Bed added successfully!
            <button
              type="button"
              className="btn-close"
              onClick={() => setSuccess(false)}
              aria-label="Close"
            ></button>
          </div>
        )}

        {error && (
          <div
            className="alert alert-danger alert-dismissible fade show mt-3"
            role="alert"
          >
            <i className="fa-solid fa-triangle-exclamation me-1"></i>
            Error adding bed! Please fill all required fields.
            <button
              type="button"
              className="btn-close"
              onClick={() => setError(false)}
              aria-label="Close"
            ></button>
          </div>
        )}

        {/* Add Bed Form */}
        <div className="container-fluid my-4">
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Bed Number */}
              <div className="col-md-12 mb-3">
                <label htmlFor="bedNumber" className="form-label fw-semibold">
                  Bed No <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="bedNumber"
                  name="bedNumber"
                  className="form-control"
                  placeholder="Enter Bed No"
                  value={bedNumber}
                  onChange={(e) => setBedNumber(e.target.value)}
                  required
                />
                <div className="invalid-feedback">
                  Please enter a valid bed number.
                </div>
              </div>

              {/* Room Type */}
              <div className="col-md-6 mb-3">
                <label htmlFor="roomType" className="form-label fw-semibold">
                  Room <span className="text-danger">*</span>
                </label>
                <select
                  id="roomType"
                  name="roomId"
                  className="form-select"
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  required
                >
                  <option value="">-- Select Room Type --</option>
                  <option value="1">ICU Room</option>
                  <option value="2">General Ward</option>
                  <option value="3">Private Room</option>
                </select>
                <div className="invalid-feedback">
                  Please select a room type.
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="d-flex justify-content-center mb-3">
              <button type="submit" className="btn button px-4">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBeds;
