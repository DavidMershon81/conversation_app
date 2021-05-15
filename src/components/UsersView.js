import useFetchData from  '../hooks/useFetchData';
import AddUserForm from './AddUserForm';

const UsersView = () => {
  const [ users, addUser, loading, error ] = useFetchData('/api/get_users', '/api/add_user');

  return (
      <section>
        <h2>Users</h2>
        <AddUserForm onSubmit={addUser}/>
        <div className="loading_box">
          {loading && <p>Loading...</p>}
          {error && <p>error: can't connect to server.</p>}
        </div>

        <ul>
          { users && users.map((user) => 
              <li key={user['id']}> <strong>id:</strong> {user['id']} <strong>username:</strong> {user['name']}</li>
          )}
        </ul>
      </section>
  );
}

export default UsersView
