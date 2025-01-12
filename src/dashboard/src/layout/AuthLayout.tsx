import { useTokenStore } from '@/store';
import { Navigate, Outlet } from 'react-router';

export default function AuthLayout() {
  const token = useTokenStore((state) => state.token);

  if (token) {
    return <Navigate to={'/dashboard'} replace />;
  }

  return <Outlet />;
}
