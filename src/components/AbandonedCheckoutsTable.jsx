import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";
import { useFetchData } from "../hooks/useFetchData";

const AbandonedCheckoutsTable = ({ onRetarget }) => {
  const data = useFetchData();

  if (!data) return <Typography>Loading...</Typography>;

  // Combine abandoned orders from `orders` and `abandoned_checkouts`
  const abandonedCheckouts = [
    ...data.orders.filter((order) => order.financial_status === "pending"),
    ...data.abandoned_checkouts,
  ].map((checkout) => ({
    id: checkout.id,
    email: checkout.email,
    total_price: checkout.total_price,
    created_at: new Date(checkout.created_at).toLocaleDateString(),
    line_items: checkout.line_items.map((item) => item.title).join(", "),
    abandoned_checkout_url: checkout.abandoned_checkout_url,
  }));

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "total_price", headerName: "Total Price ($)", width: 130 },
    { field: "created_at", headerName: "Date", width: 150 },
    { field: "line_items", headerName: "Items", width: 250 },
    {
      field: "abandoned_checkout_url",
      headerName: "Recovery Link",
      width: 200,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          href={params.value}
          target="_blank"
        >
          Recover Checkout
        </Button>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => onRetarget(params.row)}
        >
          Retarget
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Typography variant="h6" gutterBottom>
        Abandoned Checkouts
      </Typography>
      <DataGrid
  rows={abandonedCheckouts}
  columns={columns}
  pageSize={abandonedCheckouts.length}
  autoHeight
  hideFooter
  disableColumnResize  // Prevent resizing that causes overflow
  sx={{
    '& .MuiDataGrid-root': { backgroundColor: '#fff', borderRadius: '8px' },
    '& .MuiDataGrid-columnHeaders': { backgroundColor: '#f5f5f5', fontWeight: 'bold' },
    '& .MuiDataGrid-row:hover': { backgroundColor: '#f0f0f0' },
    '& .MuiDataGrid-cell': {
      whiteSpace: 'normal',       // Allow text to wrap
      wordWrap: 'break-word',     // Break long words
    },
    '& .MuiDataGrid-columnHeader': {
      whiteSpace: 'normal',
      wordWrap: 'break-word',
    },
    '& .MuiDataGrid-virtualScroller': { overflowX: 'hidden' },  // Hide horizontal scroll
  }}
/>
    </Box>
  );
};

export default AbandonedCheckoutsTable;
