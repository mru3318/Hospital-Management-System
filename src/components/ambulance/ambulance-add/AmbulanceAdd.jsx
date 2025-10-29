import React, { useState } from "react";

const AmbulanceAdd = () => {
  const [formData, setFormData] = useState({
    vehicleNumber: "",
    ambulanceType: "",
    ambulanceStatus: "",
    lastMaintenanceDate: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const ambulanceTypes = [
    "Basic Life Support (BLS)",
    "Advanced Life Support (ALS)",
    "Patient Transport Vehicle",
  ];

  const ambulanceStatuses = ["Available", "In Use", "Maintenance"];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.vehicleNumber &&
      formData.ambulanceType &&
      formData.ambulanceStatus &&
      formData.lastMaintenanceDate
    ) {
      setSuccess("Ambulance added successfully!");
      setError("");
      console.log("Form Data:", formData);
      setFormData({
        vehicleNumber: "",
        ambulanceType: "",
        ambulanceStatus: "",
        lastMaintenanceDate: "",
      });
      setTimeout(() => setSuccess(""), 2000);
    } else {
      setError("Please fill all required fields.");
      setSuccess("");
      setTimeout(() => setError(""), 2000);
    }
  };

  return (
    <div className="container-fluid mt-1">
      <div className="container-fluid p-0">
        <div className="card border-0 shadow-sm">
          {/* Header */}
          <div className="card-header text-white text-center py-3 bg-primary">
            <h4 className="mb-0">
              <i className="fas fa-ambulance me-2" />
              Add Ambulance
            </h4>
          </div>

          {/* Form Body */}
          <div className="card-body p-4">
            {/* Success Message */}
            {success && <div className="alert alert-success">{success}</div>}

            {/* Error Message */}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* FORM */}
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                {/* Vehicle Number */}
                <div className="col-md-6">
                  <label htmlFor="vehicleNumber" className="form-label">
                    Vehicle Number <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="vehicleNumber"
                    placeholder="Enter Vehicle Number"
                    value={formData.vehicleNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Ambulance Type */}
                <div className="col-md-6">
                  <label htmlFor="ambulanceType" className="form-label">
                    Ambulance Type <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="ambulanceType"
                    value={formData.ambulanceType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select Ambulance Type --</option>
                    {ambulanceTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status */}
                <div className="col-md-6">
                  <label htmlFor="ambulanceStatus" className="form-label">
                    Status <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="ambulanceStatus"
                    value={formData.ambulanceStatus}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Status</option>
                    {ambulanceStatuses.map((status, index) => (
                      <option key={index} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Last Maintenance Date */}
                <div className="col-md-6">
                  <label htmlFor="lastMaintenanceDate" className="form-label">
                    Last Maintenance Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="lastMaintenanceDate"
                    value={formData.lastMaintenanceDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="col-12 text-center mt-4">
                  <button type="submit" className="btn btn-primary btn-lg px-4">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmbulanceAdd;
