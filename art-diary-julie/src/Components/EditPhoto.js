import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useArtContext } from "../art_context";
import { updateItem } from "../Api/ItemApi";
import { useAuth0 } from "@auth0/auth0-react";

export default function EditPhoto(itemId) {
  const {  getAccessTokenSilently} = useAuth0();


  const { personalPhotos } = useArtContext();
  const editPhoto = personalPhotos.find((item) => (item.itemId === itemId.itemId));
  console.log('itemId', itemId)
  console.log('personalPhotos', personalPhotos)
  console.log('editPhoto', editPhoto)
  const [artist, setArtist] = useState(editPhoto.artist);
  const [itemname, setItemname] = useState(editPhoto.itemname);
  const [description, setDescription] = useState(editPhoto.description);
  const [type, setType] = useState(editPhoto.type);
  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log(e.target.name);
    switch (e.target.name) {
      case "itemname":
        return setItemname(e.target.value);
      case "artist":
        return setArtist(e.target.value);
      case "type":
        return setType(e.target.value);
      case "description":
        return setDescription(e.target.value);
      default:
        return;
    }
  };

  async function handleSubmit(event) {
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: 'https://rbm7x5e9gl.execute-api.us-east-1.amazonaws.com/dev', // Value in Identifier field for the API being called.
        scope: 'read:posts', // Scope that exists for the API being called. You can create these through the Auth0 Management API or through the Auth0 Dashboard in the Permissions view of your API.
      }})
    event.preventDefault();
    await updateItem(
      token,
      itemId.itemId,
      description,
      true,
      itemname
    ).then((response) => navigate("/manage"));
  }

  return (
    <Wrapper>
      <section className="section section-center">
        <h3>Update a Photo</h3>
        <div className="edit__box">
          <div className="image__box">
            <img src={editPhoto.attachmentUrl} alt={editPhoto.itemname}></img>
          </div>
          <div className="form__container">
            <form>
              <div className="form__box">
                <label htmlFor="itemname">ArtWork Name</label>
                <input
                  type="text"
                  id="itemname"
                  name="itemname"
                  value={itemname}
                  onChange={(e) => handleChange(e)}
                ></input>
              </div>
              <div className="form__box">
                <label htmlFor="artist">Artist Name</label>
                <input
                  type="text"
                  id="artist"
                  name="artist"
                  value={artist}
                  onChange={(e) => handleChange(e)}
                ></input>
              </div>
              <div className="form__box">
                <label htmlFor="type">Type</label>
                <input
                  type="text"
                  id="type"
                  name="type"
                  value={type}
                  onChange={(e) => handleChange(e)}
                ></input>
              </div>
              <div className="form__box">
                <label htmlFor="description">{`Description (minimum 10 chars) `}</label>
                <textarea
                  type="textarea"
                  name="description"
                  id="description"
                  value={description}
                  onChange={(e) => handleChange(e)}
                ></textarea>
              </div>
              <div className="btn__box">
                <button
                  className="btn"
                  type="submit"
                  onClick={(e) => handleSubmit(e)}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .edit__box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .image__box {
    width: 50%;
    img {
      width: 100%;
    }
  }
  .form__container {
    width: 50%;
  }

  form {
    display: flex;
    flex-direction: column;
    padding: 2rem 2rem;

    .form__box {
      padding: 1rem 2rem;
      display: flex;
      flex-direction: column;
    }

    .btn__box {
      padding: 1rem 2rem;
      align-self: center;
    }

    label {
      color: var(--clr-primary-5);
      font-weight: 500;
    }

    input,
    textarea {
      padding: 0.5rem 1rem;
      outline: none;
      /* border: none; */
      border: 1px solid var(--clr-primary-5);
      color: var(--clr-primary-5);
      margin-top: 0.8rem;
    }

    textarea {
      line-height: 2rem;
    }
  }
`;
