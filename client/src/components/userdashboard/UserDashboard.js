import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../admindashboard/Title';
import { connect } from 'react-redux';
import { getPaymentLog } from '../../actions/payment';
import { addOneViewToMsg, getUserMessages, addOneViewToFile, getUserFiles } from '../../actions/user';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { Container, Grid, Paper, Button } from '@mui/material';
import { setAlert } from '../../actions/alert';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Payments = ({
  setAlert,
  getPaymentLog,
  getUserMessages,
  addOneViewToMsg,
  getUserFiles,
  addOneViewToFile,
  payments,
  messages,
  files,
  user
}) => {

  React.useEffect(() => {
      if (user !== null) {
        console.log(user.email);
        console.log('admindashboard: getPaymentsLog()');
        const data = {
          email: user.email
        }
        const id = {
          id: user._id
        }
        getUserMessages(id);
        getUserFiles(id);
        getPaymentLog(data);
      } else {
      }
    }, [user]);
    
  const copyMsgLink = async (ID) => {
    console.log(payments);
    let ispaid = false;
    await payments.forEach(item => {
      console.log(item.license);
      if (item.license !== '' && item.license !== 'expired') {
        ispaid = true
      }
    });

    if (ispaid) {
      setAlert('copied link', 'success');
      const data = { id: ID }
      addOneViewToMsg(data);
    } else {
      setAlert('please pay!', 'danger');
    }
  }
    
  const copyFileLink = async (ID) => {
    console.log(payments);
    let ispaid = false;
    await payments.forEach(item => {
      console.log(item.license);
      if (item.license !== '' && item.license !== 'expired') {
        ispaid = true
      }
    });

    if (ispaid) {
      setAlert('copied link', 'success');
      const data = { id: ID }
      addOneViewToFile(data);
    } else {
      setAlert('please pay!', 'danger');
    }
  }

  return (
    <React.Fragment>
      <Header />
      <Container sx={{ mt: 18, mb: 12 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column'
              }}  
            >
              <Title>Payment History</Title>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Method</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>From</TableCell>
                    <TableCell>To</TableCell>
                    <TableCell>License</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {payments.map((row) => (
                    <TableRow key={row._id}>
                      <TableCell>{row._id}</TableCell>
                      <TableCell>{row.method}</TableCell>
                      <TableCell>{row.amount}</TableCell>
                      <TableCell>{row.from.slice(0, 10)}</TableCell>
                      <TableCell>{row.to.slice(0, 10)}</TableCell>
                      <TableCell>{row.license}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
              <Title>Message list</Title>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>CreatedAt</TableCell>
                    <TableCell>Duration</TableCell>
                    <TableCell>Number of views</TableCell>
                    <TableCell>Copy Link</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {messages.map((row) => (
                    <TableRow key={row._id}>
                      <TableCell>{row._id}</TableCell>
                      <TableCell>{row.createdAt.slice(0, 10) + ' ' + row.createdAt.slice(11, 19)}</TableCell>
                      <TableCell>{row.expiredIn}</TableCell>
                      <TableCell>{row.numberofviews}</TableCell>
                      <TableCell>
                        <CopyToClipboard text={`http://localhost:3000/message/password/${row._id}`}
                          onCopy={() => copyMsgLink(row._id) }>
                          <Button color='inherit' variant='contained' size='small' sx={{ mt: '5px' }}>Copy</Button>
                        </CopyToClipboard>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
              <Title>File list</Title>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>CreatedAt</TableCell>
                    <TableCell>Duration</TableCell>
                    <TableCell>Number of views</TableCell>
                    <TableCell>Copy Link</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {files.map((row) => (
                    <TableRow key={row._id}>
                      <TableCell>{row._id}</TableCell>
                      <TableCell>{row.createdAt.slice(0, 10) + ' ' + row.createdAt.slice(11, 19)}</TableCell>
                      <TableCell>{row.expiredIn}</TableCell>
                      <TableCell>{row.numberofviews}</TableCell>
                      <TableCell>
                        <CopyToClipboard text={`http://localhost:3000/file/password/${row._id}`}
                          onCopy={() => copyFileLink(row._id) }>
                          <Button color='inherit' variant='contained' size='small' sx={{ mt: '5px' }}>Copy</Button>
                        </CopyToClipboard>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
        </Container>
      <Footer />
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  payments: state.payment.payments,
  messages: state.user.messages,
  files: state.user.files
})


export default connect(mapStateToProps, { setAlert, getPaymentLog, getUserMessages, addOneViewToMsg, getUserFiles, addOneViewToFile })(Payments);