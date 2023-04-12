import * as React from 'react';
import { Facebook, Instagram, Pinterest, Twitter } from "@mui/icons-material";
import {
  AppBar,
  Grid,
  Box,
  Typography,
  Link
} from '@mui/material';

const Footer = () => {
  return (
    <React.Fragment>
      <AppBar
        className='footer'
        position='fixed'
        elevation={4}
        sx={{
          top: 'auto',
          bottom: 0,
          height: '64px',
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            my: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly'
          }}
        >
          <Grid
            item xs={8}
            md={4}
            className='footer-copyright'
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
            <Link className='social-link' href='/'>
              <Facebook />
            </Link>
            <Link className='social-link' href='/'>
              <Twitter />
            </Link>
            <Link className='social-link' href='/'>
              <Instagram />
            </Link>
            <Link className='social-link' href='/'>
              <Pinterest />
            </Link>
            </Box>
          </Grid>
          <Grid
            className='footer-copyright'
            item
            xs={0}
            md={4}
            sx={{
              display: {
                xs: 'none',
                md: 'flex'
              }
            }}
          >
            <Box>
              <Typography
                component='h6'
                variant='h6'
                sx={{ mx: 'auto', my: 'auto', fontSize: '16px' }}
                align='center'
              >
                &copy;2023 CryptNote.com | &nbsp;All rights reserved.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </AppBar>
    </React.Fragment>
  )
}

export default Footer;