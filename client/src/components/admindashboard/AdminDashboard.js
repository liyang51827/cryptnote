import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Messages from './Messages';
import Files from './Files';
import Payments from './Payments';
import AdminLayout from './AdminLayout';

import './Star.scss';

const AdminDashboard = (props) => {
  const { path } = props;

  return (
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
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {/* <div className="stars">
            <div className="star"></div>
            <div className="star"></div>
            <div className="star"></div> it's just...
          </div> */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Messages />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Files />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper 
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column'
                  }}
              >
                <Payments />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </AdminLayout>
  );
}

export default AdminDashboard;