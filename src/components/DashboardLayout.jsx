import React from "react";
import { Box, CssBaseline, AppBar, Toolbar, Typography } from "@mui/material";

const DashboardLayout = ({ children }) => (
  <Box sx={{ display: "flex" }}>
    <CssBaseline />
    <AppBar
      position="fixed"
      sx={{
        width: "100%",
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

    <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <Toolbar />
      {children}
    </Box>
  </Box>
);

export default DashboardLayout;
