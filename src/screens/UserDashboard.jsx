import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Tooltip,
  Alert,
} from "@mui/material";
import UserScore from "../components/UserScore";
import secureLocalStorage from "react-secure-storage";
import Header from "../components/Header";
const UserDashboard = () => {
  const username = secureLocalStorage.getItem("user");
  const [getInfo, setInfo] = useState([[]]);
  const [teamErr, setTeamErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      teamName: username,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://10.64.29.214:8080/api/teamname/team", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        if (result.message) {
          setErrMsg(result.message);
          setTeamErr(true);
        } else {
          setInfo(result);
        }
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <>
      <Header />
      <Container sx={{ marginTop: 20, width: "100%" }}>
        <Box>
          {teamErr ? (
            <Alert variant="filled" severity="error">
              {errMsg}
            </Alert>
          ) : null}
          <Grid marginY="2px" container spacing={1}>
            <Grid item xs={12} md={3}>
              <Card
                sx={{
                  paddingBlock: 3.2,
                  borderRadius: 1,
                  background: "#C85250",
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
                  Teams Name
                </Typography>

                <CardContent>
                  <Typography
                    fontFamily={"monospace"}
                    fontWeight="700"
                    letterSpacing={"0.3rem"}
                    sx={{ marginInlineStart: 4 }}
                    variant="h5"
                    textAlign="start"
                  >
                    {getInfo[0].Team_Name}
                    {/* <GroupsIcon color="white" fontSize="large" /> */}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card
                sx={{
                  paddingBlock: 3.2,
                  borderRadius: 1,
                  background:
                    "linear-gradient( 109.9deg,  rgba(251,189,100,1) 1.8%, rgba(255,207,139,1) 95.4% )",
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
                  Mobile No
                </Typography>

                <CardContent>
                  <Typography
                    fontFamily={"monospace"}
                    fontWeight="700"
                    letterSpacing={"0.3rem"}
                    sx={{ marginInlineStart: 4 }}
                    variant="h5"
                    textAlign="start"
                    color="#FF5412"
                  >
                    {getInfo[0].Mobile_Number}
                    {/* <GroupsIcon color="white" fontSize="large" /> */}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card
                sx={{
                  paddingBlock: 3.2,
                  borderRadius: 1,
                  background: "#00478F",
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
                  Joined On
                </Typography>

                <CardContent>
                  <Typography
                    fontFamily={"monospace"}
                    fontWeight="700"
                    letterSpacing={"0.3rem"}
                    sx={{ marginInlineStart: 4 }}
                    variant="h5"
                    textAlign="start"
                  >
                    {getInfo[0].Joined_On}
                    {/* <GroupsIcon color="white" fontSize="large" /> */}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card
                sx={{
                  paddingBlock: 4.5,
                  borderRadius: 1,
                  background: "#FF7077",
                  color: "white",
                }}
              >
                <Typography
                  fontFamily={"monospace"}
                  fontWeight="700"
                  letterSpacing={"0.3rem"}
                  color="black"
                  fontSize="18px"
                  sx={{ marginInlineStart: 4 }}
                  textAlign="start"
                >
                  Project Title
                </Typography>

                <CardContent>
                  <Typography
                    fontWeight="700"
                    sx={{ marginInlineStart: 4 }}
                    variant="h5"
                    textAlign="start"
                    color="white"
                  >
                    {getInfo[0].Project_Title}
                    {/* <GroupsIcon color="white" fontSize="large" /> */}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <UserScore />
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  paddingBlock: 4,
                  borderRadius: 3,
                  background: "#00B4D4",
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
                  Project Leader
                </Typography>

                <CardContent>
                  <Typography
                    fontFamily={"monospace"}
                    fontWeight="700"
                    letterSpacing={"0.3rem"}
                    sx={{ marginInlineStart: 2 }}
                    variant="h6"
                    textAlign="start"
                  >
                    {getInfo[0].Team_Leader}
                    {/* <GroupsIcon color="white" fontSize="large" /> */}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={12}>
              <Card
                sx={{
                  paddingBlock: 1,
                  borderRadius: 3,
                  background:
                    "radial-gradient( circle farthest-corner at 10% 20%,  rgba(0,152,155,1) 0.1%, rgba(0,94,120,1) 94.2% )",
                  color: "white",
                }}
              >
                <Typography
                  fontFamily={"monospace"}
                  fontWeight="700"
                  letterSpacing={"0.3rem"}
                  color="gold"
                  fontSize="17px"
                  sx={{ marginInlineStart: 6 }}
                  textAlign="start"
                >
                  Description
                </Typography>

                <CardContent>
                  <Typography
                    sx={{ marginInlineStart: 4 }}
                    variant="h6"
                    textAlign="start"
                    fontSize="12px"
                    color="white"
                  >
                    {getInfo[0].Project_Description}
                    {/* <GroupsIcon color="white" fontSize="large" /> */}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={12}>
              <Card
                sx={{
                  paddingBlock: 2,
                  borderRadius: 1,
                  bgcolor: "#FFB067",
                  color: "black",
                }}
              >
                <Typography
                  fontFamily={"monospace"}
                  fontWeight="700"
                  letterSpacing={"0.3rem"}
                  color="navy"
                  fontSize="19px"
                  sx={{ marginInlineStart: 4 }}
                  textAlign="start"
                >
                  Member's Details
                </Typography>

                <CardContent>
                  <Typography
                    fontFamily={"monospace"}
                    fontWeight="500"
                    letterSpacing={"0.3rem"}
                    sx={{ marginInlineStart: 4 }}
                    variant="h6"
                    textAlign="start"
                    color="black"
                  >
                    {getInfo[0].Member2}
                    {/* <GroupsIcon color="white" fontSize="large" /> */}
                  </Typography>
                  <Typography
                    fontFamily={"monospace"}
                    fontWeight="500"
                    letterSpacing={"0.3rem"}
                    sx={{ marginInlineStart: 4 }}
                    variant="h6"
                    textAlign="start"
                    color="black"
                  >
                    {getInfo[0].Member3}
                    {/* <GroupsIcon color="white" fontSize="large" /> */}
                  </Typography>
                  <Typography
                    fontFamily={"monospace"}
                    fontWeight="500"
                    letterSpacing={"0.3rem"}
                    sx={{ marginInlineStart: 4 }}
                    variant="h6"
                    textAlign="start"
                    color="black"
                  >
                    {getInfo[0].Member4}
                    {/* <GroupsIcon color="white" fontSize="large" /> */}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default UserDashboard;
