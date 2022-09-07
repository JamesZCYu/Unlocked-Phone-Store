// Frontend user interface for the profile page
import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import Form from 'react-bootstrap/Form';

export default function ProfilePage() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [id] = useState(userInfo._id);
  const [name] = useState(userInfo.name);
  const [email] = useState(userInfo.email);
  const [admin] = useState(userInfo.admin);

  return (
    <div className="container small-container">
      <Helmet>
        <title>User Profile</title>
      </Helmet>
      <h1 className="my-3" id="under">
        User Profile
      </h1>
      <br />
      <br />
      <form>
        <Form.Group className="mb-3" controlId="id">
          <Form.Label>
            <strong>User ID:</strong>
          </Form.Label>
          <Form.Control type="id" value={id} disabled></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>
            <strong>Name:</strong>
          </Form.Label>
          <Form.Control value={name} disabled></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>
            <strong>Email:</strong>
          </Form.Label>
          <Form.Control type="email" value={email} disabled></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="admin">
          <Form.Label>
            <strong>Admin Status:</strong>
          </Form.Label>
          <Form.Control type="admin" value={admin} disabled></Form.Control>
        </Form.Group>
      </form>
    </div>
  );
}
