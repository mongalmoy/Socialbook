import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Entry/Login";
import Register from "./Entry/Register";
import About from "./pages/About";
import Feed from "./pages/Feed";
import Container from "./components/Container/Container";

const AppMainRoute = () => {
  return <BrowserRouter>
   <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
      <Route path="/feed" element={<Container />}>
        <Route index element={<Feed />} />
      </Route>
   </Routes>
  </BrowserRouter>;
};

export default AppMainRoute;
