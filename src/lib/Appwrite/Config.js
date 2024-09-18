import { Account, Avatars, Client, Databases } from 'appwrite';

export const config={
  url:String(import.meta.env.VITE_APPWRITE_URL),
  projectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  databaseId:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  collectionId:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_MESSAGE),
  userCollectionId:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_USERS)
}

export const client=new Client()
       client.setEndpoint(config.url)
       client.setProject(config.projectId)

export const databases=new Databases(client)
export const account=new Account(client);
export const avatars = new Avatars(client);

// const client = new Client();
// client
//     .setEndpoint('https://cloud.appwrite.io/v1')
//     .setProject('66a0e20500014ab02fda');

// export const databases = new Databases(client);

// export default client;