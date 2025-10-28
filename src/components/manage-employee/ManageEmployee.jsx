import "./ManageEmployee.css";

const ManageEmployee = () => {
  return (
    <div className="content-wrapper mt-4">
      {/* ############################################################## */}
      <div className="container-fluid">
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">Employee List</h5>
          </div>
          <div className="card-body">
            <table
              id="employeeTable"
              className="table table-striped table-bordered dt-responsive nowrap"
              style={{ width: "100%" }}
            >
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>Employee ID</th>
                  <th>Profile</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Mobile No</th>
                  <th>Gender</th>
                  <th>Date of Birth</th>
                  <th>Joining Date</th>
                  <th>Designation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>EMP001</td>
                  <td>
                    <img
                      src="assets/images/faces/face1.jpg"
                      className="profile-img"
                    />
                  </td>
                  <td>Amit</td>
                  <td>Sharma</td>
                  <td>amit@gmail.com</td>
                  <td>9876543210</td>
                  <td>Male</td>
                  <td>1986-03-15</td>
                  <td>2015-01-12</td>
                  <td>Doctor</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>EMP002</td>
                  <td>
                    <img
                      src="assets/images/faces/face10.jpg"
                      className="profile-img"
                    />
                  </td>
                  <td>Neha</td>
                  <td>Verma</td>
                  <td>neha@gmail.com</td>
                  <td>9123456789</td>
                  <td>Female</td>
                  <td>1992-07-25</td>
                  <td>2018-05-20</td>
                  <td>Accountant</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>EMP003</td>
                  <td>
                    <img
                      src="assets/images/faces/face3.jpg"
                      className="profile-img"
                    />
                  </td>
                  <td>Rohit</td>
                  <td>Kumar</td>
                  <td>rohit@gmail.com</td>
                  <td>9988776655</td>
                  <td>Male</td>
                  <td>1989-11-02</td>
                  <td>2019-09-10</td>
                  <td>Pharmacist</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* ####################################################################### */}
    </div>
  );
};

export default ManageEmployee;
