import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import Loading from "../pages/Loading";
import Close from "./Close";

const UserProfile = ({ onClose }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate(); 

  if (!user) {
    return <Loading />;
  }

  const handleEditProfile = () => {
    navigate("/edit-profile"); 
  };

  const handleViewAllUsers = () => {
    navigate("/users");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pt-32">
      <div className="relative bg-slate-50 text-black p-6 sm:p-8 md:p-10 rounded-md shadow-md max-w-md w-full mx-4 sm:mx-8 md:mx-12">
      <button
  onClick={onClose}
  className="absolute top-2 right-2 py-1 px-2 rounded-full"
  aria-label="Close"
>
  <Close size="2x" />
</button>
        <h1 className="font-bold text-lg sm:text-xl md:text-2xl text-yellow-500 text-center">
          User Profile
        </h1>

        <div className="pt-4 flex justify-center">
          <img
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full"
            src={user.imageUrl}
            alt={`${user.name}'s avatar`}
          />
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <label className="font-semibold text-gray-700 text-sm sm:text-base">Name</label>
            <p className="text-gray-900 text-sm sm:text-base">{user.name}</p>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <label className="font-semibold text-gray-700 text-sm sm:text-base">Username</label>
            <p className="text-gray-900 text-sm sm:text-base">{user.username}</p>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <label className="font-semibold text-gray-700 text-sm sm:text-base">Email</label>
            <p className="text-gray-900 text-sm sm:text-base">{user.email}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row justify-center sm:space-x-4 space-y-4 sm:space-y-0">
          <button
            onClick={handleEditProfile}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-200 ease-in-out"
          >
            Edit Profile
          </button>
         
        </div>
      </div>
    </div>
  );
};

export default UserProfile;









// import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "../context/userContext";
// import Loading from "../pages/Loading";

// const UserProfile = () => {
//   const { user } = useContext(UserContext);
//   const navigate = useNavigate(); 
  
//   if (!user) {
//     return <Loading />;
//   }

//   const handleEditProfile = () => {
//     navigate("/edit-profile"); 
//   };

//   const handleGoHome = () => {
//     navigate("/"); 
//   };

//   const handleViewAllUsers = () => {
//     navigate("/users");
//   };

//   return (
//     <div className="pt-20 pb-20 sm:pt-16 md:pt-20 lg:pt-28">
//       <div className="container mx-auto px-4">
//         <div className="relative bg-slate-50 text-black p-6 sm:p-8 md:p-10 rounded-md shadow-md">
//           {/* Edit Profile Button in the Top Right Corner */}
//           <div className="absolute top-4 right-4">
//             <button
//               onClick={handleEditProfile}
//               className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-200 ease-in-out"
//             >
//               Edit
//             </button>
//           </div>

//           <h1 className="font-bold text-lg sm:text-xl md:text-2xl text-yellow-500 text-center">
//             User Profile
//           </h1>

//           <div className="pt-4 relative flex justify-center">
//             <img
//               className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full"
//               src={user.imageUrl}
//               alt={`${user.name}'s avatar`}
//             />
//           </div>

//           <div className="mt-6 space-y-4">
//             <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
//               <label className="font-semibold text-gray-700">Name</label>
//               <p className="text-gray-900">{user.name}</p>
//             </div>

//             <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
//               <label className="font-semibold text-gray-700">Username</label>
//               <p className="text-gray-900">{user.username}</p>
//             </div>

//             <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
//               <label className="font-semibold text-gray-700">Email</label>
//               <p className="text-gray-900">{user.email}</p>
//             </div>
//           </div>

//           {/* Additional Buttons */}
//           <div className="mt-6 flex justify-center space-x-4">
//             <button
//               onClick={handleGoHome}
//               className="bg-customTeal hover:bg-customdark text-white py-2 px-4 rounded-md transition duration-200 ease-in-out"
//             >
//               Home
//             </button>
//             <button
//               onClick={handleViewAllUsers}
//               className="bg-customTeal hover:bg-customdark text-white py-2 px-4 rounded-md transition duration-200 ease-in-out"
//             >
//               All Users
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;
