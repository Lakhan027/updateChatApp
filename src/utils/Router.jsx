import React from 'react'
import {createBrowserRouter} from "react-router-dom";
import App from '../App';
import Registration from '../auth/Registration';
import Room from '../pages/Room';
import LogInPage from '../auth/LogInPage';
import Users from '../pages/Users';
import PrivateRoute from './PrivateRoute';
import UserProfile from '../pages/UserProfile';
import EditUserProfile from '../pages/EditUserProfile';
import UpdatePass from '../pages/UpdatePass';

export const Router =createBrowserRouter([
    {path:"/",element:<App/>},
    {path:"/registration",element:<Registration/>},
    {path:"/login",element:<LogInPage/>},
    {path:"/update-password",element:<UpdatePass/>},
    {
      path: "/room/:userId",
      element: (
        <PrivateRoute>
          <Room />
        </PrivateRoute>
      )
    },
    {
      path: "/users",
      element: (
        <PrivateRoute>
          <Users />
        </PrivateRoute>
      )
    },
    {
      path: "/profile",
      element: (
        <PrivateRoute>
          <UserProfile/>
        </PrivateRoute>
      )
    },
    {
      path: "/edit-profile",
      element: (
        <PrivateRoute>
          <EditUserProfile />
        </PrivateRoute>
      )
    },
  ])

