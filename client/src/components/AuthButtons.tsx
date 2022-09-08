import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { useAuthContext } from "../contexts/auth";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const AuthButtons = ({ variant }: { variant: string }) => {
  const { auth, logout } = useAuthContext();
  const navigate = useNavigate();

  // if (localStorage.getItem("token") && !store.isAuth) {
  //   dispatch({ type: "LOGIN_SUCCESS" });
  // }
  const onLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    console.log("authbuttons use effect");
  }, []);

  if (auth.userId)
    return (
      <Nav>
        <Button size="sm" onClick={onLogout}>
          Log out
        </Button>
      </Nav>
    );

  return (
    <Nav style={{ gap: "1rem" }} className="font-weight-bold">
      <Button variant={variant} size="sm" as={Link} to="/login">
        Log in
      </Button>
      <Button variant={`outline-${variant}`} size="sm" as={Link} to="/signup">
        Sign up
      </Button>
    </Nav>
  );
};

export default AuthButtons;
