import Posts from "../components/Posts";
import Sidebar from "../components/common/Sidebar";
import { Row, Col } from "react-bootstrap";

const Postspage = () => {
  return (
    <Row>
      <Col xs={12} md={8}>
        <Posts />
      </Col>
      <Col xs={12} md={4}>
        <Sidebar />
      </Col>
    </Row>
  );
};

export default Postspage;
