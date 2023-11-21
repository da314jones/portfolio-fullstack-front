import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Entries from "./component/Entries";
import NewJournalEntry from "./component/NewJournalEntry";
import FourOFour from "./pages/FourOFour";



function App() {  

  return (
    <>
            <Router>
        <Routes>
          <Route exact path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/entries" element={<Entries />} />
          <Route path="/entries/new" element={<NewJournalEntry />} />
          <Route path="*" element={<FourOFour />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
