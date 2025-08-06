import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.js";
import AccessibilityForm from "./pages/AccessibilityForm.js";
import PrivateRoute from "./PrivateRoute.js"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/form"
          element={
            <PrivateRoute>
              <AccessibilityForm />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
