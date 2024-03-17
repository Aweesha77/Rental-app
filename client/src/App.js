import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
    {/* <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      
    </Routes>
    </BrowserRouter> */}
    <RegisterPage/>
    <HomePage/>
    <LoginPage/>
    
    
    
    </>
  );
}

export default App;
