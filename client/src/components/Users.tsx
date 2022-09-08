import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Card } from "react-bootstrap";
import { TUser } from "src/types";

const Users = () => {
  const [users, setUsers] = useState<TUser[]>([]);

  const getUsers = async () => {
    const response = await fetch("/api/v1/users", {
      credentials: "include",
      headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
    });
    const userList = await response.json();
    setUsers(userList.users);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Col xs={12}>
      <Row>
        {users &&
          users.map((user) => {
            return (
              <Col key={user._id} xs={12} md={6} lg={4}>
                <Card className="m-4">
                  {user.avatar && (
                    <img
                      height="150px"
                      style={{ objectFit: "scale-down" }}
                      className="card-img-top m-2"
                      src={`http://localhost:5000/${user.avatar}`}
                      alt="CardImage"
                    />
                  )}
                  <Card.Body>
                    <Card.Title className="text-center">{user.username}</Card.Title>
                    <Link
                      to={`/users/${user._id}`}
                      className="btn btn-outline-primary btn-block mt-2"
                    >
                      See Profile
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
      </Row>
    </Col>
  );
};

export default Users;
