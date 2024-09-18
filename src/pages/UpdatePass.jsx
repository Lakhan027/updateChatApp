import React, { useRef, useState } from 'react';
import { account } from '../lib/Appwrite/Config';
import { useNavigate } from 'react-router-dom';

const UpdatePass = () => {
  const navigate=useNavigate();
  const passwordRef1 = useRef(null);
  const passwordRef2 = useRef(null);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [passwordError, setPasswordError] = useState('');  // State to show password mismatch error

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    const password1 = passwordRef1.current.value;
    const password2 = passwordRef2.current.value;
    const userSession = await account.get();
    console.log(userSession)
    if (password1 !== password2) {
      setPasswordError('Passwords do not match');
    } else {
      await account.updatePassword(password2);
      navigate('/login')
      setPasswordError('');
      
      console.log('Passwords match! Form submitted.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Update Password</h2>

        <form onSubmit={handleSubmit}>
         
          <div className="mb-4">
            <label className="font-semibold text-gray-700 block mb-2">Enter New Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              ref={passwordRef1}
              className="w-full border-2 rounded-md py-2 px-4 text-black"
              placeholder="Enter new password"
            />
          </div>

         
          <div className="mb-4">
            <label className="font-semibold text-gray-700 block mb-2">Re-enter Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              ref={passwordRef2}
              className="w-full border-2 rounded-md py-2 px-4 text-black"
              placeholder="Re-enter password"
            />
          </div>

         
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="showPassword"
              className="mr-2"
              checked={showPassword}
              onChange={togglePasswordVisibility}
            />
            <label htmlFor="showPassword" className="text-gray-700">Show Password</label>
          </div>

          {/* Error Message */}
          {passwordError && (
            <div className="text-red-500 text-center mb-4">{passwordError}</div>
          )}

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
      </div>
    </div>
  );
}

export default UpdatePass;
