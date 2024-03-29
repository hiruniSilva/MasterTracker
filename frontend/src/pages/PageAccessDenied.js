import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Container } from '@mui/material';
// components
import { MotionContainer, varBounceIn } from '../components/animate';
import Page from '../components/Page';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10)
}));

// ----------------------------------------------------------------------

export default function PageAccessDenied() {
  return (
    <RootStyle title="Access Denied">
      <Container>
        <MotionContainer initial="initial" open>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <motion.div variants={varBounceIn}>
              <Box
                component="img"
                src="/static/illustrations/access-denied.jpg"
                sx={{ height: 260, mx: 'auto' }}
              />
            </motion.div>
            {/* <Typography variant="h3" paragraph>
                Access denied !
              </Typography> */}
            <Typography sx={{ color: 'text.secondary' }}>
              Sorry, you are not allowed to access this page. Please ask permission from admin to
              access this page.
            </Typography>

            <Button to="/" size="large" variant="contained" component={RouterLink}>
              Go to Home
            </Button>
          </Box>
        </MotionContainer>
      </Container>
    </RootStyle>
  );
}
