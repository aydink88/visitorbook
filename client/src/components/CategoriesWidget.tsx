import { Card, Row, Col } from "react-bootstrap";

const CategoriesWidget = () => {
  return (
    <Card className="my-4">
      <Card.Header as="h5">Categories</Card.Header>
      <Card.Body>
        <Row>
          <Col lg={6}>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="/">Web Design</a>
              </li>
              <li>
                <a href="/">HTML</a>
              </li>
              <li>
                <a href="/">Freebies</a>
              </li>
            </ul>
          </Col>
          <Col lg={6}>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="/">JavaScript</a>
              </li>
              <li>
                <a href="/">CSS</a>
              </li>
              <li>
                <a href="/">Tutorials</a>
              </li>
            </ul>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CategoriesWidget;
