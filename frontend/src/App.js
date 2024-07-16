import styles from './App.module.css';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom/';
import './api/axiosDefaults';
import SignIpForm from './pages/auth/SignInForm'
import SignUpForm from './pages/auth/SignUpForm'
import Dashboard from './pages/auth/Dashboard';
import DashMenu from './components/DashMenu';
import WorkstreamPage from './pages/workstream/WorkstreamPage';
import ActiveWorkstream from './pages/workstream/ActiveWorkstream';
import TaskList from './pages/tasks/TaskList';
import Notification from './pages/notification/Notification';
import Profile from './pages/profile/Profile';
import InvitePage from './pages/notification/InvitePage';
import JoinPage from './pages/notification/JoinPage';


function App() {

  return (
        <div className={styles.App}>
          <NavBar />
          <div className='grid grid-nogutter'>
              <DashMenu />
            <div className="col surface-ground p-0">
            <Routes>
              <Route exact path="/" element={<h2>Home</h2>} />
              <Route exact path="/signin" element={<SignIpForm />} />
              <Route exact path="/signup" element={<SignUpForm />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route exact path="/workstream" element={<WorkstreamPage />} />
              <Route exact path="/workstream/active" element={<ActiveWorkstream />} />
              <Route exact path="/task" element={<TaskList />} />
              <Route exact path="/notification" element={<Notification />} />
              <Route exact path="/invite" element={<InvitePage />} />
              <Route exact path="/join" element={<JoinPage />} />
              <Route path="*" element={<h2>Page not found</h2>} />
            </Routes>
            </div>
          </div>
          
        </div>
  );
}

export default App;
