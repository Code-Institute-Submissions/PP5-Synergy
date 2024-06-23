import styles from './App.module.css';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom/';


function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<h2>Home</h2>} />
        <Route exact path="/signin" element={<h2>Sign In</h2>} />
        <Route exact path="/signup" element={<h2>Sign Up</h2>} />
        <Route render={() => <p>Page not found!</p>} />
      </Routes>
    </div>
  );
}

export default App;
