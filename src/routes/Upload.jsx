import { useState } from "react";
import S3 from "react-aws-s3";
import reactS3 from "react-s3";

const Upload = () => {
  const config = {
    bucketName: "file-upload-cavli",
    dirName: "media",
    region: "ap-southeast-2",
    accessKeyId: "AKIATZHPPG3WNKXAPLGH",
    secretAccessKey: "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",
    s3Url: "s3://file-upload-cavli/media/",
  };
  const [image, setImage] = useState(null);
  const handleImageChange = (e) => {
    const image = e.target.files[0];
    setImage(URL.createObjectURL(image));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    reactS3
      .uploadFile(image, config)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    const ReactS3Client = new S3(config);
    const newFileName = "test-file";
    ReactS3Client.uploadFile(image, newFileName)
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        id="imageInput"
        accept="image/*"
        onChange={handleImageChange}
      />
      <button type="submit">Submit</button>
      {image ? <img src={image} alt="test" /> : <p> no image found</p>}
    </form>
  );
};

export default Upload;
