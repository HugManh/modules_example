import { createBrowserRouter } from 'react-router';
import DashboardPage from './pages/dashboard/dashboard';
import StoragePage from './pages/storages/storages';

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
    path: '/storages',
    element: <StoragePage />,
  },
]);

export default router;
