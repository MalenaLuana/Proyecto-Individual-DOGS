import './App.css';
import {BrowserRouter,Route} from 'react-router-dom'
//-----------components-------------

import Home from './components/Home'
import Landing from './components/Landing';
import Nav from './components/Nav';
//----------------------------------

function App() {
  return (
  <BrowserRouter>
      <Route exact path='/' component={Landing}/>
      <Route exact path="/home" component={Home}/>
     
  </BrowserRouter>
  )
}

export default App;
