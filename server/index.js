const express = require("express");
const app = express();                 //create an express app
const mongoose = require("mongoose");  //to connect to mongoDB
const dotenv = require("dotenv").config();  //to hide the mongo url
const cors = require("cors");            //to allow cross-origin requests

const authRoutes = require("./routes/auth.js")
const listingRoutes = require("./routes/listing.js")
const bookingRoutes = require("./routes/booking.js")
const userRoutes = require("./routes/user.js")

app.use(cors());
app.use(express.json());   //middleware
app.use(express.static("public"));

/* ROUTES */
app.use("/auth", authRoutes)    //localhost:3001/auth/register
app.use("/properties", listingRoutes)  //localhost:3001/properties
app.use("/bookings", bookingRoutes)
app.use("/users", userRoutes)

/* MONGOOSE SETUP */
const PORT = 3001;
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "Dream_Nest",
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((err) => console.log(`${err} did not connect`));


