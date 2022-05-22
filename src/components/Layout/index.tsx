import { useEffect } from "react";
import { Container } from "react-bulma-components";
import { useUser } from "../../hooks";

import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const { authenticate } = useUser();

  useEffect(() => void authenticate(), [authenticate]);

  return (
    <div>
      <Navbar />
      <Container style={{ paddingTop: 30 }}>
        { children }
      </Container>
    </div>
  );
}

export default Layout;
