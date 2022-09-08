import { Card, InputGroup, FormControl, Button } from "react-bootstrap";

const SearchWidget = () => {
  return (
    <Card className="my-4">
      <Card.Header as="h5">Search</Card.Header>
      <Card.Body>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search for..."
            aria-label="Search for..."
            aria-describedby="basic-addon2"
          />
          <Button variant="secondary">Go</Button>
        </InputGroup>
      </Card.Body>
    </Card>
  );
};

export default SearchWidget;
