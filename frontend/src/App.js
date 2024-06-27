import styles from './App.module.css';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom/';
import './api/axiosDefaults';
import SignIpForm from './pages/auth/SignInForm'
import SignUpForm from './pages/auth/SignUpForm'
import Dashboard from './pages/auth/Dashboard';


function App() {

  return (
        <div className={styles.App}>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<h2>Home</h2>} />
            <Route exact path="/signin" element={<SignIpForm />} />
            <Route exact path="/signup" element={<SignUpForm />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route render={() => <p>Page not found!</p>} />
          </Routes>
        </div>
  );
}

export default App;
