import * as React from "react";
import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Typography, Box } from "@mui/material";

import Header from "../components/Header";
const columns = [
  { field: "id", headerName: "S.No", width: 70 },
  { field: "Team_Name", headerName: "Team name", width: 130 },
  { field: "Mobile_Number", headerName: "Mobile No", width: 120 },
  { field: "Joined_On", headerName: "Joined On", width: 120 },
  { field: "Team_Leader", headerName: "Team Leader", width: 420 },
  { field: "Member2", headerName: "MemberOne/ProjectGroup", width: 290 },
  { field: "Member3", headerName: "MemberTwo/ProjectGroup", width: 410 },
  { field: "Member4", headerName: "MemberThree/ProjectGroup", width: 328 },
];

export default function ParticipantList() {
  const [getRows, setRows] = useState([]);
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://10.64.29.214:8080/api/teams", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setRows(result);
      })
      .catch((error) => console.log("error", error));
  }, []);
  return (
    <>
      <Header />
      <Box sx={{ height: 400, width: "100%", marginTop: 20 }}>
        <Typography
          // fontFamily={"monospace"}
          fontWeight="900"
          letterSpacing={"0.3rem"}
          marginY="40px"
          textAlign="center"
          variant="h4"
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
          List of Participants
        </Typography>
        <DataGrid
          rowHeight={75}
          autoHeight
          rows={getRows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 15, 20, 25]}
        />
      </Box>
    </>
  );
}
