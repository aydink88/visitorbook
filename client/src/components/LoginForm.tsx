import { useEffect, useState } from "preact/hooks";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useAuthContext } from "../contexts/auth";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth, authenticate } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (auth.userId) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.userId]);

  const handleLogin = async (e: FormDataEvent) => {
    e.preventDefault();
    authenticate(email, password);
  };

  return (
    <>
      <Form onSubmit={handleLogin} className="d-flex flex-column gap-4">
        <Form.Group as={Row} controlId="formHorizontalEmail">
          <Form.Label column sm={3}>
            Email
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="email"
              placeholder="Email"
              onChange={(e: InputEvent) => {
                const target = e.target as HTMLInputElement;
                setEmail(target.value);
              }}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalPassword">
          <Form.Label column sm={3}>
            Password
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e: InputEvent) => {
                const target = e.target as HTMLInputElement;
                setPassword(target.value);
              }}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalCheck">
          <Col sm={9} className="ml-auto">
            <Form.Check label="Remember me" />
          </Col>
        </Form.Group>

        <Button type="submit" className="w-100">
          Log in
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
