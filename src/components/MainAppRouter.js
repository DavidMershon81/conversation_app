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
import useGetAuthData from '../hooks/useGetAuthData';
import { ReactQueryDevtools } from 'react-query/devtools';

const MainRouterSwitch = () => {
  return (
    <Switch>
      <Route exact path='/' component={HomeView} />
      <Route exact path='/register' component={RegisterView} />
      <Route exact path='/debug/users' component={DebugUsersView} />
      <Route exact path='/login' component={LoginView} />
      <Route path='/petition_group/' component={ () => <PetitionGroupView basePath='/petition_group/' />} />
      <Route exact path='/add_petition_group/'  component={AddPetitionGroupView} />
      <Route path='/add_petition/' component={ () => <AddPetitionView basePath='/add_petition/' />} />
      <Route path='/petitions/' component={ () => <PetitionView basePath='/petitions/' />} />
      <Route exact path='/debug/users' component={DebugUsersView} />
    </Switch>
  );
}

const MainAppRouter = () => {
  const { authData, loggedIn, refreshAuth, setLogout, loading, error, errorMessage } = useGetAuthData();
  const clearLogout = () => {
    setLogout(false);
  }

  return (
      <>
          <AppContext.Provider value={{ authData, loggedIn, refreshAuth, setLogout }}>
            { !error && <LoadingBox loading={loading} error={error} errorMessage={errorMessage} /> }
            {!loading && 
            <Router>
              <TopNavSection />
              <MainRouterSwitch />
            </Router>}
          </AppContext.Provider>
          <ReactQueryDevtools initialIsOpen={false} />
      </>
  );
}



export default MainAppRouter;
