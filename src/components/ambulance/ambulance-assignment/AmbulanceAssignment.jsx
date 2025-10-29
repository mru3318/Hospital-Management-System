import React, { useState, useEffect } from "react";

const AmbulanceAssignment = () => {
  const [formData, setFormData] = useState({
    ambulanceId: "",
    driverId: "",
    status: "",
    fromLocation: "",
    toLocation: "",
    startTime: "",
    endTime: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Example static data (replace with API data if needed)
  const ambulanceList = [
    { ambulanceId: 1, vehicleNumber: "MH-31-AB-1234" },
    { ambulanceId: 2, vehicleNumber: "MH-49-ZX-9876" },
  ];

  const driverList = [
    { driverId: 1, driverName: "Ramesh" },
    { driverId: 2, driverName: "Suresh" },
  ];

  const assignmentStatus = ["Available", "On Duty", "Maintenance"];

  // Auto-hide alerts after 3 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000); // 3 seconds
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.ambulanceId ||
      !formData.driverId ||
      !formData.status ||
      !formData.fromLocation ||
      !formData.toLocation ||
      !formData.startTime ||
      !formData.endTime
    ) {
      setError("Please fill in all required fields.");
      setSuccess("");
      return;
    }

    // Example success
    console.log("Submitted Data:", formData);
    setSuccess("Ambulance assignment saved successfully!");
    setError("");
  };

  return (
    <div className="container-fluid mt-5">
      <div className="card shadow-sm border-0">
        {/* Header */}
        <div
          className="card-header text-white text-center py-3"
          style={{ backgroundColor: "#01C0C8", fontSize: "28px" }}
        >
          <i className="fa-solid fa-clipboard me-2"></i> Ambulance Assignment
        </div>

        {/* Body */}
        <div className="card-body p-4">
          {/* Error / Success Messages */}
          {error && (
            <div className="alert alert-danger fw-bold text-center">
              {error}
            </div>
          )}
          {success && (
            <div className="alert alert-success fw-bold text-center">
              {success}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* Ambulance */}
              <div className="col-md-6">
                <label htmlFor="ambulanceId" className="form-label">
                  Ambulance <span className="text-danger">*</span>
                </label>
                <select
                  id="ambulanceId"
                  className="form-select"
                  value={formData.ambulanceId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Ambulance</option>
                  {ambulanceList.map((amb) => (
                    <option key={amb.ambulanceId} value={amb.ambulanceId}>
                      {amb.vehicleNumber}
                    </option>
                  ))}
                </select>
              </div>

              {/* Driver */}
              <div className="col-md-6">
                <label htmlFor="driverId" className="form-label">
                  Driver <span className="text-danger">*</span>
                </label>
                <select
                  id="driverId"
                  className="form-select"
                  value={formData.driverId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Driver</option>
                  {driverList.map((driver) => (
                    <option key={driver.driverId} value={driver.driverId}>
                      {driver.driverName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div className="col-md-6">
                <label htmlFor="status" className="form-label">
                  Status <span className="text-danger">*</span>
                </label>
                <select
                  id="status"
                  className="form-select"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Status</option>
                  {assignmentStatus.map((s, index) => (
                    <option key={index} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* From Location */}
              <div className="col-md-6">
                <label htmlFor="fromLocation" className="form-label">
                  From Location <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="fromLocation"
                  className="form-control"
                  placeholder="Enter Pickup Location"
                  value={formData.fromLocation}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* To Location */}
              <div className="col-md-6">
                <label htmlFor="toLocation" className="form-label">
                  To Location <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="toLocation"
                  className="form-control"
                  placeholder="Enter Drop Location"
                  value={formData.toLocation}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Start Time */}
              <div className="col-md-6">
                <label htmlFor="startTime" className="form-label">
                  Start Time <span className="text-danger">*</span>
                </label>
                <input
                  type="datetime-local"
                  id="startTime"
                  className="form-control"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* End Time */}
              <div className="col-md-6">
                <label htmlFor="endTime" className="form-label">
                  End Time <span className="text-danger">*</span>
                </label>
                <input
                  type="datetime-local"
                  id="endTime"
                  className="form-control"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="col-12 text-center mt-4">
                <button
                  type="submit"
                  className="btn text-white btn-lg px-5"
                  style={{ backgroundColor: "#01C0C8" }}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AmbulanceAssignment;
