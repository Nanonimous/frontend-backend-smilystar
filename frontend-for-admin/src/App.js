import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Payment from "./Pages/Payment";
import Enquiry from "./Pages/Enquiry";
import Login from "./Pages/Login";
import NotFound from "./Pages/Notfound";
import ProtectedRoute from "./Components/authentication/ProtectedRoute";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/:program/attendance"
        element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/:program/payments"
        element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/:program/students"
        element={
          <ProtectedRoute>
            <Enquiry />
          </ProtectedRoute>
        }
      />
      <Route
        path="/enquiry"
        element={
          <ProtectedRoute>
            <Enquiry />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
