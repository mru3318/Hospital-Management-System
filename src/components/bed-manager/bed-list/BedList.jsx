import React, { useState } from "react";
import "./BedList.css";
import { NavLink } from "react-router-dom";

const BedList = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const beds = [
    {
      id: 1,
      roomNo: "101",
      roomName: "General Ward",
      type: "General",
      vacant: 3,
      total: 5,
    },
    {
      id: 2,
      roomNo: "202",
      roomName: "ICU",
      type: "Critical Care",
      vacant: 0,
      total: 4,
    },
    {
      id: 3,
      roomNo: "303",
      roomName: "Private Room",
      type: "Deluxe",
      vacant: 2,
      total: 2,
    },
  ];

  const handleAssign = (roomNo) => {
    try {
      // Example action
      setSuccessMessage(`Bed assigned successfully for Room ${roomNo}!`);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="container my-4 p-0 m-0">
      <div className="card-border border rounded shadow-sm">
        {/* Header */}
        <div className="card-header d-flex justify-content-between align-items-center bg-light">
          <h5 className="mb-0">Vacant Beds</h5>
          <NavLink to="/allotted-beds" className="btn btn-sm btn-success">
            Allotted Beds
          </NavLink>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div
            className="alert alert-success alert-dismissible fade show mt-3 mx-3"
            role="alert"
          >
            <i className="fa fa-check-circle me-2"></i>
            <span>{successMessage}</span>
            <button
              type="button"
              className="btn-close"
              onClick={() => setSuccessMessage("")}
              aria-label="Close"
            ></button>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div
            className="alert alert-danger alert-dismissible fade show mt-3 mx-3"
            role="alert"
          >
            <i className="fa fa-triangle-exclamation me-2"></i>
            <span>{errorMessage}</span>
            <button
              type="button"
              className="btn-close"
              onClick={() => setErrorMessage("")}
              aria-label="Close"
            ></button>
          </div>
        )}

        {/* Table */}
        <div class="container">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-sm table-striped table-bordered align-middle">
                <thead className="table-light">
                  <tr>
                    <th>SL.NO</th>
                    <th>Room No</th>
                    <th>Room Name</th>
                    <th>Room Type</th>
                    <th>Vacant Beds</th>
                    <th>Total Beds</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {beds.map((bed, index) => (
                    <tr key={bed.id}>
                      <td>{index + 1}</td>
                      <td>{bed.roomNo}</td>
                      <td>{bed.roomName}</td>
                      <td>{bed.type}</td>
                      <td>{bed.vacant}</td>
                      <td>{bed.total}</td>
                      <td>
                        {bed.vacant > 0 ? (
                          <NavLink
                            className="btn btn-sm btn-success"
                            to="/bed-assign"
                            // onClick={() => handleAssign(bed.roomNo)}
                          >
                            Assign
                          </NavLink>
                        ) : (
                          <span className="btn btn-sm btn-secondary disabled">
                            No Beds
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BedList;
