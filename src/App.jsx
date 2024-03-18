import { Route, Routes } from 'react-router-dom'
import './App.css'
import Customer from './Pages/Customer/Customer'
import Animal from './Pages/Animal/Animal'
import Doctor from './Pages/Doctor/Doctor'
import Navbar from './Components/Navbar'

function App() {

  return (
    <>
    <Navbar />
    <div className='route-container'>
    <Routes>
      <Route path='/customer' element={<Customer />}/>
      <Route path='/animal' element={<Animal />}/>
      <Route path='/doctor' element={<Doctor />}/>
    </Routes>
    </div>
    </>
  )
}

export default App
