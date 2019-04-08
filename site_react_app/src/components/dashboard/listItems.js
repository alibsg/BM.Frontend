import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import ExitToApp from '@material-ui/icons/ExitToApp';

export const mainListItems = (context) =>(
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button id='drawer_button_users' onClick={context.onDrawerButtonClick}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="کاربران" />
    </ListItem>
    <ListItem button id='drawer_button_reports' onClick={context.onDrawerButtonClick}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="گزارشات" />
    </ListItem> 
    <ListItem button id='drawer_button_exit' onClick={context.onDrawerButtonClick}>
      <ListItemIcon>
        <ExitToApp />
      </ListItemIcon>
      <ListItemText direction='rtl' primary="خروج" />
    </ListItem>   
  </div>
);
