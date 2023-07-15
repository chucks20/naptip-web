import { useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar'
import { sidebarClasses } from 'react-pro-sidebar';
// import 'react-pro-sidebar/dist/css/styles.css';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { tokens } from "../../themes";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import AssignmentIcon from '@mui/icons-material/Assignment';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';


const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem active={selected === title} style={{color: colors.grey[100]}} onClick={() => setSelected(title)} icon={icon}>
        <Typography>{title}</Typography>
        <Link to={to} />
        </MenuItem>
    )
}

const MySidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState('Dashboard');

    return (
        <Box
        sx={{
            display: "flex",
        }}
        >
            <Sidebar 
            rootStyles={{
                [`.${sidebarClasses.container}`]: {
                    backgroundColor: "#1898FF",
                }
            }}

            collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "5px 0 0 0",
              color: "#fff",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="10px">
              <Box display="flex" justifyContent="left" alignItems="center">
                <img
                  alt="profile-user"
                  width="50px"
                  height="50px"
                  src={`../../assets/naptip-logo.png`}
                  style={{ cursor: "pointer"}}
                />
              </Box>
             
            </Box>
          )}

          <Box paddingRight={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<DashboardIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Categories"
              to="/team"
              icon={<FormatListNumberedRtlIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Users"
              to="/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Reports"
              to="/contacts"
              icon={<AssignmentIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Settings"
              to="/invoices"
              icon={<SettingsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Log out"
              to="/form"
              icon={<LogoutIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            
          </Box>
        </Menu>
      </Sidebar>
    
        </Box>

    );
}

export default MySidebar;