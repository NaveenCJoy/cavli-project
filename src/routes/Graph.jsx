import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Button, Typography } from "@mui/material";
import data from "../data/sensor_data.json";
// import data from "../data/sampledata.json";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ReplyIcon from "@mui/icons-material/Reply";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Graph = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [lineColor, setLineColor] = useState("red");

  const voltageData = data.data[0].values;
  const timestampData = data.data[0].timestamps;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const pageVoltageData = voltageData.slice(startIndex, endIndex);
  const pageTimestampData = timestampData.slice(startIndex, endIndex);

  // convert json data into data form required by recharts
  const chartData = pageVoltageData.map((value, index) => ({
    voltage: value,
    timestamp: pageTimestampData[index],
  }));

  //determine total pages based on no. of items per page
  const totalPages = Math.ceil(voltageData.length / itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <Grid
      container
      direction="column"
      sx={{ padding: 2, backgroundColor: "#f7f6f6" }}
    >
      <Grid item sx={{ mt: "1rem" }}>
        <Grid
          item
          container
          direction="row-reverse"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: "1rem" }}
        >
          <Typography>sensor_data.json</Typography>
          <Button
            variant="outlined"
            size="small"
            startIcon={<ReplyIcon />}
            onClick={() => navigate("/home")}
          >
            Back to dashboard
          </Button>
        </Grid>
        <ResponsiveContainer
          // width={window.innerWidth <= 1200 ? "100%" : "50%"}
          width="95%"
          height={500}
        >
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 0,
              bottom: 5,
            }}
            width={500}
            height={500}
          >
            <CartesianGrid horizontal="true" vertical="" />
            <XAxis dataKey="timestamp" />
            <YAxis dataKey="voltage" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="voltage"
              // stroke="#8884d8"
              stroke={lineColor}
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Grid>
      <Grid
        item
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Button
          variant="contained"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          sx={{ borderRadius: 20, mr: "0.5rem" }}
        >
          <ChevronLeftIcon />
        </Button>
        <Typography>{`Page ${currentPage} of ${totalPages}`}</Typography>
        <Button
          variant="contained"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          sx={{ borderRadius: 20, ml: "0.5rem" }}
        >
          <ChevronRightIcon />
        </Button>
        {/* <Button>Change no of items per page</Button> */}
        <Typography
          sx={window.innerWidth <= 750 ? { mx: 1, my: 5 } : { mx: 1 }}
        >
          No of items per page:
        </Typography>
        <FormControl sx={{ width: "6rem", mx: 1 }}>
          <InputLabel id="demo-simple-select-label">Items</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={itemsPerPage}
            label="Items"
            onChange={(e) => {
              setItemsPerPage(e.target.value);
            }}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={80}>80</MenuItem>
            <MenuItem value={100}>100</MenuItem>
            <MenuItem value={1000}>1000</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          fullWidth
          sx={window.innerWidth <= 650 ? "" : { width: "6rem" }}
        >
          <InputLabel id="demo-simple-select-label">Line Color</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={lineColor}
            label="Line Color"
            onChange={(e) => setLineColor(e.target.value)}
          >
            <MenuItem value={"red"}>Red</MenuItem>
            <MenuItem value={"blue"}>Blue</MenuItem>
            <MenuItem value={"green"}>Green</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Graph;
