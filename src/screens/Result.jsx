import * as React from "react";
import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Typography, Box } from "@mui/material";
import Header from "../components/Header";
const columns = [
  { field: "id", headerName: "Team Rank", width: 170 },
  { field: "Team_Name", headerName: "Team Name", width: 170 },
  { field: "Round_Num", headerName: "Round No", width: 170 },
  { field: "Innovation", headerName: "Innovation", width: 170 },
  { field: "Complexity", headerName: "Complexity", width: 170 },
  { field: "Impact", headerName: "Impact", width: 170 },
  { field: "Feasibility", headerName: "Feasibility", width: 170 },
  { field: "TotalScore", headerName: "TotalScore", width: 170 },
];
export default function Result() {
  const [getRows, setRows] = useState([]);
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://10.64.29.214:8080/api/scoreboard", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setRows(result);
      })
      .catch((error) => console.log("error", error));
  }, []);
  return (
    <>
      <Header sx={{ marginTop: 20 }}></Header>

      <Box sx={{ marginTop: 20 }} style={{ height: 595, width: "100%" }}>
        <Typography
          // fontFamily={"monospace"}
          fontWeight="1000"
          letterSpacing={"0.3rem"}
          marginY="50px"
          textAlign="center"
          variant="h3"
          sx={{
            background: "linear-gradient(to right bottom, #090979,#22c1c3)",
            backgroundSize: "100%",
            backgroundRepeat: "repeat",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)", // Add a subtle shadow
          }}
        >
          SCOREBOARD
        </Typography>
        <DataGrid
          // loading="true"
          onCellClick
          rowHeight={75}
          autoHeight
          textAlign="center"
          rows={getRows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 15, 20, 25]}
        />
      </Box>
    </>
  );
}
