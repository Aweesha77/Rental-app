import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import "../styles/Register.scss";

const RegisterPage = () => {
  const [formData, setFormData] = useState({    // formData is an object that contains the user's information
    firstName: "",
    lastName: "",    // The user's first name, last name, email, password, and confirmPassword are all empty strings
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  // Add this line to your existing useState declarations
  const [isProfileImageEmpty, setIsProfileImageEmpty] = useState(false);


  const handleChange = (e) => {
    const { name, value, files } = e.target;   //name-input field's name, value-input field's value, files-input field's files
    setFormData({
      ...formData,      //remember previous data.if we input email it remembers name details also
      [name]: value,
      [name]: name === "profileImage" ? files[0] : value,    //???
    });

    if (name === "profileImage") {
      setIsProfileImageEmpty(!files.length);
    }
  };

  const [passwordMatch, setPasswordMatch] = useState(true)   //password and confirm password should be same.the default would be true

  useEffect(() => {
    setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === "")
  })

  
  
  const navigate = useNavigate()    //useNavigate is a hook that returns a navigate function

  const handleSubmit = async (e) => {
    e.preventDefault()   //prevent the default action of the form

    try {
      const register_form = new FormData()  //FormData object lets you compile a set of key/value pairs to send using XMLHttpRequest

      for (var key in formData) {
        register_form.append(key, formData[key])  //for loop to append the key and value to the form data
      }

      const response = await fetch("http://localhost:3001/auth/register", {  //fetching the data from the server
        method: "POST",
        body: register_form   //register form body is come like json form to backend
      })

      if (response.ok) {   //if the response is ok then it will navigate to login page
        console.log("Registration successful")
        navigate("/")
      }
    } catch (err) {
      console.log("Registration failed", err.message)
    }
  }

  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          <input
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            required
          />
          <input
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            type="password"
            required
          />

          {!passwordMatch && (
            <p style={{ color: "red" }}>Passwords are not matched!</p>  //&&: This is a logical AND operation. In JavaScript, if the value on the left of && is truthy, the value on the right is returned. If the value on the left is falsy, that value is returned.
          )}

          <input
            id="image"
            type="file"
            name="profileImage"
            accept="image/*"
            style={{ display: "none" }}  
            onChange={handleChange}
            required
          />
          <label htmlFor="image">
            <img src="/assets/addImage.png" alt="add profile photo" />
            <p>Upload Your Photo</p>
          </label>

          {isProfileImageEmpty && (
          <p style={{ color: "red" }}>Profile image is required</p>     //make it.WRONG.USE this inside handle submit
          )}

          {formData.profileImage && (
            <img
              src={URL.createObjectURL(formData.profileImage)}    //URL.createObjectURL() static method creates a DOMString containing a URL representing the object given in the parameter.
              alt="profile photo"
              style={{ maxWidth: "80px" }}
            />
          )}


          
          <button type="submit" disabled={!passwordMatch || !formData.profileImage}>REGISTER</button>
        </form>
        <a href="/login">Already have an account? Log In Here</a>
      </div>
    </div>
  );
};

export default RegisterPage;
