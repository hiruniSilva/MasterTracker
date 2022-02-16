import { Icon } from '@iconify/react';
import peopleFill from '@iconify/icons-eva/people-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import roles from '../../services/roles.config';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'Search',
    path: '/dashboard/search',
    icon: getIcon(peopleFill),
    access: roles.Search
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: getIcon(peopleFill),
    access: roles.Add_New_User
  },
  {
    title: 'Master Tracker',
    path: '/dashboard/mastertrack',
    icon: getIcon(alertTriangleFill),
    access: roles.Master_Tracker
  },
  {
    title: 'Database',
    path: '/dashboard/database',
    icon: getIcon(alertTriangleFill),
    access: roles.Database
  },
  {
    title: 'View',
    path: '/dashboard/view',
    icon: getIcon(alertTriangleFill),
    access: roles.View
  },
  {
    title: 'Report 1',
    path: '/dashboard/report1',
    icon: getIcon(alertTriangleFill),
    access: roles.Report_1
  },
  {
    title: 'Report 2',
    path: '/dashboard/report2',
    icon: getIcon(alertTriangleFill),
    access: roles.Report_2
  }
];

export default sidebarConfig;
