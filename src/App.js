import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import UsersView from './components/UsersView';
import PetitionGroupsListView from './components/PetitionGroupsListView'
import PetitionGroupView from './components/PetitionGroupView'
import TestVariablePaths from './components/TestVariablePaths'
import PetitionView from './components/PetitionView'
import LoginView from './components/LoginView'
import { AppContext } from './contexts/AppContext';
import { useState } from 'react'

const App = () => {
  const [authToken, setAuthToken] = useState("");
  console.log("authToken:" + authToken);

  return (
    <Router>
      <div className="App">
        <AppContext.Provider value={{ authToken, setAuthToken }}>
          <h1>Petition App Debug UI</h1>
          <nav className='top_nav'>
            <Link className='nav_link' to='/users'>Users</Link>
            <Link className='nav_link' to='/petition_groups'>Petition Groups</Link>
            <Link className='nav_link' to='/login'>Login</Link>
          </nav>
          
          <Route path='/login' exact component={LoginView} />
          <Route path='/petition_groups' exact component={PetitionGroupsListView} />
          <Route path='/petition_group/' render={ () => (<PetitionGroupView basePath='/petition_group/' />)} />
          <Route path='/petitions/' render={ () => (<PetitionView basePath='/petitions/' />)} />
          <Route path='/users' exact component={UsersView} />
          <Route path='/testpath/' render={ () => (<TestVariablePaths basePath='/testpath/' />)} />
        </AppContext.Provider>
      </div>
    </Router>
  );
}

export default App;
