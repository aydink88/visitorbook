import { Link } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
import useAsync from "src/hooks/useAsync";
import { TPost } from "src/types";
import { useEffect } from "preact/hooks";

const Posts = () => {
  const getPosts = async (): Promise<TPost[]> => {
    const response = await fetch("/api/v1/posts");
    const postsData = await response.json();
    return postsData.posts;
  };
  const {
    execute: getPostsNow,
    status,
    value: posts,
    error: errorMessage,
  } = useAsync(getPosts, false);

  useEffect(() => {
    getPostsNow();
  }, []);

  if (status === "pending")
    return (
      <div className="col-8">
        <h1>Loading...</h1>
      </div>
    );
  if (errorMessage)
    return (
      <div className="col-8">
        <h1>{errorMessage}</h1>
      </div>
    );

  return (
    <Row>
      {posts &&
        posts.map((post, i) => {
          return (
            <Col sm={6} lg={4} key={post._id}>
              <Card key={i} className="my-4 shadow rounded-lg overflow-hidden">
                <Card.Body className="p-2">
                  <Card.Img variant="top" src={`http://localhost:5000/${post.image}`} />
                  <Card.Title className="my-2">{post.title}</Card.Title>
                  <Card.Text>
                    <Link
                      to={`/posts/${post._id}`}
                      className="btn btn-outline-primary btn-block mt-2"
                    >
                      See Content
                    </Link>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
    </Row>
  );
};

export default Posts;
