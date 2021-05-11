
 import TextEntryForm from './TextEntryForm'
 import useFetchData from  '../hooks/useFetchData'
 import FormFieldInfo from '../common/FormFieldInfo'
 import FormSectionInfo from '../common/FormSectionInfo'

 const UsersView = () => {
    const [ users, addUser, loading ] = useFetchData('/api/get_users', '/api/add_user');
  
    const userSectionTemplate = new FormSectionInfo([
      new FormFieldInfo({name:'username', label:'email address', inputType:'email' }),
      new FormFieldInfo({name:'password', inputType:'password'})
    ]);
  
    return (
        <section>
          <h2>Users</h2>
          <TextEntryForm formDataTemplate={userSectionTemplate} submitBtnLabel='Add User' submitEvent={addUser}/>
          <div className="loading_box">
            {loading && <p>Loading...</p>}
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
