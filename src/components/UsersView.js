import useFetchData from  '../hooks/useFetchData';
import AddUserForm from './AddUserForm';
import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

const UsersView = () => {
  const { authToken } = useContext(AppContext);
  const { data:users, addData:addUser, loading, error } = useFetchData({ 
    getUrl:'/api/users', 
    postUrl:'/api/users'
  });

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
              <li key={user['id']} className='users_list_item'>id:{user['id']} | {user['email']}<br/>{user['first_name']} {user['last_name']}</li>
          )}
        </ul>
      </section>
  );
}

export default UsersView
