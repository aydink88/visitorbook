import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const CreatePost = () => {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [errors, setErrors] = useState<any[]>([]);

  //redirect after creating post, maybe show a modal or toast or alert
  const handleSubmit = async (e: FormDataEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image!);
    formData.append("title", title);
    formData.append("text", text);
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/v1/posts", {
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("vb_token")}`,
        },
        body: formData,
      });
      const data = await res.json();
    } catch (err) {
      setErrors((prev) => [...prev, err]);
    }
  };

  return (
    <div className="my-4">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter a title"
            value={title}
            onChange={(e: InputEvent) => {
              const target = e.target as HTMLInputElement;
              setTitle(target.value);
            }}
          />
        </Form.Group>

        <Form.Group controlId="content">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Post Content"
            value={text}
            onChange={(e: InputEvent) => {
              const target = e.target as HTMLTextAreaElement;
              setText(target.value);
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="file"
            id="file"
            name="myImage"
            label="picture"
            onChange={(e: InputEvent) => {
              const target = e.target as HTMLInputElement;
              const files = target.files as FileList;
              setImage(files[0]);
            }}
          />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default CreatePost;
