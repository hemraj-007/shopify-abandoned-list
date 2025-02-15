import React from "react";
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const drawerWidth = 240;

const DashboardLayout = ({ children }) => (
  <Box sx={{ display: "flex" }}>
    <CssBaseline />
    {/* Enhanced AppBar with color and shadow */}
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        backgroundColor: "#1976d2",
        boxShadow: 3,
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap sx={{ flexGrow: 1, color: "#fff" }}>
          Shopify Abandoned Checkouts Dashboard
        </Typography>
      </Toolbar>
    </AppBar>

    {/* Enhanced Drawer with background and icons */}
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box", backgroundColor: "#f4f6f8" },
      }}
    >
      <Toolbar />
      <List>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ShoppingCartIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>
      </List>
    </Drawer>

    {/* Main content area with background and padding */}
    <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <Toolbar />
      {children}
    </Box>
  </Box>
);

export default DashboardLayout;
