import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import UserProvider from "./providers/User";

import * as Pages from './pages';

function App() {
  return (
    <div>
      <UserProvider>
        <Layout>
          <Routes>
            <Route path="/u/:id" element={<Pages.Profile />}/>
            <Route path="/" element={<Pages.Home />}/>
          </Routes>
        </Layout>
      </UserProvider>
    </div>
  );
}

export default App;
