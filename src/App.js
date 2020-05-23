import * as React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import CONSTANT from './constant'
import Register from './components/registration'
import Dashboard from './components/dashboard'
import Login from './components/login'
import {useWindowSize} from './utils'
import './App.css';

function App() {
  const size = useWindowSize();
  return (
    <React.Fragment>
      <div>
        Width: {size.width} Height: {size.height}
      </div>
      
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/login" component={Login} />
          <Route exact={true} path="/register" component={Register} />
          
          <Route path="/" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    
    </React.Fragment>
  );
}

export default App;
