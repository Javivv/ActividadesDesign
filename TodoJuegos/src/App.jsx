import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Usar Routes en lugar de Switch
import './App.css'
import HomePage from './pages/HomePage'
import Carrousel from './components/Carrousel';
import Footer from './components/Footer';
import Navbar from './components/Navbar';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
      <Navbar></Navbar>
      <div>
        <Routes>
          <Route path="/" element={<Carrousel />} />
          <Route path="/search" element={<HomePage />} />
        </Routes>
      </div>
      <Footer></Footer>
    </Router>

    </>
  )
}

export default App
