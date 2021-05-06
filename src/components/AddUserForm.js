import { useState } from 'react'
import FormTextInput from './FormTextInput'

const AddUserForm = ({ submitEvent }) => {
  const cleanFormData = {
    username : '',
    password : ''
  };
  const [formData, setFormData] = useState(cleanFormData);

  const onTextUpdate = (textKey, textValue) => {
    const newFormData = {...formData};
    newFormData[textKey] = textValue;
    setFormData(newFormData);
    console.log("formData[" + textKey + "]: " + formData[textKey]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if(formData.username === '')
    {
      alert('Enter a user name');
      return;
    }

    if(formData.password === '')
    {
      alert('Enter a password');
      return;
    }

    submitEvent(formData)
    setFormData(cleanFormData);
  }

  return (
    <form onSubmit={onSubmit} className='input_form'>
      <FormTextInput placeholderText='username' varName='username' text={formData['username']} setText={onTextUpdate}/>
      <FormTextInput placeholderText='password' varName='password' text={formData['password']} setText={onTextUpdate} isPassword='true'/>
      <input type="submit" value='Add User' className="form_submit_btn" />
    </form>
  )
}

export default AddUserForm