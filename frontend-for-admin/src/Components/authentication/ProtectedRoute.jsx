import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null); // null = loading
  const domain = process.env.REACT_APP_BACKEND_URL;
  useEffect(() => {
    axios.get(`${domain}api/verify`, {
      withCredentials: true, 
    })
    .then(() => setIsValid(true))
    .catch(() => setIsValid(false));
  }, []);

  if (isValid === null) return <div>Loading...</div>;
  if (isValid === false) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
