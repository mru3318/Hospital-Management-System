import React, { useState } from "react";

const AddRoom = () => {
  const [formData, setFormData] = useState({
    roomNo: "",
    roomName: "",
    roomType: "",
    floor: "",
    status: "",
    pricePerDay: "",
    description: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // simple form validation
    const { roomNo, roomName, roomType, floor, status, pricePerDay } = formData;
    if (
      !roomNo ||
      !roomName ||
      !roomType ||
      !floor ||
      !status ||
      !pricePerDay
    ) {
      setError(true);
      setSuccess(false);
      return;
    }

    setSuccess(true);
    setError(false);

    // Reset form
    setFormData({
      roomNo: "",
      roomName: "",
      roomType: "",
      floor: "",
      status: "",
      pricePerDay: "",
      description: "",
    });
  };

  return (
    <div className="container my-4 p-0 m-0">
      <div className="card-border shadow-sm border rounded">
        {/* Header */}
        <div className="card-header bg-light d-flex justify-content-center align-items-center">
          <div className="text-center d-flex align-items-center">
            <i className="fa-solid fa-file-medical me-2 "></i>
            <span className="fw-semibold fs-5">Add Room</span>
          </div>
        </div>

        {/* Success / Error Alerts */}
        <div className="container-fluid mt-4">
          {success && (
            <div
              className="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              <i className="fa-solid fa-circle-check me-1"></i>
              Room added successfully!
              <button
                type="button"
                className="btn-close"
                onClick={() => setSuccess(false)}
              ></button>
            </div>
          )}

          {error && (
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              <i className="fa-solid fa-triangle-exclamation me-1"></i>
              Something went wrong! Please fill all required fields.
              <button
                type="button"
                className="btn-close"
                onClick={() => setError(false)}
              ></button>
            </div>
          )}
        </div>

        {/* Form */}
        <form className="container-fluid mt-3" onSubmit={handleSubmit}>
          {/* Room No */}
          <div className="mb-3">
            <label htmlFor="roomNo" className="form-label">
              Room No <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              className="form-control"
              id="roomNo"
              name="roomNo"
              placeholder="Enter Room Number"
              value={formData.roomNo}
              onChange={handleChange}
              required
            />
          </div>

          {/* Room Name */}
          <div className="mb-3">
            <label htmlFor="roomName" className="form-label">
              Room Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="roomName"
              name="roomName"
              placeholder="Enter Room Name"
              value={formData.roomName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Room Type */}
          <div className="mb-3">
            <label htmlFor="roomType" className="form-label">
              Room Type <span className="text-danger">*</span>
            </label>
            <select
              className="form-select"
              id="roomType"
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Room Type --</option>
              <option>General Ward</option>
              <option>ICU</option>
              <option>Private Room</option>
              <option>Deluxe Room</option>
            </select>
          </div>

          {/* Floor */}
          <div className="mb-3">
            <label htmlFor="floor" className="form-label">
              Select Floor <span className="text-danger">*</span>
            </label>
            <select
              className="form-select"
              id="floor"
              name="floor"
              value={formData.floor}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Floor --</option>
              <option value="1">1st Floor</option>
              <option value="2">2nd Floor</option>
              <option value="3">3rd Floor</option>
              <option value="4">4th Floor</option>
              <option value="5">5th Floor</option>
            </select>
          </div>

          {/* Status */}
          <div className="mb-3">
            <label htmlFor="status" className="form-label">
              Status <span className="text-danger">*</span>
            </label>
            <select
              className="form-select"
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="">Select Status</option>
              <option>Available</option>
              <option>Occupied</option>
              <option>Maintenance</option>
            </select>
          </div>

          {/* Price Per Day */}
          <div className="mb-3">
            <label htmlFor="pricePerDay" className="form-label">
              Price Per Day <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              className="form-control"
              id="pricePerDay"
              name="pricePerDay"
              placeholder="Enter Price (₹)"
              min="0"
              value={formData.pricePerDay}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              placeholder="Enter Description (optional)"
              rows="3"
              maxLength="200"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="d-flex justify-content-center mb-3">
            <button type="submit" className="btn btn-primary px-4">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRoom;
