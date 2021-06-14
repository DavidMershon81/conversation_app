import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DebugUsersView from './components/DebugUsersView';
import PetitionGroupView from './components/PetitionGroupView';
import AddPetitionGroupView from './components/AddPetitionGroupView';
import AddPetitionView from './components/AddPetitionView';
import PetitionView from './components/PetitionView';
import LoginView from './components/LoginView';
import HomeView from './components/HomeView';
import TopNavSection from './components/TopNavSection';
import { AppContext } from './contexts/AppContext';
import { useState } from 'react';

const App = () => {
  const [authToken, setAuthToken] = useState("");
  const [loggedInUser, setLoggedInUser] = useState("");

  return (
      <div className="App">
          <AppContext.Provider value={{ authToken, setAuthToken, loggedInUser, setLoggedInUser }}>
            <Router>
              <TopNavSection />
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
