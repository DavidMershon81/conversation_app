import './App.css';
import UsersView from './components/UsersView'
import PetitionsView from './components/PetitionsView'
//import TestReactHookForm from './components/TestReactHookForm'

const App = () => {
  /*
  <TestReactHookForm />  
  */

  return (
    <div className="App">
      <h1>Petition App Debug UI</h1>
      <PetitionsView />
      <UsersView />
      
    </div>
  );
}

export default App;
