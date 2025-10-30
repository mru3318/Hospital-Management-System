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

  const [passwordMatch, setPasswordMatch] = useState("");
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loadingStates, setLoadingStates] = useState(true);
  const [loadingDistricts, setLoadingDistricts] = useState(false);

  // ---------------- Handle Change ----------------
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert(`File "${file.name}" exceeds 5 MB limit!`);
        return;
      }
      setFormData({ ...formData, [name]: file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ---------------- Name Validation ----------------
  const handleNameKeyPress = (e) => {
    if (!/[a-zA-Z\s]/.test(e.key)) e.preventDefault();
  };

  // ---------------- Age Calculation ----------------
  useEffect(() => {
    if (!formData.dob) return;

    const dob = new Date(formData.dob);
    const today = new Date();

    if (dob > today) {
      alert("Date of birth cannot be in the future!");
      setFormData((prev) => ({ ...prev, dob: "", age: "" }));
      return;
    }

    if (dob.getFullYear() < 1900) {
      alert("Please enter a valid date of birth!");
      setFormData((prev) => ({ ...prev, dob: "", age: "" }));
      return;
    }

    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    setFormData((prev) => ({ ...prev, age }));
  }, [formData.dob]);

  // ---------------- Password Rules ----------------
  useEffect(() => {
    const { password, confirmPassword } = formData;

    setPasswordRules({
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[@$!%*?&#~]/.test(password),
    });

    if (!confirmPassword) {
      setPasswordMatch("");
    } else if (password === confirmPassword) {
      setPasswordMatch("✅ Passwords match");
    } else {
      setPasswordMatch("❌ Passwords do not match");
    }
  }, [formData.password, formData.confirmPassword]);

  // ---------------- Load States & Districts ----------------
  useEffect(() => {
    async function fetchStates() {
      try {
        const res = await fetch("/api/data/states");
        if (!res.ok) throw new Error("Failed to load states");
        const data = await res.json();
        setStates(data);
      } catch (err) {
        console.error("Error:", err);
        alert("Failed to load location data. Please try again later.");
      } finally {
        setLoadingStates(false);
      }
    }
    fetchStates();
  }, []);

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData({ ...formData, state: selectedState, district: "" });

    if (!selectedState) {
      setDistricts([]);
      return;
    }

    const selected = states.find((s) => s.state === selectedState);
    setDistricts(selected ? selected.districts : []);
  };

  // ---------------- Submit Handler ----------------
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registration submitted successfully!");
    console.log("Form Data:", formData);
  };

  // ---------------- Reset Handler ----------------
  const handleReset = () => {
    setFormData({
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
    setDistricts([]);
  };

  // ---------------- Role-Based Fields (Optional Future Sections) ----------------
  const renderRoleSpecificFields = () => {
    switch (formData.role) {
      case "Doctor":
        return (
          <div id="doctorFields" className="mt-3">
            Doctor-specific fields here...
          </div>
        );
      case "HR":
        return (
          <div id="hrFields" className="mt-3">
            HR-specific fields here...
          </div>
        );
      default:
        return null;
    }
  };

  // ---------------- JSX Render ----------------
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
          <form onSubmit={handleSubmit} onReset={handleReset}>
            {/* Name */}
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
                  onKeyPress={handleNameKeyPress}
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
                  onKeyPress={handleNameKeyPress}
                  className="form-control"
                  required
                />
              </div>
            </div>

            {/* Contact */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Mobile No *</label>
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
                <label className="form-label fw-semibold">Email *</label>
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
                <label className="form-label fw-semibold">Username *</label>
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
                <label className="form-label fw-semibold">Password *</label>
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
                  Confirm Password *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
                {passwordMatch && (
                  <small
                    className="form-text"
                    style={{
                      color: passwordMatch.includes("✅") ? "green" : "red",
                    }}
                  >
                    {passwordMatch}
                  </small>
                )}
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

            {/* DOB, Gender, Age */}
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

              {/* State / District */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">State</label>
                  <select
                    className="form-select"
                    name="state"
                    value={formData.state}
                    onChange={handleStateChange}
                    disabled={loadingStates}
                  >
                    <option value="">
                      {loadingStates ? "Loading..." : "Select State"}
                    </option>
                    {states.map((s) => (
                      <option key={s.state} value={s.state}>
                        {s.state}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">District</label>
                  <select
                    className="form-select"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    disabled={!formData.state}
                  >
                    <option value="">
                      {!formData.state
                        ? "Select State first"
                        : districts.length === 0
                        ? "No districts available"
                        : "Select District"}
                    </option>
                    {districts.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
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
                  <option>HR</option>
                  <option>Lab Technician</option>
                  <option>Receptionist</option>
                  <option>Pharmacist</option>
                  <option>Nurse</option>
                </select>
              </div>
            </div>

            {renderRoleSpecificFields()}

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
