import React from "react";
import "./AddNewEmployee.css";

const AddNewEmployee = () => {
  return (
    <div class="container mt-2">
      <div className="form-card ">
        <div className="form-header">
          <i className="fa-solid fa-user-plus" />
          <h3>Employee Registration Form</h3>
        </div>
        <form id="employeeForm" noValidate>
          <div className="form-body">
            {/* General Fields */}
            <div className="row">
              <div className="form-group col-md-6 mb-3">
                <label htmlFor="firstName" className="form-label">
                  First Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="form-control"
                  placeholder="Enter First Name"
                  required
                />
              </div>
              <div className="form-group col-md-6 mb-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="form-control"
                  placeholder="Enter Last Name"
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6 mb-3">
                <label htmlFor="email" className="form-label">
                  Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter Email"
                  required
                />
              </div>
              <div className="form-group col-md-6 mb-3">
                <label htmlFor="mobileNo" className="form-label">
                  Mobile No
                </label>
                <input
                  type="text"
                  id="mobileNo"
                  className="form-control"
                  placeholder="Enter Mobile No"
                />
              </div>
            </div>
            {/* Username & Password */}
            <div className="row">
              <div className="form-group col-md-6 mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  placeholder="Enter Username"
                />
              </div>
              <div className="form-group col-md-6 mb-3">
                <label htmlFor="password" className="form-label">
                  Set Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter Password"
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6 mb-3">
                <label htmlFor="profilePic" className="form-label">
                  Profile Picture
                </label>
                <input type="file" id="profilePic" className="form-control" />
              </div>
              <div className="form-group col-md-6 mb-3">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <select id="gender" className="form-select">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6 mb-3">
                <label htmlFor="dob" className="form-label">
                  Date of Birth
                </label>
                <input type="date" id="dob" className="form-control" />
              </div>
              <div className="form-group col-md-6 mb-3">
                <label htmlFor="age" className="form-label">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  className="form-control"
                  placeholder="Enter Age"
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6 mb-3">
                <label htmlFor="idProof" className="form-label">
                  ID Proof
                </label>
                <select id="idProof" className="form-select">
                  <option>Aadhar Card</option>
                  <option>PAN Card</option>
                  <option>Passport</option>
                  <option>Driving License</option>
                </select>
              </div>
              <div className="form-group col-md-6 mb-3">
                <label htmlFor="uploadId" className="form-label">
                  Upload ID Proof
                </label>
                <input type="file" id="uploadId" className="form-control" />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6 mb-3">
                <label htmlFor="joiningDate" className="form-label">
                  Joining Date
                </label>
                <input type="date" id="joiningDate" className="form-control" />
              </div>
              <div className="form-group col-md-6 mb-3">
                <label htmlFor="bloodGroup" className="form-label">
                  Blood Group
                </label>
                <select id="bloodGroup" className="form-select">
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>O+</option>
                  <option>O-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                </select>
              </div>
            </div>
            <h4>Address</h4>
            <div className="row">
              <div className="form-group col-md-6 mb-3">
                <label htmlFor="address1" className="form-label">
                  Address Line 1
                </label>
                <input type="text" id="address1" className="form-control" />
              </div>
              <div className="form-group col-md-6 mb-3">
                <label htmlFor="address2" className="form-label">
                  Address Line 2
                </label>
                <input type="text" id="address2" className="form-control" />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-3 mb-3">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input type="text" id="city" className="form-control" />
              </div>
              <div className="form-group col-md-3 mb-3">
                <label htmlFor="district" className="form-label">
                  District
                </label>
                <input type="text" id="district" className="form-control" />
              </div>
              <div className="form-group col-md-3 mb-3">
                <label htmlFor="state" className="form-label">
                  State
                </label>
                <input type="text" id="state" className="form-control" />
              </div>
              <div className="form-group col-md-3 mb-3">
                <label htmlFor="pincode" className="form-label">
                  Pincode
                </label>
                <input type="text" id="pincode" className="form-control" />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6 mb-3">
                <label htmlFor="country" className="form-label">
                  Country
                </label>
                <select id="country" className="form-select">
                  <option defaultValue>India</option>
                  <option>USA</option>
                  <option>UK</option>
                  <option>Canada</option>
                  <option>Australia</option>
                </select>
              </div>
              <div className="form-group col-md-6 mb-3">
                <label htmlFor="role" className="form-label">
                  Role
                </label>
                <select id="role" className="form-select">
                  <option>Select Role</option>
                  <option>Doctor</option>
                  <option>Receptionist</option>
                  <option>Head Nurse</option>
                  <option>Laboratorist</option>
                  <option>Pharmacist</option>
                  <option>Accountant</option>
                </select>
              </div>
            </div>
            {/* Dynamic Role Fields */}
            <div id="roleFields" />
          </div>
          <div className="form-footer">
            <button type="reset" className="btn btn-secondary">
              Reset
            </button>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewEmployee;
