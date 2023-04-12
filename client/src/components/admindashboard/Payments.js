import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Modal, Box, TextField } from '@mui/material';
import Title from './Title';
import { useEffectOnce } from '../../helpers/useEffectOnce';
import { connect } from 'react-redux';
import { getPaymentsLog, submitLicense } from '../../actions/payment';

const Payments = ({ getPaymentsLog, payments }) => {

  const [open, setOpen] = React.useState(false);
  const [ license, setLicense ] = React.useState('');
  const [ rowID, setRowID ] = React.useState('');

  const openModal = (id) => {
    setOpen(true);
    setRowID(id);
  }

  const onChange = (event) => {
    setLicense(event.target.value)
  }
  
  const addLicense = () => {
    console.log(rowID);
    console.log(license);
    const data = {
      id: rowID,
      license: license
    }
    submitLicense(data);
    setOpen(false);
  }

  useEffectOnce(() => {
    console.log('admindashboard: getPaymentsLog()');
    getPaymentsLog();
  });
  
  return (
    <React.Fragment>
      <Title>New Payments</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Method</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>License</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.filter((item, index) => index < 3).map((row) => (
            <TableRow key={row._id}>
              <TableCell>{row._id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.method}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>{row.from.slice(0, 10)}</TableCell>
              <TableCell>{row.to.slice(0, 10)}</TableCell>
              <TableCell>
                {
                  row.license !== '' && row.license === 'expired' ?
                  <Button
                    variant='outlined'
                    size='small'
                    color='inherit'
                    disabled
                    >
                    expired
                  </Button> :
                  ''
                }
                {
                  row.license !== '' && row.license !== 'expired' ?
                  row.license :
                  ''
                }
                {
                  row.license === '' ?
                  <Button
                    variant='contained'
                    color='error'
                    size='small'
                    onClick={() => openModal(row._id)}
                    >
                    create
                  </Button> :
                  ''
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link
        color="primary"
        href="/admin/payment"
        sx={{ mt: 3 }}
        >
        See more
      </Link>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: '12px',
            boxShadow: 24,
            p: 4,
        }}>
          <TextField
            className='rounded-border'
            margin="normal"
            required
            fullWidth
            id="license"
            label="License"
            name="license"
            autoComplete="license"
            autoFocus
            value={license}
            onChange={onChange}
          />
          <Button
            className='landing-create-btn rounded-border'
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => addLicense()}
          >
            Create
          </Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  payments: state.payment.payments
})


export default connect(mapStateToProps, { getPaymentsLog })(Payments);