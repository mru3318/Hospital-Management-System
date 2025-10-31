import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();

  // Ensure the mobile hamburger always toggles the sidebar even if React mounts
  // after the page DOMContentLoaded handlers ran. This avoids relying on
  // external jQuery/bootstrap scripts for the offcanvas toggle.
  const handleMobileToggle = (e) => {
    e && e.preventDefault && e.preventDefault();
    const sidebar = document.getElementById("sidebar");
    if (sidebar) sidebar.classList.toggle("active");
  };

  const isUiBasicOpen = location.pathname.startsWith("/add-new-employee");
  const isFormsOpen = location.pathname.startsWith("/add-doctor");

  return (
    <div className="container-scroller">
      {/* partial:partials/_navbar.html */}
      <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          <a className="navbar-brand brand-logo" href="index.html">
            <img
              src="/assets/images/logo-main.png"
              alt="logo"
              className="logo-dark"
            />
            <img
              src="/assets/images/logo-light.svg"
              alt="logo-light"
              className="logo-light"
            />
          </a>
          <a className="navbar-brand brand-logo-mini" href="index.html">
            <img src="/assets/images/logo-mini.png" alt="logo" />
          </a>
          <button
            className="navbar-toggler navbar-toggler align-self-center"
            type="button"
            data-bs-toggle="minimize"
          >
            <span className="icon-menu" />
          </button>
        </div>
        <div
          className="navbar-menu-wrapper d-flex align-items-center"
          style={{ backgroundColor: "#01c0c8" }}
        >
          <h5 className="mb-0 font-weight-medium d-none d-lg-flex">
            Welcome Admin
          </h5>
          <ul className="navbar-nav navbar-nav-right">
            {/* Always show admin dropdown in header (including mobile) and place it before the mobile menu */}
            <li className="nav-item dropdown user-dropdown me-2">
              <a
                className="nav-link dropdown-toggle"
                id="UserDropdown"
                href="#"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  className="img-xs rounded-circle ms-2"
                  src="/assets/images/profile-icon.jpg"
                  alt="Profile image"
                />
                <span className="font-weight-normal"> Admin </span>
              </a>
              <div
                className="dropdown-menu dropdown-menu-right navbar-dropdown"
                aria-labelledby="UserDropdown"
              >
                <div className="dropdown-header text-center">
                  <img
                    className="img-md rounded-circle"
                    src="/assets/images/profile-icon1.png"
                    alt="Profile image"
                  />
                  <p className="mb-1 mt-3">Admin</p>
                  <p className="font-weight-light text-muted mb-0">
                    admin@gmail.com
                  </p>
                </div>
                <a className="dropdown-item">
                  <i className="dropdown-item-icon icon-user text-primary" /> My
                  Profile
                  <span className="badge badge-pill badge-danger">1</span>
                </a>
                <a className="dropdown-item">
                  <i className="dropdown-item-icon icon-power text-primary" />
                  Sign Out
                </a>
              </div>
            </li>
          </ul>
          <button
            className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
            type="button"
            onClick={handleMobileToggle}
          >
            <span className="icon-menu" />
          </button>
        </div>
      </nav>
      {/* partial */}
      <div className="container-fluid page-body-wrapper">
        {/* partial:partials/_sidebar.html */}
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
          <ul className="nav">
            <li className="nav-item navbar-brand-mini-wrapper mt-3">
              <a
                className="nav-link navbar-brand brand-logo-mini"
                href="index.html"
              >
                <img src="/assets/images/logo-mini.png" alt="logo" />
              </a>
            </li>
            {/* ################## */}
            <li className="nav-item nav-category">
              <span className="nav-link" />
            </li>
            {/* ################## */}
            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
              >
                <span className="menu-title">Dashboard</span>
                <i className="fa fa-tachometer-alt menu-icon" />
              </NavLink>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-bs-toggle="collapse"
                href="#ui-basic"
                aria-expanded={isUiBasicOpen}
                aria-controls="ui-basic"
              >
                <span className="menu-title">Human Resources</span>
                <i className="fa fa-users menu-icon" />
              </a>
              <div
                className={"collapse" + (isUiBasicOpen ? " show" : "")}
                id="ui-basic"
                data-bs-parent="#sidebar"
              >
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <NavLink
                      to="add-new-employee"
                      className={({ isActive }) =>
                        "nav-link" + (isActive ? " active" : "")
                      }
                    >
                      Add Employee
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="manage-employees">
                      Manage Employee
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-bs-toggle="collapse"
                href="#icons"
                aria-expanded="false"
                aria-controls="icons"
              >
                <span className="menu-title">Departments</span>
                <i className="fa fa-building menu-icon" />
              </a>
              <div className="collapse" id="icons" data-bs-parent="#sidebar">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Add Department
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Manage Departments{" "}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-bs-toggle="collapse"
                href="#forms"
                aria-expanded={isFormsOpen}
                aria-controls="forms"
              >
                <span className="menu-title">Doctor</span>
                <i className="fa fa-user-md menu-icon" />
              </a>
              <div
                className={"collapse" + (isFormsOpen ? " show" : "")}
                id="forms"
                data-bs-parent="#sidebar"
              >
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <NavLink
                      to="/add-doctor"
                      className={({ isActive }) =>
                        "nav-link" + (isActive ? " active" : "")
                      }
                    >
                      Add Doctor
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      View Doctor’s List{" "}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-bs-toggle="collapse"
                href="#charts"
                aria-expanded="false"
                aria-controls="charts"
              >
                <span className="menu-title"> Patient Management</span>
                <i className="fa fa-procedures menu-icon" />
              </a>
              <div className="collapse" id="charts" data-bs-parent="#sidebar">
                <ul className="nav flex-column sub-menu">
                  {/* OPD Management */}
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-bs-toggle="collapse"
                      data-bs-target="#opdMenu"
                      aria-expanded="false"
                      aria-controls="opdMenu"
                    >
                      OPD Management
                    </a>
                    <ul
                      className="flex-column sub-menu collapse"
                      id="opdMenu"
                      data-bs-parent="#charts"
                      style={{ listStyle: "none" }}
                    >
                      <li>
                        <a href="#" className="nav-link">
                          Add Patients
                        </a>
                      </li>
                      <li>
                        <a href="#" className="nav-link">
                          View Patients
                        </a>
                      </li>
                      <li>
                        <a href="#" className="nav-link">
                          Add Prescriptions
                        </a>
                      </li>
                      <li>
                        <a href="#" className="nav-link">
                          Lab Orders
                        </a>
                      </li>
                      <li>
                        <a href="#" className="nav-link">
                          Billing
                        </a>
                      </li>
                    </ul>
                  </li>
                  {/* IPD Management */}
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-bs-toggle="collapse"
                      data-bs-target="#ipdMenu"
                      aria-expanded="false"
                      aria-controls="ipdMenu"
                    >
                      IPD Management
                    </a>
                    <ul
                      className="flex-column sub-menu collapse"
                      id="ipdMenu"
                      data-bs-parent="#charts"
                      style={{ listStyle: "none" }}
                    >
                      <li>
                        <a href="#" className="nav-link">
                          Add Patient
                        </a>
                      </li>
                      <li>
                        <a href="#" className="nav-link">
                          View Patient
                        </a>
                      </li>
                      <li>
                        <a href="#" className="nav-link">
                          Ward/Bed Allocation
                        </a>
                      </li>
                      <li>
                        <a href="#" className="nav-link">
                          Prescriptions
                        </a>
                      </li>
                      <li>
                        <a href="#" className="nav-link">
                          Lab Orders
                        </a>
                      </li>
                      <li>
                        <a href="#" className="nav-link">
                          Discharge Summary
                        </a>
                      </li>
                      <li>
                        <a href="#" className="nav-link">
                          Billing
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-bs-toggle="collapse"
                href="#tables"
                aria-expanded="false"
                aria-controls="tables"
              >
                <span className="menu-title">Doctor’s Schedule</span>
                <i className="fa fa-calendar-alt menu-icon" />
              </a>
              <div className="collapse" id="tables" data-bs-parent="#sidebar">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Add Schedule
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      View Schedule{" "}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-bs-toggle="collapse"
                href="#auth"
                aria-expanded="false"
                aria-controls="auth"
              >
                <span className="menu-title">Appointments</span>
                <i className="fa fa-calendar-check menu-icon" />
              </a>
              <div className="collapse" id="auth" data-bs-parent="#sidebar">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      {" "}
                      Add Appointments{" "}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      {" "}
                      View Appointments{" "}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-bs-toggle="collapse"
                href="#caseManager"
                aria-expanded="false"
                aria-controls="caseManager"
              >
                <span className="menu-title">Case Manager</span>
                <i className="fa fa-briefcase-medical menu-icon" />
              </a>
              <div
                className="collapse"
                id="caseManager"
                data-bs-parent="#sidebar"
              >
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <a className="nav-link" href="add-case-study.html">
                      Add Case Study
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="case-list.html">
                      View Case Study
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-bs-toggle="collapse"
                href="#bedManager"
                aria-expanded="false"
                aria-controls="bedManager"
              >
                <span className="menu-title">Bed Manager</span>
                <i className="fa fa-bed menu-icon" />
                {/* <i class="fa-solid fa-bed-pulse"></i> */}
              </a>
              <div
                className="collapse"
                id="bedManager"
                data-bs-parent="#sidebar"
              >
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <NavLink className="nav-link" to="add-beds">
                      Add New Bed
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="add-room">
                      Add New Room
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-link" to="bed-list">
                      Bed List
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-bs-toggle="collapse"
                href="#reports"
                aria-expanded="false"
                aria-controls="reports"
              >
                <span className="menu-title">Reports</span>
                <i className="fa fa-file-medical-alt menu-icon" />
              </a>
              <div className="collapse" id="reports" data-bs-parent="#sidebar">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-bs-toggle="collapse"
                      data-bs-target="#pathMenu"
                      aria-expanded="false"
                      aria-controls="pathMenu"
                    >
                      Pathology Reports
                    </a>
                    <ul
                      className="flex-column sub-menu collapse"
                      id="pathMenu"
                      data-bs-parent="#reports"
                      style={{ listStyle: "none" }}
                    >
                      <li>
                        <a href="#" className="nav-link">
                          Add New Report
                        </a>
                      </li>
                      <li>
                        <a href="#" className="nav-link">
                          Manage Reports
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-bs-toggle="collapse"
                      data-bs-target="#radMenu"
                      aria-expanded="false"
                      aria-controls="radMenu"
                    >
                      Radiology Reports
                    </a>
                    <ul
                      className="flex-column sub-menu collapse"
                      id="radMenu"
                      data-bs-parent="#reports"
                      style={{ listStyle: "none" }}
                    >
                      <li>
                        <a href="#" className="nav-link">
                          Add New Report
                        </a>
                      </li>
                      <li>
                        <a href="#" className="nav-link">
                          Manage Reports
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Birth Reports
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Death Reports
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-bs-toggle="collapse"
                href="#prescriptions"
                aria-expanded="false"
                aria-controls="prescriptions"
              >
                <span className="menu-title">Prescriptions</span>
                <i className="fa fa-prescription-bottle-alt menu-icon" />
              </a>
              <div
                className="collapse"
                id="prescriptions"
                data-bs-parent="#sidebar"
              >
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Add New Prescriptions
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Manage Prescriptions
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-bs-toggle="collapse"
                href="#pharmacy"
                aria-expanded="false"
                aria-controls="pharmacy"
              >
                <span className="menu-title">Pharmacy</span>
                <i className="fa fa-pills menu-icon" />
              </a>
              <div className="collapse" id="pharmacy" data-bs-parent="#sidebar">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-bs-toggle="collapse"
                      data-bs-target="#invtMenu"
                      aria-expanded="false"
                      aria-controls="invtMenu"
                    >
                      Inventory
                    </a>
                    <ul
                      className="flex-column sub-menu collapse"
                      id="invtMenu"
                      data-bs-parent="#pharmacy"
                      style={{ listStyle: "none" }}
                    >
                      <li>
                        <a href="#" className="nav-link">
                          Add Medicine Stock
                        </a>
                      </li>
                      <li>
                        <a href="#" className="nav-link">
                          Manage Stock
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-bs-toggle="collapse"
                      data-bs-target="#prsMenu"
                      aria-expanded="false"
                      aria-controls="prsMenu"
                    >
                      Prescriptions
                    </a>
                    <ul
                      className="flex-column sub-menu collapse"
                      id="prsMenu"
                      data-bs-parent="#pharmacy"
                      style={{ listStyle: "none" }}
                    >
                      <li>
                        <a href="Prescription-Table.html" className="nav-link">
                          Manage Prescriptions
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-bs-toggle="collapse"
                      data-bs-target="#billMenu"
                      aria-expanded="false"
                      aria-controls="billMenu"
                    >
                      Billing
                    </a>
                    <ul
                      className="flex-column sub-menu collapse"
                      id="billMenu"
                      data-bs-parent="#pharmacy"
                      style={{ listStyle: "none" }}
                    >
                      <li>
                        <a href="#" className="nav-link">
                          Generate Bill
                        </a>
                      </li>
                      <li>
                        <a href="#" className="nav-link">
                          Manage Bills
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-bs-toggle="collapse"
                      data-bs-target="#ordMenu"
                      aria-expanded="false"
                      aria-controls="ordMenu"
                    >
                      Orders
                    </a>
                    <ul
                      className="flex-column sub-menu collapse"
                      id="ordMenu"
                      data-bs-parent="#pharmacy"
                      style={{ listStyle: "none" }}
                    >
                      <li>
                        <a href="#" className="nav-link">
                          Internal Requisitions
                        </a>
                      </li>
                      <li>
                        <a href="#" className="nav-link">
                          External Supplier Orders
                        </a>
                      </li>
                      <li>
                        <a href="#" className="nav-link">
                          Manage Orders
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-bs-toggle="collapse"
                      data-bs-target="#repMenu"
                      aria-expanded="false"
                      aria-controls="repMenu"
                    >
                      Reports
                    </a>
                    <ul
                      className="flex-column sub-menu collapse"
                      id="repMenu"
                      data-bs-parent="#pharmacy"
                      style={{ listStyle: "none" }}
                    >
                      <li>
                        <a href="#" className="nav-link">
                          Stock Report
                        </a>
                      </li>
                      <li>
                        <a href="#" className="nav-link">
                          Dispensed Medicine Report
                        </a>
                      </li>
                      <li>
                        <a href="#" className="nav-link">
                          Returned Medicine Report
                        </a>
                      </li>
                      <li>
                        <a href="#" className="nav-link">
                          Revenue Report
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-bs-toggle="collapse"
                href="#insurance"
                aria-expanded="false"
                aria-controls="insurance"
              >
                <span className="menu-title">Insurance</span>
                <i className="fa fa-shield-alt menu-icon" />
              </a>
              <div
                className="collapse"
                id="insurance"
                data-bs-parent="#sidebar"
              >
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-bs-toggle="collapse"
                      data-bs-target="#polMenu"
                      aria-expanded="false"
                      aria-controls="polMenu"
                    >
                      Policy Management
                    </a>
                    <ul
                      className="flex-column sub-menu collapse"
                      id="polMenu"
                      data-bs-parent="#insurance"
                      style={{ listStyle: "none" }}
                    >
                      <li>
                        <a href="#" className="nav-link">
                          Add Insurance/Register Patient
                        </a>
                      </li>
                      <li>
                        <a href="#" className="nav-link">
                          Manage Insurance
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-bs-toggle="collapse"
                      data-bs-target="#claimMenu"
                      aria-expanded="false"
                      aria-controls="claimMenu"
                    >
                      Claims
                    </a>
                    <ul
                      className="flex-column sub-menu collapse"
                      id="claimMenu"
                      data-bs-parent="#insurance"
                      style={{ listStyle: "none" }}
                    >
                      <li>
                        <a href="#" className="nav-link">
                          Add Claim
                        </a>
                      </li>
                      <li>
                        <a href="#" className="nav-link">
                          Manage Claims
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-bs-toggle="collapse"
                      data-bs-target="#rpMenu"
                      aria-expanded="false"
                      aria-controls="rpMenu"
                    >
                      Report
                    </a>
                    <ul
                      className="flex-column sub-menu collapse"
                      id="rpMenu"
                      data-bs-parent="#insurance"
                      style={{ listStyle: "none" }}
                    >
                      <li>
                        <a href="#" className="nav-link">
                          Claim Summary / Report
                        </a>
                      </li>
                      <li>
                        <a href="#" className="nav-link">
                          Outstanding Claim Report
                        </a>
                      </li>
                      <li>
                        <a href="#" className="nav-link">
                          Approval Report
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-bs-toggle="collapse"
                href="#bloodBank"
                aria-expanded="false"
                aria-controls="bloodBank"
              >
                <span className="menu-title">Blood Bank</span>
                <i className="fa fa-tint menu-icon" />
              </a>
              <div
                className="collapse"
                id="bloodBank"
                data-bs-parent="#sidebar"
              >
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Add New Donor
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Manage Donors (Edit, Delete)
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Add Stock
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Manage Stock (Edit, Delete, Request Stock)
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Pricing
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-bs-toggle="collapse"
                href="#finances"
                aria-expanded="false"
                aria-controls="finances"
              >
                <span className="menu-title">Finances</span>
                <i className="fa fa-wallet menu-icon" />
              </a>
              <div className="collapse" id="finances" data-bs-parent="#sidebar">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Add Invoice
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Manage Invoices
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Financial Report
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-bs-toggle="collapse"
                href="#assetManagement"
                aria-expanded="false"
                aria-controls="assetManagement"
              >
                <span className="menu-title">Asset Management</span>
                <i className="fa fa-cogs menu-icon" />
              </a>
              <div
                className="collapse"
                id="assetManagement"
                data-bs-parent="#sidebar"
              >
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Add New Assets
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Manage Assets
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-bs-toggle="collapse"
                href="#activities"
                aria-expanded="false"
                aria-controls="activities"
              >
                <span className="menu-title">Activities</span>
                <i className="fa fa-tasks menu-icon" />
              </a>
              <div
                className="collapse"
                id="activities"
                data-bs-parent="#sidebar"
              >
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Add New Birth Records
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Manage Birth Records
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Add Death Records
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Manage Death Records
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-bs-toggle="collapse"
                href="#ambulanceManagement"
                aria-expanded="false"
                aria-controls="ambulanceManagement"
              >
                <span className="menu-title">Ambulance Management</span>
                <i className="fa fa-ambulance menu-icon" />
              </a>
              <div
                className="collapse"
                id="ambulanceManagement"
                data-bs-parent="#sidebar"
              >
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <NavLink className="nav-link" to="ambulance-dashboard">
                      Ambulance Dashboard
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="ambulance-add">
                      Add New Ambulance
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="ambulance-assignment">
                      Ambulance Assignment
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="add-driver">
                      Add Driver
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-bs-toggle="collapse"
                href="#healthPackages"
                aria-expanded="false"
                aria-controls="healthPackages"
              >
                <span className="menu-title">Health Packages</span>
                <i className="fa fa-heartbeat menu-icon" />
              </a>
              <div
                className="collapse"
                id="healthPackages"
                data-bs-parent="#sidebar"
              >
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Add Health Packages
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Manage Health Packages
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-bs-toggle="collapse"
                href="#noticeBoard"
                aria-expanded="false"
                aria-controls="noticeBoard"
              >
                <span className="menu-title">Notice Board</span>
                <i className="fa fa-bullhorn menu-icon" />
              </a>
              <div
                className="collapse"
                id="noticeBoard"
                data-bs-parent="#sidebar"
              >
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item">
                    <NavLink className="nav-link" to="add-new-notice">
                      Add New Notice
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="manage-notices">
                      Manage Notices
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <span className="menu-title">Settings</span>
                <i className="fa fa-cog menu-icon" />
              </a>
            </li>
          </ul>
        </nav>
        {/* partial */}
        <div className="main-panel">
          <div className="content-wrapper mt-n3">
            <Outlet />
          </div>
          {/* <Outlet /> */}

          {/* content-wrapper ends */}
          {/* partial:partials/_footer.html */}
          <footer className="footer">
            <div className="d-sm-flex justify-content-center justify-content-sm-between">
              <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">
                Copyright © 2025 Hospital Management System. All rights
                reserved.
                {/* <a href="#"> Terms of use</a
          ><a href="#">Privacy Policy</a> */}
              </span>
              <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
                Designed and Developed by
                <a
                  href="https://kavyainfoweb.com/"
                  target="_blank"
                  style={{ textDecoration: "none", color: "rgb(2, 62, 62)" }}
                >
                  Kavya Infoweb Pvt. Ltd.
                </a>
              </span>
            </div>
          </footer>
          {/* partial */}
        </div>
        {/* main-panel ends */}
      </div>
      {/* page-body-wrapper ends */}
    </div>
  );
};

export default Layout;
