import React, { useState } from "react";
import { Grid, Stack } from "@mui/material";
import Header from "../components/Header";
import TopCard from "../components/TopCard";
import List from "../components/List";

import AddFile from "../components/AddFile";

const Home = () => {
  return (
    <Grid sx={{ background: "#f7f6f6", height: "100vh" }}>
      <Header />
      <Grid sx={{ paddingX: 3 }}>
        <Stack gap={5}>
          <TopCard />
          <List />
        </Stack>
      </Grid>
      <AddFile />
    </Grid>
  );
};

export default Home;
