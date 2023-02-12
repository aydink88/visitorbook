import type { TargetedEvent } from 'preact/compat';
import { useState } from 'preact/hooks';
import { Card, Form, InputGroup, FormControl, Button } from 'react-bootstrap';

const CommentForm = () => {
  const [commentText, setCommentText] = useState('');
  const changeHandler = (e: TargetedEvent) => {
    const target = e.currentTarget as HTMLInputElement;
    setCommentText(target.value);
  };
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
              onChange={changeHandler}
            />
            <Button type="submit">Submit</Button>
          </InputGroup>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CommentForm;
