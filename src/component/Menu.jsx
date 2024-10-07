import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import Todolist from './Todolist';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Menu() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="HOME" {...a11yProps(0)} />
          <Tab label="TO DO" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <h2>Welcome to TodoList</h2>
        <p>Click on the "TO DO" tab to view and manage your tasks.</p>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Todolist />
      </CustomTabPanel>
    </Box>
  );
}
