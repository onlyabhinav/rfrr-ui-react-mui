import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import GitHubIcon from '@mui/icons-material/GitHub';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import PublicIcon from '@mui/icons-material/Public';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import TimerIcon from '@mui/icons-material/Timer';
import SettingsIcon from '@mui/icons-material/Settings';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';

import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import GridViewIcon from '@mui/icons-material/GridView';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ViewListIcon from '@mui/icons-material/ViewList';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

const categories = [
  {
    id: 'Campaigns',
    children: [
      {
        id: 'Create',
        icon: <AddCircleIcon />,
        active: true,
      },
      { id: 'Manage', icon: <ViewListIcon /> },
      { id: 'Performance', icon: <MonitorHeartIcon /> },
    ],
  },
  {
    id: 'Customers',
    children: [
      { id: 'Manage Customer List', icon: <SupervisedUserCircleIcon /> },
      { id: 'Edit Customer List', icon: <GroupAddIcon /> }
          ],
  },
];

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

export default function Navigator(props: DrawerProps) {
  const { ...other } = props;

  const btnClickHandler = (event) => {
    console.log("button clicked" + event.target.innerText );
  }

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>


        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
          MyCampaign
        </ListItem>
        <ListItem sx={{ ...item, ...itemCategory }}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText>Dashboard</ListItemText>
        </ListItem>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active }) => (
              <ListItem disablePadding key={childId}>
                <ListItemButton selected={active} sx={item} onClick={btnClickHandler}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{childId}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}


        <ListItem sx={{ ...item, ...itemCategory }}>
          <ListItemIcon>
            <GitHubIcon />
          </ListItemIcon>
          <ListItemText>Source Code</ListItemText>
        </ListItem>
      </List>
    </Drawer>
  );
}
