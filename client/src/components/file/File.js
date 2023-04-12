import * as React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';

import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { Dropzone, FileItem, FullScreenPreview } from "@dropzone-ui/react";

import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { submitFile } from '../../actions/file'
import { setAlert } from '../../actions/alert';

const File = ({ submitFile, user, setAlert }) => {

  const navigate = useNavigate();

  const [numberofviews, setViews] = React.useState(1);
  const [password, setPassword] = React.useState('');
  const [password2, setPassword2] = React.useState('');
  const [value , setValue] = React.useState(false);
  const [expire, setExpire] = React.useState(86400);

  const changeExpire = (event) => {
    setExpire(event.target.value);
  };

  const changePassword = (event) => {
    console.log(event.target.value);
    setPassword(event.target.value);
  };

  const changePassword2 = (event) => {
    console.log(event.target.value);
    setPassword2(event.target.value);
  };

  const changeViews = (event) => {
    setViews(event.target.value)
  };

// file upload
const [files, setFiles] = React.useState([]);
const [imageSrc, setImageSrc] = React.useState(undefined);
const updateFiles = (incommingFiles) => {
  console.log("incomming files", incommingFiles);
  setFiles(incommingFiles);
};
const onDelete = (id) => {
  setFiles(files.filter((x) => x.id !== id));
};
const handleSee = (imageSource) => {
  setImageSrc(imageSource);
};
const handleUpload=(responses)=>{
  //check the responses here
  setFiles(files.filter((x) => x.id === 'oops'));
  console.log("finished", responses[0].serverResponse);
  // Submit();
  if (password !== password2) {
    setAlert('Passwords do not match', 'danger');
  } else {
    let userid = user;
    let data;
    
    if (user) {
      data = {
        user: userid,
        file: responses[0].serverResponse.encryptedData,
        initVec: responses[0].serverResponse.initVector,
        secKey: responses[0].serverResponse.Securitykey,
        password: password,
        category: 1,
        expiredIn: expire,
        numberofviews: numberofviews,
      }
    } else {
      data = {
        file: responses[0].serverResponse.encryptedData,
        initVec: responses[0].serverResponse.initVector,
        secKey: responses[0].serverResponse.Securitykey,
        password: password,
        category: 1,
        expiredIn: expire,
        numberofviews: numberofviews,
      }
    }
    
    submitFile(data, navigate);
  }
};

React.useEffect(() => {
  console.log("I have been mounted");
  document.querySelector('.dz-ui-header > span > svg').classList.add('upload-btn');
});

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
            Upload files for secure file sharing
          </Typography>
          <Typography
            component='h1'
            align='center'
            color='#fff'
            gutterBottom
            sx={{ fontSize: '16px', mt: 1 }}
          >
            SafeNote Upload File allows you to share files
            with end-to-end encryption and a link that expires automatically.
            So you can keep what you share privately and make sure your stuff
            doesn't stay online forever.
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
                  Upload private files
                </Typography>
                <Typography
                  component='h6'
                  variant='h6'
                  color='text.secondary'
                >
                  Upload files below, encrypt them and get a link
                </Typography>
                <Dropzone
                  style={{ minHeight: "200px" }}
                  view={"list"}
                  onChange={updateFiles}
                  value={files}
                  maxFiles={1}
                  // header={false}
                  // footer={false}
                  maxFileSize={1073741824}
                  label="Drag'n drop files here or click to browse"
                  //accept=".png,image/*"
                  uploadingMessage={"Uploading..."}
                  url="http://localhost:5000/api/file/upload"
                  method='POST'
                  onUploadFinish={handleUpload}
                  clickable='ture'
                  onClick={() => console.log('hhh')}
                  //of course this url doens´t work
                  // uploadOnDrop
                  //clickable={false}
                  // fakeUploading
                >
                  {files.map((file, index) => (
                    <FileItem
                      key={index}
                      {...file}
                      onDelete={onDelete}
                      onSee={handleSee}
                      preview
                      info
                      hd
                      elevation={1}
                      resultOnTooltip
                    />
                  ))}
                  <FullScreenPreview
                    imgSource={imageSrc}
                    openImage={imageSrc}
                    onClose={(e) => handleSee(undefined)}
                  />
                </Dropzone>
              </Box>
            </CardContent>
            <CardActions>
              <Grid container spacing={2}>
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
                  >                    
                    File Upload
                  </Button>
                </Grid>
              {
                  value ?
                    <>
                      <Grid item xs={12}>
                        <Typography
                          component='h5'
                          variant='h5'
                          color='text.primary'
                        >
                          File Lifetime
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
                          Enter a custom password to secure the file
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
              </Grid>
            </CardActions>
          </Card>
        </Box>
      </Box>
      <Footer />
    </React.Fragment>
  )
}

File.propTypes = {
  submitFile: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  auth: PropTypes.object
};

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { submitFile, setAlert })(File);