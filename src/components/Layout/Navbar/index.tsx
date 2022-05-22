import { Button, Container, Heading, Navbar, Tag } from "react-bulma-components";
import { useUser } from "../../../hooks";

function LayoutNavbar() {
  const { address, authenticate } = useUser();

  return (
    <Navbar color="success">
      <Container>
        <Navbar.Brand>
          <Navbar.Item href="/">
            <Heading size={3}>T3</Heading>
          </Navbar.Item>
        </Navbar.Brand>
        <Navbar.Container align="right" alignItems="center">
          { address ? (
            <Tag size="medium">
              { address.slice(0, 6) + '...' + address.slice(-4) }
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
