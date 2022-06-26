/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TheTab({ artist }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ width: '100%', textAlign: 'left' }}>
      <Box>
        <Tabs
          indicatorColor="secondary"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs"
          sx={{
            '& .MuiTabs-scroller': {
              height: '55px',
            },
          }}
        >
          <Tab
            label="Biography"
            style={{
              fontSize: '17px',
              fontWeight: 600,
            }}
            {...a11yProps(0)}
            icon={
              <div
                id="borderRight"
                style={{
                  minHeight: '20px',
                  borderRight: '2px solid #a3a290',
                  position: 'absolute',
                  width: '100%',
                }}
              />
            }
          />
          <Tab
            label="Achievements"
            style={{
              fontSize: '17px',
              fontWeight: 600,
            }}
            {...a11yProps(1)}
            icon={
              <div
                id="borderRight"
                style={{
                  minHeight: '20px',
                  borderRight: '2px solid #a3a290',
                  position: 'absolute',
                  width: '100%',
                }}
              />
            }
          />
          <Tab
            label="CV"
            style={{ fontSize: '17px', fontWeight: 600 }}
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {artist.biography}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {artist.achievements}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {artist.cv}
      </TabPanel>
    </div>
  );
}

function TabPanel(props) {
  const [expand, setExpand] = useState(false);

  const { children, value, index, ...other } = props;

  const handleExpand = () => {
    if (expand) {
      setExpand(false);
    } else {
      setExpand(true);
    }
  };
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          <Typography
            style={{
              lineHeight: 2,
              maxHeight: expand ? '600px' : '250px',
              overflowY: expand ? 'scroll' : 'hidden',
            }}
            variant="body2"
          >
            {children}
          </Typography>
          <Typography
            style={{
              color: '#99CCCC',
              fontSize: '19px',
              fontWeight: 400,
              lineHeight: 2,
            }}
          >
            <Button
              color={expand ? 'primary' : 'secondary'}
              onClick={handleExpand}
            >
              {!expand ? '... Read more' : 'Read Less'}
            </Button>
          </Typography>
        </Box>
      )}
    </div>
  );
}
