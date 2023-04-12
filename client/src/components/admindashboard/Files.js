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
import { getFiles } from '../../actions/admin';

const Files = ({ getFiles, files }) => {

  useEffectOnce(() => {
    console.log('admindashboard: getFiles()');
    getFiles();
  });
  
  return (
    <React.Fragment>
      <Title>New Files</Title>
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
          {files.filter((item, index) => index < 3).map((row) => (
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
        href="/admin/file"
        sx={{ mt: 3 }}
        >
        See more
      </Link>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  files: state.admin.files
})


export default connect(mapStateToProps, { getFiles })(Files);