
import './App.css'
import Navbar from './components/navbar/Navbar'
import Feed from './pages/feed/Feed'

function App() {

  return (
   <div className='bg-[#000000]'>
   <Navbar/>
   <div className='pt-20'>
   <Feed/>
   </div>
   </div>
  )
}

export default App
