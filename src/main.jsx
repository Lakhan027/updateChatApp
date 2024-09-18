import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom"
import {Router} from './utils/Router.jsx'
import UserProvider from './context/userContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
    <RouterProvider router={Router}/>
    </UserProvider>   
  </React.StrictMode>,
)
