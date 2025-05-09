import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Optionally add a loading spinner or message
  }

  return <Outlet />;
};

export default ProtectedRoutes;
