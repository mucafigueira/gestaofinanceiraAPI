import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/ Dashboard";
import Login from "./pages/Login";
import PrivateRoute from "./routes/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Rota pública */}
        <Route path="/login" element={<Login />} />

        {/* Rota protegida */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}



