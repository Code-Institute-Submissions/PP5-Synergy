import styles from './App.module.css';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom/';
import './api/axiosDefaults';
import SignIpForm from './pages/auth/SignInForm';
import SignUpForm from './pages/auth/SignUpForm';
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
                  <main className='grid grid-nogutter'>
                    <DashMenu />
                      <div className="col surface-ground p-0">
                        <Dashboard />
                      </div>
                  </main>
                } />
                <Route exact path="/workstream" element={
                  <main className='grid grid-nogutter'>
                    <DashMenu />
                      <div className="col surface-ground p-0">
                      <WorkstreamPage />
                      </div>
                  </main>
                } />
                <Route exact path="/workstream/active" element={
                  <main className='grid grid-nogutter'>
                    <DashMenu />
                      <div className="col surface-ground p-0">
                      <ActiveWorkstream />
                      </div>
                  </main>
                } />
                <Route exact path="/task" element={
                  <main className='grid grid-nogutter'>
                    <DashMenu />
                      <div className="col surface-ground p-0">
                      <TaskList />
                      </div>
                  </main>
                } />
                <Route exact path="/notification" element={
                  <main className='grid grid-nogutter'>
                    <DashMenu />
                      <div className="col surface-ground p-0">
                      <Notification />
                      </div>
                  </main>
                } />
                <Route exact path="/invite" element={
                  <main className='grid grid-nogutter'>
                    <DashMenu />
                      <div className="col surface-ground p-0">
                      <InvitePage />
                      </div>
                  </main>
                } />
                <Route exact path="/join" element={
                  <main className='grid grid-nogutter'>
                    <DashMenu />
                      <div className="col surface-ground p-0">
                      <JoinPage />
                      </div>
                  </main>
                } />
                <Route path="*" element={
                  <main className='grid grid-nogutter'>
                    <DashMenu />
                      <div className="col surface-ground p-0">
                      <NotFound />
                      </div>
                  </main>
                } />
              </Routes>
        </div>
  );
}

export default App;
