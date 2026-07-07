
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import Consultation from './pages/Consultation.tsx';
import FreeTrial from './pages/FreeTrial.tsx';
import Course from './pages/Course.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/consultation" element={<Consultation />} />
        <Route path="/free-trial" element={<FreeTrial />} />
        <Route path="/course" element={<Course />} />
      </Routes>
    </Router>
  );
}

export default App;
