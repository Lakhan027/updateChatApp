import { createContext, useEffect, useState } from "react"
import { getCurrentUser } from "../lib/Appwrite/chatAuth";
import { Navigate } from "react-router-dom";


export const INITIAL_USER={
  id: '',
  name: '',
  username: '',
  email: '',
  imageUrl: '',
}

// Define the initial state
const INITIAL_STATE = {
  user: INITIAL_USER,
  setUser: () => {},
  isAuthenticated:false,
  isLoading:false,
  setIsAuthenticated:()=>{},
  setIsLoading:()=>{},
  checkAuthUser: async () => true,
};

export const UserContext=createContext(INITIAL_STATE);

const UserProvider=({children})=>{
    const [user,setUser]=useState(INITIAL_USER)
    const [anotherUserId,setAnotherUserId]=useState('');
    const [isAuthenticated,setIsAuthenticated]=useState(false);
    const [isLoading,setIsLoading]=useState(false);
    const [newMessage, setNewMessage] = useState(false);

    const checkAuthUser = async () => {
    //setIsLoading(true);
    try {
      const currentAccount = await getCurrentUser();
      if (currentAccount) {
        const userData = {
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
        };
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
        setIsLoading(false);
        return true;
      }
      setIsAuthenticated(false);
      setIsLoading(false);
      return false; 
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      return false;
    }
  };

    
    useEffect(()=>{
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      }

      const cookieFallback = localStorage.getItem('cookiFallback');
      if (cookieFallback === '[]' || cookieFallback === null) {
          <Navigate to="/registration"/>;
      } else {
        checkAuthUser();
      }
    },[])

    const value={
      user,
      setUser,
      anotherUserId,
      setAnotherUserId,
      isAuthenticated,
      setIsAuthenticated,
      isLoading,
      setIsLoading,
      checkAuthUser
    }
    
    return (
       <UserContext.Provider value={value}>
        {children}
       </UserContext.Provider>
    );
}

export default UserProvider;

