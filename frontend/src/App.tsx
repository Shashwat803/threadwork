import "./App.css";
import Navbar from "./components/navbar/Navbar";
import LoginPage from "./pages/auth/LoginPage";

import Feed from "./pages/feed/Feed";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="bg-[#000000]">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/feed" element={<Feed />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
