import { useEffect, useState } from "react";
import Sidebar from "../components/common/Sidebar";
import CommentForm from "../components/CommentForm";
import Comments from "../components/Comments";
import PostContent from "../components/PostContent";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { TPost } from "src/types";

const Postpage = () => {
  const [post, setPost] = useState<TPost>();
  const { pid } = useParams();

  const getPost = async (pid: string) => {
    const response = await fetch(`http://localhost:5000/api/v1/posts/${pid}`);
    const postData = await response.json();
    setPost(postData.post);
  };

  useEffect(() => {
    getPost(pid!);
  }, [pid]);

  if (!post) return <h1>Nothing...</h1>;

  return (
    <Row>
      <Col xs={12} md={8}>
        <PostContent post={post} />
        <CommentForm />
        <Comments comments={post.comments} />
      </Col>
      <Col xs={12} md={4}>
        <Sidebar />
      </Col>
    </Row>
  );
};

export default Postpage;
