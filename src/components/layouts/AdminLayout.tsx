import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import { logout } from 'src/store/slices/LoginSlice';
import { useAppDispatch } from 'src/store/store';

const AdminLayout: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <Navbar expand="sm" className="bg-body-tertiary">
        <Container className="px-0 mx-2 mw-100">
          <Navbar.Brand>Administrator View</Navbar.Brand>
          <Navbar.Toggle aria-controls="admin-navbar-nav" />
          <Navbar.Collapse id="admin-navbar-nav">
            <Nav className="me-auto gap-3">
              <Link to={'/admin/roles'}>Manage Roles</Link>
              <Link to={'/admin/users'}>Manage Users</Link>
              <Link to={'/admin/user-role-mapping'}>Manage User/Role mapping</Link>
            </Nav>
            <Nav className="align-self-end">
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

export default AdminLayout;
