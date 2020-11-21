import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../Header/Header';

const Layout = (props) => {
  return (
    <>
      <Header />
      <main className='py-4'>
        <Container>
          {props.children}
        </Container>
      </main>
    </>
  );
};

export default Layout;