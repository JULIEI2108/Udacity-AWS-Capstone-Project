import Axios from "axios";
import { useAuth0 } from '@auth0/auth0-react';
const endpoint = process.env.REACT_APP_APIGATEWAY_ENDPOINT;
// export function to interactive with backend
// function to get access token
export async function Token(){
  const { getAccessTokenSilently } = useAuth0();
  const token = await getAccessTokenSilently({
  authorizationParams: {
    audience: 'https://rbm7x5e9gl.execute-api.us-east-1.amazonaws.com/dev', // Value in Identifier field for the API being called.
    scope: 'read:posts', // Scope that exists for the API being called. You can create these through the Auth0 Management API or through the Auth0 Dashboard in the Permissions view of your API.
  }})
  return token
}

// get all public item
export async function PublicItem() {
  try {
    const response = await Axios.get(`${endpoint}/items`);
    const result = response.data;
    return result.items;
  } catch (e) {
    console.error(e);
  }
}



// function to deleteItem
export async function deleteItem(token,itemId) {
  console.log('token',token)
  try {
    await Axios.delete(`${endpoint}/manageItems/${itemId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {
    console.error(e);
  }
}

// function to getItem for the user
export async function getItem(token) {
  console.log('tokenhaha',token)
  try {
    const response = await Axios.get(`${endpoint}/manageItems`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = response.data;
    console.log('result',result)
    return result.items;
  } catch (e) {
    console.error(e);
  }
}

// function to createItem
export async function createItem(
  token,
  artist,
  itemname,
  description,
  type,
  file
) {

  try {
    const newItem = {
      artist: artist,
      itemname: itemname,
      description: description,
      type: type,
      public: true,
    };
    console.log(JSON.stringify(newItem));
    console.log("creating Item");
    const response = await Axios.post(
      `${endpoint}/manageItems`,
      JSON.stringify(newItem),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const item = response.data.item;
    console.log(item);
    const itemId = item.itemId;
    const uploadUrl = await getUploadUrl(token, itemId);
    console.log(uploadUrl);
    uploadFile(uploadUrl, file);
  } catch (e) {
    console.error(e);
  }
}


// function to updateItem
export async function updateItem(
  token,
  itemId,
  description,
  ifPublic,
  itemname
) {
  console.log("I am inside update function")
  try {
    const updateRequest = {
      description: description,
      public: ifPublic,
      itemname: itemname,
    };
    await Axios.patch(
      `${endpoint}/manageItems/${itemId}`,
      JSON.stringify(updateRequest),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {
    console.error(e);
  }
}

// get uploadUrl from backend
async function getUploadUrl(token,itemId) {
  const response = await Axios.post(
    `${endpoint}/manageItems/${itemId}/attachment`,
    "",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.uploadUrl;
}

// upload image
async function uploadFile(uploadUrl, file) {
  console.log(uploadUrl, file);
  const headers = {
    "Content-Type": "file.type",
  };
  await Axios.put(uploadUrl, file, { headers });
}
