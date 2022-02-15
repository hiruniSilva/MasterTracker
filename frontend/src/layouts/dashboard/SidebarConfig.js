import { Icon } from '@iconify/react';
import peopleFill from '@iconify/icons-eva/people-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'Search',
    path: '/dashboard/search',
    icon: getIcon(peopleFill)
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: getIcon(peopleFill)
  },
  {
    title: 'login',
    path: '/login',
    icon: getIcon(lockFill)
  },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon(alertTriangleFill)
  // },
  {
    title: 'Master Tracker',
    path: '/dashboard/mastertrack',
    icon: getIcon(alertTriangleFill)
  },
  {
    title: 'Database',
    path: '/dashboard/database',
    icon: getIcon(alertTriangleFill)
  },
  {
    title: 'View',
    path: '/dashboard/view',
    icon: getIcon(alertTriangleFill)
  },
  {
    title: 'Report 1',
    path: '/dashboard/report1',
    icon: getIcon(alertTriangleFill)
  },
  {
    title: 'Report 2',
    path: '/dashboard/report2',
    icon: getIcon(alertTriangleFill)
  }
];

export default sidebarConfig;
