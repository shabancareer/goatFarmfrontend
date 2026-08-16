import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import '../App.css';
import '../index.css';
import { AppProviders } from './providers';
import { AppRouter } from './router';
import { refreshSession } from '../store/thunks/auth/auth.thunks';
import type { AppDispatch } from '../store/store';

function AppContent() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(refreshSession());
  }, [dispatch]);

  return <AppRouter />;
}

function App() {
  return (
    <AppProviders>
      <AppContent />
    </AppProviders>
  );
}

export default App;
