import { Routes, Route } from 'react-router-dom';
import { QuizPage } from './pages/QuizPage';
import { AdminPage } from './pages/AdminPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<QuizPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}

export default App;