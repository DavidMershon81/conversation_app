import { useState } from 'react'
import FormTextInput from './FormTextInput'

const AddUserForm = ({ submitEvent }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const onSubmit = (e) => {
      e.preventDefault();
      if(!username)
      {
        alert('Enter a user name');
        return;
      }

      if(!password)
      {
        alert('Enter a password');
        return;
      }
  
      submitEvent({ 'username' : username, 'password' : password })
    }
  
    return (
      <form onSubmit={onSubmit} className='input_form'>
        <FormTextInput placeholderText='username' text={username} setText={setUsername}/>
        <FormTextInput placeholderText='password' text={password} setText={setPassword}/>
        <input type="submit" value='Add User'/>
      </form>
    )
  }

  export default AddUserForm