// Custom react component for a loading symbol that should only appear if the server cannot connect to the database or internet is slow
import Spinner from 'react-bootstrap/Spinner';

function LoadingBox() {
  return (
    <Spinner animation="border" role="statux">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default LoadingBox;
