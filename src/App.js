import React from "react";
// import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Upload from "./routes/Upload";
import Graph from "./routes/Graph";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Login from "./routes/Login";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: "Work sans",
    },
    button: {
      fontFamily: "Work sans",
    },
  });
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route index element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/graph" element={<Graph />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
