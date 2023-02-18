import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Country from './Components/Country';
import Countries from './Components/Countries';
import Navbar from './Components/Navbar';
import { ThemeProvider } from './Components/ThemeContext';

function App() {
  return (
      <HashRouter>
    <ThemeProvider>
    <div className="App">
      <Navbar/>
      <Routes>
      <Route exact path='/*' element={<Countries/>}/>
      <Route path='/countries/:name' element={<Country/>}/>
      </Routes>
        
    </div>
    </ThemeProvider>
        </HashRouter>
  );
}

export default App;
