import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DebugUsersView from './DebugUsersView';
import PetitionGroupView from './PetitionGroupView';
import AddPetitionGroupView from './AddPetitionGroupView';
import AddPetitionView from './AddPetitionView';
import PetitionView from './PetitionView';
import LoginView from './LoginView';
import RegisterView from './RegisterView';
import HomeView from './HomeView';
import TopNavSection from './TopNavSection';
import { AppContext } from '../contexts/AppContext';
import { LoadingBox } from './MiscControls'; 
import useLoginInfo from '../hooks/useLoginInfo';

const LoggedOutViews = () => {
  return (
    <Switch>
      <Route exact path='/register' component={RegisterView} />
      <Route exact path='/debug/users' component={DebugUsersView} />
      <Route path='/' component={LoginView} />
    </Switch>
  );
}

const LoggedInViews = () => {
  return (
    <Switch>
      <Route path='/petition_group/' component={ () => <PetitionGroupView basePath='/petition_group/' />} />
      <Route exact path='/add_petition_group/'  component={AddPetitionGroupView} />
      <Route path='/add_petition/' component={ () => <AddPetitionView basePath='/add_petition/' />} />
      <Route path='/petitions/' component={ () => <PetitionView basePath='/petitions/' />} />
      <Route exact path='/debug/users' component={DebugUsersView} />
      <Route path='/' component={HomeView} />
    </Switch>
  );
}

const MainAppRouter = () => {
  const { loginInfo, loggedIn, logout, refreshAuth, loading, error, errorMessage } = useLoginInfo();
  console.log("MainAppRouter - loggedIn: " + loggedIn);

  return (
      <>
          <AppContext.Provider value={{ loggedIn, loginInfo, refreshAuth, logout }}>
            { !error && <LoadingBox loading={loading} error={error} errorMessage={errorMessage} /> }
            {!loading && 
            <Router>
              <TopNavSection />
              { loggedIn ? <LoggedInViews /> : <LoggedOutViews /> }
            </Router>}
          </AppContext.Provider>
      </>
  );
}



export default MainAppRouter;
