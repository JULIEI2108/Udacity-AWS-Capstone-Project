import React, { useState } from "react";
import styled from "styled-components";
import { createItem } from "../Api/ItemApi";
import { uploadFile } from "../Api/ItemApi";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { getItem } from "../Api/ItemApi";




export default function InsertPhoto() {
  const {  getAccessTokenSilently} = useAuth0();

  const itemnameRef = React.createRef();
  const artistRef = React.createRef();
  const typeRef = React.createRef();
  const descriptionRef = React.createRef();
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.value) {
      setImage(e.target.files[0]);
      console.log("file", image);
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const token = await getAccessTokenSilently({
      authorizationParams: {
        audience: 'https://rbm7x5e9gl.execute-api.us-east-1.amazonaws.com/dev', // Value in Identifier field for the API being called.
        scope: 'read:posts', // Scope that exists for the API being called. You can create these through the Auth0 Management API or through the Auth0 Dashboard in the Permissions view of your API.
      }})


    const artist = artistRef.current.value;
    const itemname = itemnameRef.current.value;
    const description = descriptionRef.current.value;
    const type = typeRef.current.value;
    // const token = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im5qVlRUT2kyaDI3a0o2ZHh5N3dsbSJ9.eyJpc3MiOiJodHRwczovL2Rldi1kdDV3NzN4cjRlbm5tMG04LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwODU1MTYxNzE0OTYzNjM5NzI4MyIsImF1ZCI6WyJodHRwczovL3JibTd4NWU5Z2wuZXhlY3V0ZS1hcGkudXMtZWFzdC0xLmFtYXpvbmF3cy5jb20vZGV2IiwiaHR0cHM6Ly9kZXYtZHQ1dzczeHI0ZW5ubTBtOC51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjc4MzI0MTAxLCJleHAiOjE2Nzg0MTA1MDEsImF6cCI6IlIxelhkUnVlb3dVb05pYzZHUHA0SVlqZGVVdFp6ZFNGIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.oOXL4iaFrWAWQvXzIrLRAUtpi3--hoIkX6XpaQp4Gt746tRlAoKWrsN1k3ve18729-W4HIfQ_eoB2AtVmNOvVuIAU0zcUgd0t5hmdRMoobW6YmcEUDmoGvdUhqGAM_7a8xz6SW5Z_kCgLDzbw2Ismb1rEW3hFI8AnOzkFSATrI2fIb82wH30c1ik6aWZiKXQ1VugIWJCD5aimZ5doziIujeUfdw5NjEqr3wDq7aboFxVWq6s13rdBwc1N3FKwY3jhGUFx8snE0KDHlIs3GhiqZQNCYbg5ptCvQf_Fe5acE-_vV3fOxYMr-wOZU1Phwd9jkH-vkla-zUqL4L35zi20w`;
    await createItem(token, artist, itemname, description, type, image);
    navigate("/manage");
  }

  return (
    <Wrapper>
      <section className="section section-center">
        <h3>Insert a Photo</h3>
        <form>
          <div className="form__box">
            <label htmlFor="itemname">ArtWork Name</label>
            <input
              type="text"
              id="itemname"
              name="itemname"
              ref={itemnameRef}
            ></input>
          </div>
          <div className="form__box">
            <label htmlFor="artist">Artist Name</label>
            <input
              type="text"
              id="artist"
              name="artist"
              ref={artistRef}
            ></input>
          </div>
          <div className="form__box">
            <label htmlFor="type">Type</label>
            <input type="text" id="type" name="type" ref={typeRef}></input>
          </div>
          {/* <div className="form__box__check">
            <label htmlFor="isPublic">
              Status: Is this artwork public or private{" "}
            </label>
             <input
              type="checkbox"
              id="isPublic"
              name="isPublic"
              checked={input.isPublic}
            ></input>
          </div>  */}
          <div className="form__box">
            <label htmlFor="description">{`Description (minimum 10 chars) `}</label>
            <textarea
              type="textarea"
              name="description"
              id="description"
              ref={descriptionRef}
            ></textarea>
          </div>
          <div className="form__box">
            <label htmlFor="attachment">Upload a photo of the artwork</label>
            <input
              name="attachement"
              id="attachment"
              type="file"
              onChange={handleFileChange}
            ></input>
          </div>
          <div className="btn__box">
            <button
              className="btn"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  form {
    display: flex;
    flex-direction: column;
    padding: 2rem 2rem;

    .form__box {
      padding: 1rem 2rem;
      display: flex;
      flex-direction: column;
    }

    .form__box__check {
      padding: 1rem 2rem;
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
