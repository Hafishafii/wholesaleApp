import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { Home } from "../pages";
import { NotificationPage } from "../pages/admin/NotificationPage";
import AddProductPage from "../pages/admin/AddProductPage";
import OrderRequestsPage from "../pages/admin/OrderRequestPage";
import OrderDetailsPage from "../pages/admin/OrderDetailsPage"; // ⬅️ Import this

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin/notifications" element={<NotificationPage />} />
      <Route path="/admin/add-product" element={<AddProductPage />} />
      <Route path="/admin/order-requests" element={<OrderRequestsPage />} />
      <Route path="/admin/order-details/:id" element={<OrderDetailsPage />} /> {/* ⬅️ Add this route */}

      <Route element={<ProtectedRoute />}>
        {/* Add other protected routes here */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
