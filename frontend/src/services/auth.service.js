import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import axios from './api.service';

export const currentUserState = atom({
  key: 'currentUser',
  default: null
});

export const LoadCurrentUser = ({ fallback, children }) => {
  const setCurrentUser = useSetRecoilState(currentUserState);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    axios
      .get('/api/user/current')
      .then((res) => {
        setCurrentUser(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);
  return loading ? fallback || null : children;
};

export const RequireAuth = () => {
  const currentUser = useRecoilValue(currentUserState);
  const location = useLocation();
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return <Outlet />;
};
