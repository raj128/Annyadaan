import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Books from "./Books";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import DonnieContainer from "./DonnieContainer";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [orders, setOrders] = useState([]);

  let webApiUrl = 'http://localhost:8800/posts/orders';
  var dataStr = JSON.parse(window.localStorage.getItem('data'));


  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get(webApiUrl, { headers: { Authorization: `Bearer ${dataStr.token}` } });
        setOrders(response.data.list);
        console.log(orders);
      } catch (error) {
        
        console.error(error);
      }
    }
    fetchPosts();
    
  }, []);





  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Box sx={{ bgcolor: "background.paper", width: 500 }}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Orders" {...a11yProps(0)} />
            <Tab label="Donees" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>

            {orders.map(orders => (
              <Books key={orders._id} post={orders} />
            ))}
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <DonnieContainer></DonnieContainer>
            <DonnieContainer></DonnieContainer>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}
