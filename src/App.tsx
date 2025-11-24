import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import ProblemDetail from '@/pages/ProblemDetail';
import { ProgressProvider } from '@/context/ProgressContext';
import { ThemeProvider } from '@/context/ThemeContext';

function App() {
  return (
    <ProgressProvider>
      <ThemeProvider>
        <Router basename="/interview-prep-vault">
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/problem/:slug" element={<ProblemDetail />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </ProgressProvider>
  );
}

export default App;
