import { Navigate, useRoutes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

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
import roles from './services/roles.config';
import { currentUserState } from './services/auth.service';
import sidebarConfig from './layouts/dashboard/SidebarConfig';

// ----------------------------------------------------------------------
const paths = [
  { path: 'search', element: <Search />, access: roles.Search },
  { path: 'user', element: <User />, access: roles.Add_New_User },
  { path: 'mastertrack', element: <MasterTrack />, access: roles.Master_Tracker },
  { path: 'database', element: <Database />, access: roles.Database },
  { path: 'view', element: <View />, access: roles.View },
  { path: 'report1', element: <Report1 />, access: roles.Report_1 },
  { path: 'report2', element: <Report2 />, access: roles.Report_2 }
];
export default function Router() {
  const currentUser = useRecoilValue(currentUserState);
  const path =
    currentUser && currentUser.roles.length > 0
      ? sidebarConfig.find((item) => item.access === currentUser.roles[0])
      : { path: '/dashboard/user' };

  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={path.path} replace /> },
        ...(currentUser
          ? paths.filter((item) => currentUser.roles.includes(item.access))
          : paths
        ).map((i) => ({ path: i.path, element: i.element }))
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
