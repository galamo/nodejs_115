import { RolesProvider } from "@/context/roles.context";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./Header";
import ProtectedRoute from "./ProtectedRoute";
import Data from "@/pages/Data";
import Expenses from "@/pages/expenses";

export default function MainLayout() {
  return (
    <RolesProvider>
      <Header />
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
    </RolesProvider>
  );
}
