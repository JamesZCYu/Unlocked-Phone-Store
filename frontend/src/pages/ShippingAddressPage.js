// Frontend user interface for the shipping address forms page
import React, { useContext, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import CheckoutProcess from '../components/CheckoutProcess';

export default function ShippingAddressPage() {
  const navigate = useNavigate();
  const { state, dispatch: contextDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  const [fullName, setFullName] = useState(shippingAddress.fullName || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAddress.country || '');

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/shipping');
    }
  }, [userInfo, navigate]);

  // prevents refreshing the page upon submit
  const submitHandler = (element) => {
    element.preventDefault();
    contextDispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, city, postalCode, country },
    });
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({ fullName, address, city, postalCode, country })
    );
    navigate('/payment');
  };
  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>

      <CheckoutProcess step1 step2></CheckoutProcess>
      <div className="container small-container">
        <h1 className="my-3">Shipping Address</h1>
        <div style={{ flex: 1, height: '2px', backgroundColor: 'black' }} />
        <br></br>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>
              <strong>Full Name:</strong>
            </Form.Label>
            <Form.Control
              value={fullName}
              onChange={(element) => setFullName(element.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>
              <strong>Address:</strong>
            </Form.Label>
            <Form.Control
              value={address}
              onChange={(element) => setAddress(element.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>
              <strong>City:</strong>
            </Form.Label>
            <Form.Control
              value={city}
              onChange={(element) => setCity(element.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="postalCode">
            <Form.Label>
              <strong>Postal Code:</strong>
            </Form.Label>
            <Form.Control
              value={postalCode}
              onChange={(element) => setPostalCode(element.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="country">
            <Form.Label>
              <strong>Country:</strong>
            </Form.Label>
            <Form.Control
              value={country}
              onChange={(element) => setCountry(element.target.value)}
              required
            />
          </Form.Group>
          <div className="mb-3">
            <Button variant="primary" type="submit">
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
