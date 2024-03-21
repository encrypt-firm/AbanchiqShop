import React from 'react';

import './App.css';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Menu from './Pages/Menu/Menu';
import Home from './Components/Home/Home';

// import Navbar from './Components/Navbar/Navbar';

import Orders from './Pages/Orders/Orders';
import Notifications from './Pages/Notifications/Notifications';
import Products from './Pages/Products/Products';

// import DatabaseUpload from './Pages/CreateFeed/Feeds.js'
import LoginPage from './Pages/Login/LoginPage.js'
import RegisterPage from './Pages/Register/RegisterPage.js'
import Feeds from './Pages/CreateFeed/Feeds.js';
import FeedsUpdate from './Pages/CreateFeed/FeedsUpdate.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Header from './Components/Header/Header.js';
import Error from './Pages/404/Error.js'
import Verify from './Pages/Verify/Verify.js';
import PasswordResetByMail from './Pages/PasswordResetByMail/PasswordResetByMail.js';
import ResetPassword from './Pages/ResetPassword/ResetPassword.js';
function App() {

  const Layout = () => {
    return (
      <div className="mainApp">
        <div className="navbar">
          <Header />
        </div>
        <div className="mainContainer">
          <div className="menuContainer">
            <div className="menu">
              <Menu />
            </div>
          </div>
          <div className="contentContainer">
            <div className="Outlet">
              <Outlet />
            </div>
          </div>
        </div>
        {/* <div className="Footer">Footer</div> */}
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <div className="Home"><LoginPage /></div>
    },
    {
      path: '/dashboard',
      element: <Layout />,
      children: [
        {
          path: "/dashboard",
          element: <div className="Home">
            <Home />
          </div>
        },
        {
          path: "/dashboard/uploads/:id",
          element: <div className="Home"><Feeds /></div>
        },
        {
          path: "/dashboard/products/:id",
          element: <div className="Home"><Products /></div>
        },
        {
          path: "/dashboard/profile/:id",
          element: <div className="Home">Profile</div>
        },
        {
          path: "/dashboard/notifications/:id",
          element: <div className="Home"><Notifications /></div>
        },
        {
          path: "/dashboard/settings/:id",
          element: <div className="Home"><Orders /></div>
        },
        {
          path: "/dashboard/editfeed/:id",
          element: <div className="Home"><FeedsUpdate /></div>
        },
      ]
    },
    {
      path: "/login",
      element: <div className="Home">
        <LoginPage />
      </div>
    },
    {
      path: "/register",
      element: <div className="Home">
        <RegisterPage />
      </div>
    },
    {
      path: "/*",
      element: <div className="err"><Error /> </div>
    },
    {
      path: "/verify/:token",
      element:
        <div className="register">
          <Verify />
        </div>
      ,
    },
    {
      path: "/account/forgot-password",
      element:
        <div className="register">
          <PasswordResetByMail />
        </div>
      ,
    },
    {
      path: "/account/reset/:token",
      element:
        <div className="register">
          <ResetPassword />
        </div>
      ,
    },
  ])

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position='bottom-center'
        autoClose={5000}
        hideProgressBar={false}
        draggable
        newestOnTop
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme='dark'
      />
    </>
  );
}

export default App;
