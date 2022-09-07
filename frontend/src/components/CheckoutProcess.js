// Custom react component for the checkout progress bar created using react-bootstrap
import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function CheckoutProcess(elements) {
  return (
    <Row className="checkout-process">
      <Col className={elements.step1 ? 'active' : ''}>
        <strong>1 -Sign-In</strong>
      </Col>
      <Col className={elements.step2 ? 'active' : ''}>
        <strong>2 -Shipping information</strong>
      </Col>
      <Col className={elements.step3 ? 'active' : ''}>
        <strong>3 - Payment Method</strong>
      </Col>
      <Col className={elements.step4 ? 'active' : ''}>
        <strong>4 - Place Order</strong>
      </Col>
    </Row>
  );
}
