import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Feed from "./pages/Feed";
import Container from "./components/Container/Container";
import Entry from "./Entry/Entry";
import Account from './pages/accounts/Account';

const AppMainRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Entry page="register" />} />
        <Route path="/login" element={<Entry page="login" />} />

        <Route path="/about" element={<About />} />
        <Route path="/feed" element={<Container />}>
          <Route index element={<Feed />} />
          <Route element={<Account />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppMainRoute;
