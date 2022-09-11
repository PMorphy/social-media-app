import { Container } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Auth from './components/auth/Auth';

import './index.css';

function App() {
  return (
    <Container maxWidth='lg'>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/auth' component={Auth} />
      </Switch>
    </Container>
  );
}

export default App;
