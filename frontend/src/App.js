import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/NavBar';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { Store } from './Store';
import CartPage from './pages/CartPage';
import SigninPage from './pages/SigninPage';
import ShippingAddressPage from './pages/ShippingAddressPage';
import SignUpPage from './pages/SignUpPage';
import PaymentMethodPage from './pages/PaymentMethodPage';
import OrderPaymentPage from './pages/OrderPaymentPage';
import OrderSummaryPage from './pages/OrderSummaryPage';
import Footer from './components/Footer';
import OrderHistoryPage from './pages/OrderHistoryPage';
import ProfilePage from './pages/ProfilePage';
import { getError } from './utils';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import SearchPage from './pages/SearchPage';
import RecieptPage from './pages/RecieptPage';

function App() {
  const { state, dispatch: contextDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  // After a user signs out, delete items from local storage
  const signoutHandler = () => {
    contextDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('paymentMethod');
  };
  const [openedSidebar, setOpenedSidebar] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        alert(getError(err));
      }
    };
    fetchCategories();
  }, []);

  // Sets the header and footer that is seen on every page of the website. Also contains the routing for switching between the different pages in the app
  return (
    <BrowserRouter>
      <div
        className={
          openedSidebar
            ? 'd-flex flex-column site-container active-sidebar'
            : 'd-flex flex-column site-container'
        }
      >
        <header>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <Button
                variant="dark"
                onClick={() => setOpenedSidebar(!openedSidebar)}
              >
                <i className="fas fa-bars"></i>
              </Button>
              <LinkContainer to="/">
                <Navbar.Brand>
                  <img
                    src="/images/storeIcon.png"
                    width="20"
                    height="30"
                    className="d-inline-block align-top"
                    alt="profileIcon"
                  />{' '}
                  Unlocked Phone Store
                </Navbar.Brand>
              </LinkContainer>
              <Nav.Item>
                <Nav.Link eventKey="disabled" disabled></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="disabled" disabled></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="disabled" disabled></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="disabled" disabled></Nav.Link>
              </Nav.Item>
              <div className="flex-grow-1">
                <SearchBar />
              </div>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto w-100 justify-content-end">
                  <Link to="/search" className="nav-link">
                    <strong>Products</strong>
                  </Link>
                  <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled></Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled></Nav.Link>
                  </Nav.Item>
                  <Navbar.Brand href="/cart">
                    <img
                      src="/images/shoppingCartIcon.jpg"
                      width="40"
                      height="30"
                      className="d-inline-block align-top"
                      alt="shoppingCartIcon"
                    />
                  </Navbar.Brand>
                  <Link to="/cart" className="nav-link">
                    <strong>Cart</strong>
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce(
                          (accumulator, currentItem) =>
                            accumulator + currentItem.quantity,
                          0
                        )}
                      </Badge>
                    )}
                  </Link>
                  <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled></Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled></Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled></Nav.Link>
                  </Nav.Item>
                  {userInfo ? (
                    <Navbar.Brand href="/profile">
                      <img
                        src="/images/profileIcon.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="profileIcon"
                      />
                    </Navbar.Brand>
                  ) : (
                    <Navbar.Brand href="/signin">
                      <img
                        src="/images/profileIcon.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="profileIcon"
                      />
                    </Navbar.Brand>
                  )}

                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="orderhistory">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="/signin"
                        onClick={signoutHandler}
                      >
                        <strong>Sign Out</strong>
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      <strong>Sign In</strong>
                    </Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <div
          className={
            openedSidebar
              ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
              : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
          }
        >
          <Nav className="flex-column text-white w-100 p-2">
            {userInfo ? (
              <strong style={{ textAlign: 'center' }}>
                Hello , {userInfo.name}!
                <div
                  style={{ flex: 1, height: '2px', backgroundColor: 'white' }}
                />
              </strong>
            ) : (
              <strong style={{ textAlign: 'center' }}>
                Hello , Guest!
                <div
                  style={{ flex: 1, height: '2px', backgroundColor: 'white' }}
                />
              </strong>
            )}
            <br />
            <Nav.Item>
              <strong>Browse by Categories</strong>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer
                to={`/search`}
                onClick={() => setOpenedSidebar(false)}
              >
                <Nav.Link className="categoryColour">All</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            {categories.map((category) => (
              <Nav.Item key={category}>
                <LinkContainer
                  to={`/search?category=${category}`}
                  onClick={() => setOpenedSidebar(false)}
                >
                  <Nav.Link className="categoryColour">{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
            <br />
            <Nav.Item>
              <strong>Go To</strong>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href="/signin"
                className="categoryColour"
                onClick={() => setOpenedSidebar(false)}
              >
                Sign In Page
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href="/signup"
                className="categoryColour"
                onClick={() => setOpenedSidebar(false)}
              >
                Sign Up Page
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href="/cart"
                className="categoryColour"
                onClick={() => setOpenedSidebar(false)}
              >
                Item Cart Page
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                href="/search"
                className="categoryColour"
                onClick={() => setOpenedSidebar(false)}
              >
                Product Catalog Page
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/reciept/:id" element={<RecieptPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/orderhistory" element={<OrderHistoryPage />} />
              <Route path="/order/:id" element={<OrderPaymentPage />} />
              <Route path="/placeorder" element={<OrderSummaryPage />} />
              <Route path="/payment" element={<PaymentMethodPage />} />
              <Route path="/shipping" element={<ShippingAddressPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/signin" element={<SigninPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/product/:slug" element={<ProductPage />} />
              <Route path="/" element={<HomePage />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
