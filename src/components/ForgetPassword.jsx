import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Paper,
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Container,
  Alert,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
const handleClickShowPassword = () => setShowPassword((show) => !show);
const handleClickShowCPassword = () => setShowCPassword((showc) => !showc);
import Header from "./Header";
function PasswordResetForm() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const [pwderr, setPwdErr] = useState(false);
  const [btnErr, setBtnErr] = useState("primary");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showCPassword, setShowCPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowCPassword = () => setShowCPassword((showc) => !showc);
  const OTPValHandler = () => {
    alert("Send OTP");
  };

  const onSubmit = (data) => {
    //  handling the form submission here
    data.password !== data.confirmPassword
      ? (setPwdErr(true),
        setBtnErr("error"),
        setInterval(() => {
          setPwdErr(false), setBtnErr("primary");
        }, 12000))
      : (null, reset(), setPwdErr(false), setBtnErr("primary")); // Reset the form after successful submission
  };

  return (
    <>
      <Header />

      <Container
        sx={{ marginTop: 30, bgcolor: "#F2F1F0" }}
        maxWidth="xs"
        marginTop="400px"
        component={Paper}
        elevation="6"
      >
        {pwderr ? (
          <Box sx={{ marginTop: 12 }}>
            <Alert
              variant="filled"
              severity="error"
              onClose={() => {
                setPwdErr(false);
                setBtnErr("primary");
              }}
            >
              Passwords must match
            </Alert>
          </Box>
        ) : null}
        <Box px={3} py={2}>
          <Typography
            fontFamily={"monospace"}
            fontWeight="700"
            letterSpacing={"0.3rem"}
            variant="h5"
            textAlign="center"
            autoComplete=""
            color="black"
            marginBottom="10px"
          >
            Forget Password
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={1}>
              {/* <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  autoComplete="current-username"
                  label="Username"
                  name="username"
                  {...register("username", { required: true })}
                  margin="normal"
                  variant="outlined"
                  error={!!errors.username}
                  helperText={
                    errors.username?.type === "required" &&
                    "Username is required"
                  }
                  type="text"
                  placeholder="Team Name"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          variant="contained"
                          size="small"
                          onClick={OTPValHandler}
                        >
                          Send otp
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid> */}
              {/* <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  autoComplete="current-OTP"
                  label="OTP"
                  name="otp"
                  {...register("otp", { required: true })}
                  variant="outlined"
                  error={!!errors.username}
                  helperText={
                    errors.username?.type === "required" && "OTP is required"
                  }
                  type="number"
                  placeholder="Enter OTP"
                />
              </Grid> */}
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label="New Password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: true })}
                  error={!!errors.password}
                  helperText={
                    errors.password?.type === "required" &&
                    "Password  is required"
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword}>
                          {showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  type={showCPassword ? "text" : "password"}
                  {...register("confirmPassword", { required: true })}
                  error={!!errors.confirmPassword}
                  helperText={
                    errors.confirmPassword?.type === "required" &&
                    " Confirm Password is required"
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowCPassword}>
                          {showCPassword ? (
                            <VisibilityOff />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {watch("confirmPassword") !== watch("password") && (
                  <Typography color="error">Passwords must match</Typography>
                )}
              </Grid>
            </Grid>
            <Box mt={3}>
              <Button variant="contained" color={btnErr} type="submit">
                Change Password
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
}

export default PasswordResetForm;
