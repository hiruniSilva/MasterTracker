import { Icon } from '@iconify/react';
import peopleFill from '@iconify/icons-eva/people-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import roles from '../../services/roles.config';
// import FaDatabase from '@iconify/icons-eva/FaDatabase';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'Search',
    path: '/dashboard/search',
    icon: getIcon('akar-icons:search'),
    access: roles.Search
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: getIcon('gridicons:user-add'),
    access: roles.Add_New_User
  },
  {
    title: 'Master Tracker',
    path: '/dashboard/mastertrack',
    icon: getIcon('carbon:add-filled'),
    access: roles.Master_Tracker
  },
  {
    title: 'Database',
    path: '/dashboard/database',
    icon: getIcon('eos-icons:database'),
    access: roles.Database
  },
  {
    title: 'View',
    path: '/dashboard/view',
    icon: getIcon('carbon:data-view-alt'),
    access: roles.View
  },
  {
    title: 'Branch',
    path: '/dashboard/branch',
    icon: getIcon('fluent:branch-24-regular'),
    access: roles.Add_Branch
  },
  {
    title: 'VA - First Call',
    path: '/dashboard/vafirstcall',
    icon: getIcon('entypo:add-to-list'),
    access: roles.VA_First_Call
  },
  {
    title: 'VA - Transfer Call',
    path: '/dashboard/vatransfercall',
    icon: getIcon('entypo:add-to-list'),
    access: roles.VA_Transfer_Call
  },
  {
    title: 'Report 1 - Sub BI',
    path: '/dashboard/report1',
    icon: getIcon('iconoir:reports'),
    access: roles.Report_1
  },
  {
    title: 'Report 2 - Database',
    path: '/dashboard/report2',
    icon: getIcon('iconoir:reports'),
    access: roles.Report_2
  },
  {
    title: 'Report 3 - VA First Calls',
    path: '/dashboard/reportvafirstcall',
    icon: getIcon('iconoir:reports'),
    access: roles.Report_VA_First_Call
  },
  {
    title: 'Report 4 - VA Transfer Calls',
    path: '/dashboard/reportvatransfercall',
    icon: getIcon('iconoir:reports'),
    access: roles.Report_VA_Transfer_Call
  }
];

export default sidebarConfig;
