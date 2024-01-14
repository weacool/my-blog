import './App.css'
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import ChopSticks from './ChopSticks.tsx';
import HomePage from './HomePage.tsx';

function App() {

  return (

    <div>

    <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route index element={<HomePage />} />
          <Route path="ChopSticks" element={<ChopSticks />} />
        </Route>
      </Routes>
    </BrowserRouter>


      
    </div>
  )
}

//function 

export default App
