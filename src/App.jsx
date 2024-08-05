import { Suspense } from "react";
import { Layout } from "./layouts/Layout";
import { Login } from "./pages/auth/Login";
import { Route, Routes } from "react-router-dom";
import { Register } from "./pages/auth/Register";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { PackageCatalog } from "./pages/PackageCatalog";
import { Profile } from "./pages/Profile";
import { PackageDetail } from "./pages/PackageDetail";
import { PurchaseHistory } from "./pages/PurchaseHistory";
import { Payment } from "./pages/Payment";
import { CompletedBooking } from "./pages/CompletedBooking";
import { BookingInfo } from "./pages/BookingInfo";
import { NotFound } from "./pages/NotFound";
import { Booking } from "./pages/admin/Booking/Booking";
import { CreateDestination } from "./pages/admin/Destination/CreateDestination";
import { DestinationList } from "./pages/admin/Destination/DestinationList";
import { DestinationDetail } from "./pages/admin/Destination/DestinationDetail";
import { EditDestination } from "./pages/admin/Destination/EditDestination";
import { PackageList } from "./pages/admin/TravelPackage/PackageList";

function App() {
  return (
    <>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/travel-package" element={<PackageCatalog />} />
            <Route path="/travel-package/:id" element={<PackageDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/booking/:id/:date" element={<ProtectedRoute />}>
              <Route index element={<BookingInfo />} />
            </Route>

            <Route path="/payment/:id" element={<ProtectedRoute />}>
              <Route index element={<Payment />} />
              <Route path="completed" element={<CompletedBooking />} />
            </Route>

            <Route path="/account" element={<ProtectedRoute />}>
              <Route index element={<Profile />} />
              <Route path="purchase-history" element={<PurchaseHistory />} />
            </Route>

            <Route path="/admin" element={<ProtectedRoute role="admin" />}>
              <Route index element={<Booking />} />
              <Route path="booking" element={<Booking />} />
              <Route path="destination">
                <Route index element={<DestinationList />} />
                <Route path=":id" element={<DestinationDetail />} />
                <Route path="add-destination" element={<CreateDestination />} />
                <Route path="edit-destination/:id" element={<EditDestination />} />
              </Route>
              <Route path="travel-package">
                <Route index element={<PackageList />} />
              </Route>
            </Route>
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
}

export default App;
