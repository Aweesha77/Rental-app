const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profileImagePath:{
        type:String,
        default:'',
    },
    tripList:{
        type:Array,
        default:[],
    },
    wishList:{
        type:Array,
        default:[],
    },
    propertyList:{
        type:Array,
        default:[],
    },
    reservationList:{
        type:Array,
        default:[],
    }
},
{timestamps:true}    //help you to find out when user registerd
);

const User=mongoose.model('User',userSchema); //User is the name of the model and userSchema is the schema of the model
module.exports=User; //exporting the model to use in other files
