import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Router, Routes } from "react-router";
import "./index.css";
import App from "./App.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Project from "./components/pages/Project/Project.jsx";
import Upload from "./components/pages/Upload/Upload.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <div className="wrapper">
      <Navbar />
      <main className="content">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/project/:id" element={<Project />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </BrowserRouter>
);
