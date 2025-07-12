import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './index.css'
import Homepage from './components/Homepage';
import Navbar from './components/Navbar';
import Detail from './components/Detail';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import ProfilePage from './components/ProfilePage';
import AddQuestion from './components/AddQuestion';
import GenerateOTP from './components/GenerateOTP';
import OTPVerification from "./components/OTPVerification"
function App() {

  return (
    <BrowserRouter>
    {/* <Navbar/> */}
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Homepage />} />
 
       <Route path="/signup" element={<SignUpForm />} />
           <Route path="/login" element={<LoginForm />} />
           <Route path="/profile" element={<ProfilePage />} />
           <Route path="/add-question" element={<AddQuestion/>} />
           <Route path="/generate-otp" element={<GenerateOTP />} />
           <Route path="/verify-otp" element={<OTPVerification />} />
      <Route path='/questions/:id' element={<Detail/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
