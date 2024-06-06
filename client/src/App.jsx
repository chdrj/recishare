import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import SearchPage from "./pages/SearchPage";

const routes = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/home',
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/search',
    element: <SearchPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

const App = () => {
  return (
    <RouterProvider router={routes} />
  );
};

export default App;