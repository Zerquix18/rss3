import Layout from "./components/Layout";
import UserProvider from "./providers/User";

function App() {
  return (
    <div>
      <UserProvider>
        <Layout>
          a
        </Layout>
      </UserProvider>
    </div>
  );
}

export default App;
