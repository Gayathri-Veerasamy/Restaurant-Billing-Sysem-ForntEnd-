import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Admin from '/src/components/Admin.jsx'
import User from '/src/components/User.jsx'
import Cart from '/src/components/Cart.jsx'
import Admin_to_show from '/src/components/Admin_to_show.jsx'
import EditItemPage from '/src/components/EditItemPage.jsx'
import AdminLogin from '/src/components/AdminLogin.jsx'
import ProtectedRoute from '/src/components/ProtectedRoute.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/admin-login',
    element: <AdminLogin />
  },
  {
    path: '/Admin',
    element: (
      <ProtectedRoute>
        <Admin />
      </ProtectedRoute>
    )
  },
  {
    path: '/Admintoshow',
    element: (
      <ProtectedRoute>
        <Admin_to_show />
      </ProtectedRoute>
    )
  },
  {
    path: '/User',
    element: <User />
  },
  {
    path: '/Cart',
    element: <Cart />
  },
  {
    path: 'edit/:id',
    element: <EditItemPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
