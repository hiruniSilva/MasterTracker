import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import User from './pages/User';
import NotFound from './pages/Page404';
import MasterTrack from './pages/MasterTrack';
import Search from './pages/Search';
import Database from './pages/Database';
import View from './pages/View';
import Report1 from './pages/Report1';
import Report2 from './pages/Report2';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/user" replace /> },
        { path: 'search', element: <Search /> },
        { path: 'user', element: <User /> },
        { path: 'mastertrack', element: <MasterTrack /> },
        { path: 'database', element: <Database /> },
        { path: 'view', element: <View /> },
        { path: 'report1', element: <Report1 /> },
        { path: 'report2', element: <Report2 /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { element: <Navigate to="/dashboard" replace /> },
        { path: 'login', element: <Login /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
