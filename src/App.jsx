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
import BedList from "./components/bed-manager/bed-list/BedList";
import BedAssign from "./components/bed-manager/bed-assign/BedAssign";
import AllottedBeds from "./components/bed-manager/alloted-beds/AllottedBeds";
import AddBeds from "./components/bed-manager/add-beds/AddBeds";
import AddRoom from "./components/bed-manager/add-room/AddRoom";
import LoginPage from "./components/auth/login/LoginPage";
import ForgotPassword from "./components/auth/forgot-password/ForgotPassword";

function App() {
  const router = createBrowserRouter([
    {
      path: "dashboard",
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

        // Ambulance Routes
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

        // Bed Manager Routes
        {
          path: "bed-list",
          element: <BedList />,
        },
        {
          path: "bed-assign",
          element: <BedAssign />,
        },
        {
          path: "allotted-beds",
          element: <AllottedBeds />,
        },
        {
          path: "add-beds",
          element: <AddBeds />,
        },
        {
          path: "add-room",
          element: <AddRoom />,
        },
      ],
    },
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "forgot-password",
      element: <ForgotPassword />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
