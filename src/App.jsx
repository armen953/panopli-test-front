import { Link, NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import RequireAuth from './components/RequireAuth';
import Home from './pages/Home';
import Login from './pages/Login';
import Protected from './pages/Protected';
import Test from "./pages/Test";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/protected"
            element={
              <RequireAuth>
                <Protected />
              </RequireAuth>
            }
          />
      </Routes>
    </>
  );
}

export default App;
