// Frontend user interface for the reciept page
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

export default function RecieptPage() {
  const params = useParams();
  const { id: orderId } = params;

  return (
    <div>
      <Helmet>
        <title>Reciept</title>
      </Helmet>
      <h1 style={{ textAlign: 'center' }}>Thank you for shopping with us!</h1>
      <br />
      <br />
      <h3 style={{ textAlign: 'center' }}>Order #{orderId}</h3>
      <br />
      <img src="/images/recieptImg.png" alt="recieptImg" class="center" />
      <br />
      <p style={{ textAlign: 'center', fontSize: '20px' }}>
        You will be recieving a confirmation email with the order details
        shortly.
      </p>
      <div class="text-center">
        <Button type="button" variant="primary" href="/">
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}
