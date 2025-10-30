import React, { useState, useEffect } from "react";

const EmployeeRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dob: "",
    age: "",
    addressLine1: "",
    addressLine2: "",
    state: "",
    district: "",
    city: "",
    country: "India",
    pincode: "",
    role: "",
    profilePic: null,
  });

  const [passwordRules, setPasswordRules] = useState({
    uppercase: false,
    number: false,
    special: false,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    if (formData.dob) {
      const dob = new Date(formData.dob);
      const ageDiff = new Date().getFullYear() - dob.getFullYear();
      setFormData((prev) => ({ ...prev, age: ageDiff }));
    }
  }, [formData.dob]);

  useEffect(() => {
    const { password } = formData;
    setPasswordRules({
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  }, [formData.password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registration submitted successfully!");
    console.log("Form Data:", formData);
  };

  return (
    <div className="container-fluid px-5 py-4">
      <div className="card shadow border-0 w-100">
        {/* Header */}
        <div
          className="card-header text-white text-center py-3"
          style={{ backgroundColor: "#01C0C8" }}
        >
          <h3 className="mb-0">
            <i className="fa-solid fa-user-plus" /> Employee Registration
          </h3>
        </div>

        {/* Form Body */}
        <div className="card-body px-5 py-4">
          <form onSubmit={handleSubmit}>
            {/* Basic Info */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  First Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Last Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            </div>

            {/* Contact Info */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Mobile No <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="number"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Email <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            </div>

            {/* Username / Password */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Username <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Password <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Confirm Password <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            </div>

            {/* Password Rules */}
            <ul className="list-unstyled small mb-4">
              <li style={{ color: passwordRules.uppercase ? "green" : "red" }}>
                Must include at least one uppercase letter
              </li>
              <li style={{ color: passwordRules.number ? "green" : "red" }}>
                Must include one number
              </li>
              <li style={{ color: passwordRules.special ? "green" : "red" }}>
                Must include one special character
              </li>
            </ul>

            {/* Gender / DOB / Age */}
            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label fw-semibold">Gender</label>
                <select
                  name="gender"
                  className="form-select"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label fw-semibold">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-semibold">Age</label>
                <input
                  type="text"
                  name="age"
                  value={formData.age}
                  readOnly
                  className="form-control"
                />
              </div>
            </div>

            {/* Address */}
            <div className="border rounded p-3 mb-3 ">
              <h5 className="fw-bold mb-3">Address Details</h5>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Address Line 1</label>
                  <input
                    type="text"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Address Line 2</label>
                  <input
                    type="text"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-4">
                  <label className="form-label">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">District</label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
            </div>

            {/* Profile & Role */}
            <div className="row mb-4">
              <div className="col-md-6">
                <label className="form-label">Profile Picture</label>
                <input
                  type="file"
                  name="profilePic"
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Role</label>
                <select
                  name="role"
                  className="form-select"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="">Select Role</option>
                  <option>Doctor</option>
                  <option>Nurse</option>
                  <option>Receptionist</option>
                  <option>Lab Technician</option>
                  <option>Pharmacist</option>
                  <option>HR</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="text-center">
              <button
                type="submit"
                className="btn text-white px-4 me-2"
                style={{ backgroundColor: "#01C0C8" }}
              >
                Register
              </button>
              <button type="reset" className="btn btn-danger px-4">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeRegistration;
