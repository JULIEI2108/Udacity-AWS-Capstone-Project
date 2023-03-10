import React, { useState, useEffect } from "react";
import { FaBox } from "react-icons/fa";
import { useArtContext } from "../art_context";
import PhotoWall from "./PhotoWall";

export default function Photos() {
  const { photos } = useArtContext();

  return <PhotoWall photos={photos} />;
}
