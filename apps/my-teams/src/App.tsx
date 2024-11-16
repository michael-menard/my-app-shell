import { Routes, Route, useNavigate } from 'react-router-dom';

import './App.css'

function App() {

  return (
      <Routes>
          <Route path="/" element={<div>Teams List</div>} />
          <Route path="/:teamId" element={<div>Team Details</div>} />
      </Routes>
  )
}

export default App
