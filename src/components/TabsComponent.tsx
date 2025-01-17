"use client"

import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TaskList from './TaskList';
import {TabPanelProps} from "@/types/task";
import {clearSelectedTask} from "@/features/tasks/taskSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/app/store";

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabsComponent() {
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
      dispatch(clearSelectedTask());
  };

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);


  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
        value={value} 
        onChange={handleChange} 
        aria-label="basic tabs example" 
        variant="fullWidth"
        sx={{
            '& .MuiTab-root': {
              color: 'black',
              fontWeight: 'bold',
            },
            '& .Mui-selected': {
              color: 'black !important',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: 'black',
            },
          }}
        >
          <Tab label="Today's Task" {...a11yProps(0)} sx={{fontWeight: 'bold'}} />
          <Tab label="Tommorow's Task" {...a11yProps(1)} sx={{fontWeight: 'bold'}} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
          <TaskList title="Today's Task" date={today} />
      </TabPanel>
      <TabPanel value={value} index={1}>
          <TaskList title="Tomorrow's Task" date={tomorrow} />
      </TabPanel>
    </Box>
  );
}

export default TabsComponent;