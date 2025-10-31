import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { GenderOptions } from "../../../../constants";

const EmployeeRegistration = () => {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [passwordRules, setPasswordRules] = useState({
    uppercase: false,
    number: false,
    special: false,
  });
  const [passwordMatch, setPasswordMatch] = useState("");

  // ---------------- Formik Setup ----------------
  const formik = useFormik({
    initialValues: {
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
    },

    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      mobileNumber: Yup.string()
        .matches(/^[0-9]{10}$/, "Must be a 10-digit number")
        .required("Mobile number is required"),
      username: Yup.string().required("Username is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .matches(/[A-Z]/, "Must contain one uppercase letter")
        .matches(/[0-9]/, "Must contain one number")
        .matches(/[@$!%*?&#~]/, "Must contain one special character")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Please confirm your password"),
    }),

    onSubmit: (values) => {
      console.log("Submitted Data:", values);
      alert("Registration submitted successfully!");
    },
  });

  // ---------------- Handle Change ----------------
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert(`File "${file.name}" exceeds 5 MB limit!`);
        return;
      }
      formik.setFieldValue(name, file);
    } else {
      formik.setFieldValue(name, value);
    }
  };

  // ---------------- Age Calculation ----------------
  useEffect(() => {
    if (!formik.values.dob) return;

    const dob = new Date(formik.values.dob);
    const today = new Date();

    if (dob > today) {
      alert("Date of birth cannot be in the future!");
      formik.setFieldValue("dob", "");
      formik.setFieldValue("age", "");
      return;
    }

    if (dob.getFullYear() < 1900) {
      alert("Please enter a valid date of birth!");
      formik.setFieldValue("dob", "");
      formik.setFieldValue("age", "");
      return;
    }

    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    formik.setFieldValue("age", age);
  }, [formik.values.dob]);

  // ---------------- Password Rule Validation ----------------
  useEffect(() => {
    const { password, confirmPassword } = formik.values;
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
  }, [formik.values.password, formik.values.confirmPassword]);

  // ---------------- State Change ----------------
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    formik.setFieldValue("state", selectedState);
    formik.setFieldValue("district", "");

    if (!selectedState) {
      setDistricts([]);
      return;
    }

    const selected = states.find((s) => s.state === selectedState);
    setDistricts(selected ? selected.districts : []);
  };

  // ---------------- File Upload ----------------
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      alert(`File "${file.name}" exceeds 5 MB limit!`);
      return;
    }
    formik.setFieldValue("profilePic", file);
  };

  // ---------------- Reset Form ----------------
  const handleReset = () => {
    formik.resetForm();
    setDistricts([]);
  };

  // ---------------- Role-Based Fields ----------------
  const renderRoleSpecificFields = () => {
    const { role } = formik.values;
    const commonFields = (fields) => (
      <div className="row mt-3">
        {fields.map((f, idx) => (
          <div className="mb-3 col-md-6" key={idx}>
            <label className="form-label">{f.label}</label>
            {f.type === "select" ? (
              <select
                name={f.name}
                className="form-select"
                onChange={handleChange}
                value={formik.values[f.name] || ""}
              >
                <option value="">Select {f.label}</option>
                {f.options?.map((opt, i) => (
                  <option key={i} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                name={f.name}
                className="form-control"
                onChange={handleChange}
                value={formik.values[f.name] || ""}
              />
            )}
          </div>
        ))}
      </div>
    );

    switch (role) {
      case "Doctor":
        return (
          <div id="doctorFields" className="mt-3">
            <h5>Doctor Specific Fields</h5>
            {commonFields([
              { label: "Experience", name: "experience" },
              { label: "Department", name: "department" },
              { label: "Specialization", name: "specialization" },
              { label: "Qualification", name: "qualification" },
              { label: "License Number", name: "licenseNumber" },
            ])}
          </div>
        );
      case "HR":
      case "Receptionist":
      case "Pharmacist":
      case "Head Nurse":
      case "Accountant":
      case "Insurer":
        return (
          <div id={`${role.toLowerCase()}Fields`} className="mt-3">
            <h5>{role} Specific Fields</h5>
            {commonFields([
              { label: "Experience", name: "experience" },
              { label: "Qualification", name: "qualification" },
            ])}
          </div>
        );
      case "Lab Technician":
        return (
          <div id="labTechFields" className="mt-3">
            <h5>Lab Technician Specific Fields</h5>
            {commonFields([
              {
                label: "Category",
                name: "category",
                type: "select",
                options: ["Pathlab", "Radiologist"],
              },
              { label: "Experience", name: "experience" },
              { label: "Qualification", name: "qualification" },
            ])}
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
          <form onSubmit={formik.handleSubmit} onReset={handleReset}>
            {/* Name Fields */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  First Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`form-control ${
                    formik.touched.firstName && formik.errors.firstName
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {formik.errors.firstName}
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Last Name <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`form-control ${
                    formik.touched.lastName && formik.errors.lastName
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <div className="invalid-feedback">{formik.errors.lastName}</div>
              </div>
            </div>

            {/* Contact Fields */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Mobile No <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="mobileNumber"
                  value={formik.values.mobileNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`form-control ${
                    formik.touched.mobileNumber && formik.errors.mobileNumber
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {formik.errors.mobileNumber}
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Email <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`form-control ${
                    formik.touched.email && formik.errors.email
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <div className="invalid-feedback">{formik.errors.email}</div>
              </div>
            </div>

            {/* Password Fields */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Password <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`form-control ${
                    formik.touched.password && formik.errors.password
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <div className="invalid-feedback">{formik.errors.password}</div>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Confirm Password <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`form-control ${
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {formik.errors.confirmPassword}
                </div>
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

            {/* Gender / DOB / Age */}
            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label fw-semibold">Gender</label>
                <select
                  name="gender"
                  className="form-select"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Gender</option>
                  {GenderOptions?.map((g, idx) => (
                    <option key={idx} value={g.value || g}>
                      {g.label || g}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label fw-semibold">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formik.values.dob}
                  onChange={formik.handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <label className="form-label fw-semibold">Age</label>
                <input
                  type="text"
                  name="age"
                  value={formik.values.age}
                  readOnly
                  className="form-control"
                />
              </div>
            </div>

            {/* Address */}
            <div className="border rounded p-3 mb-3">
              <h5 className="fw-bold mb-3">Address Details</h5>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="addressLine1" className="form-label">
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    id="addressLine1"
                    name="addressLine1"
                    className="form-control"
                    placeholder="Enter Address Line 1"
                  />
                </div>
                <div className="col-md-6 mt-3 mt-md-0">
                  <label htmlFor="addressLine2" className="form-label">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    id="addressLine2"
                    name="addressLine2"
                    className="form-control"
                    placeholder="Enter Address Line 2"
                  />
                </div>
              </div>
              {/* State / District */}
              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="state" className="form-label">
                    State
                  </label>
                  <select id="state" name="state" className="form-select">
                    <option value>Select State</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label htmlFor="district" className="form-label">
                    District
                  </label>
                  <select id="district" name="district" className="form-select">
                    <option value>Select District</option>
                    {/* Example Districts */}
                    <option value="Nagpur">Nagpur</option>
                    <option value="Pune">Pune</option>
                    <option value="Mumbai">Mumbai</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <input
                    text="text"
                    id="city"
                    name="city"
                    className="form-control"
                  />
                </div>

                <div className="col-md-4 mt-3 mt-md-0">
                  <label htmlFor="country" className="form-label">
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    className="form-select"
                    disabled
                  >
                    <option value="India">India</option>
                  </select>
                </div>
                <div className="col-md-4 mt-3 mt-md-0">
                  <label htmlFor="pincode" className="form-label">
                    Pincode
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
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
                  onChange={handleFileChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Role</label>
                <select
                  name="role"
                  className="form-select"
                  value={formik.values.role}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Role</option>
                  <option>Doctor</option>
                  <option>HR</option>
                  <option>Lab Technician</option>
                  <option>Receptionist</option>
                  <option>Pharmacist</option>
                  <option>Head Nurse</option>
                  <option>Accountant</option>
                  <option>Insurer</option>
                </select>
              </div>
            </div>

            {renderRoleSpecificFields()}

            {/* Buttons */}
            <div className="text-center">
              <button
                type="submit"
                className="btn text-white px-4 me-2 "
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
