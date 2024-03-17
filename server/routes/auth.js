const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const User = require("../models/user");






// user registeration

router.post("/register", async (req, res) => {
    try {

        //take all the information from user and validate it
        const { firstName, lastName, email, password } = req.body;
        if (!(firstName && lastName && email && password)) {
            res.status(400).json({ message: "All input is required" });
        }
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(409).json({ message: "User already exists" });
        }
        encryptedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        user.token = token;
        res.status(201).json(user);

        //the uploaded file is available req.files
        const profileImage=req.files.profileImage;
    } catch (err) {
        console.log(err);
    }
});