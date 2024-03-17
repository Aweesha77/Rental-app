import React,{useState} from 'react'
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
            [name]:name === 'profileImage' ? files[0] : value    //if the input field is profileImage then set the value to the file else set the value to the value of the input field
        })
    }

    console.log(formData);


  return (
    <div className='register'>
        <div className="register_content">
            <form className='register_content_form'>
                <input placeholder='First Name' name='firstName' value={formData.firstName} onChange={handleChange} required/>
               
                <input placeholder='Last Name' name='lastName' value={formData.lastName} onChange={handleChange} required/>
               
                <input placeholder='Email' name='email' type='email' value={formData.email} onChange={handleChange} required/>
               
                <input placeholder='Password' name='password' type='password' value={formData.password} onChange={handleChange} required/>
               
                <input placeholder='Confirm Password' name='confirmPassword' type='password' value={formData.confirmPassword} onChange={handleChange} required/>
               
                <input type='file' id='image' name='profileImage' accept='image/*' style={{display:"none"}} onChange={handleChange} required/>

                <label htmlFor='image'>
                    <img src='/assets/addImage.png' alt='add profile image'/>
                    <p>Upload Your Photo</p>
                </label>

                <button type='submit'>REGISTER</button>
            </form>

            <a href='/login'>Already have an account? Log in here</a>
        </div>
      
    </div>
  )
}

export default RegisterPage;
