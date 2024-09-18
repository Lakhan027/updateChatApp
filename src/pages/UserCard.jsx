import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { databases, config } from "../lib/Appwrite/Config";
import { Query } from "appwrite";

const UserCard = ({ userInfo }) => {
  const { user,setAnotherUserId} = useContext(UserContext);
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
 
  const fetchUnreadMessages = async () => {
    try {
      const unreadMessages = await databases.listDocuments(
        config.databaseId,
        config.collectionId,
        [
          Query.equal("user_id", userInfo.$id), // Messages sent by userInfo
          Query.equal("user2_id", user.id), // Messages received by the current user
          Query.equal("isRead", false), // Only unread messages
        ]
      );
      setUnreadCount(unreadMessages.total);
    } catch (error) {
      console.error("Error fetching unread messages:", error);
    }
  };

  useEffect(() => {
    fetchUnreadMessages();
  }, []);

  const handleMessageButton = async (e) => {
    e.stopPropagation(); // Prevent the card click event
    setAnotherUserId(userInfo.$id)
    try {
      const unreadMessages = await databases.listDocuments(
        config.databaseId,
        config.collectionId,
        [
          Query.equal("user_id", userInfo.$id), // Messages sent by userInfo
          Query.equal("user2_id", user.id), // Messages received by the current user
          Query.equal("isRead", false), // Only unread messages
        ]
      );

      // Mark all unread messages as read
      unreadMessages.documents.forEach(async (message) => {
        await databases.updateDocument(
          config.databaseId,
          config.collectionId,
          message.$id,
          { isRead: true }
        );
      });

      setUnreadCount(0);
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }

    navigate(`/room/${userInfo.$id}`);
  };

  const handleCardClick = () => {
    setShowModal(true); // Show modal on card click
  };

  const closeModal = () => {
    setShowModal(false); // Close modal
  };

  return (
    <div className="relative" key={userInfo.$id}>
      <div
        className="max-w-sm rounded overflow-hidden shadow-lg bg-white flex flex-col justify-center items-center transform transition-transform duration-200 hover:scale-105 cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="pt-4 relative">
          <img
            className="w-20 h-20 rounded-full"
            src={userInfo.imageUrl}
            alt={`${userInfo.name}'s avatar`}
          />
          {unreadCount > 0 && (
            <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
              {unreadCount}
            </div>
          )}
        </div>
        <div className="px-6 py-4">
          <div className="font-bold text-gray-700 text-2xl mb-2 text-center">
            {userInfo.name}
          </div>
          <p className="font-semibold text-gray-700 text-base text-center">
            @{userInfo.username}
          </p>
        </div>
        <button
          onClick={handleMessageButton}
          className="text-white border-2 rounded-md p-2 bg-customTeal hover:bg-customdark ml-6 px-5 mt-2 text-center mb-4 mr-6"
        >
          Message
        </button>
      </div>

      {/* Modal for displaying user details */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-black rounded-md shadow-lg p-8 max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">
              {userInfo.name}'s Profile
            </h2>
            <p className="mb-2">
              <strong>Name:</strong> {userInfo.name}
            </p>
            <p className="mb-2">
              <strong>Username:</strong> @{userInfo.username}
            </p>
            <p className="mb-2">
              <strong>Email:</strong> {userInfo.email}
            </p>
            <button
              onClick={closeModal}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;

// import React, { useState, useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "../context/userContext";
// import { databases, config } from "../lib/Appwrite/Config";
// import { Query } from "appwrite";

// const UserCard = ({ userInfo, index }) => {
//   const { user } = useContext(UserContext);
//   const navigate = useNavigate();
//   const [unreadCount, setUnreadCount] = useState(0);

//   const fetchUnreadMessages = async () => {
//     try {
//       const unreadMessages = await databases.listDocuments(
//         config.databaseId,
//         config.collectionId,
//         [
//           Query.equal("user_id",userInfo.$id),  // Messages sent by userInfo
//           Query.equal("user2_id",user.id),     // Messages received by the current user
//           Query.equal("isRead", false),          // Only unread messages
//         ]
//       );
//       setUnreadCount(unreadMessages.total);
//     } catch (error) {
//       console.error("Error fetching unread messages:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUnreadMessages();
//   }, []);

//   const handleMessageButton = async (userId) => {
//     try {
//       const unreadMessages = await databases.listDocuments(
//         config.databaseId,
//         config.collectionId,
//         [
//           Query.equal("user_id",userInfo.$id),  // Messages sent by userInfo
//           Query.equal("user2_id",user.id),     // Messages received by the current user
//           Query.equal("isRead", false),          // Only unread messages
//         ]
//       );

//       // Mark all unread messages as read
//       unreadMessages.documents.forEach(async (message) => {
//         await databases.updateDocument(
//           config.databaseId,  // First parameter should be databaseId
//           config.collectionId,  // Second parameter should be collectionId
//           message.$id,
//           { isRead: true }  // Set isRead to true
//         );
//       });

//       setUnreadCount(0);
//     } catch (error) {
//       console.error("Error marking messages as read:", error);
//     }

//     navigate(`/room/${userId}`);
//   };

//   return (
//     <div key={index} className="relative">
//       <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white flex flex-col justify-center items-center">
//         <div className="pt-4 relative">
//           <img
//             className="w-20 h-20 rounded-full"
//             src={userInfo.imageUrl}
//             alt={`${userInfo.name}'s avatar`}
//           />
//           {unreadCount > 0 && (
//             <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
//               {unreadCount}
//             </div>
//           )}
//         </div>
//         <div className="px-6 py-4">
//           <div className="font-bold text-gray-700 text-2xl mb-2 text-center">
//             {userInfo.name}
//           </div>
//           <p className="font-semibold text-gray-700 text-base text-center">
//             @{userInfo.username}
//           </p>
//         </div>
//         <button
//           onClick={() => handleMessageButton(userInfo.$id)}
//           className="text-white border-2 rounded-md p-2 bg-customTeal hover:bg-customdark ml-6 px-5 mt-2 text-center mb-4 mr-6"
//         >
//           Message
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UserCard;
