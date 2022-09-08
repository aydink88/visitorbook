import { Card } from "react-bootstrap";
import { TComment } from "src/types";

const Comments = ({ comments }: { comments: TComment[] }) => {
  let commentsDiv;
  if (comments) {
    commentsDiv = comments.map((comment) => {
      return (
        <Card key={comment._id} className="mb-4 shadow p-2">
          <img className="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt="" />
          <Card.Body>
            <h5 className="mt-0">{comment.name}</h5>
            <p>{comment.text}</p>
          </Card.Body>
        </Card>
      );
    });
  } else {
    commentsDiv = <p>Loading</p>;
  }

  return (
    <div className="border rounded-lg px-4 py-1">
      <h2>Comments</h2>
      {commentsDiv}
    </div>
  );
};

export default Comments;
