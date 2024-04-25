import React, { useEffect, useState } from "react";
import Header from "../components/Header";

import {
  Container,
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Button,
  Alert,
} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import secureLocalStorage from "react-secure-storage";
import NextPlanIcon from "@mui/icons-material/NextPlan";
import SyncIcon from "@mui/icons-material/Sync";
import Tooltip from "@mui/material/Tooltip";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Dashboard = () => {
  const Token = secureLocalStorage.getItem("token");
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const [showSucss, setSucss] = useState(false);
  const [showSucssMsg, setSucssMsg] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const AgreeHandler = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token} `);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://10.64.29.214:8080/api/nextround", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        result.message
          ? (setSucss(true),
            setOpen(false),
            setSucssMsg(
              // "“We’ve successfully concluded the current round and are now poised to embark upon the subsequent phase of the hackathon.”"
              result.message
            ),
            setTimeout(() => {
              setSucss(false);
            }, 7600))
          : null;
      })
      .catch((error) => console.error(error));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const UserDataHandler = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${Token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://10.64.29.214:8080/api/dashboard", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setData(result);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    UserDataHandler();
  }, []);

  const handleButtonClick = () => {
    // alert("Testing")
    UserDataHandler(); // Replace with the actual query
  };

  return (
    <div>
      <Header />
      {/* <Typography variant="h4" marginTop="140px" textAlign={"center"}>
        Dashboard
      </Typography> */}

      <Container sx={{ marginTop: 20, width: "100%" }}>
        {showSucss ? (
          <Alert
            sx={{ marginY: "25px" }}
            color="warning"
            severity="success"
            onClose={() => {
              setSucss(false);
            }}
          >
            <Typography textAlign={"center"}>{showSucssMsg}</Typography>
          </Alert>
        ) : null}
        <Box>
          <Grid marginY="2px" container spacing={1}>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  paddingBlock: 3.2,
                  borderRadius: 4,
                  bgcolor: "orange",
                  color: "white",
                }}
              >
                <Typography
                  fontFamily={"monospace"}
                  fontWeight="700"
                  letterSpacing={"0.3rem"}
                  color="black"
                  fontSize="17px"
                  sx={{ marginInlineStart: 4 }}
                  textAlign="start"
                >
                  Total Teams
                </Typography>
                <Typography
                  onClick={handleButtonClick}
                  sx={{ marginInlineEnd: 4, cursor: "pointer" }}
                  textAlign="end"
                >
                  <Tooltip title="Sync" arrow>
                    <SyncIcon color="white" fontSize="large" />
                  </Tooltip>
                </Typography>
                <CardContent>
                  <Typography
                    fontFamily={"monospace"}
                    fontWeight="700"
                    letterSpacing={"0.3rem"}
                    sx={{ marginInlineStart: 4 }}
                    variant="h3"
                    textAlign="start"
                  >
                    {data.Total_Teams}{" "}
                    <GroupsIcon color="white" fontSize="large" />
                  </Typography>
                </CardContent>
                {/* <Typography sx={{marginLeft:30}} textAlign="end">
                  <marquee behavior="sliding" height="30" scrollamount="3" direction="up">Names</marquee>
                </Typography> */}
              </Card>
            </Grid>
            <Grid item xs={12} md={8}>
              <Card
                sx={{
                  paddingBlock: 5,
                  borderRadius: 4,
                  bgcolor: "grey",
                  color: "white",
                }}
              >
                <Typography
                  fontFamily={"monospace"}
                  fontWeight="700"
                  letterSpacing={"0.3rem"}
                  color="HighlightText"
                  fontSize="17px"
                  sx={{ marginInlineStart: 4 }}
                  textAlign="start"
                >
                  Total Participants
                </Typography>
                <Typography sx={{ marginInlineEnd: 4 }} textAlign="end">
                  <GroupsIcon color="white" fontSize="large" />
                </Typography>
                <CardContent>
                  <Typography
                    fontFamily={"monospace"}
                    fontWeight="700"
                    letterSpacing={"0.3rem"}
                    sx={{ marginInlineStart: 4 }}
                    variant="h3"
                    textAlign="start"
                  >
                    {data.Total_Participants}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  paddingBlock: 5,
                  borderRadius: 4,
                  bgcolor: "navy",
                  color: "white",
                }}
              >
                <Typography
                  fontFamily={"monospace"}
                  fontWeight="700"
                  letterSpacing={"0.3rem"}
                  color="gold"
                  fontSize="17px"
                  sx={{ marginInlineStart: 4 }}
                  textAlign="start"
                >
                  Round One
                </Typography>
                <Typography
                  fontSize="20px"
                  sx={{ marginInlineEnd: 4 }}
                  textAlign="end"
                >
                  <GroupsIcon color="warning" fontSize="large" />
                </Typography>
                <CardContent>
                  <Typography
                    fontFamily={"monospace"}
                    fontWeight="700"
                    letterSpacing={"0.3rem"}
                    sx={{ marginInlineStart: 4 }}
                    variant="h4"
                    textAlign="start"
                  >
                    {data.Round1}
                  </Typography>
                  No. Teams
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  paddingBlock: 5,
                  borderRadius: 4,
                  bgcolor: "chocolate",
                  color: "white",
                }}
              >
                <Typography
                  fontFamily={"monospace"}
                  fontWeight="700"
                  letterSpacing={"0.3rem"}
                  color="white"
                  fontSize="17px"
                  sx={{ marginInlineStart: 4 }}
                  textAlign="start"
                >
                  Round Two
                </Typography>
                <Typography
                  fontSize="17px"
                  sx={{ marginInlineEnd: 4 }}
                  textAlign="end"
                >
                  <GroupsIcon color="white" fontSize="large" />
                </Typography>
                <CardContent>
                  <Typography
                    fontFamily={"monospace"}
                    fontWeight="700"
                    letterSpacing={"0.3rem"}
                    sx={{ marginInlineStart: 4 }}
                    variant="h4"
                    textAlign="start"
                  >
                    {data.Round2}
                  </Typography>
                  No. Teams
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  paddingBlock: 5,
                  borderRadius: 4,
                  bgcolor: "darkseagreen",
                  color: "white",
                }}
              >
                <Typography
                  fontFamily={"monospace"}
                  fontWeight="700"
                  letterSpacing={"0.3rem"}
                  color="dimgrey"
                  fontSize="17px"
                  sx={{ marginInlineStart: 4 }}
                  textAlign="start"
                >
                  Round Three
                </Typography>
                <Typography sx={{ marginInlineEnd: 4 }} textAlign="end">
                  <GroupsIcon color="warning" fontSize="large" />
                </Typography>
                <CardContent>
                  <Typography
                    fontFamily={"monospace"}
                    fontWeight="700"
                    letterSpacing={"0.3rem"}
                    sx={{ marginInlineStart: 2 }}
                    variant="h4"
                    textAlign="start"
                  >
                    {data.Round3}
                  </Typography>
                  No. Teams
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={12}>
              <Button
                variant="contained"
                color="error"
                onClick={handleClickOpen}
                endIcon={<NextPlanIcon />}
              >
                Move to Next Round
              </Button>
              <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle>{"Are you sure you wish to submit?"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    “Upon submission, your work will seamlessly progress to the
                    subsequent round of the hackathon. Once submitted, there is
                    no option to revert to the preceding round. 🚀🔥”
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleClose}
                  >
                    Disagree
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={AgreeHandler}
                  >
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default Dashboard;
