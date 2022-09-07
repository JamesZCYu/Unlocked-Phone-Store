// Generalizes the react-bootstrap alert component for use in the app
import Alert from 'react-bootstrap/Alert';

function MessageBox(elements) {
  return (
    <Alert variant={elements.variant || 'info'}>{elements.children}</Alert>
  );
}
export default MessageBox;
