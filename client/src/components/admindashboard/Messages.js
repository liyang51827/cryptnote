import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { useEffectOnce } from '../../helpers/useEffectOnce';
import { connect } from 'react-redux';
import { getMessages } from '../../actions/admin';

const Messages = ({ getMessages, messages }) => {

  useEffectOnce(() => {
    console.log('admindashboard: getMessages()');
    getMessages();
  });
  
  return (
    <React.Fragment>
      <Title>New Messages</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Creation Date</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Number of veiws</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {messages.filter((item, index) => index < 3).map((row) => (
            <TableRow key={row._id}>
              <TableCell>{row._id}</TableCell>
              <TableCell>{row.createdAt.slice(0, 10) + ' ' + row.createdAt.slice(11, 19)}</TableCell>
              <TableCell>{row.expiredIn}</TableCell>
              <TableCell>{row.numberofviews}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link
        color="primary"
        href="/admin/message"
        sx={{ mt: 3 }}
        >
        See more
      </Link>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  messages: state.admin.messages
})


export default connect(mapStateToProps, { getMessages })(Messages);