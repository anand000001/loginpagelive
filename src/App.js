import {BrowserRouter, Route, Switch} from 'react-router-dom'
import DataPage  from './components/DataPage'
import LoginForm from './components/LoginForm'
import Home from './components/Home'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/" component={Home} />
      <Route exact path="/data" component={DataPage}/>
    </Switch>
  </BrowserRouter>
)

export default App