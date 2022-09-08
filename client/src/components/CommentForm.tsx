import { useState } from "react";
import { Card, Form, InputGroup, FormControl, Button } from "react-bootstrap";

const CommentForm = () => {
  const [commentText, setCommentText] = useState("");
  return (
    <Card className="my-4">
      <Card.Header as="h5">Leave a Comment: </Card.Header>
      <Card.Body>
        <Form onSubmit={() => alert(commentText)}>
          <InputGroup>
            <FormControl
              as="textarea"
              aria-label="With textarea"
              rows={3}
              value={commentText}
              onChange={(e: InputEvent) => {
                const target = e.currentTarget as HTMLInputElement;
                setCommentText(target.value);
              }}
            />
            <Button type="submit">Submit</Button>
          </InputGroup>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CommentForm;
