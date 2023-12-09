import React, { useState } from "react";
import { useAtom } from "jotai";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Stack, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { refreshFileList } from "../atoms";

import { addFileModalOpen } from "../atoms";

const AddFile = () => {
  const [open, setOpen] = useAtom(addFileModalOpen);
  const [file, setFile] = useState(null);
  const [refresh, setRefresh] = useAtom(refreshFileList);
  const [showWait, setShowWait] = useState(false);

  const handleFileUploadClick = () => {
    document.getElementById("file-input").click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const UploadFile = async () => {
    if (file) {
      setShowWait(true);
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      const uploadedFile = await axios.post(
        "http://127.0.0.1:8000/uploadfile/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("File uploaded successfully:", uploadedFile.data);
      setOpen(false);
      setFile(null);
      setRefresh((prev) => !prev);
      setShowWait(false);
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Add File to S3</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => {
          setOpen(false);
          setFile(null);
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
        <DialogContentText>
          <Stack gap={5}>
            <Typography>
              Select the file you want to upload to AWS S3 Bucket
            </Typography>

            <input
              type="file"
              id="file-input"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <Button
              variant="outlined"
              sx={{ textTransform: "none" }}
              onClick={handleFileUploadClick}
            >
              {file ? file.name : "Choose File"}
            </Button>
            <Button
              variant="contained"
              sx={{ textTransform: "none", backgroundColor: "#5252e9" }}
              onClick={UploadFile}
            >
              Upload
            </Button>
            {showWait && <p>Uploading File...</p>}
          </Stack>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default AddFile;
