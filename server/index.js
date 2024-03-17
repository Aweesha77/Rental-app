const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

app.use(cors()); // to enable CORS
app.use(express.json()); // to parse the body of the request message
app.use(express.static("public"));   // to serve static files

const PORT=3001;

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server is running on port", PORT);
        });
    })
    .catch((err) => console.log(`${err} did not connected`));