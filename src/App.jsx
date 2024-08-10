import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className='hidden md:block'>
        <Header />
      </div>
      <Navbar />
      <div className="flex-grow mt-16 md:mt-0">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App
