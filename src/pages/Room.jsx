import React, { useContext, useEffect, useState } from "react";
import  { client, config, databases } from "../lib/Appwrite/Config";
import { ID, Query } from "appwrite";
import { Trash2 } from 'react-feather';
import HandleHome from "./HandleHome";
import BackButton from "./BackButton";
import { UserContext } from "../context/userContext";

const Room = () => {
  const { user, setUser, anotherUserId, setAnotherUserId, checkAuthUser } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");
  // console.log("user.id",user.id);
  // console.log("anotherUserId",anotherUserId);
  // Ensure the user is authenticated
  useEffect(() => {
    if (!user.id) {
      checkAuthUser();
    }
  }, [user, checkAuthUser]);

  // Save user and anotherUserId to localStorage when updated
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
    if (anotherUserId) {
      localStorage.setItem("anotherUserId", anotherUserId);
    }
  }, [user, anotherUserId]);

  // Fetch stored user and anotherUserId from localStorage and trigger message fetch
  useEffect(() => {
    const storedCurrentUser = JSON.parse(localStorage.getItem("user"));
    const storedAnotherUserId = localStorage.getItem("anotherUserId");
    
    if (storedCurrentUser) {
      setUser(storedCurrentUser);
    }
    if (storedAnotherUserId) {
      setAnotherUserId(storedAnotherUserId);
    }

    if (storedCurrentUser && storedAnotherUserId) {
      getMessage(storedCurrentUser.id, storedAnotherUserId);
    }
  }, [setUser, setAnotherUserId]);

  // Ensure messages are fetched when both user and anotherUserId are available
  useEffect(() => {
    if (user.id && anotherUserId) {
      getMessage(user.id, anotherUserId);
    }

    const unsubscribe = client.subscribe(
      `databases.${config.databaseId}.collections.${config.collectionId}.documents`,
      response => {
        if (response.events.includes("databases.*.collections.*.documents.*.create")) {
          setMessages(prevState => [response.payload, ...prevState]);
        }

        if (response.events.includes("databases.*.collections.*.documents.*.delete")) {
          setMessages(prevState =>
            prevState.filter(message => message.$id !== response.payload.$id)
          );
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [user.id, anotherUserId]);
 
  // Submit new message
  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      body: messageBody,
      user_id: user.id,
      user2_id: anotherUserId,
      username: user.username,
      isRead: false,
    };

    await databases.createDocument(
      config.databaseId,
      config.collectionId,
      ID.unique(),
      payload
    );
    
    setMessageBody("");
  };

  // Fetch messages between the two users
  const getMessage = async (user_id, user2_id) => {
    try {
      const response1 = await databases.listDocuments(
        config.databaseId,
        config.collectionId,
        [
          Query.equal("user_id", user_id),
          Query.equal("user2_id", user2_id),
          Query.orderDesc("$createdAt"),
          Query.limit(7),
        ]
      );

      const response2 = await databases.listDocuments(
        config.databaseId,
        config.collectionId,
        [
          Query.equal("user_id", user2_id),
          Query.equal("user2_id", user_id),
          Query.orderDesc("$createdAt"),
          Query.limit(7),
        ]
      );

      const combinedMessages = [...response1.documents, ...response2.documents].sort(
        (a, b) => new Date(b.$createdAt) - new Date(a.$createdAt)
      );

      setMessages(combinedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const deleteMessage = async (message_id) => {
    await databases.deleteDocument(config.databaseId, config.collectionId, message_id);
    setMessages(prevState => prevState.filter(message => message.$id !== message_id));
  };

  return (
    <main className="container">
      <div className="room--container">
        <div className="md:flex md:gap-4 justify-end">
          <div><HandleHome/></div>
          <div><BackButton/></div>
        </div>
        <form onSubmit={handleSubmit} id="message--form" className="pb-2">
          <div>
            <textarea
              required
              maxLength={1000}
              placeholder="Write your Words"
              onChange={(e) => setMessageBody(e.target.value)}
              value={messageBody}
            ></textarea>
          </div>
          <div className="send-btn--wrapper">
            <input className="btn btn--secondary" type="submit" value="Send" />
          </div>
        </form>
        <div>
          {messages.map((message) => (
            <div key={message.$id} className="messages--wrapper">
              <div className="message--header">
                <small className="message-timestamp pb-1 pt-2">
                  {message.user_id === user.id ? (
                    <p className="font-bold">Received By Me,</p>
                  ) : (
                    <p className="font-bold">Send By: {message.username},</p>
                  )}
                  {new Date(message.$createdAt).toLocaleString()}
                </small>
                <Trash2
                  className="delete--btn"
                  onClick={() => deleteMessage(message.$id)}
                />
              </div>
              <div className={`p-4 text-secondary rounded-[20px] w-fit max-w-full break-words ${
                  message.user_id === user.id ? 'bg-cyan-900' : 'bg-black'
                }`}
              >
                <span>{message.body}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Room;








// import React, { useContext, useEffect, useState } from "react";
// import  { client, config, databases } from "../lib/Appwrite/Config";
// import { ID, Query } from "appwrite";
// import {Trash2} from 'react-feather'
// import HandleHome from "./HandleHome";
// import BackButton from "./BackButton";
// import { UserContext } from "../context/userContext";

// const Room = () => {
//   const {user,setUser,anotherUserId,setAnotherUserId ,checkAuthUser}=useContext(UserContext);
//   const [messages, setMessages] = useState([]);
//   const [messageBody, setMessageBody] = useState([]);
 
  
//   if(!user.id){
//    checkAuthUser();
//   }
//  // const currentId=checkAuthUser();
 
//   useEffect(() => {
//     if (user) {
//       localStorage.setItem("user", JSON.stringify(user));
//     }
//     if (anotherUserId) {
//       localStorage.setItem("anotherUserId", anotherUserId);
//      }
//      }, [user, anotherUserId]);


//   useEffect(() => {
//     const storedCurrentUser = JSON.parse(localStorage.getItem("user"));
//     const storedAnotherUserId = localStorage.getItem("anotherUserId");
    
//     //console.log("storedCurrentUser",storedCurrentUser);
//     if (storedCurrentUser) {
//       setUser(storedCurrentUser);
//     }
//     if (storedAnotherUserId) {
//       setAnotherUserId(storedAnotherUserId);
//     }

//     if (storedCurrentUser && storedAnotherUserId) {
//       getMessage(storedCurrentUser.id, storedAnotherUserId);
//     }

//     //getMessage(currentUser.$id, anotherUserId);

//     const unsubscribe=client.subscribe(`databases.${config.databaseId}.collections.${config.collectionId}.documents`,response=>{
     
//         if(response.events.includes("databases.*.collections.*.documents.*.create")){
//             //console.log("A Message Was Created")
//             setMessages(preState=>[response.payload,...preState])
//           }

//       if(response.events.includes("databases.*.collections.*.documents.*.delete"))
//       {
//        // console.log("A Message Was Deleted!!!")
//         setMessages(preState=>preState.filter(message=>message.$id!==response.payload.$id))
//       }
//     })

//     return ()=>{
//       unsubscribe()
//     }
//   },[user.id, anotherUserId]);

  

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     let payload = {
//       body: messageBody,
//       user_id:user.id,
//       user2_id:anotherUserId,
//       username:user.username,
//       isRead: false,
//     };

//     let reponse = await databases.createDocument(
//       config.databaseId,
//       config.collectionId,
//       ID.unique(),
//       payload
//     );
    
//     setMessageBody("");
//   };
  
//   const getMessage = async (user_id, user2_id) => {
//     //console.log("userid1",user_id)
//     //console.log("userid2",user2_id)

//     try {
     
//       const response1 = await databases.listDocuments(
//         config.databaseId,
//         config.collectionId,
//         [
//           Query.equal('user_id', user_id),
//           Query.equal('user2_id', user2_id),
//           Query.orderDesc('$createdAt'),
//           Query.limit(7)
//         ]
//       );
  
     
//       const response2 = await databases.listDocuments(
//         config.databaseId,
//         config.collectionId,
//         [
//           Query.equal('user_id', user2_id),
//           Query.equal('user2_id', user_id),
//           Query.orderDesc('$createdAt'),
//           Query.limit(7)
//         ]
//       );
  
      
//       const combinedMessages = [...response1.documents, ...response2.documents].sort(
//         (a, b) => new Date(b.$createdAt) - new Date(a.$createdAt)
//       );
  
//       setMessages(combinedMessages);
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//     }
//   };
  
//   const deleteMessage=async(message_id)=>{
//      const deleteMsg=await databases.deleteDocument(config.databaseId,config.collectionId,message_id)
     
//      setMessages(preState=>messages.filter(message=>message.$id!==message_id))
//   }

//   return (
//     <main className="container">
//       <div className="room--container">
//         <div className="md:flex md:gap-4 justify-end">
//           <div> <HandleHome/></div>
//           <div><BackButton/></div>
//         </div>
//         <form onSubmit={handleSubmit} id="message--form" className="pb-2">
//           <div>
//             <textarea
//               required
//               maxLength={1000}
//               placeholder="Write your Words"
//               onChange={(e) => {
//                 setMessageBody(e.target.value);
//               }}
//               value={messageBody}
//             ></textarea>
//           </div>
//           <div className="send-btn--wrapper">
//             <input className="btn btn--secondary " type="submit" value="Send" />
//           </div>
//         </form>
//         <div>
//           {messages.map((message) => (
//             <div key={message.$id} className="messages--wrapper">
//               <div className="message--header ">
//                 <small className="message-timestamp pb-1 pt-2">
//                  {message.user_id===user.id?(<p className="font-bold"> Received By Me,</p>):(<p className="font-bold">Send By : {message.username},</p>)}
//                   {new Date(message.$createdAt).toLocaleString()}
//                 </small>
//                 <Trash2 className="delete--btn" onClick={()=>{deleteMessage(message.$id)}}/>
                
//               </div>
//               {message.user_id===user.id?(<div className="p-4 text-secondary bg-cyan-900 rounded-[20px] w-fit max-w-full break-words">
//                 <span>{message.body}</span>
//               </div>):(<div className="p-4 text-secondary bg-black rounded-[20px] w-fit max-w-full break-words">
//                 <span>{message.body}</span>
//               </div>)}
              
//             </div>
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// };
// export default Room;
