import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import Button from "@mui/material/Button";
import { Grid, Typography } from "@mui/material";
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

import { addFileModalOpen } from "../atoms";

const List = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useAtom(addFileModalOpen);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [response, setResponse] = useState(null);
  const [refresh, setRefresh] = useAtom(refreshFileList);
  const [filenumber, setFilenumber] = useAtom(filesNumber);

  useEffect(() => {
    async function list_files_in_s3() {
      try {
        const response = await axios.get("http://3.27.123.26/listfiles/", {
          auth: {
            username: "testuser",
            password: "testpassword",
          },
        });
        setResponse(response);
        // setIsLoading(false);
        setFilenumber(response.data.files.length);
        console.log(response);
      } catch (error) {
        console.log(error);
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
      <Card sx={{ padding: 3 }}>
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
                variant="contained"
                sx={{
                  textTransform: "none",
                  backgroundColor: "#5252e9",
                  fontWeight: 600,
                  fontFamily: "Work sans",
                  mx: 1,
                }}
                onClick={() => setOpen(true)}
              >
                Add file
              </Button>
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  backgroundColor: "#5252e9",
                  fontWeight: 600,
                  fontFamily: "Work sans",
                }}
                onClick={() => setRefresh(!refresh)}
              >
                Refresh
              </Button>
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
                  {response ? (
                    response.data.files.map((item, index) => (
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
                  ) : (
                    <p>Please refresh</p>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
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
