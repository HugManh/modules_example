import { getIsAuthenticated } from '@/store';
import { Navigate, Outlet } from 'react-router';

export default function AuthLayout() {
  const isAuthenticated = getIsAuthenticated();

  if (isAuthenticated) {
    return <Navigate to={'/dashboard'} replace />;
  }

  return <Outlet />;
}
