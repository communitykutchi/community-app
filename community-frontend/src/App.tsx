import { BrowserRouter as Router, Routes, Route , Navigate} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/Feed";
import MainLayout from "./layout/MainLayout";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <Router>

      <MainLayout>

        <Routes>

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          <Route
            path="/feed"
            element={
              <PrivateRoute>
                <Feed />
              </PrivateRoute>
            }
          />

          
          <Route path="*" element={<Navigate to="/login" replace />} />

        </Routes>

      </MainLayout>

    </Router>
  );
}

export default App;
