import React, { useState } from "react";
import { Grid, Stack, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { filesNumber } from "../atoms";
import { useAtom } from "jotai";

const TopCard = () => {
  const [fileNumber, setFileNumber] = useAtom(filesNumber);
  return (
    <>
      {/* <Card
        elevation={0}
        sx={{
          padding: 3,
          borderColor: "#cacae6",
          borderWidth: 1,
          borderStyle: "solid",
        }}
      >
        <Stack direction="row">
          <Grid item container direction="column">
            <Typography sx={{ color: "#898994" }}>Files stored</Typography>
            <Typography sx={{ fontSize: "1.5rem", fontWeight: "500" }}>
              {fileNumber}
            </Typography>
          </Grid>
          <Grid item container direction="column">
            <Typography sx={{ color: "#898994" }}>Files downloaded</Typography>
            <Typography sx={{ fontSize: "1.5rem", fontWeight: "500" }}>
              0
            </Typography>
          </Grid>
          <Grid item container direction="column">
            <Typography sx={{ color: "#898994" }}>Files uploaded</Typography>
            <Typography sx={{ fontSize: "1.5rem", fontWeight: "500" }}>
              {fileNumber !== 0 ? fileNumber - 1 : fileNumber}
            </Typography>
          </Grid>
        </Stack>
      </Card> */}
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <Card
            elevation={0}
            sx={{
              padding: 3,
              borderColor: "#cacae6",
              borderWidth: 1,
              borderStyle: "solid",
              width: "12rem",
            }}
          >
            <Grid item container direction="column" alignItems="center">
              <Typography sx={{ color: "#898994" }}>Files stored</Typography>
              <Typography sx={{ fontSize: "1.5rem", fontWeight: "500" }}>
                {fileNumber}
              </Typography>
            </Grid>
          </Card>
        </Grid>
        <Grid item>
          <Card
            elevation={0}
            sx={{
              padding: 3,
              borderColor: "#cacae6",
              borderWidth: 1,
              borderStyle: "solid",
              width: "12rem",
            }}
          >
            <Grid item container direction="column" alignItems="center">
              <Typography sx={{ color: "#898994" }}>
                Files downloaded
              </Typography>
              <Typography sx={{ fontSize: "1.5rem", fontWeight: "500" }}>
                0
              </Typography>
            </Grid>
          </Card>
        </Grid>
        <Grid item>
          <Card
            elevation={0}
            sx={{
              padding: 3,
              borderColor: "#cacae6",
              borderWidth: 1,
              borderStyle: "solid",
              width: "12rem",
            }}
          >
            <Grid item container direction="column" alignItems="center">
              <Typography sx={{ color: "#898994" }}>Files uploaded</Typography>
              <Typography sx={{ fontSize: "1.5rem", fontWeight: "500" }}>
                {fileNumber !== 0 ? fileNumber - 1 : fileNumber}
              </Typography>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default TopCard;
