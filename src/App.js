import './App.css';
import UsersView from './components/UsersView'
import PetitionsView from './components/PetitionsView'

const App = () => {
  return (
    <div className="App">
      <h1>Petition App Debug UI</h1>
      <PetitionsView />
      <UsersView />
    </div>
  );
}

export default App;
