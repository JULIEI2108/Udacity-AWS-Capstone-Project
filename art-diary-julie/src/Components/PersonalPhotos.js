import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useArtContext } from "../art_context";
import PhotoWall from "./PhotoWall";
import { Link } from "react-router-dom";

export default function PersonalPhotos() {
  const { personalPhotos } = useArtContext();

  console.log("personalPhotos from personalphoto", personalPhotos)
  return (
    <Wrapper>
      <div className="section section-center">
        <Link to="insert" className="btn">
          Insert an artwork
        </Link>
        <Link to="/" className="btn">
          Return Home
        </Link>
        <PhotoWall photos={personalPhotos} manage={true} />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  a {
    margin-right: 2rem;
  }
`;
