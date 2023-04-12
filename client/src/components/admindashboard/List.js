import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import {
  Home,
  Message,
  UploadFile,
  People,
  Payments,
  Person
} from '@mui/icons-material';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton href='/admin/dashboard'>
      <ListItemIcon>
        <Home />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>

    <ListItemButton href='/admin/user'>
      <ListItemIcon>
        <People />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItemButton>

    <ListItemButton href='/admin/message'>
      <ListItemIcon>
        <Message />
      </ListItemIcon>
      <ListItemText primary="Message" />
    </ListItemButton>

    <ListItemButton href='/admin/file'>
      <ListItemIcon>
        <UploadFile />
      </ListItemIcon>
      <ListItemText primary="File" />
    </ListItemButton>

    <ListItemButton href='/admin/payment'>
      <ListItemIcon>
        <Payments />
      </ListItemIcon>
      <ListItemText primary="Payment" />
    </ListItemButton>
    
    <ListItemButton href='/admin/info'>
      <ListItemIcon>
        <Person />
      </ListItemIcon>
      <ListItemText primary="AdminInfo" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListItemButton href='/admin/user'>
      <ListItemIcon>
        <People />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItemButton>

    <ListItemButton href='/admin/message'>
      <ListItemIcon>
        <Message />
      </ListItemIcon>
      <ListItemText primary="Messages" />
    </ListItemButton>

    <ListItemButton href='/admin/file'>
      <ListItemIcon>
        <UploadFile />
      </ListItemIcon>
      <ListItemText primary="Files" />
    </ListItemButton>

    <ListItemButton href='/admin/payment'>
      <ListItemIcon>
        <Payments />
      </ListItemIcon>
      <ListItemText primary="PaymentLog" />
    </ListItemButton>

    <ListItemButton href='/admin/info'>
      <ListItemIcon>
        <Person />
      </ListItemIcon>
      <ListItemText primary="AdminInfo" />
    </ListItemButton>
  </React.Fragment>
);
