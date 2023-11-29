import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import FourOFour from "./pages/FourOFour";
import Show from "./pages/Show";
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Navbar from "./component/Navbar";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Welcome />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/entries" element={<Home />} />
          <Route path="/entries/:id" element={<Show />} />
          <Route path="/entries/new" element={<New />} />
          <Route path="/entries/:id/edit" element={<Edit />} />
          <Route path="*" element={<FourOFour />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
