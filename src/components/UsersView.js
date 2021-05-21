import useFetchData from  '../hooks/useFetchData';
import AddUserForm from './AddUserForm';

const UsersView = () => {
  const { data:users, addData:addUser, loading, error } = useFetchData('/api/get_users', '/api/add_user');
  console.log('rendering...');

  return (
      <section>
        <h2>Users</h2>
        <AddUserForm onSubmit={addUser}/>
        { (loading || error) &&
        <div className="loading_box">
          {loading && <p>Loading...</p>}
          {error && <p>error: can't connect to server.</p>}
        </div>
        }

        <ul className='users_list_group'>
          { users && users.map((user) => 
              <li key={user['id']} className='users_list_item'>id:{user['id']} | {user['name']}</li>
          )}
        </ul>
      </section>
  );
}

export default UsersView
