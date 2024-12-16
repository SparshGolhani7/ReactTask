// project added to git
import  {BrowserRouter,Routes,Route} from 'react-router-dom';
 import './App.css';
import Home from './Component/Home';
import Navbar from './Component/Navbar';
import Dashboard from './Component/Dashboard';
import Expense from './Component/Expense';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import Map from './Component/Map';

function App() {
  return (<>
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/Dashboard' element={<Dashboard/>}></Route>
        <Route path='/Expense' element={<Expense/>}></Route>
        <Route path='/Map' element={<Map/>}></Route>
  
      </Routes>
      
      </BrowserRouter>
    
    </div>
    </>
  );
}

export default App;
