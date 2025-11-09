import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CompetitionsPage from './pages/CompetitionsPage';
import CreateCompetitionPage from './pages/CreateCompetitionPage';
import CompetitionDetailsPage from './pages/CompetitionDetailsPage';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('token');
  return token ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/competitions"
          element={
            <PrivateRoute>
              <CompetitionsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/competitions/new"
          element={
            <PrivateRoute>
              <CreateCompetitionPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/competitions/:id"
          element={
            <PrivateRoute>
              <CompetitionDetailsPage />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/competitions" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
