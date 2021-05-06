import './App.css';
import UsersView from './components/UsersView'
import PetitionsView from './components/PetitionsView'
const App = () => {
  //<PetitionsView />
  return (
    <div className="App">
      <h1>Petition App Debug UI</h1>
      
      <UsersView />
    </div>
  );
}

export default App;
