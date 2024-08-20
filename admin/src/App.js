import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RootLayout from "./layout/Root";

const Dashboard = lazy(() => import("./components/Dashboard"));
const Users = lazy(() => import("./components/Users"));
const Hotels = lazy(() => import("./components/Hotels"));
const Rooms = lazy(() => import("./components/Rooms"));
const Transactions = lazy(() => import("./components/Transactions"));
const NewHotel = lazy(() => import("./components/NewHotel"));
const NewRoom = lazy(() => import("./components/NewRoom"));
const Login = lazy(() => import("./components/Login"));
const EditHotel = lazy(() => import("./components/EditHotel"));
const EditRoom = lazy(() => import("./components/EditRoom"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "transactions", element: <Transactions /> },
      { path: "users", element: <Users /> },
      { path: "hotels", element: <Hotels /> },
      { path: "newHotel", element: <NewHotel /> },
      { path: "editHotel/:id", element: <EditHotel /> },
      { path: "rooms", element: <Rooms /> },
      { path: "newRoom", element: <NewRoom /> },
      { path: "editRoom/:id", element: <EditRoom /> },
    ],
  },
  { path: "/login", element: <Login /> },
]);
function App() {
  return (
    <AuthProvider>
      <Suspense>
        <RouterProvider router={router} />
      </Suspense>
    </AuthProvider>
  );
}

export default App;
