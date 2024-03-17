import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import '../styles/Register.scss'

const RegisterPage = () => {

    const[formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        profileImage: null,

    });

    const handleChange= (e) => {      //e is the event object
        const {name, value,files} = e.target;         //destructuring the event object
        setFormData({         //setting the state
            ...formData,       //spread operator to copy the previous state.that means if i update email it store name values in the memory
            [name]:value,       //setting the value of the input field to the state
            [name]:name === 'profileImage' ? files[0] : value    //??? if the input field is profileImage then set the value to the file else set the value to the value of the input field
        })
    }

    console.log(formData);


    const [passwordMatch, setPasswordMatch] = useState(true);   //checking password and confirm password is matching


    useEffect(() => {
        setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === "")
    })

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        

        try {
            const register_form = new FormData()   //creating a new form data object
      
            for (var key in formData) {
              register_form.append(key, formData[key])  //key is the name of the input field and formData[key] is the value of the input field
            }
      
            const response = await fetch("http://localhost:3001/auth/register", {   //fetching the register route from the backend
              method: "POST",
              body: register_form  //the backend get register form's body data
            })
      
            if (response.ok) {
              navigate("/login")
            }
          } catch (err) {
            console.log("Registration failed", err.message)
          }
    }

  return (
    <div className='register'>
        <div className="register_content">
            <form className='register_content_form ' onSubmit={handleSubmit}>
                <input placeholder='First Name' name='firstName' value={formData.firstName} onChange={handleChange} required/>
               
                <input placeholder='Last Name' name='lastName' value={formData.lastName} onChange={handleChange} required/>
               
                <input placeholder='Email' name='email' type='email' value={formData.email} onChange={handleChange} required/>
               
                <input placeholder='Password' name='password' type='password' value={formData.password} onChange={handleChange} required/>
               
                <input placeholder='Confirm Password' name='confirmPassword' type='password' value={formData.confirmPassword} onChange={handleChange} required/>
               
                {!passwordMatch && <p style={{color:"red"}}>Password and Confirm Password do not match</p>}

                <input type='file' id='image' name='profileImage' accept='image/*' style={{display:"none"}} onChange={handleChange} required/>

                <label htmlFor='image'>
                    <img src='/assets/addImage.png' alt='add profile image'/>
                    <p>Upload Your Photo</p>
                </label>

                {formData.profileImage && (
                    <img src={URL.createObjectURL(formData.profileImage)} alt='profile photo' style={{maxWidth:"100px"}}/>
                )}

                <button type='submit' disabled={!passwordMatch}>REGISTER</button>
            </form>

            <a href='/login'>Already have an account? Log in here</a>
        </div>
      
    </div>
  )
}

export default RegisterPage;
