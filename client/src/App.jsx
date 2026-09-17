import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import News from "./pages/News";
import NewsDetails from "./pages/NewsDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateNews from "./pages/CreateNews";
import EditNews from "./pages/EditNews";
import Contact from "./pages/Contact";

import PrivateRoute from "./routes/PrivateRoute";
import useAuthStore from "./store/authStore";

function App() {
  const getCurrentUser = useAuthStore(
    (state) => state.getCurrentUser
  );

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        <Navbar />

        <main className="flex-1">
          <Routes>
            {/* Public Routes */}
            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/news"
              element={<News />}
            />

            <Route
              path="/news/:id"
              element={<NewsDetails />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

            <Route
              path="/contact"
              element={<Contact />}
            />

            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
              <Route
                path="/dashboard"
                element={<Dashboard />}
              />

              <Route
                path="/create-news"
                element={<CreateNews />}
              />

              <Route
                path="/edit-news/:id"
                element={<EditNews />}
              />
            </Route>
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;