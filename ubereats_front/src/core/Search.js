/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const SearchBox = ({ history, location }) => {
  const [keyword, setKeyword] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`${location.pathname}?text=${keyword}`);
    } else {
      history.push('/search/Delivery');
    }
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <i className="fas fa-search" style={{ position: 'absolute' }} />
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="   What are you craving?"
        className="mr-sm-2"
        style={{ width: '500px' }}
      />
    </Form>
  );
};

export default SearchBox;
