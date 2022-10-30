import './App.css';
import {BrowserRouter,Route} from 'react-router-dom'
//-----------components-------------

import Home from './components/Home'
import Landing from './components/Landing';
import Create from './components/Create';
import Details from './components/Details';
//----------------------------------

function App() {
  return (
  <BrowserRouter>
      <Route exact path='/' component={Landing}/>
      <Route exact path="/home" component={Home}/>
      <Route  path='/home/:id' component={Details}/>
      <Route exact path='/create' component={Create}/>
     
  </BrowserRouter>
  )
}

export default App;
