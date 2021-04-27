import { useState, useEffect } from 'react'
import AddUserForm from './components/AddUserForm'
import './App.css';


const App = () => {
  const [users, setUsers] = useState([]);

  //testing pulling an array of cities from the test mysql db on the backend
  useEffect(() => {
    fetch('/api/get_users').then(res => res.json()).then(data => {
      setUsers(data);
    });
  }, []);
  console.log(users);

  const addUser = (newUser) => {
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
    });
  };

  return (
    <div className="App">
      <h1>Petition App Debug UI</h1>
      <section>
        <h2>Users</h2>
        <AddUserForm submitLabel='Add User' placeholderText='User Name' submitEvent={addUser}/>
        <h4>A List of Users</h4>
        <ul>
        {users.map((user) => <li key={user['id']}>id: {user['id']}<br/>username: {user['name']}<br/>password: {user['password']}</li>)}
        </ul>
      </section>
      
    </div>
  );
}

export default App;
