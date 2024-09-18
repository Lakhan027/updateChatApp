import React, { useContext, useEffect, useState } from "react";
import { getAllUsersData } from "../lib/Appwrite/chatAuth";
import UserCard from "./UserCard";
import { UserContext } from "../context/userContext";
import Header from "./Header";
import Loading from "./Loading";

const Users = () => {
  const [userData, setUserData] = useState([]);
  const {user}=useContext(UserContext);
  //console.log("user",user);
   
  useEffect(() => {
    const fecthdata = async () => {
      const data = await getAllUsersData();
      setUserData(data.documents);
    };
    fecthdata();
  }, []);
  if (!user) {
    return <div className="flex  justify-center items-center h-screen ">
      <Loading/>
    </div>
  }
  
  return (
    <>
    <Header/>
      <div className="flex  justify-center pt-10">
      </div>
      <div className="flex flex-col flex-1 m-20">
        <div  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16">
          {userData
            .filter((userInfo) => user.id !== userInfo.$id)
            .map((userInfo, index) => (
              <UserCard userInfo={userInfo} key={`${userInfo.id}-${index}`} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Users;
