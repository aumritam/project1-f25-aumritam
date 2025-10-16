// src/App.tsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LinesPage from './pages/LinesPage';
import About from './pages/About';
import './App.css'; // Import the main CSS file

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          {/* Main Home Page */}
          <Route path="/" element={<Home />} />
          
          {/* Lines Page with dynamic line parameter */}
          <Route path="/lines/:line" element={< LinesPage />} />
          
          {/* About Page */}
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;