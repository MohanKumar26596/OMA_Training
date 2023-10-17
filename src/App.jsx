import { Outlet } from 'react-router-dom';
import './App.css'
import Login from './components/Login'


function App() {
   return (
    <>
     <nav>
      <Login />
     </nav>
     <Outlet />
    </>
  )
}

export default App