// Frontend user interface functionality and design for the order summary page
import Axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import { getError } from '../utils';
import { Store } from '../Store';
import CheckoutProcess from '../components/CheckoutProcess';
import LoadingBox from '../components/LoadingBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loading: true };
    case 'CREATE_SUCCESS':
      return { ...state, loading: false };
    case 'CREATE_FAIL':
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default function OrderSummaryPage() {
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState('');
  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });
  const { state, dispatch: contextDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const rounding = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  cart.itemsPrice = rounding(
    cart.cartItems.reduce(
      (accumulator, currentItem) =>
        accumulator + currentItem.quantity * currentItem.price,
      0
    )
  );
  cart.taxPrice = rounding(0.1 * cart.itemsPrice);
  if (coupon === 'FREESHIPPING') {
    cart.shippingPrice = 0;
  } else {
    cart.shippingPrice =
      cart.shippingAddress.country === 'Canada' || 'canada'
        ? rounding(10)
        : rounding(25);
  }
  cart.subtotal = cart.shippingPrice + cart.itemsPrice;
  cart.total = cart.subtotal + cart.taxPrice;

  const submitHandler = async (element) => {
    element.preventDefault();
    if (coupon === 'FREESHIPPING') {
      alert('Coupon has been successfully applied for $0 shipping');
      return;
    } else {
      alert('That coupon code does not exist');
    }
  };

  const placeOrderHandler = async () => {
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      const { data } = await Axios.post(
        '/api/orders',
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          total: cart.total,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      contextDispatch({ type: 'CART_CLEAR' });
      dispatch({ type: 'CREATE_SUCCESS' });
      localStorage.removeItem('cartItems');
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' });
      alert(getError(err));
    }
  };

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart, navigate]);

  return (
    <div>
      <CheckoutProcess step1 step2 step3 step4 />
      <Helmet>
        <title>Order Summary</title>
      </Helmet>
      <h1 className="my-3" style={{ textAlign: 'center' }}>
        Order Summary
      </h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3" border="dark">
            <Card.Body>
              <Card.Title>Shipping Information</Card.Title>
              <Card.Text>
                <strong id="under">Name: </strong>{' '}
                {cart.shippingAddress.fullName} <br />
                <strong id="under">Address: </strong> <br />{' '}
                {cart.shippingAddress.address} <br />
                {cart.shippingAddress.city}, {cart.shippingAddress.country},{' '}
                {cart.shippingAddress.postalCode}
              </Card.Text>
              <Link to="/shipping">Edit</Link>
            </Card.Body>
          </Card>
          <Card className="mb-3" border="dark">
            <Card.Body>
              <Card.Title>Payment Information</Card.Title>
              <Card.Text>
                <strong id="under">Payment Method:</strong> {cart.paymentMethod}
              </Card.Text>
              <Link to="/payment">Edit</Link>
            </Card.Body>
          </Card>
          <Card className="mb-3" border="dark">
            <Card.Body>
              <Card.Title>Products</Card.Title>
              <ListGroup>
                {cart.cartItems.map((item) => (
                  <ListGroup.Item
                    border="dark"
                    style={{ borderWidth: 1 }}
                    key={item._id}
                  >
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        />{' '}
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </Col>
                      <Col md={2}>
                        <span>
                          <strong>Price: </strong> ${item.price}
                        </span>
                      </Col>
                      <Col md={2}>
                        <span>
                          <strong>Quantity: </strong> {item.quantity}
                        </span>
                      </Col>
                      <Col md={2}>
                        <span>
                          <strong>Total: </strong> ${item.price * item.quantity}
                        </span>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link to="/cart">Edit</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card border="dark">
            <Card.Body>
              <Card.Title>Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items:</Col>
                    <Col>${cart.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping:</Col>
                    <Col>${cart.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Taxes:</Col>
                    <Col>${cart.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong id="under">Subtotal:</strong>
                    </Col>
                    <Col>
                      <strong>${cart.subtotal.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <Form onSubmit={submitHandler}>
                  <Form.Group
                    className="mb-3"
                    controlId="coupon"
                    style={{ display: 'flex' }}
                    onChange={(element) => setCoupon(element.target.value)}
                  >
                    <Form.Control
                      type="coupon"
                      placeholder="Enter in a coupon code"
                    ></Form.Control>
                    <Button variant="secondary" type="submit">
                      Apply Code
                    </Button>
                  </Form.Group>
                </Form>
                <ListGroup.Item variant="secondary">
                  <Row>
                    <Col>
                      <strong class="text-danger" id="under">
                        Total:
                      </strong>
                    </Col>
                    <Col>
                      <strong class="text-danger">
                        ${cart.total.toFixed(2)}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      onClick={placeOrderHandler}
                      disabled={cart.cartItems.length === 0}
                    >
                      Continue to Payment
                    </Button>
                  </div>
                  {loading && <LoadingBox></LoadingBox>}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
