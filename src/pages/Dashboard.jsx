import React, { useState } from "react";
import { Container, Grid, Paper, Typography, Box } from "@mui/material";
import AbandonedCheckoutsTable from "../components/AbandonedCheckoutsTable";
import RetargetingModal from "../components/RetargetingModal";
import Charts from "../components/Charts";
import Notification from "../components/Notification";  // Import Notification and hook
import { useFetchData } from "../hooks/useFetchData";
import { useNotification } from "../hooks/useNotification";

const Dashboard = () => {
  const [selectedCheckout, setSelectedCheckout] = useState(null);
  const data = useFetchData();
  const notify = useNotification();  // Use notification hook

  if (!data) return <Typography>Loading...</Typography>;

  const metrics = [
    { label: "Total Orders", value: data.orders.length },
    { label: "Abandoned Checkouts", value: data.abandoned_checkouts.length + data.orders.filter(o => o.financial_status === "pending").length },
    { label: "Revenue Lost", value: `$${(data.abandoned_checkouts.reduce((sum, item) => sum + parseFloat(item.total_price), 0) + data.orders.filter(o => o.financial_status === "pending").reduce((sum, item) => sum + parseFloat(item.total_price), 0)).toFixed(2)}` },
  ];

  const handleRetarget = (checkout) => {
    setSelectedCheckout(checkout);
  };

  const handleSendNotification = (message, type = "success") => {
    notify(message, type);  // Call the toast notification
  };

  return (
    <Container>
      {/* Metrics Cards for Overview */}
      <Grid container spacing={3} mb={4}>
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Paper elevation={3} sx={{ p: 3, textAlign: "center", borderRadius: 2 }}>
              <Typography variant="h6" color="primary" gutterBottom>
                {metric.label}
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {metric.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Box mb={4}>
        <Charts />
      </Box>

      {/* Abandoned Checkouts Table */}
      <Box mb={4}>
        <AbandonedCheckoutsTable onRetarget={handleRetarget} />
      </Box>

      {/* Retargeting Modal */}
      <RetargetingModal
        open={!!selectedCheckout}
        onClose={() => setSelectedCheckout(null)}
        checkout={selectedCheckout}
        onSend={(method) => handleSendNotification(`Message sent via ${method}!`)}
      />

      {/* Notification Toast */}
      <Notification />
    </Container>
  );
};

export default Dashboard;
