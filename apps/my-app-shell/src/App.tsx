import React, { lazy, Suspense } from 'react';

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
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Container App</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <Suspense fallback={<div style={{ padding: '10px', border: '1px solid #ccc' }}>Loading Teams...</div>}>
          <ErrorBoundary>
            <TeamsApp />
          </ErrorBoundary>
        </Suspense>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <Suspense fallback={<div style={{ padding: '10px', border: '1px solid #ccc' }}>Loading Associations...</div>}>
          <ErrorBoundary>
            <MyAssociationsApp />
          </ErrorBoundary>
        </Suspense>
      </div>
    </div>
  );
}

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error in component:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '10px', 
          border: '1px solid #ff0000',
          borderRadius: '4px',
          color: '#ff0000'
        }}>
          Something went wrong loading this component.
        </div>
      );
    }

    return this.props.children;
  }
}

export default App;