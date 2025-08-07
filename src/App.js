import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccessibilityForm from "./pages/AccessibilityForm.js";
import Login from "./pages/Login.js"
import Thanks from "./pages/Thanks.js";
import PrivateRoute from "./PrivateRoute.js";

function App() {
  return (
    <Router>
      <Routes>
        {/* Giriş Sayfası */}
        <Route path="/" element={<Login />} />

        {/* Erişilebilirlik Formu */}
        <Route
          path="/form"
          element={
            <PrivateRoute>
              <AccessibilityForm />
            </PrivateRoute>
          }
        />

        {/* Teşekkür Sayfası */}
        <Route
          path="/thanks"
          element={
            <PrivateRoute>
              <Thanks />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
