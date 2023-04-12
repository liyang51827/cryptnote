import * as React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
} from '@mui/material';

import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { getFile, getPassword } from '../../actions/file';
import { useNavigate } from 'react-router-dom';

var onlyOne = 0;
const FilePassword = ({ getPassword, getFile, password }) => {
  const [nowpassword, setPassword] = React.useState('');
  
  const changePassword = (event) => {
    setPassword(event.target.value);
    console.log(event.target.value);
  }

  const navigate = useNavigate();

  const params = useParams();

  React.useEffect(() => {
    if (onlyOne === 0) {
      onlyOne++;
      console.log(params.id);
      getPassword(params.id, navigate);
    }
  }, []);

  const submitPassword = () => {
    const data = {
      id: params.id,
      password: nowpassword
    }

    getFile(data, navigate);
  }

  

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
                  You can download this file only once.
                </Typography>
                {
                  password ? 
                  <TextField
                    className='rounded-border'
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={changePassword}
                  /> :
                  ''
                }
                <Button
                  variant='contained'
                  color='primary'
                  fullWidth size='large'
                  sx={{ mt: 5 }}
                  onClick={() => submitPassword()}
                >
                  Download File
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <Footer />
    </React.Fragment>
  )
}

FilePassword.propTypes = {
  getPassword: PropTypes.func.isRequired,
  getFile: PropTypes.func.isRequired,
  password: PropTypes.string
};

const mapStateToProps = (state) => ({
  password: state.message.password
})

export default connect(mapStateToProps, { getPassword, getFile })(FilePassword);