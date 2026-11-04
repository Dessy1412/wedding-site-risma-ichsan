import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cover from "./components/Cover";
import DetailUndangan from "./components/DetailUndangan";
import { useRef } from "react";

function App() {
  const audioRef = useRef(null);
  return (
    <>
      <Router>
        <audio ref={audioRef} src="music.mp3" loop />
        <Routes>
          <Route path="/" element={<Cover />} />
          <Route path="/detailundangan" element={<DetailUndangan />} />s
        </Routes>
      </Router>
    </>
  );
}

export default App;
