import './App.css';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { UserProfile } from './pages/UserProfile/UserProfile';

function App() {

  return (
    <>
      <Register />
      <Login />
      <UserProfile />
    </>
  )
}

export default App;
