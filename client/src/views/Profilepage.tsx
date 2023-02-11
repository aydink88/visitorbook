import Sidebar from "src/components/common/Sidebar";
import { Row, Col } from "react-bootstrap";

const Profilepage = () => {
  return (
    <Row>
      <Col xs={12} md={8}>
        <p>Hello</p>
        <p>Hello</p>
        <p>Hello</p>
        <p>Hello</p>
        <p>Hello</p>
        <p>Hello</p>
      </Col>
      <Col xs={12} md={4}>
        <Sidebar />
      </Col>
    </Row>
  );
};

export default Profilepage;
