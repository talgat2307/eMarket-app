import React from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/actions/usersActions';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.userInfo);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand='lg' className='py-3 mb-3' collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to={'/'}>eMarket</Navbar.Brand>
          <Nav className="ml-auto">
            {!user ? <Nav.Link as={Link} to='/login'>Login</Nav.Link>
              :
              <>
                <Nav.Link as={Link} to={'/add-product'} className='pr-4'>Add new product</Nav.Link>
                <Dropdown>
                  <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    Hello, {user.user.username}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/my-profile">My
                      Profile</Dropdown.Item>
                    <Dropdown.Item onClick={logoutHandler}>Log
                      out</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            }
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;