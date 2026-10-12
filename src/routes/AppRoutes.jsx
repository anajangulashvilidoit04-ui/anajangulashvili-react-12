
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Profile from "../pages/Profile";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/profile"
        element={
          localStorage.getItem("token") ? (
            <Profile />
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
};

export default AppRoutes;
