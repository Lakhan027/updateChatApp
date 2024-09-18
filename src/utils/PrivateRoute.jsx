import React, { useContext, useEffect,} from 'react'
import { UserContext } from '../context/userContext'
import { Navigate } from 'react-router-dom';


const PrivateRoute = ({children}) => {
  const {isAuthenticated}=useContext(UserContext);
 
  useEffect(()=>{

    if (isAuthenticated) {
      localStorage.setItem("isAuthenticated",isAuthenticated);
      
    }
  },[isAuthenticated])
  
  const storedisAuthenticated = localStorage.getItem("isAuthenticated");
 
  return storedisAuthenticated ? (children):(<Navigate to="/"/>)
  
}

export default PrivateRoute