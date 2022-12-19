const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
// const multer = require('multer');
const mongoose = require('mongoose');
const PORT = 4000;
const DB_NAME = "tutorial"

app.use(bodyParser.json());

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'images/')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname)
//     },
// })

// const upload = multer({ storage: storage })
// // for uploading image
// app.post('/image', upload.single('file'), function (req, res) {
//     res.json({})
//   })

// creating different routers so that we do need to write the same thing in URL again in again
var testAPIRouter = require("./routes/testAPI");
var JobRouter = require("./routes/Jobs");
var UserRouter = require("./routes/Users");
var AuthRouter = require("./routes/Auths");
var IDRouter = require("./routes/ID");

//MiddleWare
// setup API endpoints-The same folders will be created
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/testAPI", testAPIRouter);
app.use("/jobs", JobRouter);
app.use("/users", UserRouter);
app.use("/api/user", AuthRouter);
app.use("/ids", IDRouter);

// Connection to MongoDB    :-By this most probably data is stored somewhere
mongoose.connect('mongodb://127.0.0.1:27017/' + DB_NAME, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', function () {
    console.log("MongoDB database connection established successfully !");
})

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});