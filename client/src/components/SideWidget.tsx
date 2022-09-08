import { Card } from "react-bootstrap";

const SideWidget = () => {
  return (
    <Card className="my-4">
      <Card.Header as="h5">Side Widget</Card.Header>
      <Card.Body>
        You can put anything you want inside of these side widgets. They are easy to use, and
        feature the new Bootstrap 4 card containers!
      </Card.Body>
    </Card>
  );
};

export default SideWidget;
