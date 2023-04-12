import * as React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  Grid
} from '@mui/material';

import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const MessageLink = ({ link }) => {
  const [copied, setCopied] = React.useState(false);

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
            Link of encrypted messages
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
                  Shareable Link
                </Typography>
                <Typography
                  component='h6'
                  variant='h6'
                  color='text.secondary'
                >
                  Send the link to whom you want to view
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={10}>
                    <TextField
                      className='rounded-border'
                      name="name"
                      fullWidth
                      id="name"
                      disabled
                      value={`http://localhost:3000/message/password/${link}`}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    {
                      copied ? 
                      <Button color='error' variant='outlined' size='large' sx={{ mt: '5px' }}>Copied</Button> :
                      <CopyToClipboard text={`http://localhost:3000/message/password/${link}`}
                        onCopy={() => setCopied(true)}>
                        <Button color='primary' variant='contained' size='large' sx={{ mt: '5px' }}>Copy</Button>
                      </CopyToClipboard>
                    }
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <Footer />
    </React.Fragment>
  )
}

MessageLink.propTypes = {
  link: PropTypes.string
};

const mapStateToProps = (state) => ({
  link: state.message.link
})

export default connect(mapStateToProps, {})(MessageLink);