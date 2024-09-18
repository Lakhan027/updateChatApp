import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { createNewUser, logInAccount } from "../lib/Appwrite/chatAuth";
import Loading from "../pages/Loading";

const Registration = () => {
  const { setUser, isLoading, setIsLoading, checkAuthUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [error, setError] = useState(''); 
  const nameref = useRef("");
  const usernameref = useRef("");
  const emailref = useRef("");
  const passwordref = useRef("");
  const termsRef = useRef(null);  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const name = nameref.current.value;
    const username = usernameref.current.value;
    const email = emailref.current.value;
    const pass = passwordref.current.value;

    // Check terms and conditions checkbox
    if (!termsRef.current.checked) {
      setError("You must accept the terms and conditions.");
      return;
    }

    // Reset state
    setIsLoading(true);
    setError('');

    // Check if email is valid
    if (!isValidEmail(email)) {
      setError("Invalid email format");
      setIsLoading(false);  // Stop loading when validation fails
      return;
    }

    try {
      // Create new user
      const newUser = await createNewUser({ name, username, email, pass });
      if (!newUser) throw new Error("User creation failed, try again.");

      // Log the user in
      const session = await logInAccount({ email, pass });
      if (!session) throw new Error("Login failed, try again.");

      // Check if the user is authenticated
      const isLoggedIn = checkAuthUser();
      if (isLoggedIn) {
        setUser({ name, username, email });  // Set user after successful login
        navigate("/");  // Redirect to homepage
        nameref.current.value = "";
        usernameref.current.value = "";
        emailref.current.value = "";
        passwordref.current.value = "";
      }

    } catch (error) {
      setError(error.message || "An error occurred during registration.");
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="pt-40 pb-20 sm:pt-16 md:pt-20 lg:pt-28">
      <div className="container mx-auto mt-8 sm:mt-12 md:mt-16 px-4">
        <div className="bg-slate-50 text-black p-6 sm:p-8 md:p-10 rounded-md shadow-md">
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <div className="flex justify-center">
                <h1 className="font-bold text-lg sm:text-xl md:text-2xl text-yellow-500">
                  Get Started with a New Account
                </h1>
              </div>
              <p className="border-t-2 border-dashed font-semibold text-center mt-4">
                Please enter your details
              </p>

              {/* Display error message if there's an error */}
              {error && (
                <div className="bg-red-100 text-red-600 border-red-400 border rounded p-2 my-2 text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="pt-2">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    className="w-full border-2 rounded-md py-1 px-2"
                    type="text"
                    ref={nameref}
                  />
                </div>
                <div className="pt-2">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    className="w-full border-2 rounded-md py-1 px-2"
                    ref={usernameref}
                  />
                </div>
                <div className="pt-2">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    id="email"
                    className="w-full border-2 rounded-md py-1 px-2"
                    ref={emailref}
                  />
                </div>
                <div className="pt-2">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="w-full border-2 rounded-md py-1 px-2"
                    ref={passwordref}
                  />
                </div>
                <div className="flex items-center pt-4">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mr-2 cursor-pointer"
                    ref={termsRef}
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
                      value="Sign Up"
                    />
                  )}
                </div>
              </form>
              <div className="pt-4 text-center">
                <p>
                  Have an account?{" "}
                  <a href="/login" className="text-blue-500 underline">
                    Log In
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
