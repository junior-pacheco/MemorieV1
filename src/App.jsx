import { Route, Routes,Navigate  } from 'react-router-dom'
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage';
import UsersTable from './components/Users';
import Login from './components/Login';

const App = () => {
  return (
      <div className='h-[100vh]'>
        <main>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/crear-perfil" element={<Home/>} />
          <Route path="/profile/:id" element={<ProfilePage/>} />
          <Route path="/users" element={<UsersTable/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
        </main>
      </div>
  );
};

export default App;