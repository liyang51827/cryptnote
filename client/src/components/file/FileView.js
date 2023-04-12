import * as React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';

import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { connect } from 'react-redux';

const FileView = () => {

  return (
    <React.Fragment>
      <Header />
      <Box className='landing'>
        <Box
          sx={{
            mt: 8,
            mx: 'auto',
            maxWidth: 'md'
          }}
        >
          <Typography
            component='h1'
            align='center'
            color='#fff'
            gutterBottom
            sx={{ fontSize: '36px', mt: 10 }}
          >
            Receive securely encrypted file
          </Typography>
          <Typography
            component='h1'
            align='center'
            color='#fff'
            gutterBottom
            sx={{ fontSize: '16px', mt: 1 }}
          >
            Private File allows you to share notes and
            file with end-to-end encryption and a link that expires
            automatically. So you can keep what you share privtely and
            meak sure your stuff doesn't stay online forever.
          </Typography>
          <Card
            sx={{
              margin: '20px',
              mt: 1,
              padding: '30px'
            }}
          >
            <CardContent>
              <Box>
                <Typography
                  component='h4'
                  variant='h4'
                  color='text.primary'
                >
                  Decrypted File
                </Typography>
                <Typography
                  component='h6'
                  variant='h6'
                  color='text.secondary'
                >
                  You can't see this file again.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <Footer />
    </React.Fragment>
  )
}

export default connect(null, {})(FileView);