
import './App.css';
import{Switch , Route} from 'react-router-dom'
import Login from '../src/component/Login/Login';
import User from '../src/component/User/User';
import Logout from '../src/component/Logout/Logout';
import Register from '../src/component/Register/Register'

function App() {
  return (
    <Switch>
      <Route exact path='/' component={Login} />
      <Route path="/user" component={User}/>
      <Route path='/logout' component={Logout} />
      <Route path='/reg' component={Register} />
    </Switch>
  );
}

export default App;
