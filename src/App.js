import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import DebugUsersView from './components/DebugUsersView';
import PetitionGroupView from './components/PetitionGroupView';
import AddPetitionGroupView from './components/AddPetitionGroupView';
import AddPetitionView from './components/AddPetitionView';
import PetitionView from './components/PetitionView';
import LoginView from './components/LoginView';
import HomeView from './components/HomeView';
import { SimpleButton } from './components/MiscControls';
import { AppContext } from './contexts/AppContext';
import { useState } from 'react';

const App = () => {
  const [authToken, setAuthToken] = useState("");
  const [loggedInUser, setLoggedInUser] = useState("");

  const onLogout = (id, text) => {
    setAuthToken("");
    setLoggedInUser("");
  };

  return (
      <div className="App">
          <AppContext.Provider value={{ authToken, setAuthToken, loggedInUser, setLoggedInUser }}>
            <Router>      
              <h1 className='top_heading_text'>Petition App Prototype</h1>
              <nav className='top_nav'>
                <Link className='nav_link' to='/debug/users'>Users(debug)</Link>
                { authToken && <Link className='nav_link' to='/'>Home</Link> }
                { !authToken && <Link className='nav_link' to='/login'>Login</Link> }
                { authToken && <SimpleButton className='nav_link' onBtnClick={onLogout} text='Logout'/> }
              </nav>
              <p className='logged_in_user_text'>{loggedInUser}</p>
              <Switch>
                <Route exact path='/' component={HomeView} />
                <Route exact path='/login' component={LoginView} />
                <Route path='/petition_group/' component={ () => <PetitionGroupView basePath='/petition_group/' />} />
                <Route exact path='/add_petition_group/'  component={AddPetitionGroupView} />
                <Route path='/add_petition/' component={ () => <AddPetitionView basePath='/add_petition/' />} />
                <Route path='/petitions/' component={ () => <PetitionView basePath='/petitions/' />} />
                <Route exact path='/debug/users' component={DebugUsersView} />
              </Switch>
            </Router>    
          </AppContext.Provider>
      </div>
  );
}

export default App;
