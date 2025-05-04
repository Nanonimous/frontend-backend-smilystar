// import { Layout } from "./components/Layouts/Layout";
import Dashboard from "../src/Pages/Dashboard.jsx";
import Attendance from "./Pages/Attendance";
import Payment from "./Pages/Payment";
import Students from "./Pages/Students";
import Enquiry from "./Pages/Enquiry";
import Login from "./Pages/Login";
import NotFound from "./Pages/Notfound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "../src/Components/Layout/Sidebar/Menu.jsx";


const App = () => (
<>        
  
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="/:program/attendance" element={<Payment />} />
                <Route path="/:program/payments" element={<Payment />} />
                <Route path="/:program/students" element={<Enquiry />} />
                <Route path="/enquiry" element={<Enquiry />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>



</>
);

export default App;