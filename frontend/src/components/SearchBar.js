// Custom react component for the the search bar that was created using react-boostrap components
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

export default function SearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const submitHandler = (event) => {
    event.preventDefault();
    navigate(query ? `/search/?query=${query}` : '/search');
  };

  return (
    <Form className="d-flex me-auto" onSubmit={submitHandler}>
      <InputGroup>
        <FormControl
          className="w-50"
          type="text"
          name="query"
          id="query"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search for Products"
          aria-describedby="search"
          aria-label="Search for Products"
        ></FormControl>
        <Button variant="outline-primary" type="submit">
          <i className="fas fa-search"></i>
        </Button>
      </InputGroup>
    </Form>
  );
}
