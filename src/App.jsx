import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import AddDoctor from "./components/add-doctor/AddDoctor";
import AdminDashboard from "./components/admin-dashboard/AdminDashboard";
import ManageEmployee from "./components/human-resorces/manage-employee/ManageEmployee";
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
import ViewNotices from "./components/notice/manage-notice/view-notice/ViewNotices";
import CreateNotice from "./components/notice/manage-notice/add-new-notice/CreateNotice";
import EmployeeRegistration from "./components/human-resorces/add-new-employee/EmployeeRegistration";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "registration",
      element: <EmployeeRegistration />,
    },
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
          element: <EmployeeRegistration />,
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

        // Notice Management Routes
        {
          path: "manage-notices",
          element: <ViewNotices />,
        },
        {
          path: "add-new-notice",
          element: <CreateNotice />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
