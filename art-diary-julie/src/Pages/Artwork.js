import React from "react";
import { useParams } from "react-router-dom";

import Header from "../Components/Header";
import Hero from "../Components/Hero";

import Footer from "../Components/Footer";
import EditPhoto from "../Components/EditPhoto";
import { useArtContext } from "../art_context";

export default function Artwork() {
  const { id } = useParams();

  const { personalPhotos } = useArtContext();
  console.log('personalPhotos from Artwork', personalPhotos)
  return (
    <>
      <Header />
      <Hero />
      <EditPhoto itemId={id} />
      <Footer />
    </>
  );
}
