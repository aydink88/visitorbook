import LoginForm from "../components/LoginForm";
import { Row, Col } from "react-bootstrap";

const LoginPage = () => {
  return (
    <Row>
      <Col sm={8} md={6} lg={4} className="mx-auto my-5">
        <LoginForm />
      </Col>
    </Row>
  );
};

export default LoginPage;
