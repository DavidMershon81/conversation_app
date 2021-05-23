import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import UsersView from './components/UsersView';
import PetitionGroupsListView from './components/PetitionGroupsListView'
import PetitionGroupView from './components/PetitionGroupView'
import TestVariablePaths from './components/TestVariablePaths'
import PetitionView from './components/PetitionView'

const App = () => {
  return (
    <Router>
      <div className="App">
      <h1>Petition App Debug UI</h1>
      <nav className='top_nav'>
        <Link className='nav_link' to='/users'>Users</Link>
        <Link className='nav_link' to='/petition_groups'>Petition Groups</Link>
      </nav>
      
      <Route path='/petition_groups' exact component={PetitionGroupsListView} />
      <Route path='/petition_group/' render={ () => (<PetitionGroupView basePath='/petition_group/' />)} />
      <Route path='/petitions/' render={ () => (<PetitionView basePath='/petitions/' />)} />
      <Route path='/users' exact component={UsersView} />
      <Route path='/testpath/' render={ () => (<TestVariablePaths basePath='/testpath/' />)} />
    </div>
    </Router>
  );
}

export default App;
