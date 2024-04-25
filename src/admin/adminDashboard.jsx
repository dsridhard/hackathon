// TeamForm.js

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Checkbox,
  Button,
  Grid,
  Container,
  Typography,
  Box,
  Alert,
  Pagination,
  MenuItem,
} from "@mui/material";
import { DevTool } from "@hookform/devtools";
import secureLocalStorage from "react-secure-storage";
import Header from "../components/Header";
import PageviewIcon from "@mui/icons-material/Pageview";
const TeamForm = () => {
  const [teams, setTeams] = useState([]);
  const Token = secureLocalStorage.getItem("token");
  const [showErr, setErr] = useState(false);
  const [showErrMsg, setErrMsg] = useState("");
  const [showSucss, setSucss] = useState(false);
  const [showSucssMsg, setSucssMsg] = useState("");

  //API Rendering List of team
  useEffect(() => {
    fetch("http://10.64.29.214:8080/api/scoreboard/teams")
      .then((response) => response.json())
      .then((data) => setTeams(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const { handleSubmit, control } = useForm();

  // Pagination Logic

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Adjust as needed
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  // Handling Form Submit Logic

  const onSubmit = (data) => {
    // console.log(data)
    const selectedTeams = teams.filter((team) => data[`selected_${team.id}`]);

    console.log(selectedTeams.length);

    if (selectedTeams.length > 0) {
      const teamResponses = selectedTeams.map((team) => ({
        Team_Name: data[`teamName_${team.id}`],
        Innovation: data[`innovation_${team.id}`] || 0,
        Complexity: data[`complexity_${team.id}`] || 0,
        Impact: data[`impact_${team.id}`] || 0,
        Feasibility: data[`feasibility_${team.id}`] || 0,
        Presentation: data[`presentation_${team.id}`] || 0,
      }));

      console.log(teamResponses);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${Token}`);

      const raw = JSON.stringify(teamResponses);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://10.64.29.214:8080/api/score", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          result
            ? (setSucss(true),
              setSucssMsg("Score Updated Successfully"),
              setTimeout(() => {
                setSucss(false);
              }, 29800))
            : null;
        })
        .catch((error) => console.error(error));
    } else {
      setErr(true), setErrMsg("Please Select  CheckBox to submit Score");
      setTimeout(() => {
        setErr(false);
      }, 4800);
    }
  };

  return (
    <>
      <Header />
      {teams.length === 0 ? (
        <>
          <Typography
            fontFamily={"monospace"}
            fontWeight="700"
            letterSpacing={"0.9rem"}
            variant="h4"
            component="p"
            marginTop={"420px"}
            textAlign={"center"}
          >
            No Teams Found 🔍
          </Typography>{" "}
        </>
      ) : (
        <>
          <Typography variant="h4" marginTop="140px" textAlign={"center"}>
            Team Evaluation Criteria
          </Typography>
          <Container sx={{ marginTop: 5, width: "100%" }}>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              {showSucss ? (
                <Alert
                  sx={{ marginY: "25px" }}
                  variant="filled"
                  severity="success"
                  onClose={() => {
                    setSucss(false);
                  }}
                >
                  <Typography textAlign={"center"}>{showSucssMsg}</Typography>
                </Alert>
              ) : null}
              {showErr ? (
                <Alert
                  sx={{ marginY: "25px" }}
                  severity="warning"
                  variant="filled"
                  onClose={() => {
                    setErr(false);
                  }}
                >
                  <Typography textAlign={"center"}>{showErrMsg}</Typography>
                </Alert>
              ) : null}
              {teams &&
                teams.slice(startIndex, endIndex).map((team) => (
                  <Grid key={team.id} marginY="2px" container spacing={1}>
                    <Grid item xs={12} md={1.2}>
                      {" "}
                      <Controller
                        name={`teamName_${team.id}`}
                        control={control}
                        defaultValue={team.Team_Name}
                        render={({ field }) => (
                          <TextField
                            disabled
                            variant="standard"
                            helperText="Team Name"
                            {...field}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} md={1.7}>
                      <Controller
                        name={`innovation_${team.id}`}
                        control={control}
                        defaultValue={team.Innovation}
                        render={({ field }) => (
                          <TextField
                            fullWidth
                            label="Innovation"
                            type="number"
                            {...field}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} md={1.7}>
                      <Controller
                        name={`impact_${team.id}`}
                        control={control}
                        defaultValue={team.Impact}
                        render={({ field }) => (
                          <TextField label="Impact" type="number" {...field} />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} md={1.7}>
                      <Controller
                        name={`feasibility_${team.id}`}
                        control={control}
                        defaultValue={team.Feasibility}
                        render={({ field }) => (
                          <TextField
                            label="Feasibility"
                            type="number"
                            {...field}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} md={1.7}>
                      <Controller
                        name={`complexity_${team.id}`}
                        control={control}
                        defaultValue={team.Complexity}
                        render={({ field }) => (
                          <TextField
                            label="Complexity"
                            type="number"
                            {...field}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} md={1.7}>
                      <Controller
                        name={`presentation_${team.id}`}
                        control={control}
                        defaultValue={team.Presentation}
                        render={({ field }) => (
                          <TextField
                            label="Presentation"
                            type="number"
                            {...field}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} md={1}>
                      <Controller
                        name={`selected_${team.id}`}
                        control={control}
                        defaultValue={false}
                        render={({ field }) => <Checkbox {...field} />}
                      />
                    </Grid>
                  </Grid>
                ))}

              <Grid marginY="2px" container spacing={1}>
                <Grid marginY="30px" textAlign={"center"} item md={12} xs={12}>
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </Grid>
                <Grid item md={5} xs={6}>
                  <Pagination
                    variant="text"
                    shape="rounded"
                    siblingCount={1}
                    boundaryCount={2}
                    showFirstButton
                    showLastButton
                    color="primary"
                    size="large"
                    count={Math.ceil(teams.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                  />
                </Grid>
              </Grid>
            </Box>
          </Container>
        </>
      )}
      {/* <DevTool control={control} /> */}
    </>
  );
};

export default TeamForm;
