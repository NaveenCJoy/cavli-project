import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import Button from "@mui/material/Button";
import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { filesNumber, refreshFileList } from "../atoms";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";

import { addFileModalOpen } from "../atoms";

const List = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useAtom(addFileModalOpen);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [response, setResponse] = useState(null);
  const [refresh, setRefresh] = useAtom(refreshFileList);
  const [filenumber, setFilenumber] = useAtom(filesNumber);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    async function list_files_in_s3() {
      try {
        const response = await axios.get(
          "https://4e6c-2406-8800-9014-7b38-8681-e346-c1e9-284d.ngrok-free.app/listfiles/",
          {
            auth: {
              username: "testuser",
              password: "testpassword",
            },
            headers: {
              "ngrok-skip-browser-warning": "100",
            },
          }
        );

        setResponse(response);
        console.log(response);
        setFilenumber(response.data.files.length);
        setShowList(true);
      } catch (error) {
        console.log("error:", error);
      }
    }

    list_files_in_s3();
  }, [refresh]);

  const [deleteFile, setDeleteFile] = useState(null);

  const handleDeleteFile = async (fileName) => {
    try {
      await axios
        .delete(`http://3.27.123.26/deletefile/${fileName}`, {
          auth: {
            username: "testuser",
            password: "testpassword",
          },
        })
        .then((res) => {
          setRefresh((prev) => !prev);
          setOpenDeleteModal(false);
          if (res.status === 200) {
            console.log("file deleted");
          } else {
            console.log("error");
          }
        });
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <>
      <Card
        elevation={0}
        sx={{
          padding: 3,
          borderColor: "#cacae6",
          borderWidth: 1,
          borderStyle: "solid",
        }}
      >
        <Grid container direction="column">
          <Grid
            item
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography>Files in S3 Bucket</Typography>
            <Grid item>
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
                onClick={() => setOpen(true)}
                startIcon={<FileUploadOutlinedIcon />}
              >
                Add file
              </Button>
              <Button
                variant="outlined"
                elevation={0}
                disableElevation
                disableFocusRipple
                disableRipple
                startIcon={<RefreshOutlinedIcon />}
                sx={{
                  textTransform: "none",
                  borderColor: "#cacae6",
                  // borderWidth: 1,
                  border: "none",
                  fontWeight: 600,
                  fontFamily: "Work sans",
                  mx: 1,
                  ":hover": {
                    border: "none",
                  },
                }}
                onClick={() => {
                  setRefresh(!refresh);
                  setShowList(false);
                }}
              ></Button>
            </Grid>
          </Grid>
          <Grid item>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>File name</TableCell>
                    <TableCell align="right" sx={{ fontWeight: "bold" }}>
                      Date modified
                    </TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {response && showList
                    ? response.data.files.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            {item.key.slice(8)}
                          </TableCell>
                          <TableCell align="right">
                            {item.last_modified_date}
                          </TableCell>
                          <TableCell align="right">
                            <Button onClick={() => navigate("/graph")}>
                              View
                            </Button>
                          </TableCell>
                          <TableCell align="right">
                            <Button
                              // onClick={() => {
                              //   handleDeleteFile(item.key.slice(8));
                              // }}
                              onClick={() => {
                                setDeleteFile(item.key.slice(8));
                                setOpenDeleteModal(true);
                              }}
                            >
                              Delete
                            </Button>
                          </TableCell>
                          <TableCell align="right">Download</TableCell>
                        </TableRow>
                      ))
                    : null}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          {!showList && (
            <Grid item alignSelf="center">
              <Box sx={{ my: 1 }}>
                <CircularProgress />
              </Box>
            </Grid>
          )}
        </Grid>
      </Card>
      <Dialog open={openDeleteModal}>
        <DialogTitle>Delete file from S3</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => {
            setOpenDeleteModal(false);
          }}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <DialogContentText sx={{ my: 2 }}>
            Do you want to delete this file?
          </DialogContentText>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-around"
            sx={{ my: 2 }}
          >
            <Button
              onClick={() => {
                handleDeleteFile(deleteFile);
              }}
            >
              Confirm
            </Button>
            <Button onClick={() => setOpenDeleteModal(false)}>Cancel</Button>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default List;
