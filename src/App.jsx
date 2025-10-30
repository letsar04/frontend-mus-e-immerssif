import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Musee from "./pages/Musee";
//import Archives from "./pages/Archives";
import Contact from "./pages/Contacts";
import Archive from "./components/Archive";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/musee" element={<Musee />} />
        
        <Route path="/contact" element={<Contact />} />
        <Route path="/archives" element={<Archive />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
