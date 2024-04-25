import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Tooltip,
} from "@mui/material";
import secureLocalStorage from "react-secure-storage";
const UserScore = () => {
  const username = secureLocalStorage.getItem("user");
  const [score, setScore] = useState([[]]);
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

    fetch("http://10.64.29.214:8080/api/teamname/score", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setScore(result);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <>
      {score.map((item, index) => (
        <>
          <Grid key={index} item xs={12} md={2}>
            <Card
              elevation={8}
              sx={{
                paddingBlock: 1,
                borderRadius: 3,
                bgcolor:
                  index === 0 ? "coral" : index === 1 ? "#79A9F5" : "#37BEB0",
                color: "white",
                // marginRight: 4.1,
                // marginInline: 4,
              }}
            >
              <Typography
                fontFamily={"monospace"}
                fontWeight="700"
                letterSpacing={"0.3rem"}
                color={index === 0 ? "white" : index === 1 ? "black" : "gold"}
                fontSize="15px"
                sx={{ marginInlineStart: 6 }}
                textAlign="start"
              >
                Round :{item.Round_Num}
              </Typography>
              <Typography
                fontFamily={"monospace"}
                fontWeight="700"
                letterSpacing={"0.3rem"}
                color={index === 0 ? "white" : index === 1 ? "black" : "gold"}
                fontSize="15px"
                sx={{ marginInlineStart: 6 }}
                textAlign="start"
              >
                Score:{item.Total}
              </Typography>

              <CardContent>
                <Typography
                  sx={{ marginInlineStart: 4 }}
                  variant="h6"
                  textAlign="start"
                  fontSize="15px"
                >
                  Innovation: {item.Innovation}
                </Typography>
                <Typography
                  sx={{ marginInlineStart: 4 }}
                  variant="h6"
                  textAlign="start"
                  fontSize="15px"
                >
                  Complexity: {item.Complexity}
                </Typography>
                <Typography
                  sx={{ marginInlineStart: 4 }}
                  variant="h6"
                  textAlign="start"
                  fontSize="15px"
                >
                  Impact: {item.Impact}
                </Typography>
                <Typography
                  sx={{ marginInlineStart: 4 }}
                  variant="h6"
                  textAlign="start"
                  fontSize="15px"
                >
                  Feasibility: {item.Feasibility}
                </Typography>
                <Typography
                  sx={{ marginInlineStart: 4 }}
                  variant="h6"
                  textAlign="start"
                  fontSize="15px"
                >
                  Presentation: {item.Presentation}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </>
      ))}
    </>
  );
};

export default UserScore;
