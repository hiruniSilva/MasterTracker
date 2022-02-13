import { RecoilRoot } from 'recoil';
// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import { LoadCurrentUser } from './services/auth.service';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <RecoilRoot>
      <ThemeConfig>
        <GlobalStyles />
        <BaseOptionChartStyle />
        <LoadCurrentUser>
          <Router />
        </LoadCurrentUser>
      </ThemeConfig>
    </RecoilRoot>
  );
}
