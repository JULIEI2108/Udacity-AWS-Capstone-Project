import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { useArtContext } from "../art_context";

export default function PhotoWall({ photos, manage }) {
  const value = useArtContext();
  const { personalPhotos } = useArtContext();
  console.log('personalPhotos from photo wall', personalPhotos)
  return (
    <Wrapper>
      <div className="section section-center">
        <div className="photos__box">
          {photos.length > 0 &&
            photos.map((image) => {
              return (
                <div className="photo__box" key={image.itemId}>
                  <img
                    src={image.attachmentUrl}
                    alt={image.itemname}
                    className="photo"
                  ></img>
                  <div className="photo__info">
                    <span>{image.itemname}</span>
                    <span>{image.artist}</span>
                  </div>
                  {manage && (
                    <div className="button__box">
                      <Link to={`/manage/${image.itemId}`}>
                        <button className="btn">Edit</button>
                      </Link>
                      <button
                        className="btn"
                        onClick={() => value.deletePhoto(image.itemId)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  .photos__box {
    display: grid;
    gap: 2rem;
  }

  .photo__box {
    position: relative;
    height: 18rem;
    margin-bottom: 2rem;
  }

  .photo__box:hover {
    .photo__info {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .photo__info {
    height: 20%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
    position: absolute;
    bottom: 0;
    right: 0;
    transform: translateY(100%);
    opacity: 0;
  }

  .photo {
    width: 100%;
    height: 100%;
  }

  .button__box {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  @media screen and (min-width: 576px) {
    .photos__box {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }
`;
