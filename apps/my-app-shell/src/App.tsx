import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// Import remote modules using dynamic imports
const TeamsApp = React.lazy(() => import('my-teams/App'));
const AssociationsApp = React.lazy(() => import('my-associations/App'));

const Loading = () => <div>Loading...</div>;

const AppShell = () => {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/teams">Teams</Link></li>
            <li><Link to="/associations">Associations</Link></li>
          </ul>
        </nav>

        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<div>Welcome to the App Shell</div>} />
            <Route path="/teams/*" element={<TeamsApp />} />
            <Route path="/associations/*" element={<AssociationsApp />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
};

export default AppShell;