import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Topbar } from './components/Topbar'
import About from './pages/About'
import Home from './pages/Home'
import Profile from './pages/Profile'
import SignIn from './pages/Signin'
import SignUp from './pages/Signup'

export default function App() {
  return (
    <BrowserRouter>
      <Topbar></Topbar>
      <Routes>
      <Route path='/signup' element= {<SignUp/>} />
      <Route path='/' element= {<Home/>} />
      <Route path='/signin' element= {<SignIn/>} />
      <Route path='/profile' element= {<Profile/>} />
      <Route path='/about' element= {<About/>} />
      </Routes>
    </BrowserRouter>  
  )
}