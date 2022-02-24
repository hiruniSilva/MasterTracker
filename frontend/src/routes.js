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
import PageAccessDenied from './pages/PageAccessDenied';
import AddBranch from './pages/AddBranch';
import VAFirstCall from './pages/VAFirstCall';
import VATransferCall from './pages/VATransferCall';
import VAFirstCallReport from './pages/VAFirstCallReport';

// ----------------------------------------------------------------------
const paths = [
  { path: 'search', element: <Search />, access: roles.Search },
  { path: 'user', element: <User />, access: roles.Add_New_User },
  { path: 'mastertrack', element: <MasterTrack />, access: roles.Master_Tracker },
  { path: 'database', element: <Database />, access: roles.Database },
  { path: 'view', element: <View />, access: roles.View },
  { path: 'report1', element: <Report1 />, access: roles.Report_1 },
  { path: 'report2', element: <Report2 />, access: roles.Report_2 },
  { path: 'addBranch', element: <AddBranch />, access: roles.Add_Branch },
  { path: 'vafirstcall', element: <VAFirstCall />, access: roles.VA_First_Call },
  { path: 'vatransfercall', element: <VATransferCall />, access: roles.VA_Transfer_Call },
  { path: 'reportvafirstcall', element: <VAFirstCallReport />, access: roles.Report_VA_First_Call }
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
        ...paths.map((i) => ({
          path: i.path,
          element:
            currentUser && currentUser.roles.includes(i.access) ? i.element : <PageAccessDenied />
        }))
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
