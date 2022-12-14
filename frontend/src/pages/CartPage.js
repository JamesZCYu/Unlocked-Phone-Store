// Frontend user interface functionality and design for the shopping cart page
import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import MessageBox from '../components/MessageBox';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function CartPage() {
  const { state, dispatch: contextDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const navigate = useNavigate();

  const updateCartHandler = async (item, quantity, type) => {
    const { data } = await axios.get(`/api/products/${item._id}`);

    if (data.countInStock < quantity) {
      window.alert('Sorry, there is no more stock for that product');
      return;
    } else if (item.quantity <= 1 && type === 'remove') {
      removeItemHandler(item);
      return;
    }

    contextDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping');
  };

  const removeItemHandler = (item) => {
    contextDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox variant="danger">
              The shopping cart is empty.{' '}
              <Link to="/">Add one or more items to the cart</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid round img-thumbnail"
                      ></img>{' '}
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        variant="light"
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1, 'remove')
                        }
                        disabled={item.quantity === item.countInStock}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{' '}
                      <span>{item.quantity}</span>{' '}
                      <Button
                        variant="light"
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1, 'add')
                        }
                        disabled={item.quantity === item.countInStock}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>${item.price}</Col>
                    <Col md={2}>
                      <Button
                        onClick={() => removeItemHandler(item)}
                        variant="light"
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal (
                    {cartItems.reduce(
                      (accumulator, currentItem) =>
                        accumulator + currentItem.quantity,
                      0
                    )}{' '}
                    items) : $
                    {cartItems.reduce(
                      (accumulator, currentItem) =>
                        accumulator + currentItem.price * currentItem.quantity,
                      0
                    )}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      onClick={checkoutHandler}
                      disabled={cartItems.length === 0}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default CartPage;
