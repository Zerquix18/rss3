import { Button, Container, Dropdown, Heading, Icon, Navbar } from "react-bulma-components";
import { useNavigate } from "react-router";
import { useUser } from "../../../hooks";

function LayoutNavbar() {
  const { profile, authenticate, logout } = useUser();
  const navigate = useNavigate();

  const onDropdownSelect = (value: string) => {
    switch (value) {
      case 'my-account':
        navigate('/my-account');
        break;
      case 'logout':
        if (! window.confirm('Are you sure you want to log out?')) {
          return;
        }
    
        logout();
        break;
    }
  }

  return (
    <Navbar color="success">
      <Container>
        <Navbar.Brand>
          <Navbar.Item href="/">
            <Heading size={3}>T3</Heading>
          </Navbar.Item>
        </Navbar.Brand>
        <Navbar.Container align="right" alignItems="center">
          { profile ? (
              <Dropdown
                icon={<Icon><i aria-hidden="true" className="fas fa-angle-down"/></Icon>}
                label={profile.address.slice(0, 6) + '...' + profile.address.slice(-4)}
                onChange={onDropdownSelect}
              >
                <Dropdown.Item renderAs="a" value="my-account">My account</Dropdown.Item>
                <Dropdown.Item renderAs="a" value="logout">Logout</Dropdown.Item>
            </Dropdown>
          ) : (
            <Button size="small" onClick={authenticate}>
              Connect wallet
            </Button>
          )}
        </Navbar.Container>
      </Container>
    </Navbar>
  );
}

export default LayoutNavbar;
