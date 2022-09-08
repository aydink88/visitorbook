import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useAuthContext } from "../contexts/auth";

const SignupForm = () => {
  const { auth } = useAuthContext();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState<File>();

  const navigate = useNavigate();

  useEffect(() => {
    if (auth.userId) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.userId]);

  const handleSignup = async (e: FormDataEvent) => {
    e.preventDefault();
    console.log(e);
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar!);
    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/register", {
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("vb_token")}`,
        },
        body: formData,
      });
      const data = await res.json();
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Col md={12} lg={6} className="mx-auto my-5">
      <Form onSubmit={handleSignup}>
        <Form.Group as={Row} controlId="formUsername">
          <Form.Label column sm={2}>
            Username
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="User Name"
              onChange={(e: InputEvent) => {
                const target = e.target as HTMLInputElement;
                setUsername(target.value);
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formEmail">
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={10}>
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

        <Form.Group as={Row} controlId="formPassword">
          <Form.Label column sm={2}>
            Password
          </Form.Label>
          <Col sm={10}>
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
        <Form.Group>
          <Form.Control
            type="file"
            id="avatar"
            label="Profile picture"
            onChange={(e: InputEvent) => {
              const target = e.target as HTMLInputElement;
              const files = target.files as FileList;
              setAvatar(files[0]);
            }}
          />
        </Form.Group>

        <Form.Group className="d-flex justify-content-end" controlId="formCheck">
          <Form.Check label="Remember me" />
        </Form.Group>

        <Form.Group className="d-flex justify-content-end" style={{ gap: "1rem" }}>
          <Button type="button">Clear Form</Button>
          <Button type="submit">Sign Up</Button>
        </Form.Group>
      </Form>
    </Col>
  );
};

export default SignupForm;
