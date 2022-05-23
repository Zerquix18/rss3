import { Button, Container, Heading, Navbar, Tag } from "react-bulma-components";
import { useUser } from "../../../hooks";

function LayoutNavbar() {
  const { profile, authenticate } = useUser();

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
            <Tag size="medium">
              { profile.address.slice(0, 6) + '...' + profile.address.slice(-4) }
            </Tag>
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
