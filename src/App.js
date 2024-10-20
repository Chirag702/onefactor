import { useEffect } from 'react';
import { useNavigate, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import RSignup from './res/views/take/auth/RSignup';
import RSignin from './res/views/take/auth/RSignin';
import Dashboards from './res/views/take/dashboard/Dashboards';
import HomeScreen from './res/views/homepage/HomeScreen';
import InitProfile from './res/views/take/profile/InitProfile';
import VerifyOtp from './res/views/take/profile/VerifyOtp';
import PrivateRoute from './PrivateRoute';
import RequestForm from './res/views/give/RequestForm';
import Success from './res/views/give/Success';

function App() {
  const navigate = useNavigate();

  // Function to check token existence
  const checkToken = () => localStorage.getItem('token');
  const checkIsEmailVerified = () => localStorage.getItem("isEmailVerified1") || false;

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={checkToken() ? <Navigate to="/home" /> : <HomeScreen />} />
      <Route path="/r/signup" element={checkToken() ? <Navigate to="/home" /> : <RSignup />} />
      <Route path="/r/signin" element={checkToken() ? <Navigate to="/home" /> : <RSignin />} />

      {/* Protected Routes (using PrivateRoute) */}
      <Route
        path="/initProfile"
        element={
          <PrivateRoute>
            <InitProfile />
          </PrivateRoute>
        }
      />

      <Route
        path="/verifyOtp"
        element={
          <PrivateRoute>
            <VerifyOtp />
          </PrivateRoute>
        }
      />

      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Dashboards />
          </PrivateRoute>
        }
      />

      <Route
        path="/referrer/form"
        element={
          <PrivateRoute>
            <RequestForm />
          </PrivateRoute>
        }
      />

      <Route
        path="/referrer/success"
        element={
          <PrivateRoute>
            <Success />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;