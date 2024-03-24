import { Container, Nav, Navbar } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { logout } from 'src/store/slices/LoginSlice';
import { useAppDispatch } from 'src/store/store';

const UserLayout: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <Navbar expand="sm" className="bg-body-tertiary">
        <Container className="px-0 mx-2 mw-100">
          <Navbar.Brand>User View</Navbar.Brand>
          <Navbar.Toggle aria-controls="admin-navbar-nav" />
          <Navbar.Collapse id="admin-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link onClick={() => dispatch(logout())}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="mt-3">
        <Outlet />
      </div>
    </>
  );
};

export default UserLayout;
