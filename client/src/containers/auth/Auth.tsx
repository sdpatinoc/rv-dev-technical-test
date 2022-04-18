import { Navigate, Outlet, useLocation } from 'react-router-dom';
import * as React from 'react';
import { store } from '../../index';
import { getData } from '../../actions';

export const PrivateRoutes = () => {
  
  const location = useLocation();
  const userData = localStorage.getItem('userData');
  const authenticated: boolean = (userData) ? (JSON.parse(userData)).authenticated : false;
  
  if (authenticated) {
    store.dispatch(getData());
  }
  
  return authenticated
    ? <Outlet />
    : <Navigate to="/login" replace state={{ from: location }} />;
  
}
