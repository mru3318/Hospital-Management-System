import React, { useState } from "react";

const BedAssign = () => {
  const [formData, setFormData] = useState({
    roomId: "1",
    bedNo: "",
    roomName: "General Ward",
    patientId: "",
    roomType: "Shared",
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const bedOptions = [
    { id: "1", label: "B-101" },
    { id: "2", label: "B-102" },
    { id: "3", label: "B-103" },
  ];

  const patientOptions = [
    { id: "P001", name: "John Doe" },
    { id: "P002", name: "Jane Smith" },
    { id: "P003", name: "David Lee" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.bedNo || !formData.patientId) {
      setErrorMsg("Please fill all required fields.");
      setSuccessMsg("");
      return;
    }

    // Example: API call simulation
    console.log("Bed Assigned:", formData);

    setSuccessMsg("Bed assigned successfully!");
    setErrorMsg("");
    setFormData({
      ...formData,
      bedNo: "",
      patientId: "",
    });
  };

  return (
    <div className="container my-4 p-0 m-0">
      <div className="card-border border rounded shadow-sm">
        {/* Header */}
        <div className="card-header d-flex justify-content-center align-items-center bg-light">
          <i className="fa fa-bed fs-3 me-2"></i>
          <h3 className="mb-0">Assign Beds</h3>
        </div>

        {/* Messages */}
        {errorMsg && (
          <div className="text-danger fw-bold mb-3 text-center mt-3">
            <p>{errorMsg}</p>
          </div>
        )}
        {successMsg && (
          <div className="text-success fw-bold mb-3 text-center mt-3">
            <p>{successMsg}</p>
          </div>
        )}

        {/* Form */}
        <div className="container-fluid my-3">
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="roomId" value={formData.roomId} />

            <div className="row g-3">
              {/* Bed No */}
              <div className="col-md-6">
                <label htmlFor="bedNo" className="form-label fw-semibold">
                  Bed No <span className="text-danger">*</span>
                </label>
                <select
                  id="bedNo"
                  name="bedNo"
                  className="form-select"
                  value={formData.bedNo}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select Bed No --</option>
                  {bedOptions.map((bed) => (
                    <option key={bed.id} value={bed.id}>
                      {bed.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Room Name */}
              <div className="col-md-6">
                <label htmlFor="roomName" className="form-label fw-semibold">
                  Room Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="roomName"
                  name="roomName"
                  className="form-control"
                  value={formData.roomName}
                  readOnly
                  required
                />
              </div>

              {/* Patient ID */}
              <div className="col-md-6">
                <label htmlFor="patientId" className="form-label fw-semibold">
                  Patient ID <span className="text-danger">*</span>
                </label>
                <select
                  id="patientId"
                  name="patientId"
                  className="form-select"
                  value={formData.patientId}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select Patient --</option>
                  {patientOptions.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.id} - {p.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Room Type */}
              <div className="col-md-6">
                <label htmlFor="roomType" className="form-label fw-semibold">
                  Room Type
                </label>
                <input
                  type="text"
                  id="roomType"
                  name="roomType"
                  className="form-control bg-light text-muted"
                  value={formData.roomType}
                  readOnly
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center my-3">
              <button type="submit" className="btn button px-4">
                Assign Bed
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BedAssign;
