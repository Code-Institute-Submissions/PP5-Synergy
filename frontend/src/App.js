import styles from './App.module.css';
import NavBar from './components/NavBar';
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <div>
        <Switch>
          <Route exact path="/" render={() => <h2>Home</h2>} />
        </Switch>
        <Switch>
          <Route exact path="/signup" render={() => <h2>Signup</h2>} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
