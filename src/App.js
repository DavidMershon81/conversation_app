import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import DebugUsersView from './components/DebugUsersView';
import DebugGroupsListView from './components/DebugGroupsListView';
import PetitionGroupView from './components/PetitionGroupView';
import TestVariablePaths from './components/TestVariablePaths';
import PetitionView from './components/PetitionView';
import LoginView from './components/LoginView';
import UserHomeView from './components/UserHomeView';
import { AppContext } from './contexts/AppContext';
import { useState } from 'react';

const App = () => {
  const [authToken, setAuthToken] = useState("");

  return (
    <Router>
      <div className="App">
        <AppContext.Provider value={{ authToken, setAuthToken }}>
          <h1>Petition App Debug UI</h1>
          <nav className='top_nav'>
            <Link className='nav_link' to='/debug/users'>Users(debug)</Link>
            <Link className='nav_link' to='/debug/petition_groups'>Groups(debug)</Link>
            <Link className='nav_link' to='/login'>Login</Link>
            <Link className='nav_link' to='/home'>Home</Link>
          </nav>
          
          <Route path='/login' exact component={LoginView} />
          <Route path='/home' exact component={UserHomeView} />
          <Route path='/debug/petition_groups' exact component={DebugGroupsListView} />
          <Route path='/petition_group/' render={ () => (<PetitionGroupView basePath='/petition_group/' />)} />
          <Route path='/petitions/' render={ () => (<PetitionView basePath='/petitions/' />)} />
          <Route path='/debug/users' exact component={DebugUsersView} />
          <Route path='/testpath/' render={ () => (<TestVariablePaths basePath='/testpath/' />)} />
        </AppContext.Provider>
      </div>
    </Router>
  );
}

export default App;
