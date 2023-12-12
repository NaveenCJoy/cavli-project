This project was created with React (create-react-app)

## Available Scripts

npm start - Runs the app in development mode <br>
npm test - Launches the test runner in the interactive watch mode <br>
npm run build - Builds the app for production to the 'build' folder <br>

## Tech stack used

Frontend library - React <br>
State management - jotai <br>
UI library - Material UI <br>
Chart library - Recharts <br>

## Project details

Hosted at netlify: https://file-upload-to-s3.netlify.app/ <br>
default loading page - "/" <br>
dummy user credentials for logging in: <br>
username: testuser, 
password: testpassword

On "/home" page, all the available files in S3 bucket are listed. <br>
Add File button - Adds a new file to S3 bucket <br>
Click on "View" to see graph. It takes you to "/graph" page. <br>

download feature was not working, so the "/graph" page shows static data (sensor_data.json) from /data folder inside /src. <br>

Large data like that in sensor_data.json could not be fitted into a single graph, so splitted up the amount of data that is shown. No of items per page and color of line chart can be changed by user. <br>

fastapi: http://3.27.123.26/docs <br>
list all the files in s3 bucket: http://3.27.123.26/listfiles/ <br>
upload a file to s3 bucket: http://3.27.123.26/upload/ <br>
delete a file: http://3.27.123.26/deletefile/{filename} <br>
