import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { updateCurrentUser } from "../lib/Appwrite/chatAuth";
import { account } from "../lib/Appwrite/Config";

const EditProfile = () => {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();
  const nameref = useRef("");
  const usernameref = useRef("");
  const emailref=useRef("");
  const passwordref=useRef("");

  //const [error, setError] = useState("");
  const [displayToggle,setDisplayToggle]=useState("")
  const handleSubmit = async (e) => {
    e.preventDefault();
    const nameUp = nameref.current.value;
    const usernameUp = usernameref.current.value;
    const emailUp=emailref.current.valuemailRefe
    const passwordUp=passwordref.current.value;
   
    try{
      const currentUserUpdate = await updateCurrentUser(user, nameUp, usernameUp,emailUp,passwordUp);

      if (currentUserUpdate === undefined) {
        setDisplayToggle("Failed to update user.");
      } else {
        setDisplayToggle("User updated successfully.");
      }
      const updatedUser = await account.get();
      setUser(updatedUser);
      navigate("/")
    } catch (error) {
      console.error("Error updating user:", error);
      setDisplayToggle("Failed to update user.");
    }
  }

  return (
    <div className="pt-20 pb-20 sm:pt-16 md:pt-20 lg:pt-28">
      <div className="container mx-auto px-4">
        <div className="bg-slate-50 text-black p-6 sm:p-8 md:p-10 rounded-md shadow-md">
          <h1 className="font-bold text-lg sm:text-xl md:text-2xl text-yellow-500 text-center">
            Edit Profile
          </h1>
          {displayToggle && (
            <p
              className={`text-center ${
                displayToggle.includes("successfully")
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {displayToggle}
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="font-semibold text-gray-700">Name (Optional)</label>
              <input
                type="text"
                name="name"
                ref={nameref}
                className="w-full border-2 rounded-md py-2 px-4"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700">Username (Optional)</label>
              <input
                type="text"
                name="username"
                ref={usernameref}
                className="w-full border-2 rounded-md py-2 px-4"
              />
            </div>
            <div>
              <label className="font-semibold text-gray-700">Email (Optional)</label>
              <input
                type="email"
                name="email"
                ref={emailref}
                className="w-full border-2 rounded-md py-2 px-4"
              />
            </div>
            <div>
              <label className="font-semibold text-gray-700">Password (Optional)</label>
              <input
                type="password"
                name="password"
                ref={passwordref}
                className="w-full border-2 rounded-md py-2 px-4"
              />
            </div>


            {/* Save Changes Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-customTeal hover:bg-customdark text-white py-2 px-6 rounded-md transition duration-200 ease-in-out"
              >
                Save Changes
              </button>
            </div>
          </form>

          {/* Cancel Button */}
          <div className="mt-4 text-center">
            <button
              onClick={() => navigate("/")}
              className="text-blue-500 underline"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
