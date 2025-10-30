import React from "react";

const ViewNotices = () => {
  const notices = [
    {
      title: "Hospital Holiday Notice",
      description:
        "Hospital will remain closed on 1st November for maintenance.",
      startDate: "2025-10-29T09:00",
      endDate: "2025-10-29T17:00",
    },
    {
      title: "Staff Meeting",
      description:
        "Quarterly review meeting for all staff members in Conference Hall.",
      startDate: "2025-11-02T10:00",
      endDate: "2025-11-02T12:00",
    },
    {
      title: "New Policy Update",
      description:
        "All employees must review the updated leave policy document.",
      startDate: "2025-10-30T09:00",
      endDate: "2025-10-31T18:00",
    },
  ];

  return (
    <div className="card shadow-sm border-0">
      {/* Header */}
      <div
        className="card-header text-white text-center py-3"
        style={{ backgroundColor: "#01C0C8" }}
      >
        <h4 className="mb-0">
          <i className="fas fa-bullhorn me-2"></i>Notice List
        </h4>
      </div>

      <div className="card-body">
        {/* Alerts */}
        <div
          className="alert alert-success text-center"
          role="alert"
          style={{ display: "none" }}
        >
          <i className="fas fa-check-circle me-2"></i>Success message here.
        </div>
        <div
          className="alert alert-danger text-center"
          role="alert"
          style={{ display: "none" }}
        >
          <i className="fas fa-exclamation-circle me-2"></i>Error message here.
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table table-bordered table-striped align-middle text-center mb-0">
            <thead style={{ backgroundColor: "#E0F7FA" }}>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col">Attachment</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>

            <tbody>
              {notices.map((notice, index) => (
                <tr key={index}>
                  <td className="fw-semibold">{notice.title}</td>
                  <td>{notice.description}</td>
                  <td>
                    <input
                      type="datetime-local"
                      className="form-control form-control-sm text-center"
                      value={notice.startDate}
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      type="datetime-local"
                      className="form-control form-control-sm text-center"
                      value={notice.endDate}
                      readOnly
                    />
                  </td>
                  <td>
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm w-100 text-white"
                      style={{ backgroundColor: "#01C0C8" }}
                    >
                      Download
                    </a>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <button
                        className="btn btn-sm text-white px-3"
                        style={{ backgroundColor: "#01C0C8" }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm px-3"
                        onClick={() =>
                          window.confirm(
                            "Are you sure you want to delete this notice?"
                          )
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewNotices;
