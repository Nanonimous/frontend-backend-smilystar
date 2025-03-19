import './App.css';
import Dashboard from './Dashboard/Dashboard';
import Students from './Students/Students';
import Menu from './Menu/Menu';
import { BrowserRouter,Routes,Route } from 'react-router-dom';


function App() {
  return (
    <div className='main'>

       <Menu />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Dashboard />} />
          <Route path="/:program/students" element={ <Students />} />
          <Route path="/:program/attendance" element={ <Dashboard />} />
          <Route path="/:program/payment" element={ <Dashboard />} />
          

          
        </Routes>
      </BrowserRouter>
      
      <Dashboard />
    </div>
  )
}

export default App;
