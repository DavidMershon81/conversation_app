import AddUserForm from './components/AddUserForm'
import './App.css';
import useFetchData from  './hooks/useFetchData'

const App = () => {
  const [ users, getUsers, addUser, loading ] = useFetchData('/api/get_users', '/api/add_user');

  return (
    <div className="App">
      <h1>Petition App Debug UI</h1>
      <section>
        <h2>Users</h2>
        <AddUserForm submitLabel='Add User' placeholderText='User Name' submitEvent={addUser}/>
        <div className="loading_box">
          {loading && <p>Loading...</p>}
        </div>
        <h4>A List of Users</h4>
        <ul>
        {users && users.map((user) => <li key={user['id']}>id: <strong>{user['id']}</strong> | username: <strong>{user['name']}</strong></li>)}
        </ul>
      </section>
      
    </div>
  );
}

export default App;
