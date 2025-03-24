// import { Layout } from "./components/Layouts/Layout";
import Dashboard from "./Components/Dashboard/Dashboard.jsx";
import Attendance from "./Pages/Attendance";
import Payment from "./Pages/Payment";
import Students from "./Pages/Students";
import Enquiry from "./Pages/Enquiry";
import Login from "./Pages/Login";
import NotFound from "./Pages/Notfound";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => (
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="/:program/attendance" element={<Attendance />} />
                <Route path="/:program/payment" element={<Payment />} />
                <Route path="/:program/students" element={<Students />} />
                <Route path="/enquiry" element={<Enquiry />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
);

export default App;