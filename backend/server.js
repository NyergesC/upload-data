const express = require("express");
const fileUpload = require('express-fileupload')
const path = require("path");
const app = express(); // express is egy föggvény és ez lefut, és objektum jön vissza

function getFunction(request, response){
    response.sendFile(path.join(`${__dirname}/../frontend/index.html`));
}

app.use(fileUpload());

app.get("/", getFunction);
app.use("/pub", express.static(`${__dirname}/../frontend/public`));
app.use("/upload", express.static(`${__dirname}/../frontend/upload`));

//===========UPLOAD FILES SERVER OLDALROL


app.post('/', (req, res) => { // egyeznie kell a fetchel
    //UPLOAD IMAGE

                   
    const picture = req.files.picture // egyeznie kell amivel apendeltem a srcipt.js-ben
    const answer = {}
    const uploads = path.join(`${__dirname}/../frontend/upload/`);
    if(picture) {
        picture.mv(uploads + picture.name)
    }
    answer.pictureName = picture.name
    res.send(answer)

  }); 

//UPLOAD FILES FROM SERVER IS OVER


const port = 9000;
const ipAddress = `http://127.0.0.1:${port}`;
app.listen(port, () => {
    console.log(ipAddress)
});