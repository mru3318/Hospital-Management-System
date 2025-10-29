import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import AddDoctor from "./components/add-doctor/AddDoctor";
import AddNewEmployee from "./components/add-new-employee/AddNewEmployee";
import AdminDashboard from "./components/admin-dashboard/AdminDashboard";
import ManageEmployee from "./components/manage-employee/ManageEmployee";
import AmbulanceAdd from "./components/ambulance/ambulance-add/AmbulanceAdd";
import AmbulanceAssignment from "./components/ambulance/ambulance-assignment/AmbulanceAssignment";
import AmbulanceDashboard from "./components/ambulance/ambulance-dashboard/AmbulanceDashboard";
import AddDriver from "./components/ambulance/add-driver/AddDriver";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <AdminDashboard />,
        },
        {
          path: "add-doctor",
          element: <AddDoctor />,
        },
        {
          path: "add-new-employee",
          element: <AddNewEmployee />,
        },

        {
          path: "manage-employees",
          element: <ManageEmployee />,
        },
        {
          path: "ambulance-add",
          element: <AmbulanceAdd />,
        },
        {
          path: "ambulance-assignment",
          element: <AmbulanceAssignment />,
        },
        {
          path: "ambulance-dashboard",
          element: <AmbulanceDashboard />,
        },
        {
          path: "add-driver",
          element: <AddDriver />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
