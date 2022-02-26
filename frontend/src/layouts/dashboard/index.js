import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { useRecoilValue } from 'recoil';
import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material';

//
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import { currentUserState } from '../../services/auth.service';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;
const DRAWER_WIDTH = 280;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme, isOpen }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginLeft: isOpen ? DRAWER_WIDTH : 0
  }
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const currentUser = useRecoilValue(currentUserState);

  return currentUser ? (
    <RootStyle>
      <DashboardNavbar isOpen={open} onOpenSidebar={() => setOpen(!open)} />
      <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle isOpen={open}>
        <Outlet />
      </MainStyle>
    </RootStyle>
  ) : (
    <Navigate to="/login" replace />
  );
}
