import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Data from "./pages/Data";
import ProtectedRoute from "./components/ProtectedRoute";
import Expenses from "./pages/expenses";
import { RolesProvider } from "./context/roles.context";
import MainLayout from "./components/MainLayout";

export default function App() {
  return (
    <div className="app">
      <Routes>
        {/* Public routes - outside provider */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* All other routes - wrapped with provider + header */}
        <Route path="/*" element={<MainLayout />} />
      </Routes>
      {/* <Header />
      <RolesProvider>
        <main className="container">
          <Routes>
            <Route path="/" element={<Navigate to="/data" replace />} />
            <Route
              path="/data"
              element={
                <ProtectedRoute>
                  <Data />
                </ProtectedRoute>
              }
            />
            <Route
              path="/expenses"
              element={
                <ProtectedRoute>
                  <Expenses />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="*"
              element={
                <div className="card">
                  <h2>Not Found</h2>
                </div>
              }
            />
          </Routes>
        </main>
      </RolesProvider> */}
    </div>
  );
}
