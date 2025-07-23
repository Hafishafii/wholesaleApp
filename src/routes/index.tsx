import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { Home } from "../pages";
import { NotificationPage } from "../pages/admin/NotificationPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin/notifications" element={<NotificationPage />} />
      <Route element={<ProtectedRoute />}>

        {/* Add other protected routes here */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;