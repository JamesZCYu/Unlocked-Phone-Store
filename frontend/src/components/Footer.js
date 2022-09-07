// Custom react component for the footer
import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBBtn,
} from 'mdb-react-ui-kit';

export default function Footer() {
  const newsletterHandler = (element) => {
    alert('Successfully signed up for the newsletter!');
  };
  return (
    <MDBFooter bgColor="dark" className="text-center text-white text-lg-left">
      <div
        style={{
          display: 'flex',
          float: 'right',
          position: 'relative',
          zIndex: 597,
        }}
      >
        <strong id="under">Currency:</strong>&nbsp;CAD&nbsp;&nbsp;
        <img src="/images/canFlag.jpg" alt="canFlag" />
        &nbsp;&nbsp;&nbsp;
      </div>
      <MDBContainer className="p-4 pb-0">
        <form onSubmit={newsletterHandler}>
          <MDBRow className="d-flex justify-content-center">
            <MDBCol size="auto" className="mb-4 mb-md-0">
              <p className="pt-2">
                <strong>Sign up for our newsletter</strong>
              </p>
            </MDBCol>
            <MDBCol md="5" size="12" className="mb-4 mb-md-0">
              <MDBInput
                type="text"
                id="form5Example2"
                contrast
                placeholder="Enter your email"
                required
              />
            </MDBCol>

            <MDBCol size="auto" className="mb-4 mb-md-0">
              <MDBBtn outline color="light">
                Subscribe
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </form>
      </MDBContainer>

      <div
        className="text-center p-3"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
      >
        &copy; {new Date().getFullYear()} James Yu. All rights reserved.
      </div>
    </MDBFooter>
  );
}
