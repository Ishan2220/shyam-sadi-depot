import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import Showroom from "./pages/Showroom";
import BulkInquiry from "./pages/BulkInquiry";
import JobInquiry from "./pages/JobInquiry";
import Login from "./pages/Login";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Admin routes — outside main Layout */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Public routes — inside main Layout */}
        <Route
          path="*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/showroom" element={<Showroom />} />
                <Route path="/login" element={<Login />} />
                <Route path="/bulk-inquiry" element={<BulkInquiry />} />
                <Route path="/job-inquiry" element={<JobInquiry />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

