import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import AddDoctor from "./components/add-doctor/AddDoctor";
import AddNewEmployee from "./components/add-new-employee/AddNewEmployee";
import AdminDashboard from "./components/admin-dashboard/AdminDashboard";
import ManageEmployee from "./components/manage-employee/ManageEmployee";

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
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
