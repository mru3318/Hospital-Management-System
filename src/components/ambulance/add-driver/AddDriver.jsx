import React, { useState } from "react";
import "./AddDriver.css";

const AddDriver = () => {
  const [formData, setFormData] = useState({
    driverName: "",
    licenseNumber: "",
    contactNumber: "",
    ambulanceType: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Driver Data:", formData);

    // You can replace this with your actual API call:
    // fetch("/driver/add", { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(formData) })

    alert("Driver added successfully!");
    setFormData({
      driverName: "",
      licenseNumber: "",
      contactNumber: "",
      ambulanceType: "",
    });
  };

  return (
    <div className="container my-4 p-0 m-0">
      {/* Header */}
      <div className="card-border">
        <div className="card-header d-flex justify-content-center align-items-center bg-info text-white rounded-top">
          <div className="text-center d-flex align-items-center">
            <i className="fa-solid fa-truck-medical me-2"></i>
            <span className="fs-5 fw-semibold">Add Driver</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <form className="container-fluid my-4" onSubmit={handleSubmit}>
        <div className="row mb-4">
          {/* Driver Name */}
          <div className="col-md-6 mb-3">
            <label htmlFor="driverName" className="form-label">
              Driver Name
            </label>
            <input
              type="text"
              className="form-control"
              id="driverName"
              placeholder="Enter name"
              value={formData.driverName}
              onChange={handleChange}
              required
            />
          </div>

          {/* License Number */}
          <div className="col-md-6 mb-3">
            <label htmlFor="licenseNumber" className="form-label">
              Driver License Number
            </label>
            <input
              type="text"
              className="form-control"
              id="licenseNumber"
              placeholder="Enter license number"
              value={formData.licenseNumber}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row mb-4">
          {/* Contact Number */}
          <div className="col-md-6 mb-3">
            <label htmlFor="contactNumber" className="form-label">
              Contact No.
            </label>
            <input
              type="number"
              className="form-control"
              id="contactNumber"
              placeholder="Enter contact number"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
          </div>

          {/* Ambulance Dropdown */}
          <div className="col-md-6 mb-3">
            <label htmlFor="ambulanceType" className="form-label">
              Ambulance
            </label>
            <select
              id="ambulanceType"
              className="form-select"
              value={formData.ambulanceType}
              onChange={handleChange}
              required
            >
              <option value="">Choose Ambulance</option>
              <option value="AMC">AMC</option>
              <option value="BMC">BMC</option>
              <option value="AC/Ventilator">AC/Ventilator</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary px-4">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDriver;
