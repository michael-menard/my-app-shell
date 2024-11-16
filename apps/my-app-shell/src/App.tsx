import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Type declarations for the remote modules
declare module 'my-teams/App';
declare module 'my-associations/App';

// Lazy load the remote components
const TeamsApp = lazy(() => import('my-teams/App').catch(err => {
  console.error('Error loading TeamsApp:', err);
  return { default: () => <div>Error loading Teams App</div> };
}));

const MyAssociationsApp = lazy(() => import('my-associations/App').catch(err => {
  console.error('Error loading MyAssociationsApp:', err);
  return { default: () => <div>Error loading Associations App</div> };
}));

function App() {
  return (
      <BrowserRouter>
        <div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/teams">Teams</Link>
            <Link to="/associations">Associations</Link>
          </nav>

          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<div>Home</div>} />
              <Route path="/teams/*" element={<TeamsApp />} />
              <Route path="/associations/*" element={<MyAssociationsApp />} />
            </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
  );
}

export default App;