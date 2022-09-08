import { Link } from "react-router-dom";
import { TPost } from "src/types";

const PostContent = ({ post }: { post: TPost }) => {
  if (!post) return <h1>Loading...</h1>;
  return (
    <>
      <h1 className="mt-4">{post.title}</h1>
      {/* <!-- Author --> */}
      <p className="lead">
        by {post.user?.username}
        <Link to={`/users/${post.user?.username}`}> User's Profile</Link>
      </p>
      <hr />
      {/* <!-- Date/Time --> */}
      <p>Posted on {post.date}</p>
      <hr />
      {/* <!-- Preview Image --> */}
      {post?.image && (
        <img className="img-fluid rounded" src={`http://localhost:5000/${post.image}`} alt="" />
      )}
      <hr />
      {/* <!-- Post Content --> */}
      <div className="lead">{post.text}</div>
      <hr />{" "}
    </>
  );
};

export default PostContent;
