import Home from "./Pages/Home";
import Manage from "./Pages/Manage";
import Artwork from "./Pages/Artwork";
import InserArtwork from "./Pages/InserArtwork";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/manage" element={<Manage />}></Route>
      <Route path="/manage/:id" element={<Artwork />}></Route>
      <Route path="/manage/insert" element={<InserArtwork />}></Route>
    </Routes>
  );
}
