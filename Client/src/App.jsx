import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { getUser, storeUser } from "./storage";
import { ResumifyeContext } from "./ResumifyeContext";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Registration from "./pages/Registration";
import Login from "./pages/Login";

const App = () => {
  const [user, setUser] = useState({});

  // Fetch User From Local Storage
  useEffect(() => {
    getUser().then((user) => {
      if (!user) {
        return;
      }
      setUser(JSON.parse(user));
    });
  }, []);
  // Store User Local Storage
  useEffect(() => {
    if (!user._id) return;
    storeUser(user);
  }, [user]);
  return (
    <Router>
      <ResumifyeContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </ResumifyeContext.Provider>
    </Router>
  );
};

export default App;
