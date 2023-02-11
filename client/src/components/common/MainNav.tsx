import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";

import AuthButtons from "src/components/AuthButtons";

const MainNav = () => {
  return (
    <Navbar collapseOnSelect expand="md" bg="primary" variant="dark">
      <Navbar.Brand as={NavLink} to="/">
        Simple Blog
        <img style={{ height: "30px" }} src="/blog-logo.png" alt="logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/posts">
            Posts
          </Nav.Link>
          <Nav.Link as={NavLink} to="/users">
            Users
          </Nav.Link>
        </Nav>
        <AuthButtons variant="light" />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainNav;
