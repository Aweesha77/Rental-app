import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
    </Routes>
    </BrowserRouter>
    
    
    
    </>
  );
}

export default App;
