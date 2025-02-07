// @ts-nocheck
import NavBar from "./components/NavBar.jsx";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage.jsx";
import SignUpPage from "./components/SignUpPage";
import ProfilPage from "./components/ProfilPage.jsx";
import SettingsPage from "./components/SettingsPage.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore.jsx";
import { useEffect } from "react";
import { Loader } from "lucide-react";
const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  return (
    <div>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route
          path="/profil"
          element={authUser ? <ProfilPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
};

export default App;
