import useGetData from  '../hooks/useGetData';
import { LoadingBox } from './MiscControls';

const DebugUsersView = () => {
  const { data:users, loading, error, errorMessage } = useGetData({ 
    url:'/api/users'
  });

  return (
      <section>
        <h2>Users (Debug View)</h2>
        <p>This page shows all of the users in the app.</p>
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
