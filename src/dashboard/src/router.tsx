import { createBrowserRouter } from 'react-router';
import DashboardPage from './pages/dashboard/dashboard';
import StoragePage from './pages/storages/storages';
import LoginPage from './pages/login/login';
import RegisterPage from './pages/register/register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
  {
    path: '/auth',
    // element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: '/storages',
    element: <StoragePage />,
  },
]);

export default router;
