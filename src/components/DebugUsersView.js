import useFetchData from  '../hooks/useFetchData';
import AddUserForm from './AddUserForm';
import { LoadingBox } from './MiscControls';

const DebugUsersView = () => {
  const { data:users, addData:addUser, loading, error, errorMessage } = useFetchData({ 
    url:'/api/users', 
    requireAuth:false
  });

  return (
      <section>
        <h2>Users (Debug View)</h2>
        <p>This page shows all of the users in the app.</p>
        <AddUserForm onSubmit={addUser}/>
        <LoadingBox loading={loading} error={error} errorMessage={errorMessage} />

        <ul className='users_list_group'>
          { users && users.map((user) => 
              <li key={user['id']} className='users_list_item'>id:{user['id']} | {user['email']}<br/>{user['first_name']} {user['last_name']}</li>
          )}
        </ul>
      </section>
  );
}

export default DebugUsersView
