import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import Register from "./pages/Register";
import Homee from "./pages/Homee";
import RecentItems from "./components/RecentItems";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />
        
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Homee />} />
        <Route path="/createpost" element={<Posts />} />
        <Route path="/recent" element={<RecentItems />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;