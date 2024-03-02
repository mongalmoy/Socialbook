import { Button, Container, Form, NavDropdown, Navbar } from "react-bootstrap";
import "./Header.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultUserDP from "../../assets/img/avatar.png";

const Header = () => {
  const navigate = useNavigate();

  const [showUserInfo, setShowUserInfo] = useState(false);

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if(e.target.id==="user_name") {
        setShowUserInfo(true);
      }
      else if(!document?.getElementById("navlinkDropdown")?.contains(e.target)) {
        setShowUserInfo(false);
      }
    })
  }, [])

  return (
    <header className="header">
      <Navbar className="bg-body-tertiary">
        <div className="nav_container mx-3">
          <Navbar.Brand id="AppName" className="flexbox" onClick={() => navigate("/register")}>
            <img
              alt=""
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUplDP_5X_KftHW2YzHGWKCM1osaro8TRZ-U5499vM5ZjHtRyBGNBBwCq_f4AIhwf7KcY&usqp=CAU"
              }
              width="40"
              height="40"
              className="d-inline-block align-top me-2"
            />
            Socialbook
          </Navbar.Brand>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>

          <div className="flexbox user_account_details">
            <img
              alt=""
              src={defaultUserDP}
              width="40"
              height="40"
              className="d-inline-block align-top"
            />
            <Navbar.Text id="user_name">Mongalmoy</Navbar.Text>
            <ul className={`user_dropdown dropdown-menu ${showUserInfo ? "show_dropdown" : "hide_dropdown"}`} id="navlinkDropdown">
              {[
                { name: "Account", link: "/account" },
                { name: "Edit Account", link: "/editaccount" },
                // { name: "Inbox", link: "/inbox" },
                { name: "My Posts", link: "/myposts" },
                // { name: "Jolufamily", link: "/jolufamily" },
                { name: "Logout", link: "/logout" },
              ].map((item, index) => {
                return (
                  <li key={index} className="user_dropdown_item">
                    <a className="user_dropdown_link" href={item.link}>
                      {item.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Navbar>
    </header>
  );
};

export default Header;
