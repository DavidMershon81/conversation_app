import { useState, useEffect } from 'react'
import AddUserForm from './components/AddUserForm'
import './App.css';


const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  //testing pulling an array of cities from the test mysql db on the backend
  useEffect(() => {
    fetch('/api/get_users').then(res => res.json()).then(data => {
      setUsers(data);
    });
  }, []);
  console.log(users);

  const addUser = (newUser) => {
    setLoading(true);
    fetch('/api/add_user', {
      method: 'POST',
      headers: { 
        'Content-type' : 'application/json' 
      },
      body: JSON.stringify(newUser)
    }).then(res => { 
      return res.json(); 
    }).then(newUser => {
      console.log(newUser);
      setUsers([...users, newUser]);
      setLoading(false);
    });
  };

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
        {users.map((user) => <li key={user['id']}>id: <strong>{user['id']}</strong> | username: <strong>{user['name']}</strong></li>)}
        </ul>
      </section>
      
    </div>
  );
}

export default App;
