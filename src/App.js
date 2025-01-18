import Headers from "./components/Headers";
import Home from "./components/Home";
import CartDetails from "./components/CartDetails";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route} from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
        <Headers />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<CartDetails />} />
        </Routes>
        <Toaster />
    </div>
  );
}

export default App;
