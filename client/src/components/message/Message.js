import * as React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  TextField,
  TextareaAutosize,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { submitMessage } from '../../actions/message'
import { setAlert } from '../../actions/alert';

const Message = ({ submitMessage, user, setAlert }) => {
  const navigate = useNavigate();

  const [message, setMessage] = React.useState('');
  const [numberofviews, setViews] = React.useState(1);
  const [password, setPassword] = React.useState('');
  const [password2, setPassword2] = React.useState('');
  const [value , setValue] = React.useState(false);
  const [expire, setExpire] = React.useState(86400);

  const changeExpire = (event) => {
    setExpire(event.target.value);
  };

  const change = (event) => {
    setMessage(event.target.value);
  };

  const changePassword = (event) => {
    console.log(event.target.value);
    setPassword(event.target.value);
  }

  const changePassword2 = (event) => {
    console.log(event.target.value);
    setPassword2(event.target.value);
  }

  const changeViews = (event) => {
    setViews(event.target.value)
  }

  const Submit = () => {
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      let userid = user;
      let data;
      {
        user ? 
        data = {
        message: message,
        user: userid,
        password: password,
        category: 0,
        expiredIn: 2678400,
        numberofviews: numberofviews,
        } : 
        data = {
          message: message,
          password: password,
          category: 0,
          expiredIn: expire,
          numberofviews: numberofviews,
        }
      }
      
      submitMessage(data, navigate);
    }
  };

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
            Send and receive securely encrypted messages
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
                  Create new private message
                </Typography>
                <Typography
                  component='h6'
                  variant='h6'
                  color='text.secondary'
                >
                  Write the message below, encrypt it and get a link
                </Typography>
                <TextareaAutosize
                  aria-label='minimum height'
                  placeholder='input message ...'
                  minRows={6}
                  style={{ width: '100%', fontSize: '20px', padding: '20px' }}
                  onChange={change}
                />
              </Box>
            </CardContent>
            <CardActions>
              <Grid container spacing={2}>
                {
                  value ?
                    <>
                      <Grid item xs={12}>
                        <Typography
                          component='h5'
                          variant='h5'
                          color='text.primary'
                        >
                          Message Lifetime
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography
                          component='h6'
                          variant='h6'
                          color='text.primary'
                          sx={{ marginBottom: 2, fontSize: '16px' }}
                        >
                          Expire after
                        </Typography>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Expire</InputLabel>
                          <Select className='rounded-border-more'
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={expire}
                            label="Expire"
                            onChange={changeExpire}
                          >
                            <MenuItem value={3600}>1 hour</MenuItem>
                            <MenuItem value={86400}>1 day</MenuItem>
                            <MenuItem value={259200}>3 days</MenuItem>
                            <MenuItem value={604800}>7 days</MenuItem>
                            <MenuItem value={1209600}>14 days</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography
                          component='h6'
                          variant='h6'
                          color='text.primary'
                          sx={{ fontSize: '16px' }}
                        >
                          or number of views
                        </Typography>
                        <TextField
                          className='rounded-border'
                          type='number'
                          margin='normal'
                          fullWidth
                          label='Number of views'
                          name='numberofviews'
                          defaultValue={1}
                          onChange={changeViews}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          component='h5'
                          variant='h5'
                          color='text.primary'
                        >
                          Manual Password
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography
                          component='h6'
                          variant='h6'
                          color='text.primary'
                          sx={{ fontSize: '16px' }}
                        >
                          Enter a custom password to secure the message
                        </Typography>
                        <TextField
                          className='rounded-border'
                          type='password'
                          margin='normal'
                          fullWidth
                          label='Password'
                          name='password'
                          onChange={changePassword}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography
                          component='h6'
                          variant='h6'
                          color='text.primary'
                          sx={{ marginBottom: { sm: 0, xs: 2 }, fontSize: '16px' }}
                        >
                          Confirm password
                        </Typography>
                        <TextField
                          className='rounded-border'
                          type='password'
                          margin='normal'
                          fullWidth
                          label='Confirm password'
                          name='password2'
                          onChange={changePassword2}
                        />
                      </Grid>
                    </> : ''
                }
                {
                  value ?
                  <Grid item xs={12} sm={6}>
                      <Button
                        className='landing-option-btn rounded-border'
                        fullWidth
                        variant='contained'
                        onClick={() => setValue(false)}
                      >
                        Hide advanced options
                      </Button>
                    </Grid> : 
                     <Grid item xs={12} sm={6}>
                     <Button
                       className='landing-option-btn rounded-border'
                       fullWidth
                       variant='contained'
                       onClick={() => setValue(true)}
                     >
                       Show advanced options
                     </Button>
                   </Grid>
                }
                <Grid item xs={12} sm={6}>
                  <Button
                    className='landing-create-btn rounded-border'
                    fullWidth
                    variant='contained'
                    onClick={() => Submit()}
                  >                    
                    Create message
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Box>
      </Box>
      <Footer />
    </React.Fragment>
  )
}

Message.propTypes = {
  submitMessage: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  auth: PropTypes.object
};

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { submitMessage, setAlert })(Message);