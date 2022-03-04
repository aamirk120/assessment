require("./globals");
require('dotenv').config()
let express = require('express');
let path = require('path');
let cors = require("cors");
let fs = require("fs");

let app = express();

const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

let public_directory = {
    public: path.join(__dirname, "/public"),
    images: path.join(__dirname, "public", "images")
}

for (const dir of Object.values(public_directory)) {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
}
// app.use((req, res, next) => {
//   // Allowed Origin and Methods, and Headers
//   "use strict";
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "HEAD, PUT, POST, GET, OPTIONS, DELETE");
//   res.header("Access-Control-Allow-Headers", "origin, content-type, Authorization, x-access-token");

//   next();
// });


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use('/public', express.static(path.join(__dirname, 'public')));

// require("./src/config/database");

// BOOTSTRAP MODELS
// const walk = (path) => {
//     const fs = require("fs");
//     fs.readdirSync(path).forEach((file) => {
//         const newPath = path + "/" + file;
//         const stat = fs.statSync(newPath);
//         if (stat.isFile()) {
//             if (/(.*)\.(js|coffee)/.test(file)) {
//                 require(newPath);
//             }
//         } else if (stat.isDirectory()) {
//             walk(newPath);
//         }
//     });
// };
// walk(__models);


app.use(require(`${__routes}`));


global.static_path = "/public/images/";
global.server_host = "localhost";
global.public_dir = public_directory;
module.exports = app;
