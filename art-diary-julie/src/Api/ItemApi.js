import Axios from "axios";
import { useAuth0 } from '@auth0/auth0-react';
const endpoint = process.env.REACT_APP_APIGATEWAY_ENDPOINT;

export async function Token(){
  const { getAccessTokenSilently } = useAuth0();
  const token = await getAccessTokenSilently({
  authorizationParams: {
    audience: 'https://rbm7x5e9gl.execute-api.us-east-1.amazonaws.com/dev', // Value in Identifier field for the API being called.
    scope: 'read:posts', // Scope that exists for the API being called. You can create these through the Auth0 Management API or through the Auth0 Dashboard in the Permissions view of your API.
  }})
  return token
}
// const token=`eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im5qVlRUT2kyaDI3a0o2ZHh5N3dsbSJ9.eyJpc3MiOiJodHRwczovL2Rldi1kdDV3NzN4cjRlbm5tMG04LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDExMDAzMzk3NTM0MzgyNjQxMzI4MCIsImF1ZCI6WyJodHRwczovL3JibTd4NWU5Z2wuZXhlY3V0ZS1hcGkudXMtZWFzdC0xLmFtYXpvbmF3cy5jb20vZGV2IiwiaHR0cHM6Ly9kZXYtZHQ1dzczeHI0ZW5ubTBtOC51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjc4NDExMzYwLCJleHAiOjE2Nzg0OTc3NjAsImF6cCI6IlIxelhkUnVlb3dVb05pYzZHUHA0SVlqZGVVdFp6ZFNGIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.pCvBrehn3-de-i9BBf02Rv3A6t2EfHg3pLUIBPuHJw5K1NJZDpLrl97eNsc33hDHXbVteNa0TzqmX7Z0SEdsa8WJ2pwI-hoj18VpJJWJXV6NUsBW4U8ZYAPKWwWs5pXLdorMPkOM_xX6jrU9UI4H9S868Ym6NJPioqpxc--j9nC_htFRkjmApE9utCdWrXem-3aopCphYWvaSurjLEwnusRxXyZfQHfImjz2vXd2YlMblBtjfaP4XNJyI1h5IkAUAzpP-MDI-sYd_3afDNDg2JMXNXSv8CsTeTVIsC53CowgvDTnwbZDdhvCx4zcmxPSB3zoScEybb8sw2IJbpm4Sw`

export async function PublicItem() {
  try {
    const response = await Axios.get(`${endpoint}/items`);
    const result = response.data;
    return result.items;
  } catch (e) {
    console.error(e);
  }
}

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

async function uploadFile(uploadUrl, file) {
  console.log(uploadUrl, file);
  const headers = {
    "Content-Type": "file.type",
  };
  await Axios.put(uploadUrl, file, { headers });
}
