import { Route, Routes } from 'react-router-dom'
import './App.css'
import Customer from './Pages/Customer/Customer'
import Animal from './Pages/Animal/Animal'
import Navbar from './Components/Navbar'

function App() {

  return (
    <>
    <Navbar />
    <div className='route-container'>
    <Routes>
      <Route path='/customer' element={<Customer />}/>
      <Route path='/animal' element={<Animal />}/>
    </Routes>
    </div>
    </>
  )
}

export default App
