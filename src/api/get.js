import axios from "axios";

export default axios.create({
  baseURL: "https://file-upload-cavli.s3.ap-southeast-2.amazonaws.com/",
});

async function list_files_in_s3() {
  try {
    const response = await axios.get(
      "https://file-upload-cavli.s3.ap-southeast-2.amazonaws.com/"
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}
