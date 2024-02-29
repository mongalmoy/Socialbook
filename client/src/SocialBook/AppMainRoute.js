import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Entry/Login";
import Register from "./Entry/Register";
import About from "./pages/About";
import Feed from "./pages/Feed";
import Container from "./components/Container/Container";
import Entry from "./Entry/Entry";

const AppMainRoute = () => {
  return <BrowserRouter>
   <Routes>
      <Route path="/register" element={<Entry page="register" />} />
      <Route path="/login" element={<Entry page="login" />} />

      {/* <Route path="/register" element={<Register />} /> */}
      <Route path="/about" element={<About />} />
      <Route path="/feed" element={<Container />}>
        <Route index element={<Feed />} />
      </Route>
   </Routes>
  </BrowserRouter>;
};

export default AppMainRoute;
