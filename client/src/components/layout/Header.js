import * as React from 'react';
import { 
  AppBar,
  Box,
  CssBaseline,
  Toolbar,
  Link,
  Container,
  Drawer,
  Button,
  List,
  ListItem,
  Typography
} from '@mui/material';
import {
  LogoutOutlined,
  Menu,
  Person
} from '@mui/icons-material';

import logo from '../../assets/images/encryption.png';
import { APPNAME } from '../../helpers/consts';

import { logout } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Header = ({ auth: { isAuthenticated, user, loading }, logout }) => {
  const toggelMenuItems = [
    {
      href: '/message',
      value: 'Message',
      class: 'toggle-menu-item'
    },
    {
      href: '/file',
      value: 'File',
      class: 'toggle-menu-item'
    },
    {
      href: '/payment',
      value: 'Payment',
      class: 'toggle-menu-item'
    },
    {
      href: '/admin/dashboard',
      value: 'Dashboard',
      class: 'toggle-menu-item'
    }
  ];

  const headerNavItems = [
    {
      href: '/message',
      value: 'Message'
    },
    {
      href: '/file',
      value: 'File'
    },
    {
      href: '/payment',
      value: 'Payment'
    }
  ]

  const [right, openMenu] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' && 
      (event.key === 'Tab' || 
      event.key === 'shift')
    ) {
      return;
    }
    openMenu(open);
  };

  const navigate = useNavigate();

  React.useEffect(() => {
    // console.log(user.role);
    console.log(loading);
  })

  if (!loading) {
    return ( 
      <React.Fragment>
        <CssBaseline />
        <AppBar
          className='header'
          position='fixed'
          elevation={3}
        >
          <Container maxWidth='xl'>
            <Toolbar sx={{ flexWrap: 'wrap' }}>
              <Box 
                className='logo'
                sx={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}
              >
                <Link href='/'>
                  <img src={logo} alt='' className='logo-png' />
                </Link>
                <Link href='/' className='header-logo'>
                  <Typography 
                    className='logo-text'
                    sx={{ fontSize: { xs: '0px', md: '30px' } }}  
                  >
                    { APPNAME }
                  </Typography>
                </Link>
              </Box>
              <Box
                className='top-nav'
                sx={{ display: { xs: 'none', md: 'flex' } }}
              >
                {headerNavItems.map((item, index) => (
                  <Link
                    key={index}
                    className='top-nav-btn'
                    href={`${item.href}`}
                    sx={{ my: 1, mx: 1.5 }}
                  >
                    {item.value}
                  </Link>
                ))}
                {user && user.role && isAuthenticated ? 
                  <Link
                    className='top-nav-btn'
                    href='/admin/dashboard'
                    sx={{ my: 1, mx: 1.5 }}
                  >
                    Dashboard
                  </Link> :
                  ''
                }
                {user && !user.role && isAuthenticated ? 
                  <Link
                    className='top-nav-btn'
                    href='/user/dashboard'
                    sx={{ my: 1, mx: 1.5 }}
                  >
                    Dashboard
                  </Link> :
                  ''
                }
                {isAuthenticated ?
                  <Button
                    size='small'
                    color='error'
                    variant="contained"
                    startIcon={<LogoutOutlined />}
                    sx={{ mx: 2, my: 'auto', height: '30px' }}
                    // href='/signout'
                    onClick={() => logout(navigate)}
                  >
                    Sign out
                  </Button>
                  :
                  <Button
                    size='small'
                    variant="contained"
                    startIcon={<Person />}
                    sx={{ mx: 2, my: 'auto', height: '30px' }}
                    href='/signin'
                  >
                    Sign in
                  </Button>
                }
              </Box>
              <Box sx={{ display: { sm: 'flex', md: 'none' } }}>
                <Button onClick={toggleDrawer(true)}>
                  <Menu className='toggle-menu-btn' />
                </Button>
                <Drawer
                  anchor='right'
                  open={right}
                  onClose={toggleDrawer(false)}
                >
                  <Box
                    className='toggle-menu'
                    role='presentation'
                  >  
                    <a
                      href='/'
                      className='close-toggle-btn'
                      onClick={toggleDrawer(false)}
                    >
                      &times;
                    </a>
                    <List>
                      {toggelMenuItems.map((item, index) => (
                        <ListItem key={index}>
                          <Link
                            href={`${item.href}`}
                            className={`${item.class}`}
                          >
                              {item.value}
                          </Link>
                        </ListItem>
                      ))}
                    </List>                         
                  </Box>
                </Drawer>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        </React.Fragment>
    );
  }

  else {
    return null;
  }
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Header);