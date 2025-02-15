import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { useFetchData } from "../hooks/useFetchData";
import { Typography, Paper, Grid, Dialog, DialogContent, IconButton, Box } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const Charts = () => {
  const data = useFetchData();
  const [openChart, setOpenChart] = useState(null);

  if (!data) return <Typography>Loading charts...</Typography>;

  const completedOrders = data.orders.filter(order => order.financial_status === "paid").length;
  const abandonedCheckouts = data.abandoned_checkouts.length + data.orders.filter(order => order.financial_status === "pending").length;

  const pieData = [
    { name: "Completed Orders", value: completedOrders },
    { name: "Abandoned Checkouts", value: abandonedCheckouts },
  ];

  const lineData = [
    ...data.orders.filter(order => order.financial_status === "pending"),
    ...data.abandoned_checkouts,
  ].map((checkout) => ({
    date: new Date(checkout.created_at).toLocaleDateString(),
    total: parseFloat(checkout.total_price),
  }));

  const COLORS = ["#1976d2", "#dc004e"];
  const EXPANDED_COLORS = ["#1976d2", "#dc004e", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f"];

  const handleOpen = (chart) => setOpenChart(chart);
  const handleClose = () => setOpenChart(null);

  return (
    <Grid container spacing={3} mt={4}>
      {/* Pie Chart Card */}
      <Grid item xs={12} md={6}>
        <Box onClick={() => handleOpen('pie')} sx={{ cursor: 'pointer' }}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom color="primary" sx={{ fontWeight: 'bold' }}>
              Orders Overview
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Box>
      </Grid>

      {/* Line Chart Card */}
      <Grid item xs={12} md={6}>
        <Box onClick={() => handleOpen('line')} sx={{ cursor: 'pointer' }}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom color="secondary" sx={{ fontWeight: 'bold' }}>
              Abandoned Checkouts Over Time
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="total" stroke="#dc004e" strokeWidth={2} dot={{ fill: '#dc004e' }} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Box>
      </Grid>

      {/* Chart Expansion Dialog */}
      <Dialog open={Boolean(openChart)} onClose={handleClose} fullWidth maxWidth="md" BackdropProps={{ style: { backdropFilter: 'blur(5px)' } }}>
        <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 16, top: 16 }}>
          <CloseIcon />
        </IconButton>
        <DialogContent>
        {openChart === 'pie' && (
  <Box>
    <Typography variant="h5" gutterBottom color="primary">Detailed Orders Overview</Typography>
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          label
        >
          {pieData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={EXPANDED_COLORS[index % EXPANDED_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
    <Typography mt={2}>More details about completed orders and abandoned checkouts can go here...</Typography>
  </Box>
)}
          {openChart === 'line' && (
            <Box>
              <Typography variant="h5" gutterBottom color="secondary">Detailed Abandoned Checkouts Over Time</Typography>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <XAxis dataKey="date" tick={{ fontSize: 14 }} />
                  <YAxis tick={{ fontSize: 14 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="total" stroke="#dc004e" strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
              <Typography mt={2}>Detailed data about each abandoned checkout can be shown here...</Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default Charts;
