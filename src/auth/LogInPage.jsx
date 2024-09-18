import React, { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { logInAccount, logOutAccount } from '../lib/Appwrite/chatAuth'
import { UserContext } from '../context/userContext';
import Loading from '../pages/Loading';

const LogInPage = () => {
  const { isLoading, setIsLoading, checkAuthUser } = useContext(UserContext);
  
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const termsRef = useRef(null); 
  const navigate = useNavigate();

  const [error, setError] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const email = emailRef.current.value;
    const pass = passwordRef.current.value;
    
   
    if (!termsRef.current.checked) {
      setError("You must accept the terms and conditions.");
      return;
    }

    setIsLoading(true);
    setError(''); // Clear previous errors

    try {
      
      const isLoggedIn = checkAuthUser();
      if (isLoggedIn) {
        await logOutAccount();
        console.log("Logged out from existing session.");
      }

      
      const session = await logInAccount({ email, pass });
      if (!session) throw new Error("Incorrect email or password");

    
      const isNowLoggedIn = checkAuthUser();
      if (isNowLoggedIn) {
        navigate("/");
        emailRef.current.value = '';
        passwordRef.current.value = '';
        setIsLoading(false);
      }
    } catch (error) {
      setError(error.message || "An error occurred during login.");
      setIsLoading(false);
    }
  }

  return (
    <div className="pt-48 pb-20 sm:pt-16 md:pt-20 lg:pt-28">
      <div className="container mx-auto mt-8 sm:mt-12 md:mt-16 px-4">
        <div className="bg-slate-50 text-black p-6 sm:p-8 md:p-10 rounded-md shadow-md">
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <div className="flex justify-center">
                <h1 className="font-bold text-lg sm:text-xl md:text-2xl text-yellow-500">Welcome Back! Log In</h1>
              </div>
              <p className="border-t-2 border-dashed font-semibold text-center mt-4">
                Please enter your details
              </p>
              {error && (
                <div className="bg-red-100 text-red-600 border-red-400 border rounded p-2 my-2 text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="pt-2">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    id="email"
                    className="w-full border-2 rounded-md py-1 px-2"
                    ref={emailRef}
                  />
                </div>
                <div className="pt-2">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="w-full border-2 rounded-md py-1 px-2"
                    ref={passwordRef}
                  />
                </div>
                {/* <div className="pt-1">
                  <a href="/update-password" className="text-blue-500 underline">
                    Forget Password
                  </a>
              </div> */}
                <div className="flex items-center pt-6">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mr-2 cursor-pointer"
                    ref={termsRef} // Reference the checkbox
                  />
                  <label htmlFor="terms">
                    I accept the{" "}
                    <a href="/terms" className="text-blue-500 underline">
                      terms
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="text-blue-500 underline">
                      privacy policy
                    </a>
                  </label>
                </div>
                <div className="bg-blue-700 hover:bg-blue-800 mt-4 rounded-md text-center py-2">
                  {isLoading ? (
                    <Loading />
                  ) : (
                    <input
                      className="text-white cursor-pointer"
                      type="submit"
                      value="Log In"
                    />
                  )}
                </div>
              </form>
              <div className="pt-4 text-center">
                <p>
                  Have an account?{" "}
                  <a href="/registration" className="text-blue-500 underline">
                    SignUp
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogInPage;
