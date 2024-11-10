import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './Home';
import Authentication, { AuthenticationMode } from './screens/authentication';
import ErrorPage from './screens/errorPage.js';
import { createBrowserRouter, RouteProvider } from 'react-router-dom';
import ProtectedRoute from './components/protectedRoute';
import UserProvider from './context/userProvider';
import { RouterProvider } from 'react-router-dom';

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

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
