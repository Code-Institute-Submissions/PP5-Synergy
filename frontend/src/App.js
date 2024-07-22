import styles from './App.module.css';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom/';
import './api/axiosDefaults';
import SignIpForm from './pages/auth/SignInForm'
import SignUpForm from './pages/auth/SignUpForm'
import Dashboard from './pages/dashboard/Dashboard';
import DashMenu from './components/DashMenu';
import WorkstreamPage from './pages/workstream/WorkstreamPage';
import ActiveWorkstream from './pages/workstream/ActiveWorkstream';
import TaskList from './pages/tasks/TaskList';
import Notification from './pages/notification/Notification';
import InvitePage from './pages/notification/InvitePage';
import JoinPage from './pages/notification/JoinPage';
import Home from './pages/home/Home';
import NotFound from './components/NotFound';


function App() {

  return (
        <div className={styles.App}>
          <NavBar />
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/signin" element={<SignIpForm />} />
                <Route exact path="/signup" element={<SignUpForm />} />
                <Route exact path="/dashboard" element={
                  <div className='grid grid-nogutter'>
                    <DashMenu />
                      <div className="col surface-ground p-0">
                        <Dashboard />
                      </div>
                  </div>
                } />
                <Route exact path="/workstream" element={
                  <div className='grid grid-nogutter'>
                    <DashMenu />
                      <div className="col surface-ground p-0">
                      <WorkstreamPage />
                      </div>
                  </div>
                } />
                <Route exact path="/workstream/active" element={
                  <div className='grid grid-nogutter'>
                    <DashMenu />
                      <div className="col surface-ground p-0">
                      <ActiveWorkstream />
                      </div>
                  </div>
                } />
                <Route exact path="/task" element={
                  <div className='grid grid-nogutter'>
                    <DashMenu />
                      <div className="col surface-ground p-0">
                      <TaskList />
                      </div>
                  </div>
                } />
                <Route exact path="/notification" element={
                  <div className='grid grid-nogutter'>
                    <DashMenu />
                      <div className="col surface-ground p-0">
                      <Notification />
                      </div>
                  </div>
                } />
                <Route exact path="/invite" element={
                  <div className='grid grid-nogutter'>
                    <DashMenu />
                      <div className="col surface-ground p-0">
                      <InvitePage />
                      </div>
                  </div>
                } />
                <Route exact path="/join" element={
                  <div className='grid grid-nogutter'>
                    <DashMenu />
                      <div className="col surface-ground p-0">
                      <JoinPage />
                      </div>
                  </div>
                } />
                <Route path="*" element={
                  <div className='grid grid-nogutter'>
                    <DashMenu />
                      <div className="col surface-ground p-0">
                      <NotFound />
                      </div>
                  </div>
                } />
              </Routes>
        </div>
  );
}

export default App;
