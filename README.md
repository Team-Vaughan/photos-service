# photos-service

This service renders the interactive photo grid element for the AirBnb clone app.<br>

# Install app
Clone the repo and from the root folder of the project run thge below command:<br>
npm install<br>

# DB seed
Create .env file in root of the project with below structure and replace values as per your AWS account:<br>
<br>
AWS_ACCESS_KEY_ID=<placeholder><br>
AWS_SECRET_ACCESS_KEY=<placeholder><br>
AWS_REGION=<placeholder><br>
AWS_BUCKET_NAME=<placeholder><br>

Then, from command line from the root directory (for the .env file to be recognized):<br>
npm run seed<br>

This will create 5 photos for each room => 500 entries in DB and S3 bucket => ~ 5-10 minutes execution time<br>

# Available Endpoints

 - Retrieve all photos from room:
 endpoint: `/rooms/:id/getPhotosByRoomId`
 Request Type: `GET`


 - Create photo:
 endpoint: `rooms/addRoomPhoto`
 Request Type: `POST`
 Required Headers: 'Content-Type' : 'application/json'
 Required Body:
 ```{
    room_id: 'Number',
    name: 'String',
    caption: 'String',
    storage_url: 'String'
    }
 ```

Update Room photo:
endpoint: `/rooms/updateRoomPhoto`
Request Type: `PUT`
Required Headers: 'Content-Type' : 'application/json'
Required Body:
 ```{
    room_id: 'String',
    _id: 'String'
```
Optional: Add any properties you wish to update...

Delete Room photos:
endpoint: `/rooms/deleteRoom`
Resuest Type: `DELETE`

# run the service
npm start<br>