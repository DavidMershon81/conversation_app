import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DebugUsersView from './components/DebugUsersView';
import PetitionGroupView from './components/PetitionGroupView';
import AddPetitionGroupView from './components/AddPetitionGroupView';
import AddPetitionView from './components/AddPetitionView';
import PetitionView from './components/PetitionView';
import LoginView from './components/LoginView';
import RegisterView from './components/RegisterView';
import HomeView from './components/HomeView';
import TopNavSection from './components/TopNavSection';
import { AppContext } from './contexts/AppContext';
import { useState, useEffect } from 'react';
import useGetData from  './hooks/useGetData';
import usePostData from  './hooks/usePostData';
import { LoadingBox } from './components/MiscControls'; 
import { QueryClient, QueryClientProvider } from 'react-query';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const onLogoutConfirm = () => {
    setLoggedInUser(null);
  }
  const { data:login_info, loading, error, errorMessage } = useGetData({ url:'/api/get_current_user' });
  const { post:logout } = usePostData({ 
    url:'/api/logout',
    onConfirm:onLogoutConfirm
  });
  
  useEffect(() => {
    if(login_info) {
      setLoggedInUser(login_info.user_email);
    }
  },[login_info]);

  const queryClient = new QueryClient();

  return (
      <div className="App">
          <AppContext.Provider value={{ loggedInUser, setLoggedInUser, logout }}>
          <QueryClientProvider client={queryClient}>
            { !error && <LoadingBox loading={loading} error={error} errorMessage={errorMessage} /> }
            {!loading && 
            <Router>
              <TopNavSection />
              <Switch>
                <Route exact path='/' component={HomeView} />
                <Route exact path='/login' component={LoginView} />
                <Route exact path='/register' component={RegisterView} />
                <Route path='/petition_group/' component={ () => <PetitionGroupView basePath='/petition_group/' />} />
                <Route exact path='/add_petition_group/'  component={AddPetitionGroupView} />
                <Route path='/add_petition/' component={ () => <AddPetitionView basePath='/add_petition/' />} />
                <Route path='/petitions/' component={ () => <PetitionView basePath='/petitions/' />} />
                <Route exact path='/debug/users' component={DebugUsersView} />
              </Switch>
            </Router>}
          </QueryClientProvider>
          </AppContext.Provider>
      </div>
  );
}

export default App;
