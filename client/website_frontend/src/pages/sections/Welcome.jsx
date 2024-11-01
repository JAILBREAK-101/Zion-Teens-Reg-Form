import { AppBar } from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';

function Welcome() {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              Teen Faith Hub
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              Teen Faith Hub
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              Explore faith through scripture and activities
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Welcome to Teen Faith Hub
        </Typography>
        <Typography variant="body1" gutterBottom>
          A place where teens can connect with scripture, engage in faith-related activities, and find inspiration in their spiritual journey.
        </Typography>
        <Typography variant="h6" component="h3" gutterBottom>
          Discover a community that nurtures your faith and empowers you to live out your beliefs with passion and purpose.
        </Typography>
      </Container>
      <Box sx={{ bgcolor: 'background.paper', p: 6 }}>
        <Container maxWidth="md">
          <Typography variant="body1" align="center">
            Connect with us:
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Link href="#" sx={{ mr: 2 }}>
              <InstagramIcon />
            </Link>
            <Link href="#" sx={{ mr: 2 }}>
              <TwitterIcon />
            </Link>
            <Link href="#">
              <FacebookIcon />
            </Link>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Welcome;