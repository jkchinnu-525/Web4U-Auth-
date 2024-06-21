import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Topbar } from './components/Topbar'
import { About } from './pages/About'
import { Home } from './pages/Home'
import { Profile } from './pages/Profile'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'

export default function App() {
  return (
    <BrowserRouter>
      <Topbar></Topbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} /> 
        <Route path="/signin" element={<Signin />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>  
  )
}