import { Suspense } from "react";
import { Layout } from "./layouts/Layout";
import { Login } from "./pages/auth/Login";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
}

export default App;
