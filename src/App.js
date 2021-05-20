import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import UsersView from './components/UsersView';
import PetitionGroupsView from './components/PetitionGroupsView'
import TestVariablePaths from './components/TestVariablePaths'

const App = () => {
  return (
    <Router>
      <div className="App">
      <h1>Petition App Debug UI</h1>
      <nav>
        <h4>Menu</h4>
        <ul>
          <li className='nav_link'><Link to='/users'>Users</Link></li>
          <li className='nav_link'><Link to='/petition_groups'>Petition Groups</Link></li>
        </ul>
      </nav>
      
      <Route path='/petition_groups' exact component={PetitionGroupsView} />
      <Route path='/users' exact component={UsersView} />
      <Route path='/testpath/' render={ () => (<TestVariablePaths basePath='/testpath/' />)} />
    </div>
    </Router>
  );
}

export default App;
