
# Mongo file upload using NodeJs
> Project defines how to upload and download a file into mongdb 
<hr>


## Setup

Create an .env file and store the below variables into it.
``` 
APPLICATIONPORT=3003
MONGOCONNECTIONSTRING=mongodb://localhost:27017/fileuploadDB
```

Install it locally using npm and do npm start as defined below:

``` 
$ npm install
$ npm start
```
## Screenshots
Image upload using the spcified mandatory body information.
![Image upload](./screenshots/filetoupload.png)
<hr>
File Information Stored into the database along with the file and chunks

![Image Saved in DB](./screenshots/filesavedindb.png)
<hr>
Dow loading the image based on the provided fileinformationame while did the post method.

![Image Download](./screenshots/Downloadedfile.png)
<hr>
