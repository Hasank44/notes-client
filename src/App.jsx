import Footer from "./conponents/shared/Footer"
import Navbar from "./conponents/shared/Navbar"
import { Outlet } from 'react-router'
function App() {

  return (
    <div>
    <Navbar />
    <Outlet />
    <Footer />
    </div>
  )
}

export default App
