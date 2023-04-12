import * as React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextareaAutosize
} from '@mui/material';

import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { useNavigate } from 'react-router-dom';

const MessageView = ({ message }) => {

  const navigate = useNavigate();

  React.useEffect(() => {
    if (message === 'notExist' || message === '') {
      navigate('/notFound');
    }
  })

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
            Receive securely encrypted messages
          </Typography>
          <Typography
            component='h1'
            align='center'
            color='#fff'
            gutterBottom
            sx={{ fontSize: '16px', mt: 1 }}
          >
            Private Message allows you to share notes and
            messages with end-to-end encryption and a link that expires
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
                  Decrypted Message
                </Typography>
                <Typography
                  component='h6'
                  variant='h6'
                  color='text.secondary'
                >
                  You can't see this message again.
                </Typography>
                <TextareaAutosize
                  aria-label='minimum height'
                  placeholder='input message ...'
                  minRows={6}
                  style={{ width: '100%', fontSize: '20px', padding: '20px' }}
                  value={message}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <Footer />
    </React.Fragment>
  )
}

MessageView.propTypes = {
  message: PropTypes.string
};

const mapStateToProps = (state) => ({
  message: state.message.message
})

export default connect(mapStateToProps, {})(MessageView);