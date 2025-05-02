import React from 'react';
import { AuthProvider } from './context/AuthContext';
import SignInPage from './pages/SignInPage';

function App() {
  return (
    <AuthProvider>
      <SignInPage />
    </AuthProvider>
  );
}

export default App;