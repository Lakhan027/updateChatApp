import React, { useState, useContext } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { logOutAccount } from '../lib/Appwrite/chatAuth';
import { UserContext } from '../context/userContext';

const Header = ({ onProfileClick }) => {
  const { isAuthenticated } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the current location
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logIn = () => {
    navigate('/login');
  };

  const logOut = async () => {
    try {
      await logOutAccount(); // Assuming logOutAccount is async
      localStorage.removeItem('user');
      localStorage.removeItem('cookieFallback');
      localStorage.removeItem('anotherUserId');
      localStorage.removeItem('isAuthenticated');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-customDarkTeal border-b-2 border-customTeal relative">
      <div className="mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <a
              href="/"
              className="text-lg sm:text-xl text-customRedOrange font-bold md:text-2xl rounded-md p-1 border-2 border-customTeal"
            >
              ℂ𝕙𝕒𝕥𝔹𝕦𝕕𝕕𝕪
            </a>
          </div>
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-customRedOrange"
              aria-label="Toggle navigation"
              onClick={toggleMenu}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
          <div
            className={`${
              isOpen ? 'block' : 'hidden'
            } absolute top-16 right-0 bg-customDarkTeal border border-customTeal p-4 rounded-md md:hidden z-50`}
          >
            <div className="flex flex-col items-start space-y-2">
              {isAuthenticated ? (
                <>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? 'text-customRedOrange hover:text-red-500 px-3 py-2 text-sm font-medium underline'
                        : 'text-customRedOrange hover:text-red-500 px-3 py-2 text-sm font-medium'
                    }
                    onClick={toggleMenu}
                  >
                    Home
                  </NavLink>

                  <NavLink
                    to="/users"
                    className={({ isActive }) =>
                      isActive
                        ? 'text-customRedOrange hover:text-red-500 px-3 py-2 text-sm font-medium underline'
                        : 'text-customRedOrange hover:text-red-500 px-3 py-2 text-sm font-medium'
                    }
                    onClick={toggleMenu}
                  >
                    All Users
                  </NavLink>

                  {location.pathname === '/' && ( // Conditionally show Profile button
                    <button
                      onClick={onProfileClick}
                      className="text-customRedOrange hover:text-red-500 px-3 py-2 text-sm font-medium"
                    >
                      Profile
                    </button>
                  )}

                  <button
                    onClick={logOut}
                    className="text-customDarkTeal font-bold border-2 border-customTeal rounded-md p-2 bg-customRedOrange hover:bg-customDarkTeal hover:text-customRedOrange hover:border-customRedOrange"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <button
                  onClick={logIn}
                  className="text-customDarkTeal font-bold border-2 border-customTeal rounded-md p-2 bg-customRedOrange hover:bg-customDarkTeal hover:text-customRedOrange hover:border-customRedOrange"
                >
                  Log In
                </button>
              )}
            </div>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-4">
            {isAuthenticated ? (
              <>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-customRedOrange hover:text-red-500 px-3 py-2 text-sm font-medium underline'
                      : 'text-customRedOrange hover:text-red-500 px-3 py-2 text-sm font-medium'
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/users"
                  className={({ isActive }) =>
                    isActive
                      ? 'text-customRedOrange hover:text-red-500 px-3 py-2 text-sm font-medium underline'
                      : 'text-customRedOrange hover:text-red-500 px-3 py-2 text-sm font-medium'
                  }
                >
                  All Users
                </NavLink>

                {location.pathname === '/' && ( // Conditionally show Profile button
                  <button
                    onClick={onProfileClick}
                    className="text-customRedOrange hover:text-red-500 px-3 py-2 text-sm font-medium"
                  >
                    Profile
                  </button>
                )}

                <button
                  onClick={logOut}
                  className="text-xs md:text-md text-customDarkTeal font-bold border-2 border-customTeal rounded-md p-2 bg-customRedOrange hover:bg-customDarkTeal hover:text-customRedOrange hover:border-customRedOrange"
                >
                  Log Out
                </button>
              </>
            ) : (
              <button
                onClick={logIn}
                className="text-xs md:text-md text-customDarkTeal font-bold border-2 border-customTeal rounded-md p-2 bg-customRedOrange hover:bg-customDarkTeal hover:text-customRedOrange hover:border-customRedOrange"
              >
                Log In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;























// import React, { useContext, useState } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { logOutAccount } from '../lib/Appwrite/chatAuth';
// import { UserContext } from '../context/userContext';

// const Header = () => {
//   const { isAuthenticated } = useContext(UserContext);
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const logIn = () => {
//     navigate('/login');
//   };

//   const logOut = async () => {
//     try {
//       await logOutAccount(); // Assuming logOutAccount is async
//       localStorage.removeItem('user');
//       localStorage.removeItem('cookieFallback');
//       localStorage.removeItem('anotherUserId');
//       localStorage.removeItem('isAuthenticated');
//       navigate('/login');
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   return (
//     <nav className="bg-customDarkTeal border-b-2 border-customTeal relative">
//       <div className=" mx-auto px-4 sm:px-6">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex-shrink-0">
//             <a
//               href="/"
//               className="text-lg sm:text-xl text-customRedOrange font-bold md:text-2xl rounded-md p-1 border-2 border-customTeal"
//             >
//               ℂ𝕙𝕒𝕥𝔹𝕦𝕕𝕕𝕪
//             </a>
//           </div>
//           <div className="flex md:hidden">
//             <button
//               type="button"
//               className="text-customRedOrange"
//               aria-label="Toggle navigation"
//               onClick={toggleMenu}
//             >
//               <svg
//                 className="h-6 w-6"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16M4 12h16m-7 6h7"
//                 />
//               </svg>
//             </button>
//           </div>
//           <div
//             className={`${
//               isOpen ? 'block' : 'hidden'
//             } absolute top-16 right-0 bg-customDarkTeal border border-customTeal p-4 rounded-md md:hidden z-50`}
//           >
//             <div className="flex flex-col items-start space-y-2">
//               {isAuthenticated ? (
//                 <>
//                   <NavLink
//                     to="/"
//                     className={({ isActive }) =>
//                       isActive
//                         ? 'text-customRedOrange hover:text-red-500 px-3 py-2 text-sm font-medium underline'
//                         : 'text-customRedOrange hover:text-red-500 px-3 py-2 text-sm font-medium'
//                     }
//                     onClick={toggleMenu}
//                   >
//                     Home
//                   </NavLink>

//                   <NavLink
//                     to="/users"
//                     className={({ isActive }) =>
//                       isActive
//                         ? 'text-customRedOrange hover:text-red-500 px-3 py-2 text-sm font-medium underline'
//                         : 'text-customRedOrange hover:text-red-500 px-3 py-2 text-sm font-medium'
//                     }
//                     onClick={toggleMenu}
//                   >
//                     All Users
//                   </NavLink>

//                   <NavLink
//                     to="/profile"
//                     className={({ isActive }) =>
//                       isActive
//                         ? 'text-customRedOrange hover:text-red-500 px-3 py-2 text-sm font-medium underline'
//                         : 'text-customRedOrange hover:text-red-500 px-3 py-2 text-sm font-medium'
//                     }
//                     onClick={toggleMenu}
//                   >
//                     Profile
//                   </NavLink>
                  
//                   <button
//                     onClick={logOut}
//                     className="text-customDarkTeal font-bold border-2 border-customTeal rounded-md p-2 bg-customRedOrange hover:bg-customDarkTeal hover:text-customRedOrange hover:border-customRedOrange"
//                   >
//                     Log Out
//                   </button>
//                 </>
//               ) : (
//                 <button
//                   onClick={logIn}
//                   className="text-customDarkTeal font-bold border-2 border-customTeal rounded-md p-2 bg-customRedOrange hover:bg-customDarkTeal hover:text-customRedOrange hover:border-customRedOrange"
//                 >
//                   Log In
//                 </button>
//               )}
//             </div>
//           </div>
//           <div className="hidden md:flex md:items-center md:space-x-4">
//             {isAuthenticated ? (
//               <>
//                 <NavLink
//                   to="/"
//                   className={({ isActive }) =>
//                     isActive
//                       ? 'text-customRedOrange hover:text-red-500 px-3 py-2 text-sm font-medium underline'
//                       : 'text-customRedOrange hover:text-red-500 px-3 py-2 text-sm font-medium'
//                   }
//                 >
//                   Home
//                 </NavLink>
//                 <NavLink
//                   to="/users"
//                   className={({ isActive }) =>
//                     isActive
//                       ? 'text-customRedOrange hover:text-red-500 px-3 py-2 text-sm font-medium underline'
//                       : 'text-customRedOrange hover:text-red-500 px-3 py-2 text-sm font-medium'
//                   }
//                 >
//                   All Users
//                 </NavLink>

//                 <NavLink
//                   to="/profile"
//                   className={({ isActive }) =>
//                     isActive
//                       ? 'text-customRedOrange hover:text-red-500 px-3 py-2 text-sm font-medium underline'
//                       : 'text-customRedOrange hover:text-red-500 px-3 py-2 text-sm font-medium'
//                   }
//                 >
//                   Profile
//                 </NavLink>

//                 <button
//                   onClick={logOut}
//                   className="text-xs md:text-md text-customDarkTeal font-bold border-2 border-customTeal rounded-md p-2 bg-customRedOrange hover:bg-customDarkTeal hover:text-customRedOrange hover:border-customRedOrange"
//                 >
//                   Log Out
//                 </button>
//               </>
//             ) : (
//               <button
//                 onClick={logIn}
//                 className="text-xs md:text-md text-customDarkTeal font-bold border-2 border-customTeal rounded-md p-2 bg-customRedOrange hover:bg-customDarkTeal hover:text-customRedOrange hover:border-customRedOrange"
//               >
//                 Log In
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Header;
