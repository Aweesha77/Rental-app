import React from 'react'

const RegisterPage = () => {
  return (
    <div className='register'>
        <div className="register-content">
            <form>
                <input placeholder='firstName' name='firstName' required/>
                <input placeholder='lastName' name='lastName' required/>
                <input placeholder='email' name='email' type='email' required/>
                <input placeholder='password' name='password' type='password' required/>
                <input placeholder='confirmPassword' name='confirmPassword' type='password' required/>
                <input type='file' name='profileImage' accept='image/' style={{display:"none"}} required/>
            </form>
        </div>
      
    </div>
  )
}

export default RegisterPage
