This project was created with React (create-react-app)

## Available Scripts

npm start - Runs the app in development mode

npm test - Launches the test runner in the interactive watch mode

npm run build - Builds the app for production to the 'build' folder

## Tech stack used

Frontend library - React
State management - jotai
UI library - Material UI
Chart library - Recharts

## Project details

Hosted at netlify: https://file-upload-to-s3.netlify.app/
default loading page - "/"
dummy user credentials for logging in:
username: testuser
password: testpassword

On "/home" page, all the available files in S3 bucket are listed.
Add File button - Adds a new file to S3 bucket
Click on "View" to see graph. It takes you to "/graph" page.

download feature was not working, so the "/graph" page shows static data (sensor_data.json) from /data folder inside /src.

Large data like that in sensor_data.json could not be fitted into a single graph, so splitted up the amount of data that is shown. No of items per page and color of line chart can be changed by user.

fastapi: http://3.27.123.26/docs
list all the files in s3 bucket: http://3.27.123.26/listfiles/
upload a file to s3 bucket: http://3.27.123.26/upload/
delete a file: http://3.27.123.26/deletefile/{filename}
