import './App.css'      
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import Header from './components/Header'
import Library from './pages/Library'
import 'animate.css';
import Profile from './pages/Profile'
import Users from './components/Users'
import RegisterMusic from './pages/RegisterMusic'


function App() {

  return (
    <>
      <Router>
        <div className='flex flex-col min-h-screen'>
        <Header />
        <Routes className='flex-1 w-full'>
          <Route path='/login' element={<Login />} />  
          <Route path='/' element={<Dashboard />} />
          <Route path='/register' element={<Register />} />
          <Route path='/library' element={<Library />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/users' element={<Users />} />
          <Route path='/registermusic' element={<RegisterMusic />} />
        </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
