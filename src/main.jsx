import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom/client";
import './index.css'
import App from './App.jsx'
import ProtectedRoute from './ProtectedRoute.jsx';
import Allusers from './Allusers.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <App /> },          // home page (register/login)
  {
    path: "/loginusers", element: <ProtectedRoute>
      <Allusers />
    </ProtectedRoute>
  }  // users page
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

