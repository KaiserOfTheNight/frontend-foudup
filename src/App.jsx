import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './pages/auth/SignUp';
import Login from './pages/auth/Login';
import Home from './pages/Home/Home';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Profile from './pages/user/Profile';
import ProtectedRoute from './middleware/ProtectedRoute';
import Projects from './pages/project/Projects';
import CreateProject from './pages/project/CreateProject';
import Project from './pages/Project';
import Dashboard from './pages/project/Dashboard';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <main className="pt-16">
          <Routes>
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Projects />} />
            <Route path="/projects/:projectId/*" element={
              <ProtectedRoute>
                <Project />
              </ProtectedRoute>
            } />
            <Route 
              path="/projects/create" 
              element={
                <ProtectedRoute>
                  <CreateProject />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;