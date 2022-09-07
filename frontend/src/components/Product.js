// Custom react component for displaying a summary of Product's information including an image, name, price, review rating, and an add to cart button
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

function Product(elements) {
  const { product } = elements;

  const { state, dispatch: contextDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  // Handler for adding items to the shopping cart
  const addToCartHandler = async (item) => {
    const itemExists = cartItems.find((temp) => temp._id === product._id);
    const quantity = itemExists ? itemExists.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);

    if (data.countInStock < quantity) {
      window.alert('Sorry, there is no more stock for that product');
      return;
    }

    contextDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    <Card border="secondary" style={{ borderWidth: 1 }}>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text class="fw-bold" style={{ fontSize: '2rem' }}>
          ${product.price}
        </Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of Stock
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(product)}>
            Add item to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default Product;
