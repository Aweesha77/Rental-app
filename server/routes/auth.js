const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const User = require("../models/user");

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/uploads/');   //upload images to upoads folder
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);  //use the original file name
    }
});

const upload=multer({storage});



// user registeration

router.post("/register", upload.single('profileImage'),async (req, res) => {
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
        if(!profileImage){
            return res.status(400).send("No file uploaded");
        }

        const profileImagePath=profileImage.path;

        const salt=await bcrypt.genSalt(10);   //generate salt , A salt is a random string that is used to add additional data to the password before hashing it. This makes the hash more secure. The 10 is the number of rounds used to generate the salt. The higher the number, the more secure
        const hashedPassword=await bcrypt.hash(password,salt);   //hash the password.get sault and password and combine it and generate hashpassword.

        const newUser=new User({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            profileImagePath,
        });


        await newUser.save();      //save the user to the database
        res.status(201).json({message:"User registered succefssfully",user:newUser});  //send the response to the client



    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Registration failed", error: err.message });
    }
});

module.exports = router;