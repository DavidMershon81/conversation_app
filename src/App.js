import TextEntryForm from './components/TextEntryForm'
import './App.css';
import useFetchData from  './hooks/useFetchData'
import FormFieldInfo from './common/FormFieldInfo'

const App = () => {
  const [ users, getUsers, addUser, loading ] = useFetchData('/api/get_users', '/api/add_user');

  const addUserFormFields = [
    new FormFieldInfo({name:'username'}),
    new FormFieldInfo({name:'password', isPassword: true})
  ];

  return (
    <div className="App">
      <h1>Petition App Debug UI</h1>
      <section>
        <h2>Users</h2>
        <TextEntryForm formFields={addUserFormFields} submitBtnLabel='Add User' submitEvent={addUser}/>
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
