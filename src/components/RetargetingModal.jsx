import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { useNotification } from "../hooks/useNotification";

const RetargetingModal = ({ open, onClose, checkout }) => {
  const notify = useNotification();

  if (!checkout) return null;

  const message = `Hi ${checkout.email}, you left items in your cart! Click here to complete your purchase: ${checkout.abandoned_checkout_url}`;

  const handleSend = (method) => {
    notify(`Sent via ${method}: ${message}`, "success");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ backgroundColor: "#1976d2", color: "#fff", fontWeight: "bold" }}>
        Retarget Customer
      </DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        <Box mb={2}>
          <Typography variant="body1" gutterBottom><strong>Email:</strong> {checkout.email}</Typography>
          <Typography variant="body1" gutterBottom><strong>Total Price:</strong> ${checkout.total_price}</Typography>
          <Typography variant="body1" gutterBottom><strong>Items:</strong> {checkout.line_items}</Typography>
          <Typography variant="body1" gutterBottom><strong>Checkout Link:</strong> <a href={checkout.abandoned_checkout_url} target="_blank" rel="noopener noreferrer" style={{ color: "#1976d2" }}>View Checkout</a></Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="subtitle1" sx={{ fontStyle: "italic", color: "#666" }}>
          Choose a platform to send the recovery message:
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: 3, backgroundColor: "#f4f6f8" }}>
        <Button onClick={() => handleSend("Email")} variant="contained" color="primary" sx={{ borderRadius: 2, mx: 1 }}>
          Send Email
        </Button>
        <Button onClick={() => handleSend("SMS")} variant="contained" color="secondary" sx={{ borderRadius: 2, mx: 1 }}>
          Send SMS
        </Button>
        <Button onClick={() => handleSend("WhatsApp")} variant="contained" color="success" sx={{ borderRadius: 2, mx: 1 }}>
          Send WhatsApp
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RetargetingModal;
