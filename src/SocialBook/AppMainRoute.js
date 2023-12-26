import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Entry/Login";
import Register from "./Entry/Register";

const AppMainRoute = () => {
  return <BrowserRouter>
   <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
   </Routes>
  </BrowserRouter>;
};

export default AppMainRoute;
