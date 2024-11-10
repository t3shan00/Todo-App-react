import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './screens/home.js';
import Authentication, { AuthenticationMode } from './screens/authentication.js';
import ErrorPage from './screens/errorPage.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './components/protectedRoute';
import UserProvider from './context/userProvider';

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />
  },
  {
    path: '/signin',
    element: <Authentication authenticationMode={AuthenticationMode.Login} />,
  },
  {
    path: '/signup',
    element: <Authentication authenticationMode={AuthenticationMode.Register} />
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <Home />
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
)
