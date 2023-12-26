import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Entry/Login";
import Register from "./Entry/Register";
import About from "./pages/About";

const AppMainRoute = () => {
  return <BrowserRouter>
   <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
   </Routes>
  </BrowserRouter>;
};

export default AppMainRoute;
