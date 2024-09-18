import { account, avatars, config, databases } from "./Config";
import { ID, Query } from "appwrite";



//create new User Account
export async function createNewUser(user){
  try{
    const newAccount= await account.create(ID.unique(),user.email,user.pass,user.name)
    if (!newAccount) throw new Error("Account creation failed");
   
    const avatarUrl=avatars.getInitials(user.name)

    await saveUserToDB({
        accountId: newAccount.$id,
        name: newAccount.name,
        email: newAccount.email,
        username: user.username,
        imageUrl: avatarUrl,
    })

    return newAccount;
  }catch(error){
   console.log("create error",error)
  }
}

 //save userInfo
export async function saveUserToDB(userInfo){
  try{
      const saveUser=await databases.createDocument(config.databaseId,config.userCollectionId,
      ID.unique(),
      userInfo)
    
      return saveUser;
  }catch(error){
    console.log("save error",error);
  }
}

//LogIn User
export async function logInAccount(user){
  try{
    const session=await account.createEmailPasswordSession(user.email,user.pass)
    if(!session) return new Error;
    
    return session;
}catch(error){
    console.log(error);
}
}

//Log Out User
export async function logOutAccount(){
  try{
      const session=await account.deleteSession('current');
      return session;
     }catch(error){
        console.log(error);
    }
}

//Get Users Data
export async function getAllUsersData(){
    try{
        const userData=await databases.listDocuments(
        config.databaseId,
        config.userCollectionId,
        [Query.orderDesc("$createdAt"),Query.limit(10)],
      )
      if(!userData) return new Error;
      //console.log(userData)
      return userData;
    }catch(error){
      console.log(error);
    }
}
// Get Current Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();
    //console.log(currentAccount);
    return currentAccount;
  } catch (error) {
    console.log(error);
  }
}
// //get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) {
      throw new Error('currentAccount is not defined');
    }

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    )

    if (!currentUser || currentUser.documents.length === 0) {
      throw new Error("No current user found in the database");
    }
    return currentUser.documents[0];

  } catch (error) {
    console.log("Appwrite service :: getCurrentUser :: error", error);
    return null;
  }
}

export async function updateCurrentUser(user,nameUp,usernameUp,emailUp,passwordUp){
  try{
    await account.updateName(nameUp||user.name);
    if(emailUp){
      await account.updateEmail(newEmail, user.password);
    }
    if(passwordUp){
      await account.updatePassword(newPassword);
    }
    const updateUserDetails=await databases.updateDocument(
      config.databaseId,
      config.userCollectionId,
      user.id,
      {
        name:nameUp||user.name,
        username:usernameUp||user.username,
      }
    );
    return updateUserDetails;
  }catch(error){
    console.error("Error updating user profile:", error);
  }

}