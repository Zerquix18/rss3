import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import UserProvider from "./providers/User";

import Profile from './pages/Profile';

function App() {
  return (
    <div>
      <UserProvider>
        <Layout>
          <Routes>
            <Route path="/u/:id" element={<Profile />}/>
          </Routes>
        </Layout>
      </UserProvider>
    </div>
  );
}

export default App;
