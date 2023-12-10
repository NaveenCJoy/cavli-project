import React, { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{ backgroundColor: "#f7f6f6" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontFamily: "Work sans", color: "black" }}
          >
            Dashboard
          </Typography>
          {isLoggedIn ? (
            <>
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  backgroundColor: "#5252e9",
                  fontWeight: 600,
                  fontFamily: "Work sans",
                  mx: 1,
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              variant="outlined"
              elevation={0}
              disableElevation
              disableFocusRipple
              disableRipple
              sx={{
                textTransform: "none",
                borderColor: "#cacae6",
                borderWidth: 2,
                fontWeight: 600,
                fontFamily: "Work sans",
                mx: 1,
                ":hover": {
                  borderWidth: 2,
                },
              }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
