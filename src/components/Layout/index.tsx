import { useEffect } from "react";
import { Container, Heading, Navbar } from "react-bulma-components";
import { useUser } from "../../hooks";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const { authenticate, address } = useUser();

  useEffect(() => void authenticate(), [authenticate]);
  return (
    <div>
      <Navbar color="success">
        <Container>
          <Navbar.Brand>
            <Navbar.Item href="#">
              <Heading size={3}>R3</Heading>
            </Navbar.Item>
            <Navbar.Burger />
          </Navbar.Brand>
          <Navbar.Container alignContent="end">
            { address }
          </Navbar.Container>
        </Container>
      </Navbar>
      <Container>
        { children }
      </Container>
    </div>
  );
}

export default Layout;
