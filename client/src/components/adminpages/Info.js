import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { Grid, TextField, Button, CircularProgress } from '@mui/material';

import AdminLayout from '../admindashboard/AdminLayout';
import { connect } from 'react-redux';
import { useEffectOnce } from '../../helpers/useEffectOnce';
import { getAdminInfo, changePwd } from '../../actions/admin';
import { setAlert } from '../../actions/alert';

const Info = ({ path, getAdminInfo, setAlert, changePwd, info, loading }) => {

  const [state, setState] = React.useState({
    oldPwd: '',
    newPwd1: '',
    newPwd2: ''
  });

  useEffectOnce(() => {
    getAdminInfo()
  })

  const onChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  }

  const onSubmit = () => {
    if (state.newPwd1 !== state.newPwd2) {
      console.log('not match')
      setAlert('New Password does not match to Confirm Password', 'danger');
    } else {
      const data = {
        oldPwd: state.oldPwd,
        newPwd: state.newPwd1
      }
      changePwd(data);
    }
  }

  return loading ? (
    <AdminLayout path={path}>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="sm" sx={{ mt: 12, mb: 4 }}>
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        </Container>
      </Box>
    </AdminLayout>
  ) : (
    <AdminLayout path={path}>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="xs" sx={{ mt: 16, mb: 4 }}>
          <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  className='rounded-border'
                  name="name"
                  fullWidth
                  id="name"
                  defaultValue={ info.name }
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className='rounded-border'
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                  defaultValue={ info.email }
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className='rounded-border'
                  fullWidth
                  name="oldPwd"
                  label="Old Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={state.oldPwd}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className='rounded-border'
                  fullWidth
                  name="newPwd1"
                  label="New Password"
                  type="password"
                  id="newpassword1"
                  autoComplete="new-password"
                  value={state.newPwd1}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className='rounded-border'
                  fullWidth
                  name="newPwd2"
                  label="Confirm Password"
                  type="password"
                  id="newpassword2"
                  autoComplete="new-password"
                  value={state.newPwd2}
                  onChange={onChange}
                />
              </Grid>
            </Grid>
            <Button
              className='landing-create-btn rounded-border'
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => onSubmit()}
            >
              Change password
            </Button>
          </Box>
        </Container>
      </Box>
    </AdminLayout>
  );
}

const mapStateToProps = (state) => ({
  info: state.admin.info,
  loading: state.admin.loading
})

export default connect(mapStateToProps, { getAdminInfo, changePwd, setAlert })(Info);