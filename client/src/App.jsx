import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './index.css'
import Homepage from './components/Homepage';
import Navbar from './components/Navbar';

function App() {

  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Homepage />} />
      <Route path="/login" element={<div>login</div>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
