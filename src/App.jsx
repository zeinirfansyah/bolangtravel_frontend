import { Suspense } from "react";
import { Layout } from "./layouts/Layout";
import { Login } from "./pages/auth/Login";
import { Route, Routes } from "react-router-dom";
import { Register } from "./pages/auth/Register";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { Home } from "./pages/Home";
import { CreateDestination } from "./pages/admin/CreateDestination";
import { Booking } from "./pages/admin/Booking";

function App() {
  return (
    <>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/admin" element={<ProtectedRoute role="admin" />}>
              <Route index element={<Booking />} />
              <Route path="booking" element={<Booking />} />
              <Route path="add-destination" element={<CreateDestination />} />
            </Route>
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
}

export default App;
