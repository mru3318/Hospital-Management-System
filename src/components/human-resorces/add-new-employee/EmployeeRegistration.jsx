import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  BloodGroupOptions,
  ExperienceLevel,
  GenderOptions,
} from "../../../../constants";
import { useSelector, useDispatch } from "react-redux";
import { fetchStates } from "../../../features/statesSlice";
import { IdProofTypeOptions } from "../../../../constants";
import { RoleNameOptions } from "../../../../constants";
import { registerEmployee } from "../../../features/employeeSlice";

const EmployeeRegistration = () => {
  const dispatch = useDispatch();
  const { list: states, status: statesStatus } = useSelector(
    (state) => state.states
  );
  const departments = useSelector((state) => state.departments?.list || []);

  const [districts, setDistricts] = useState([]);
  const [passwordRules, setPasswordRules] = useState({
    uppercase: false,
    number: false,
    special: false,
  });
  const [passwordMatch, setPasswordMatch] = useState("");

  // 1) Include all expected keys in initialValues (use consistent names)
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
      idProofType: "",
      idProof: null,
      joiningDate: "", // unified name (was joiningdate previously)
      state: "",
      district: "",
      city: "",
      country: "India",
      pincode: "",
      role: "", // will be option value (string) — convert to number before sending
      profilePic: null,
      bloodGroup: "",
      experience: "",
      qualification: "",
      category: "",
      specialization: "",
      licenseNumber: "",
      department: "",
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
    // 2) Use Formik onSubmit to dispatch the thunk; convert role to number
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      try {
        console.log("✅ Raw Formik Values:", values);

        // Build structured payload (matches your working payload)
        const payload = {
          username: values.username,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
          firstName: values.firstName,
          lastName: values.lastName,
          mobileNumber: values.mobileNumber,
          gender: values.gender,
          dob: values.dob,
          age: Number(values.age),
          idProofType: values.idProofType,
          joiningDate: values.joiningDate,
          bloodGroup: values.bloodGroup,
          roleId: Number(values.role), // role → roleId
          addressDto: {
            addressLine1: values.addressLine1,
            addressLine2: values.addressLine2,
            city: values.city,
            district: values.district,
            state: values.state,
            pincode: values.pincode,
            country: values.country || "India",
          },
        };

        // Add role-based nested DTO (example for Doctor)
        if (String(values.role) === "3") {
          payload.doctorDto = {
            specialization: values.specialization || "",
            experience: values.experience || "",
            qualifications: values.qualification || "", // note: server expects 'qualifications' (plural)
            licenseNumber: values.licenseNumber || "",
            departmentId: values.department ? Number(values.department) : 3, // default departmentId
          };
        } else if ([7, 10, 5, 4, 6, 9, 8].includes(Number(values.role))) {
          // Other roles - add common employee fields
          payload.employeeDto = {
            experience: values.experience || "",
            qualification: values.qualification || "",
          };

          if (String(values.role) === "8") {
            // Laboratorist
            payload.employeeDto.category = values.category || "";
          }
        }

        // Build FormData for files + payload JSON
        const formData = new FormData();

        // Append JSON fields as strings
        formData.append(
          "data",
          new Blob([JSON.stringify(payload)], { type: "application/json" })
        );

        // Append file uploads separately
        if (values.profilePic instanceof File) {
          formData.append("profilePic", values.profilePic);
        }
        if (values.idProof instanceof File) {
          formData.append("idProof", values.idProof);
        }

        // Debug
        for (let [k, v] of formData.entries()) {
          console.log("📦 FormData entry:", k, v);
        }

        // Dispatch Redux thunk
        await dispatch(registerEmployee(formData));

        resetForm();
      } catch (err) {
        console.error("❌ Submit Error:", err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  // fetch states
  useEffect(() => {
    if (statesStatus === "idle") dispatch(fetchStates());
  }, [dispatch, statesStatus]);

  // generic change for non-file inputs (we mostly use formik.handleChange directly)
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (!files || !files.length) return;
    const file = files[0];
    if (file.size > 5 * 1024 * 1024) {
      alert(`File "${file.name}" exceeds 5 MB limit!`);
      return;
    }
    formik.setFieldValue(name, file);
  };

  // Age calc (unchanged)
  useEffect(() => {
    if (!formik.values.dob) return;
    const dob = new Date(formik.values.dob);
    const today = new Date();
    if (dob > today || dob.getFullYear() < 1900) {
      formik.setFieldValue("age", "");
      return;
    }
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
    formik.setFieldValue("age", age);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.dob]);

  // Password rules
  useEffect(() => {
    const { password, confirmPassword } = formik.values;
    setPasswordRules({
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[@$!%*?&#~]/.test(password),
    });
    if (!confirmPassword) setPasswordMatch("");
    else
      setPasswordMatch(
        password === confirmPassword
          ? "✅ Passwords match"
          : "❌ Passwords do not match"
      );
  }, [formik.values.password, formik.values.confirmPassword]);

  // State -> district
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

  // Role-specific fields renderer remains but uses the canonical keys (experience, qualification, category)
  const renderRoleSpecificFields = () => {
    const { role } = formik.values;
    const roleLabelObj = RoleNameOptions?.find(
      (r) => String(r.value) === String(role)
    );
    const roleLabel = roleLabelObj ? roleLabelObj.label : role;
    const commonFields = (fields) => {
      return (
        <div className="row">
          {fields.map((field) => (
            <div className="col-12 col-md-6 mb-3" key={field.name}>
              <label className="form-label">{field.label}</label>
              {field.name === "experience" ? (
                <select
                  name={field.name}
                  value={formik.values[field.name]}
                  onChange={formik.handleChange}
                  className="form-select"
                >
                  <option value="">Select Experience</option>
                  {ExperienceLevel.map((exp) => (
                    <option key={exp.value} value={exp.value}>
                      {exp.label}
                    </option>
                  ))}
                </select>
              ) : field.name === "department" ? (
                <select
                  name={field.name}
                  value={formik.values[field.name]}
                  onChange={formik.handleChange}
                  className="form-select"
                >
                  <option value="">Select Department</option>
                  {departments?.map((dept) => (
                    <option key={dept.id} value={dept.department_name}>
                      {dept.department_name}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  name={field.name}
                  value={formik.values[field.name]}
                  onChange={formik.handleChange}
                  className="form-control"
                />
              )}
            </div>
          ))}
        </div>
      );
    };

    switch (String(role)) {
      case "3":
        return (
          <div id="doctorFields" className="mt-3">
            <h5>{roleLabel} Specific Fields</h5>
            {commonFields([
              { label: "Experience", name: "experience" },
              { label: "Department", name: "department" },
              { label: "Specialization", name: "specialization" },
              { label: "Qualification", name: "qualification" },
              { label: "License Number", name: "licenseNumber" },
            ])}
          </div>
        );
      case "7":
      case "10":
      case "5":
      case "4":
      case "6":
      case "9":
        return (
          <div id={`${role}Fields`} className="mt-3">
            <h5>{roleLabel} Specific Fields</h5>

            {/* Experience Field */}
            <div className="row">
              <div className="mb-3 col-md-6">
                <label className="form-label">Experience</label>
                <select
                  name="experience"
                  value={formik.values.experience}
                  onChange={formik.handleChange}
                  className="form-select"
                >
                  <option value="">Select Experience</option>
                  {ExperienceLevel.map((exp) => (
                    <option key={exp.value} value={exp.value}>
                      {exp.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Qualification Field */}
              <div className="mb-3 col-md-6">
                <label className="form-label">Qualification</label>
                <input
                  type="text"
                  name="qualification"
                  value={formik.values.qualification}
                  onChange={formik.handleChange}
                  className="form-control"
                />
              </div>
            </div>
          </div>
        );
      case "8":
        return (
          <div id="labTechFields" className="mt-3">
            <h5>{roleLabel} Specific Fields</h5>
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

  // JSX — ensure every input uses value & onChange from formik, and file inputs call handleFileChange
  return (
    <div className="card shadow border-0 w-100">
      <div
        className="card-header text-white text-center py-3"
        style={{ backgroundColor: "#01C0C8" }}
      >
        <h3 className="mb-0">
          <i className="fa-solid fa-user-plus" /> Employee Registration
        </h3>
      </div>

      <div className="card-body px-5 py-4">
        {/* Use formik.handleSubmit on form */}
        <form
          onSubmit={formik.handleSubmit}
          onReset={() => {
            formik.resetForm();
            setDistricts([]);
          }}
        >
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
              <div className="invalid-feedback">{formik.errors.firstName}</div>
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

          {/* username */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Username <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`form-control ${
                  formik.touched.username && formik.errors.username
                    ? "is-invalid"
                    : ""
                }`}
              />
              <div className="invalid-feedback">{formik.errors.username}</div>
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

          {/* Joining Date & Blood Group */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Joining Date</label>
              <input
                type="date"
                name="joiningDate"
                value={formik.values.joiningDate}
                onChange={formik.handleChange}
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Blood Group</label>
              <select
                name="bloodGroup"
                className="form-select"
                value={formik.values.bloodGroup}
                onChange={formik.handleChange}
              >
                <option value="">Select Blood Group</option>
                {BloodGroupOptions?.map((group, idx) => (
                  <option key={idx} value={group.value || group}>
                    {group.label || group}
                  </option>
                ))}
              </select>
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
                  value={formik.values.addressLine1}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="addressLine2" className="form-label">
                  Address Line 2
                </label>
                <input
                  type="text"
                  id="addressLine2"
                  name="addressLine2"
                  className="form-control"
                  placeholder="Enter Address Line 2"
                  value={formik.values.addressLine2}
                  onChange={formik.handleChange}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="state" className="form-label">
                  State
                </label>
                <select
                  id="state"
                  name="state"
                  className="form-select"
                  onChange={handleStateChange}
                  value={formik.values.state}
                >
                  <option value="">Select State</option>
                  {statesStatus === "loading" && <option>Loading...</option>}
                  {statesStatus === "failed" && (
                    <option>Error loading states</option>
                  )}
                  {statesStatus === "succeeded" &&
                    states.map((s, i) => (
                      <option key={i} value={s.state}>
                        {s.state}
                      </option>
                    ))}
                </select>
              </div>

              <div className="col-md-4">
                <label htmlFor="district" className="form-label">
                  District
                </label>
                <select
                  id="district"
                  name="district"
                  className="form-select"
                  onChange={formik.handleChange}
                  value={formik.values.district}
                  disabled={!formik.values.state}
                >
                  <option value="">Select District</option>
                  {districts.map((d, idx) => (
                    <option key={idx} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="form-control"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="country" className="form-label">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  className="form-select"
                  value={formik.values.country}
                  disabled
                >
                  <option value="India">India</option>
                </select>
              </div>

              <div className="col-md-6">
                <label htmlFor="pincode" className="form-label">
                  Pincode
                </label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  className="form-control"
                  value={formik.values.pincode}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
          </div>

          {/* ID Proof Upload */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Select Id Proof</label>
              <select
                name="idProofType"
                className="form-select"
                value={formik.values.idProofType}
                onChange={formik.handleChange}
              >
                <option value="">Select Id Proof</option>
                {IdProofTypeOptions?.map((idProof, idx) => (
                  <option key={idx} value={idProof.value || idProof}>
                    {idProof.label || idProof}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Upload Id Proof</label>
              <input
                type="file"
                name="idProof"
                onChange={handleFileChange}
                className="form-control"
              />
            </div>
          </div>

          {/* Profile & Role */}
          <div className="row mb-4">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Profile Picture</label>
              <input
                type="file"
                name="profilePic"
                onChange={handleFileChange}
                className="form-control"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">Role</label>
              <select
                name="role"
                className="form-select"
                value={formik.values.role}
                onChange={formik.handleChange}
              >
                <option value="">Select Role</option>
                {RoleNameOptions?.map((role, idx) => (
                  <option key={idx} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {renderRoleSpecificFields()}

          {/* Buttons: use type="submit" so formik.handleSubmit runs */}
          <div className="text-center">
            <button
              type="submit"
              className="btn text-white px-4 me-2"
              style={{ backgroundColor: "#01C0C8" }}
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Submitting..." : "Register"}
            </button>
            <button type="reset" className="btn btn-secondary px-4">
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeRegistration;
