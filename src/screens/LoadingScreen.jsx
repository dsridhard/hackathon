// LoadingScreen.js
import React from "react";
import { CircularProgress, Box } from "@mui/material";

const LoadingScreen = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingScreen;
